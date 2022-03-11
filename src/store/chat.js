import WebIM from '../utils/WebIM';
import _ from 'lodash';

const Chat = {
  state: {
    userList: {
      contactUserList: [],
      groupUserList: [],
      chatroomUserList: [],
    },
    msgList: {
      contact: {},
      group: {},
      chatroom: {},
    },
    currentMsgs: [],

    noticeCallMsg: {},
  },
  mutations: {
    updateUserList (state, payload) {
      const { userList, type } = payload;
      // 如果是添加黑名单，则从当前用户列表中删掉此人
      // if(payload.black && payload.black.type === "addBlack"){
      // 	const addName = payload.black.addName;
      // 	const userList = state.userList[type];
      // 	let newUserList = _.pullAllBy(userList, [{ name: addName }], "name");
      // 	state.userList[type] = newUserList;
      // }
      // else{
      // 	state.userList[type] = userList;
      // }
      state.userList[type] = userList;
    },
    updateMsgList (state, payload) {
      const { chatType, chatId, msg, bySelf, type, id } = payload;
      // payload的消息为漫游历史消息的话，进入判断筛选出已存在msgList当中的消息，此类消息不再添加进msgList。
      if (payload.isHistory) {
        // 拿到该key已经存在的消息。
        let nowKeyMsg = state.msgList[chatType][chatId];
        // 开始筛选，如果payload.mid 不等于item.id则说明msgList中没有存储。
        let newHistoryMsg = nowKeyMsg && nowKeyMsg.filter(item => item.mid != payload.mid);
        state.msgList[chatType][chatId] = newHistoryMsg;
      }
      const { params } = Vue.$route;
      let status = 'unread';
      if (payload.chatType == 'contact') {
        if (params.id == payload.from) {
          status = 'read';
        }
      }
      else if (payload.chatType == 'group') {
        if (params.id == payload.chatId) {
          status = 'read';
        }
      }

      if (!state.msgList[chatType][chatId]) {
        state.msgList[chatType][chatId] = [{
          msg,
          bySelf,
          type: type || '',
          mid: id,
          status: status,
          ...payload,
        }];
      }
      else {
        state.msgList[chatType][chatId].push({
          msg,
          bySelf,
          type: type || '',
          mid: id,
          status,
          ...payload,
        });
        state.msgList[chatType][chatId] = state.msgList[chatType][chatId].sort((a, b) => a.time - b.time);
        // state.msgList[chatType][chatId] = _unique(state.msgList[chatType][chatId])
      }

      state.currentMsgs = Object.assign({}, state.msgList[chatType][params.id || chatId]); // 这里params.id在路由跳转的时候会undefind，取chatId兼容
      state.msgList = Object.assign({}, state.msgList);
    },
    updateCurrentMsgList (state, messages) {
      state.currentMsgs = messages;
    },
    updateMessageMid (state, message) {
      const { id, mid } = message;
      const { name, params } = Vue.$route;
      // state.currentMsgs.forEach((item) => {
      //     if(item.mid == id){
      //         item.mid = mid
      //     }
      // })
      Object.keys(state.msgList[name]).forEach((user) => {
        if (state.msgList[name][user].length) {
          state.msgList[name][user].forEach((msg) => {
            if (msg.mid == id) {
              msg.mid = mid;
            }
          });
        }
      });
    },
    updateMessageStatus (state, message) {
      const { id, mid, action, readUser } = message;
      // const { name, params } = Vue.$route;
      let name = 'contact';
      Object.keys(state.msgList[name]).forEach((user) => {
        // console.log(state.msgList[name][user]);

        if (action == 'oneUserReadMsgs') {
          if (state.msgList[name][readUser]) {
            state.msgList[name][readUser].forEach((msg) => {
              if (msg.status != 'recall') {
                msg.status = 'read';
              }
            });
          }
        }
        else if (state.msgList[name][user].length) {
          state.msgList[name][user].forEach((msg) => {
            if (action === 'readMsgs' && !msg.bySelf) {
              if (msg.status != 'recall') {
                msg.status = 'read';
              }
            }
            else if (msg.mid == id || msg.mid == mid) {
              msg.status = message.status;
              if (message.msg) {
                msg.msg = message.msg;
              }
            }
          });
        }
      });
    },
    // 黑名单筛选用户列表
    changeUserList (state, payload) {
      let ary = [];
      _.forIn(payload, function (value, key) {
        ary.push({ name: key });
      });
      state.userList.contactUserList = _.pullAllBy(state.userList.contactUserList, ary, 'name');
    },
    initChatState (state) {
      state.userList = {
        contactUserList: [],
        groupUserList: [],
        chatroomUserList: [],
      };

      state.msgList = {
        contact: {},
        group: {},
        chatroom: {},
      };

      state.currentMsgs = [];
    },

    // 传递数据给 call 组件，是否收到通话邀请
    noticeCall (state, payload) {
      console.log('store noticeCall msg', payload);
      state.noticeCallMsg = payload;
    },
  },
  actions: {
    onGetContactUserList: function (context, payload) {
      try {
        WebIM.conn.getRoster({
          success: function (roster) {
            // console.log("roster", roster);
            const userList = roster.filter(user => ['both', 'to'].includes(user.subscription));
            context.commit('updateUserList', {
              userList,
              type: 'contactUserList',
              black: payload,
            });
          },
        });
      }
      catch (e) {
        console.log('error', e);
      }
    },
    // 获取当前聊天对象的记录 @payload： {key, type}
    onGetCurrentChatObjMsg: function (context, payload) {
      const { id, type } = payload;
      context.commit('updateCurrentMsgList', context.state.msgList[type][id]);
    },
    onSendText: function (context, payload) {
      const { chatType, chatId, message } = payload;
      const id = WebIM.conn.getUniqueId();
      const time = +new Date();
      const chatroom = chatType === 'chatroom';
      const type = chatType === 'contact' ? 'singleChat' : 'groupChat';
      const jid = {
        contact: 'name',
        group: 'groupid',
        chatroom: 'id',
      };
      // eslint-disable-next-line new-cap
      const msgObj = new WebIM.message('txt', id);
      msgObj.set({
        msg: message,
        // to: chatId[jid[chatType]],
        to: chatId.name,
        chatType: type,
        roomType: chatroom,
        success: function () {
          context.commit('updateMsgList', {
            chatType,
            chatId: chatId[jid[chatType]],
            msg: message,
            bySelf: true,
            time: time,
            mid: id,
            status: 'sending',
          });
        },
        fail: function (e) {
          console.log('Send private text error', e);
        },
      });
      WebIM.conn.send(msgObj.body);
    },
    // sendImgMessage: function (context, payload) {
    //   const { chatType, chatId, roomType, file, callback } = payload;
    //   const id = WebIM.conn.getUniqueId();
    //   const jid = {
    //     contact: 'name',
    //   };
    //   // eslint-disable-next-line new-cap
    //   const msgObj = new WebIM.message('img', id);
    //   msgObj.set({
    //     file: file,
    //     to: chatId[jid[chatType]],
    //     chatType: chatType,
    //     roomType: roomType,
    //     onFileUploadError: function (error) {
    //       console.log('图片上传失败', error);
    //       callback();
    //     },
    //     onFileUploadComplete: function (data) {
    //       let url = data.uri + '/' + data.entities[0].uuid;
    //       context.commit('updateMsgList', {
    //         msg: url,
    //         chatType,
    //         chatId: chatId[jid[chatType]],
    //         bySelf: true,
    //         type: 'img',
    //         time: data.timestamp,
    //         mid: id,
    //         status: 'sending',
    //       });
    //       callback();
    //     },
    //     success: function () {
    //       console.log('图片发送成功');
    //     },
    //   });
    //   WebIM.conn.send(msgObj.body);
    // },

    getHistoryMessage: function (context, payload) {
      const options = {
        queue: payload.name,
        isGroup: payload.isGroup,
        count: 10, // 每次获取消息条数
        success: function (msgs) {
          console.log('msgs', msgs);
          try {
            payload.success && payload.success(msgs);
            if (msgs.length) {
              const userInfo = JSON.parse(localStorage.getItem('userInfo'));
              const userId = userInfo && userInfo.userId;
              msgs.forEach((item) => {
                let time = Number(item.time);
                let msg = {};
                const bySelf = item.from == userId;
                if (!item.filename) {
                  msg = {
                    chatType: payload.isGroup ? 'group' : 'contact',
                    chatId: bySelf ? item.to : item.from,
                    msg: item.data,
                    bySelf: bySelf,
                    time: time,
                    mid: item.id,
                    status: 'read',
                  };
                  if (payload.isGroup) {
                    msg.chatId = item.to;
                  }
                  else {
                    msg.chatId = bySelf ? item.to : item.from;
                  }
                }
                // else if (!item.ext.file_length && item.filename !== 'audio' && item.filename.substring(item.filename.length - 3) !== 'mp4') { // 为图片的情况
                //   msg = {
                //     msg: item.url,
                //     chatType: payload.isGroup ? 'group' : 'contact',
                //     chatId: bySelf ? item.to : item.from,
                //     bySelf: bySelf,
                //     type: 'img',
                //     time: time,
                //     mid: item.id,
                //     status: 'read',
                //   };
                //   if (payload.isGroup) {
                //     msg.chatId = item.to;
                //   }
                //   else {
                //     msg.chatId = bySelf ? item.to : item.from;
                //   }
                // }
                // else {
                //   msg = {
                //     msg: item.url,
                //     chatType: payload.isGroup ? 'group' : 'contact',
                //     chatId: bySelf ? item.to : item.from,
                //     bySelf: bySelf,
                //     type: 'file',
                //     filename: item.filename,
                //     file_length: item.file_length,
                //     time: time,
                //     mid: item.id,
                //     status: 'read',
                //   };
                //   if (payload.isGroup) {
                //     msg.chatId = item.to;
                //   }
                //   else {
                //     msg.chatId = bySelf ? item.to : item.from;
                //   }
                // }
                msg.isHistory = true;
                context.commit('updateMsgList', msg);
              });
              context.commit('updateMessageStatus', { action: 'readMsgs' });
            }
          }
          catch (e) {
            console.log('error', e);
          }
        },
      };
      WebIM.conn.fetchHistoryMessages(options);
    },

    recallMessage: function (context, payload) {
      const { chatType, mid } = payload.message;
      const to = payload.to;
      const me = this;
      const chatTypeObj = {
        contact: 'chat',
      };
      const option = {
        mid,
        to,
        type: chatTypeObj[chatType],
        success: function () {
          payload.message.status = 'recall';
          payload.message.msg = '消息已撤回';
          Vue.$store.commit('updateMessageStatus', payload.message);
        },
        fail: function () {
          // me.$message('消息撤回失败');
        },
      };
      WebIM.conn.recallMessage(option);
    },
    initChatState: function (context, payload) {
      context.commit('initChatState');
    },
  },
  getters: {
    onGetContactUserList (state) {
      return state.userList.contactUserList;
    },
    onGetCurrentChatObjMsg (state) {
      return state.currentMsgs;
    },
    fetchHistoryMessages (state) {
      return state.currentMsgs;
    },
  },

};
export default Chat;
