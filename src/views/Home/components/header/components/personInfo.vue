<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-01-29 22:50:57
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-03-05 13:40:48
-->
<template>
  <div id="personInfo">
    <a-dropdown
      placement="bottomRight"
      :trigger="['hover']">
      <a-button>
        发布物品
      </a-button>
      <a-menu slot="overlay" @click="createProject">
        <a-menu-item key="发布失物招领">
          <a>发布失物招领</a>
        </a-menu-item>
        <a-menu-item key="发布寻物启事">
          <a>发布寻物启事</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-badge
      count="99"
      :number-style="{
        fontSize: '10px',
        minWidth: '15px',
        lineHeight: '15px',
        height: '15px',
        padding: '0 4px',
        transform: 'translate(30%, -30%)'
      }">
      <a-button icon="mail" theme="filled" />
    </a-badge>
    <a-badge
      count="5"
      :number-style="{
        fontSize: '10px',
        minWidth: '15px',
        lineHeight: '15px',
        height: '15px',
        padding: '0 4px',
        transform: 'translate(30%, -30%)'
      }">
      <a-button icon="bell" theme="filled" />
    </a-badge>
    <a-popover placement="bottomRight" class="photoPopover">
      <template slot="title">
        <div style="display: flex; align-items: center;">
          <img src="@/assets/imgs/book.png" style="width: 70px; height: 70px; border-radius: 35px; margin: 10px 15px 10px 0px;" />
          <div style="display: flex; flex-direction: column;">
            <span style="font-size: 22px">{{ username }}</span>
            <span style="font-size: 14px">{{ account }}</span>
          </div>
        </div>
      </template>
      <template slot="content">
        <p class="photoPopoverBtn" style="padding: 5px 10px; margin-bottom: 5px;">
          个人资料
        </p>
        <a-divider />
        <p class="photoPopoverBtn" style="padding: 5px 10px; margin-top: 5px;">
          注销
        </p>
      </template>
      <a-button shape="circle" class="photo" />
    </a-popover>
  </div>
</template>
<script>
export default {
  name: 'PersonInfo',
  data () {
    return {
      username: null,
      account: null,
    };
  },
  mounted () {
    this.account = localStorage.getItem('account');
    this.username = localStorage.getItem('username');
  },
  methods: {
    createProject ({ key }) {
      this.$store.commit('showModal', key);
    },
  },
};
</script>
<style lang="scss" scoped>
#personInfo{
  .ant-btn{
    height: 32px;
    border-radius: 16px;
    font-size: 14px;
    font-weight: bold;
    color: #000;
    margin-left: 15px;
    transition: all 0.2s ease;
  }
  .photo{
    width: 32px;
    height: 32px;
    border-radius: 16px;
    background-color: lightcoral;
    background-image: url('../../../../../assets/imgs/book.png');
    background-size: cover;
    background-repeat: no-repeat;
    border: 0px;
    &:hover{
      border-color: none;
    }
  }
}
.photoPopoverBtn{
  border-radius: 2px;
  transition: background-color 0.2s ease;
  &:hover{
    background-color: #f1f1f1;
    cursor: pointer;
  }
}
</style>
