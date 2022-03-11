import config from './WebIMConfig';
import websdk from 'easemob-websdk';
function ack (message) {
  var bodyId = message.id; // 需要发送已读回执的消息id
  // eslint-disable-next-line new-cap
  var msg = new WebIM.message('read', WebIM.conn.getUniqueId());
  msg.set({
    id: bodyId,
    to: message.from,
  });
  WebIM.conn.send(msg.body);
}
const rtc = {
  // 用来放置本地客户端。
  client: null,
  // 用来放置本地音视频频轨道对象。
  localAudioTrack: null,
  localVideoTrack: null,
};

// 初始化IM SDK
var WebIM = {};
WebIM = window.WebIM = websdk;
WebIM.config = config;
// eslint-disable-next-line new-cap
WebIM.conn = new WebIM.connection({
  appKey: WebIM.config.appkey,
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: WebIM.config.https,
  isAutoLogin: true,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval,
  isStropheLog: WebIM.config.isStropheLog,
  delivery: WebIM.config.delivery,

  // 公有云 isHttpDNS 默认配置为true
  isHttpDNS: WebIM.config.isHttpDNS,

  // 私有云设置，详细文档：http://docs-im.easemob.com/im/web/other/privatedeploy
  // isHttpDNS: false,
  // url: 'https://im-api-v2.easecdn.com/ws', // 设置为私有云的websocket server url
  // apiUrl: 'https://a1.easecdn.com', // 设置为私有云的rest server url
});

// 通话状态
const CALLSTATUS = {
  idle: 0,
  inviting: 1,
  alerting: 2,
  confirmRing: 3, // caller
  receivedConfirmRing: 4, // callee
  answerCall: 5,
  receivedAnswerCall: 6,
  confirmCallee: 7,
};

