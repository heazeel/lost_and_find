<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-02-23 16:20:47
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-21 10:33:31
-->
<template>
  <div class="login-and-register-container">
    <div class="tips-container">
      <div class="title-name">
        输入您的密码
      </div>
      <div class="info-container">
        <div class="photo" />
        <div class="account-info">
          <span>个人账户</span>
          <span>{{ form.account }}</span>
        </div>
      </div>
    </div>
    <a-form
      :form="form">
      <a-form-item
        label="密码"
        :label-col="{span: 2, offset: 0 }"
        :wrapper-col="{ span: 24, offset: 0}"
        style="margin-bottom: 40px;">
        <a-input-password v-model="form.password" @keyup.enter="login" />
      </a-form-item>
      <a-form-item>
        <div style="width: fit-content; width: -moz-fit-content; float: left">
          <a-switch v-model="delivery" />
          <span style="margin-left: 10px;">保持登陆状态</span>
        </div>
        <a-button
          type="primary"
          style="border-radius: 100px; background-color: #1473E6; font-weight: bold; letter-spacing: -1px; float: right;"
          :loading="loading"
          @click="login">
          继续
        </a-button>
      </a-form-item>
      <a-divider style="margin-top: 120px;" />
      <a-form-item style="margin-top: 20px;">
        <a class="link">重置您的密码</a>
      </a-form-item>
      <a-form-item>
        <router-link class="link" to="account">
          登录到其他账户
        </router-link>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { post } from '@/api/axios'; // 导入http中创建的axios实例
import { mapState, mapActions } from 'vuex';
// const userInfo = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'));
export default {
  data () {
    return {
      loading: false,
      delivery: false,
      form: {
        account: null,
        password: null,
      },
      username: 'heazeel',
      password: 'h456827913',
      nickname: '',
    };
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  mounted () {
    this.form.account = sessionStorage.getItem('account');
  },
  methods: {
    ...mapActions(['onLogin', 'setRegisterFlag', 'onRegister']),
    async login () {
      var url = '/user';
      this.loading = true;
      const res = await post(url, { identifier: this.form.account, credential: this.form.password });
      this.loading = false;
      if (res.code === 200) {
        this.$message.success(`欢迎用户 ${this.form.account}!`);
        localStorage.setItem('userId', res.content.userId);
        localStorage.setItem('userName', res.content.userName);
        // 环信登录
        this.onLogin({
          username: res.content.userId,
          password: this.form.password,
        });
        this.$router.push('/home/list');
      } else {
        this.$message.error(res.msg);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.info-container{
  margin: 20px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .photo{
    width: 70px;
    height: 70px;
    border-radius: 35px;
    background-color: red;
  }
  .account-info{
    font-size: 14px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
}
.link{
  float: left;
}
</style>
