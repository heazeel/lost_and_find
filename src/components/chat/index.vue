<template>
  <div class="userlist">
    <a-menu style="width: 100%; border-right: 0;" mode="vertical" :selected-keys="selectedKeys">
      <a-menu-item
        v-for="(item) in userList[type]"
        :key="getKey(item)"
        style="height: 80px; position: relative; textAlign: left; borderBottom: 1px solid #eee; margin: 0"
        @click="select2(item, getKey(item))">
        <span class="custom-title">{{ item.name }}</span>
        <div v-if="getUnreadNum(item) != 0" class="icon-style">
          <span class="unreadNum">{{ getUnreadNum(item) }}</span>
        </div>
        <span class="time-style" style="float:right">{{ getLastMsg(item).msgTime }}</span>
        <div>{{ getLastMsg(item).lastMsg }}</div>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import './index.scss';
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
// import _ from 'lodash';

export default {
  data () {
    return {
      type: 'contact',
      activedKey: {
        contact: '',
      },
      showFirendMenus: false,
      firendMenus: [
        {
          name: '加入黑名单',
          id: '1',
          icon: 'add-o',
        },
        {
          name: '删除好友',
          id: '2',
          icon: 'delete',
        },
      ],
      message: '',
      isHttps: window.location.protocol === 'https:',
      loadText: '加载更多',
      status: {
        sending: '发送中',
        sent: '已发送',
        read: '已读',
      },
      isCollapse: true,
      unRead: '',
      // selectedKeys: [ this.getKey(this.activedKey[this.type]) ]
    };
  },

  beforeMount () {
    setTimeout(() => {
      this.onGetContactUserList();
    }, 100);
  },
  mounted () {
    // 取到黑名单列表值将黑名单匹配用户列表进行筛选
    let blackList = this.$store.state.friendModule.blackList;
    this.$store.commit('changeUserList', blackList);
  },
  updated () {
    this.scollBottom();
  },
  computed: {
    ...mapGetters({
      contact: 'onGetContactUserList',
      msgList: 'onGetCurrentChatObjMsg',
    }),
    userList () {
      return {
        contact: this.contact.filter(item => {
          if (item && !this.blackList.includes(item.name)) {
            return item;
          }
        }),
      };
    },
    blackList () {
      return Object.keys(this.$store.state.friendModule.blackList);
    },
    chatList () {
      return this.$store.state.chat.msgList;
    },
    selectedKeys () {
      return [this.getKey(this.activedKey[this.type]) || ''];
    },
  },
  props: [
    'username', // 选中的聊天对象
    'select',
  ],
  methods: {
    ...mapActions([
      'onGetContactUserList',
      'onGetCurrentChatObjMsg',
      'onSendText',
      'getHistoryMessage',
      'onDelteFirend',
      'recallMessage',
    ]),
    handleOpen (key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath);
    },
    getKey (item) {
      let key = '';
      switch (this.type) {
      case 'contact':
        key = item.name;
        break;
      default:
        break;
      }
      return key;
    },
    getUnreadNum (item) {
      const { name, params } = this.$route;
      const chatList = this.chatList[name];
      let userId = '';
      if (name == 'contact') {
        userId = item.name;
      }
      else if (name == 'group') {
        userId = item.groupid;
      }
      else {
        userId = item.id;
        return 0;
      }
      const currentMsgs = chatList[userId] || [];
      let unReadNum = 0;
      currentMsgs.forEach(msg => {
        if (msg.status !== 'read' && msg.status !== 'recall' && !msg.bySelf) {
          unReadNum++;
        }
      });
      return unReadNum;
    },
    select2 (key, index) {
      this.$data.selectedKeys = [index];
      console.log('key', key);
      this.select(key);
      this.$data.activedKey[this.type] = key;
    },
    loadMoreMsgs () {
      const me = this;
      const success = function (msgs) {
        if (msgs.length === 0) {
          me.$data.loadText = '已无更多数据';
        }
      };
      let name = '';
      let isGroup = false;
      if (this.type === 'contact') {
        name = this.$data.activedKey[this.type].name;
      }
      this.getHistoryMessage({
        name,
        isGroup,
        success,
      });
    },
    changeMenus () {
      if (this.type === 'contact') {
        this.$data.showFirendMenus = !this.$data.showFirendMenus;
      }
    },

    onSendTextMsg () {
      this.onSendText({
        chatType: this.type,
        chatId: this.$data.activedKey[this.type],
        message: this.$data.message,
      });
      this.$data.message = '';
    },

    renderTxt (txt = '') {
      let rnTxt = [];
      let match = null;
      const regex = /(\[.*?\])/g;
      let start = 0;
      let index = 0;
      while ((match = regex.exec(txt))) {
        index = match.index;
        if (index > start) {
          rnTxt.push(txt.substring(start, index));
        }
        else {
          rnTxt.push(match[1]);
        }
        start = index + match[1].length;
      }
      rnTxt.push(txt.substring(start, txt.length));
      return rnTxt.toString().replace(/,/g, '');
    },

    readablizeBytes (value) {
      let s = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
      let e = Math.floor(Math.log(value) / Math.log(1024));
      return (value / Math.pow(1024, Math.floor(e))).toFixed(2) + ' ' + s[e];
    },

    // TODO 可以抽离到utils
    renderTime (time) {
      // const nowStr = new Date();
      // const localStr = time ? new Date(time) : nowStr;
      // const localMoment = moment(localStr);
      // const localFormat = localMoment.format("MM-DD hh:mm A");
      // return localFormat;
      var t = new Date(parseInt(time));
      var Y = t.getFullYear();
      var M = t.getMonth() + 1 < 10 ? '0' + (t.getMonth() + 1) : t.getMonth() + 1;
      var D = t.getDate() < 10 ? '0' + t.getDate() : t.getDate();
      var H = t.getHours() < 10 ? '0' + t.getHours() : t.getHours();
      var F = t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes();
      var S = t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds();
      return `${M}-${D} ${H}:${F}`;
    },
    getLastMsg (item) {
      // const { name, params } = this.$route;
      let name = 'contact';
      const chatList = this.chatList[name];
      let userId = '';
      if (name == 'contact') {
        userId = item.name;
      }
      else if (name == 'group') {
        userId = item.groupid;
      }
      else {
        userId = item.id;
      }
      const currentMsgs = chatList[userId] || [];
      let lastMsg = '';
      let lastType =
        currentMsgs.length && currentMsgs[currentMsgs.length - 1].type;
      if (currentMsgs.length) {
        if (lastType === 'img') {
          lastMsg = '[image]';
        }
        else if (lastType === 'file') {
          lastMsg = currentMsgs[currentMsgs.length - 1].filename;
        }
        else {
          lastMsg = currentMsgs[currentMsgs.length - 1].msg;
        }
      }
      const msgTime = currentMsgs.length
        ? this.renderTime(currentMsgs[currentMsgs.length - 1].time)
        : '';
      return {
        lastMsg,
        msgTime,
      };
    },
    scollBottom () {
      setTimeout(() => {
        const dom = this.$refs.msgContent;
        if (!dom) { return; }
        dom.scrollTop = dom.scrollHeight;
      }, 0);
    },
    handleCommand (item) {
      let name = '';
      if (this.type === 'contact') {
        name = this.$data.activedKey[this.type].name;
      }
      this.recallMessage({
        to: name,
        message: item,
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.userlist {
  height: 100%;
  overflow-y: scroll;
  border-right: 1px solid #e8e8e8;
	width: 100%;
}
.byself {
  float: right;
}
.recallMsg {
  font-size: 12px;
  color: #aaa;
  width: 100%;
  text-align: center;
}
.custom-title {
  font-weight: 500;
  width: 100%;
  height: 50px;
}
.moreMsgs {
  background: #ccc !important;
  border-radius: 8px;
  cursor: pointer;
}
.status {
  display: inline;
  position: relative;
  top: 20px;
  font-size: 12px;
  left: -6px;
  color: #736c6c;
}
.unreadNum {
  float: left;
  width: 100%;
}
.icon-style {
  display: inline-block;
  background-color: #f04134;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: white;
  line-height: 1.5;
  text-align: center;
}
.emoji-style {
  width: 22px;
  float: left;
}
.img-style {
  max-width: 350px;
}
.time-style {
  clear: both;
  margin-left: 2px;
  margin-top: 3px;
  font-size: 12px;
  color: #888c98;
  position: absolute;
  right: 5px;
}
.file-style {
  width: 240px;
  margin: 2px 2px 2px 0;
  font-size: 13px;
  h2 {
    border-bottom: 1px solid #e0e0e0;
    font-weight: 300;
    text-align: left;
  }
  h3 {
    max-width: 100%;
    font-size: 15px;
    height: 20px;
    line-height: 20px;
    font-weight: 600;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
    margin-bottom: 20px;
  }
  .bottom {
    span {
      color: #999999;
      text-align: left;
    }
  }
  a {
    color: #999999;
    float: right;
    text-decoration: none;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

  .el-menu-vertical-demo {
    width: 100%;
  }
}
</style>