// 注册监听回调
WebIM.conn.listen({
  // onOpened: function (message) { // 连接成功回调
  //   // 登录或注册成功后 跳转到好友页面
  //   const username = Vue.$store.state.login.username || localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).userId;
  //   const path = location.pathname.indexOf('login') !== -1 || location.pathname.indexOf('register') !== -1 ? '/contact' : location.pathname;
  //   const redirectUrl = `${path}?username=${username}`;
  //   Vue.$router.push({ path: redirectUrl });
  // },
  // onClosed: function (message) {
  //   Vue.$router.push({ path: '/login' });
  // }, // 连接关闭回调

  onTextMessage: function (message) {
    console.log('onTextMessage', message);
    const { from, to, type, time } = message;
    const chatId = type !== 'chat' ? to : from;
    const typeMap = {
      chat: 'contact',
    };
    Vue.$store.commit('updateMsgList', {
      chatType: typeMap[message.type],
      chatId: chatId,
      msg: message.data,
      bySelf: false,
      from: message.from,
      mid: message.id,
      time: time,
    });

    type === 'chat' && ack(message);
    if (message.ext && message.ext.action === 'invite') {
      console.log('收到邀请消息', message);
      const { callerDevId, callId } = message.ext;
      let callVideo = Vue.$store.getters.getAgora;
      message.calleeIMName = message.to;
      message.callerIMName = message.from;
      if (message.from == WebIM.conn.context.jid.name) {
        return; // 自己在另一端发出的邀请
      }
      if (callVideo.callStatus > CALLSTATUS.idle) { // 正忙
        if (message.ext.callId == callVideo.callId) { // 多人会议中邀请别人
          Vue.$store.dispatch('sendAlerting', { to: from, calleeDevId: callerDevId, callId });// 回复alerting消息
          Vue.$store.dispatch('setCallStatus', CALLSTATUS.alerting);// 更改为alerting状态
        }
        else {
          return Vue.$store.dispatch('answerCall', { result: 'busy', callId: message.ext.callId, callerDevId: message.ext.callerDevId, to: from });
        }
      }
      Vue.$store.dispatch('updateConfr', message);
      Vue.$store.dispatch('sendAlerting', { to: from, calleeDevId: callerDevId, callId });// 回复alerting消息
      Vue.$store.dispatch('setCallStatus', CALLSTATUS.alerting);// 更改为alerting状态
    }
  }, // 收到文本消息

  onEmojiMessage: function (message) {
    console.log('onEmojiMessage', message);
    const { type } = message;
    type === 'chat' && ack(message);
  }, // 收到表情消息

  onPictureMessage: function (message) {
    const { from, to, type, time } = message;
    const chatId = type !== 'chat' ? to : from;
    const typeMap = {
      chat: 'contact',
    };
    Vue.$store.commit('updateMsgList', {
      chatType: typeMap[message.type],
      chatId: chatId,
      msg: message.url,
      bySelf: false,
      type: 'img',
      from: message.from,
      time: time,
    });
    type === 'chat' && ack(message);
  }, // 收到图片消息
  // eslint-disable-next-line complexity
  onCmdMessage: function (msg) {
    console.log('onCmdMessage', msg);
    if (msg.action === 'rtcCall') {
      console.log('tes11');
      if (msg.from === WebIM.conn.context.jid.name) {
        console.log('进来了');
        return; // 多端情况， 另一端自己发的消息
      }
      let msgInfo = msg.ext;
      let deviceId = '';

      let callerDevId = '';
      let callId = '';
      let callVideo = Vue.$store.getters.getAgora;
      switch (msgInfo.action) {
      case 'alert':
        deviceId = msgInfo.calleeDevId;
        callerDevId = msgInfo.callerDevId;
        callId = msgInfo.callId;

        console.log('收到回复的alert', msg);
        Vue.$store.dispatch('confirmRing', {
          msg, deviceId, callerDevId, callId,
        });
        break;
      case 'confirmRing':
        console.log('收到confirmRing', msg);
        if (msgInfo.calleeDevId != WebIM.conn.context.jid.clientResource) {
          console.log('不是自己设备的confirmRing', msg);
          return; // 多端情况另一端的消息
        }
        if (!msgInfo.status && callVideo.callStatus < CALLSTATUS.receivedConfirmRing) {
          console.warn('邀请已失效');
          Vue.$store.dispatch('hangup');
          Vue.$store.dispatch('setCallStatus', CALLSTATUS.idle);
          return;
        }
        deviceId = msgInfo.calleeDevId;
        Vue.$store.dispatch('setCallStatus', CALLSTATUS.receivedConfirmRing);
        console.log('清除定时器2');
        rtc.timer && clearTimeout(rtc.timer);
        break;
      case 'answerCall':
        console.log('收到回复的answerCall', msg);
        console.log('清除定时器1');
        rtc.timer && clearTimeout(rtc.timer);
        deviceId = msgInfo.calleeDevId;
        if (msgInfo.callerDevId != WebIM.conn.context.jid.clientResource) {
          console.log('不是自己设备的answerCall', msg);
          return; // 多端情况另一端的消息
        }
        Vue.$store.dispatch('confirmCallee', { to: msg.from, calleeDevId: deviceId, result: msgInfo.result });
        if (msgInfo.result !== 'accept') {
          if (msgInfo.result === 'busy') {
            console.log('对方正忙！');
          }
          else if (msgInfo.result === 'refuse') {
            console.log('对方已拒绝！');
          }

          if (callVideo.confr.type !== 2) { // 单人情况挂断，多人不挂断
            Vue.$store.dispatch('hangup');
            Vue.$store.dispatch('setCallStatus', CALLSTATUS.idle);
          }
        }
        break;
      case 'confirmCallee':
        console.log('收到confirmCallee', msg);
        if (msgInfo.calleeDevId != WebIM.conn.context.jid.clientResource) {
          if (msg.to == WebIM.conn.context.jid.name) {
            Vue.$store.dispatch('hangup');
            Vue.$store.dispatch('setCallStatus', CALLSTATUS.idle);
            console.log('已在其他设备处理！');
          }
          return;
        }

        if (msg.ext.result != 'accept' && callVideo.callStatus != 7) {
          // 不在通话中收到 busy refuse时挂断
          Vue.$store.dispatch('hangup');
          Vue.$store.dispatch('setCallStatus', CALLSTATUS.idle);
          return;
        }
        Vue.$store.dispatch('setCallStatus', CALLSTATUS.confirmCallee);
        break;
      case 'cancelCall':
        console.log('收到cancelCall', msg);
        if (msg.from == WebIM.conn.context.jid.name) {
          return; // 多端情况另一端的消息
        }
        if (msg.from == callVideo.confr.callerIMName) {
          Vue.$store.dispatch('hangup');
          Vue.$store.dispatch('setCallStatus', CALLSTATUS.idle);
        }
        break;
      default:
        console.log('unexpected action');
        break;
      }
    }
  },
  onPresence: function (message) {
    console.log('onPresence', message);
    switch (message.type) {
    case 'subscribe':
      // eslint-disable-next-line no-case-declarations
      let options = {
        isShow: true,
        ...message,
      };
      Vue.$store.commit('changeFriendRequestState', options);
      break;
    case 'subscribed':
      Vue.$store.dispatch('onGetContactUserList');
      console.log('已订阅！');
      break;
    case 'unsubscribed':
      Vue.$store.dispatch('onGetContactUserList');
      // TODO
      if ('code' in message) {
        alert(message.from + ' 请求被拒绝');
      }
      else {
        console.log('已退定！');
      }
      break;

    case 'direct_joined': // 被拉进群--不需要同意
      Vue.$store.dispatch('onGetGroupUserList');
      console.log(`${message.from}邀请您加入群：${message.gid}`);
      break;
    case 'invite': // 收到邀请进群的通知
      // eslint-disable-next-line no-case-declarations
      let groupInviteOptions = {
        isShow: true,
        ...message,
      };
      Vue.$store.commit('updateGroupInviteNotifications', groupInviteOptions);
      break;
    case 'joinGroupNotifications': // 收到申请进群的通知
      // eslint-disable-next-line no-case-declarations
      let groupOptions = {
        isShow: true,
        ...message,
      };
      Vue.$store.commit('updateGroupNotifications', groupOptions);
      break;
    default:
      break;
    }
  }, // 处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
  onRoster: function (message) {
    console.log('onRoster', message);
  }, // 处理好友申请
  onInviteMessage: function (message) {
    console.log('onInviteMessage', message);
  }, // 处理群组邀请
  onOnline: function () {
    console.log('onOnline 网络已连接');
  }, // 本机网络连接成功
  onOffline: function () {
    console.log('onOffline 网络已断开');
  }, // 本机网络掉线
  // onError: function (message) {
  //   console.log('onError', message);
  //   if (message.type == 0) {
  //     console.log('请输入账号密码');
  //   }
  //   else if (message.type == 28) {
  //     console.log('未登陆');
  //   }
  //   else if (JSON.parse(message.data.data).error_description == 'user not found') {
  //     console.log('用户名不存在！');
  //   }
  //   else if (JSON.parse(message.data.data).error_description == 'invalid password') {
  //     console.log('密码无效！');
  //   }
  //   else if (JSON.parse(message.data.data).error_description == 'user not activated') {
  //     console.log('用户已被封禁！');
  //   }
  //   else if (message.type == '504') {
  //     console.log('消息撤回失败');
  //   }
  //   // 报错返回到登录页面
  //   // Vue.$router.push({ path: '/login' });
  // }, // 失败回调
  onRecallMessage: message => {
    console.log('撤回消息', message);
    message.status = 'recall';
    message.msg = '对方撤回了一条消息';
    Vue.$store.commit('updateMessageStatus', message);
  },
  onReceivedMessage: function (message) {
    console.log('onReceivedMessage', message);
    Vue.$store.commit('updateMessageMid', message);
    message.status = 'sent';
    Vue.$store.commit('updateMessageStatus', message);
  }, // 收到消息送达服务器回执

  onDeliveredMessage: function (message) {
    console.log('onDeliveredMessage', message);
    // Vue.$store.commit('updateMessageStatus', message)
  }, // 收到消息送达客户端回执

  onReadMessage: function (message) {
    console.log('onReadMessage', message);
    message.status = 'read';
    Vue.$store.commit('updateMessageStatus', message);
  }, // 收到消息已读回执
});

WebIM.rtc = rtc;

export default WebIM;
