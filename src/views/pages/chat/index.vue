<template>
  <a-layout style="position: absolute;
	width: 100%;
	overflow: hidden;
	height: 100%;">
    <a-layout>
      <a-layout-sider
        v-model="collapsed"
        style="background: #fff"
        :width="broken ? '100%' : 350"
        breakpoint="lg"
        collapsed-width="0"
        :trigger="null"
        @collapse="onCollapse">
        <div style="lineHeight: 50px; background: #434648; color: #fff; textAlign: left; padding-left: 20px;">
          <a-icon type="user" class="navMenu-icon" />
          <span class="navMenu-text">联系人</span>
        </div>
        <MessageBox ref="messageBox" :type="activeKey" :select="select" />
      </a-layout-sider>

      <a-layout-content style="height: 100vh;">
        <Message
          ref="messageList"
          :type="activeKey"
          :broken="broken"
          :hide-user-list="hideUserList"
          :show-user-list="showUserList"
          :signal="false"
          @show_add_member_modal="show_add_member_modal" />

        <!-- <AddFriend ref="addFriendMethods" />
        <GetFriendRequest /> -->
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import WebIM from '../../../utils/WebIM';
import MessageBox from '../../../components/chat/index.vue';
import Message from '../../../components/chat/message.vue';
// import AddFriend from '../../../components/addModal/addFriend.vue';
// import GetFriendRequest from '../../../components/addModal/getFriendRequest.vue';

import './index.scss';
import { mapState, mapActions } from 'vuex';
const rtc = WebIM.rtc;
export default {
  data () {
    return {
      activedType: {
        contact: '',
      },
      contactRead: false,
      showSettingOptions: false,
      activeKey: 'contact',
      selectedItem: '',
      showAddOptions: false,
      nowIsVideo: false,
      addList: [
        {
          name: '添加好友',
          id: '1',
          icon: 'chat',
        },
        {
          name: '申请入群',
          id: '2',
          icon: 'friends',
        },
        {
          name: '创建群组',
          id: '3',
          icon: 'comment',
        },
      ],
      userName:
        localStorage.getItem('userInfo') &&
        JSON.parse(localStorage.getItem('userInfo')).userId,
      collapsed: false,
      broken: true,
      current: ['contact'],

      showAlert: false,
    };
  },
  computed: {
    chatList () {
      return this.$store.state.chat.msgList;
    },
    // 显隐主叫弹窗
    showCall () {
      const { confr, callStatus } = this.$store.state.agora;
      let bool = !!([1, 3, 5, 6, 7].includes(callStatus) && typeof confr.type == 'number' && confr.type < 2);
      return bool;
    },
    showConfr () {
      const { confr, callStatus } = this.$store.state.agora;
      return !!((confr.type === 2 && [0, 3, 5, 6, 7].includes(callStatus)));
    },
  },
  mounted () {
    console.log('broken', this.broken);
  },
  methods: {
    ...mapActions(['onLogout', 'initChatState', 'updateConfr', 'setCallStatus', 'hangup', 'cancelCall']),
    toLogout () {
      this.onLogout();
      this.initChatState();
    },
    onCollapse (collapsed, type) {
      if (type != 'responsive') {
        this.$data.collapsed = true;
      }
      else {
        this.$data.collapsed = false;
      }
    },
    onBreakpoint (broken) {
      console.log('onBreakpoint', broken);
      this.$data.broken = broken;
    },
    changeIsVideoState (v) {
      v ? (this.$data.nowIsVideo = true) : (this.$data.nowIsVideo = false);
    },

    EmediaModalFun (tos, callType) {
      // callType: 0 1v1音频, 1 1v1视频, 2 多人
      this.invite(tos, callType, this.$data.activeKey);
    },
    show_add_member_modal () {
      this.$refs.addAvMembertModal.show();
    },
    hideUserList () {
      this.$data.collapsed = true;
    },
    showUserList () {
      this.$data.collapsed = false;
    },
    select (i) {
      this.$refs.messageList.select(i);
      if (this.broken) {
        this.$data.collapsed = true;
      }
    },

    optionsVisibleChange () {
      this.$data.showSettingOptions = !this.$data.showSettingOptions;
    },
    contactTypeChange (type) {
      this.$data.activeKey = type.key;
      this.$router.push(`/${type.key}`);
      if (this.broken && this.collapsed) {
        this.$data.collapsed = false;
      }

      switch (type.key) {
      case 'contact':
        this.$refs.messageBox.onGetContactUserList();
        break;
      default:
        break;
      }
      this.$refs.messageList.getCurrentMsg(type.key);
    },
    addModalChange () {
      this.$data.showAddOptions = !this.$data.showAddOptions;
    },
    ulClick (i) {
      // this.addModalChange();
      switch (i) {
      case '1':
        this.$refs.addFriendMethods.changeModal();
        break;
      default:
        break;
      }
    },
    getUnread (type) {
      const chatList = this.chatList[type];
      let obj = {
        contact: false,
      };
      if (JSON.stringify(chatList) != '{}') {
        for (const item in chatList) {
          chatList[item].map((v, k) => {
            if (v.status === 'unread') {
              if (v.chatType === 'contact') {
                obj.contact = true;
              }
            }
            return obj;
          });
        }
      }
      return {
        contact: obj.contact,
      };
    },
  },
  components: {
    MessageBox,
    Message,
    // AddFriend,
    // GetFriendRequest,
  },
};
</script>
