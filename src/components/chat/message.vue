<template>
  <!-- <div v-show="activedKey[type]!= ''" class="messagebox"> -->
  <div class="messagebox">
    <div class="messagebox-header">
      <!-- <div>{{type}}</div> -->
      <div>
        <a-icon v-if="broken && !signal"
          type="left"
          class="user-goback"
          @click="showUserList" />
        <span>{{ `${activedKey[type].name}` }}</span>
        <a-dropdown v-if="type=='contact'">
          <a class="ant-dropdown-link user-ellipsis" href="#">
            <a-icon type="ellipsis" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item @click="menuClick('2')">
              <a href="javascript:;">删除好友</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>

    <div ref="msgContent" class="messagebox-content">
      <div class="moreMsgs" @click="loadMoreMsgs">
        {{ loadText }}
      </div>
      <div
        v-for="(item,i) in msgList"
        :key="i"
        class="message-group"
        :style="{'float':item.bySelf ? 'right':'left'}">
        <!-- <h4 style="text-align: left;margin:0">
          {{ item.from }}
        </h4> -->
        <!-- 撤回消息 -->
        <div v-if="item.status == 'recall'" class="recallMsg">
          {{ item.msg }}
        </div>
        <div v-if="item.status == 'recall'" class="recallMsg">
          {{ renderTime(item.time) }}
        </div>
        <!-- 撤回消息 end -->
        <a-dropdown
          v-else
          :trigger="['contextmenu']"
          :style="{'float':item.bySelf ? 'right':'left'}"
          :disabled="!item.bySelf">
          <span style="user-select: none">
            <!-- <el-dropdown v-else @command="handleCommand(item)" trigger="click" :style="{'float':item.bySelf ? 'right':'left'}">
            <span class="el-dropdown-link">-->
            <!-- 图片消息 -->
            <!-- <img
              v-if="item.type === 'img'"
              :key="item.msg"
              :src="item.msg?item.msg:''"
              class="img-style" /> -->
            <!-- 文件card -->
            <!-- <div
              v-else-if="item.type==='file'"
              class="file-style"
              :style="{'float':item.bySelf ? 'right':'left'}">
              <el-card :body-style="{ padding: '0px' }">
                <div style="padding: 14px;">
                  <h2>文件</h2>
                  <span>
                    <h3>{{ item.filename }}</h3>
                  </span>
                  <div class="bottom clearfix">
                    <span>{{ readablizeBytes(item.file_length) }}</span>
                    <a :href="item.msg" :download="item.filename">点击下载</a>
                  </div>
                </div>
              </el-card>
            </div> -->
            <!-- 音频消息 -->
            <!-- <div v-else-if="item.type==='audio'" :style="{'float':item.bySelf ? 'right':'left'}">
              <audio :src="item.msg" controls></audio>
            </div> -->
            <!-- 视频消息 -->
            <!-- <div v-else-if="item.type==='video'">
              <video :src="item.msg" width="100%" controls></video>
            </div> -->
            <!-- 聊天消息 -->
            <p
              style="user-select: text"
              :class="{ 'byself': item.bySelf}"
              v-html="renderTxt(item.msg)" />

            <!-- <div v-if="item.bySelf?true:false" class="status">{{status[item.status]}}</div> -->
          </span>
          <!-- <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="a" :disabled="!item.bySelf">撤回</el-dropdown-item>
          </el-dropdown-menu>
          </el-dropdown>-->

          <a-menu slot="overlay">
            <a-menu-item key="1" @click="handleCommand(item)">
              撤回
            </a-menu-item>
          </a-menu>
        </a-dropdown>

        <!-- 聊天时间 -->
        <div
          v-if="item.status !== 'recall'"
          class="time-style"
          :style="{'text-align':item.bySelf ? 'right':'left'}">
          {{ renderTime(item.time) }} {{ item.bySelf?status[item.status]:'' }}
        </div>
      </div>
    </div>
    <div class="messagebox-footer">
      <!-- <div class="footer-icon"> -->
      <!-- 表情组件 -->
      <!-- <ChatEmoji :inp-message="message" @selectEmoji="selectEmoji" /> -->
      <!-- 上传图片组件 -->
      <!-- <UpLoadImage :type="this.type" :chat-id="activedKey[type]" /> -->
      <!-- </div> -->
      <div class="fotter-send">
        <a-input
          ref="txtDom"
          v-model="message"
          equired
          placeholder="消息"
          class="sengTxt"
          style="resize:none"
          @pressEnter="onSendTextMsg" />
        <a-button>发送</a-button>
        <!-- <template /> -->
      </div>
    </div>
  </div>
