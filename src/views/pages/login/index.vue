<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-04-07 18:26:15
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-07 18:28:46
-->

<template>
  <el-container>
    <div class="login">
      <div class="login-panel">
        <div class="logo">
          Web IM
        </div>
        <van-cell-group>
          <van-field v-model="username" equired placeholder="用户名" />
          <van-field v-model="password"
            type="password"
            placeholder="密码"
            required
            @keyup.13="toLogin" />
          <van-field v-show="this.isRegister == true" v-model="nickname" placeholder="昵称" />
        </van-cell-group>
        <van-button v-if="this.isRegister == true" type="default" @click="toRegister">
          注册
        </van-button>
        <van-button v-else type="default" @click="toLogin">
          登录
        </van-button>
      </div>
      <p v-if="this.isRegister == true" class="tip">
        已有账号?
        <span class="green" @click="changeType">去登录</span>
      </p>
      <p v-else class="tip">
        没有账号?
        <span class="green" @click="changeType">注册</span>
      </p>
    </div>
  </el-container>
</template>

<script>
import './index.less';
import { mapState, mapActions } from 'vuex';
const userInfo = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'));
export default {
  components: {},
  data () {
    return {
      username: userInfo.userId || '',
      password: userInfo.password || '',
      nickname: '',
    };
  },
  computed: {
    isRegister () {
      return this.$store.state.login.isRegister;
    },
  },
  mounted: function () {
    const path = this.isRegister ? '/register' : '/login';

    if (path !== location.pathname) {
      this.$router.push(path);
    }
  },
  methods: {
    ...mapActions(['onLogin', 'setRegisterFlag', 'onRegister']),
    toLogin () {
      this.onLogin({
        username: this.username.toLowerCase(),
        password: this.password,
      });
    },
    toRegister () {
      this.onRegister({
        username: this.username.toLowerCase(),
        password: this.password,
        nickname: this.nickname.toLowerCase(),
      });
    },
    changeType () {
      this.setRegisterFlag(!this.isRegister);
    },
  },
};
</script>