</template>

<script>
// import ChatEmoji from '../chatEmoji/index.vue';
// import emoji from '../../config/emoji';
// import UpLoadImage from '../upLoadImage/index.vue';
import './index.scss';
import { mapActions, mapGetters } from 'vuex';

import moment from 'moment';
// import _ from 'lodash';


export default {
  components: {
    // ChatEmoji,
    // UpLoadImage,
  },
  props: [
    // 'type', // 聊天类型 contact
    'username', // 选中的聊天对象
    'broken', // 是否适应移动端
    'showUserList',
    'hideUserList',
    'signal',
  ],
  data () {
    return {
      activedKey: {
        contact: '',
      },
      message: '',
      isHttps: window.location.protocol === 'https:',
      loadText: '加载更多',
      status: {
        sending: '发送中',
        sent: '已发送',
        read: '已读',
      },
      nowIsVideo: false,
      type: 'contact',
    };
  },

  beforeMount () {
    if (this.type === 'contact') {
      this.onGetContactUserList();
    }
  },
  updated () {
    // console.log("数据", this.$store);
    this.scollBottom();
  },
  computed: {
    ...mapGetters({
      contact: 'onGetContactUserList',
      msgList: 'onGetCurrentChatObjMsg',
    }),
    userList () {
      return {
        contact: this.contact,
      };
    },
    selectedKeys () {
      return [this.getKey(this.activedKey[this.type]) || ''];
    },
  },
  methods: {
    ...mapActions([
      'onGetContactUserList',
      'onGetCurrentChatObjMsg',
      'onSendText',
      'onCallVideo',
      'onCallVoice',
      'getHistoryMessage',
      'onDelteFirend',
      'recallMessage',
    ]),
    getKey (item, type) {
      let key = '';
      switch (type) {
      case 'contact':
        key = item.name;
        break;
      default:
        break;
      }
      return key;
    },
    getCurrentMsg (props) {
      this.onGetCurrentChatObjMsg({
        type: props,
        id: this.getKey(this.activedKey[props], props),
      });
    },
    select (key) {
      console.log('selectKey', key.name, this.type);
      this.$data.activedKey[this.type] = key;
      const me = this;
      Vue.$data.loadText = '加载更多';

      // if (this.type === 'contact') {
      // this.$router.push({ name: this.type, params: { id: key.name } });
      this.onGetCurrentChatObjMsg({ type: 'contact', id: key.name });
      setTimeout(() => {
        Vue.$store.commit('updateMessageStatus', {
          action: 'oneUserReadMsgs',
          readUser: key.name,
        });
        this.$forceUpdate();
      }, 100);

      if (!this.msgList) {
        console.log('!this.msgList');
        this.getHistoryMessage({ name: key.name, isGroup: false });
      }
      // }
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

    // changeMenus () {
    //   if (this.type === 'contact') {}
    // },
    menuClick (i) {
      this.changeMenus();
      switch (i) {
      case '2':
        this.onDelteFirend({
          userId: this.$data.activedKey[this.type],
          callback: () => {
            this.closeContactMessage();
          },
        });
        break;
      default:
        break;
      }
    },
    onSendTextMsg () {
      if (this.$data.message == '' || this.$data.message == '\n') {
        this.$data.message = '';
        return;
      }
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
      const chatList = this.$store.state.chat.msgList[name];
      let userId = '';
      if (name == 'contact') {
        userId = item.name;
      }
      else {
        userId = item.id;
      }
      const currentMsgs = chatList[userId] || [];
      const lastMsg = currentMsgs.length
        ? currentMsgs[currentMsgs.length - 1].msg
        : '';
      const msgTime = currentMsgs.length
        ? this.renderTime(currentMsgs[currentMsgs.length - 1].time)
        : '';
      return { lastMsg, msgTime };
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
      this.recallMessage({ to: name, message: item });
    },
    closeContactMessage () {
      // 删除好友时关闭当前聊天框
      this.$data.activedKey.contact = '';
    },
  },
};
</script>

<style scoped lang='scss'>
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
}
.moreMsgs {
  background: #eceff1;
  border-radius: 8px;
  cursor: pointer;
	text-align: center;
	padding: 3px;
}
.status {
  display: inline;
  position: relative;
  top: 20px;
  font-size: 12px;
  left: -6px;
  color: #736c6c;
  float: left;
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
}
</style>

