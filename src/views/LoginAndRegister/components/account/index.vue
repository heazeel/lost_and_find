<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-02-23 16:20:41
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-16 02:38:17
-->
<template>
  <div class="login-and-register-container">
    <div class="tips-container">
      <div class="title-name">
        登录
      </div>
      <div class="create-account">
        <span>新用户？</span>
        <router-link to="register">
          创建账户
        </router-link>
      </div>
    </div>
    <a-form
      :form="form"
      layout="vertical">
      <a-form-item
        :label="labelName"
        style="margin-bottom: 40px;">
        <a-input
          v-model="form.identifier"
          @keyup.enter="btnContinue" />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          style="border-radius: 100px; background-color: #1473E6; font-weight: bold; letter-spacing: -1px; float: right"
          :loading="loading"
          @click="btnContinue">
          继续
        </a-button>
      </a-form-item>
      <a-divider>或者</a-divider>
      <a-form-item>
        <a-button
          :icon="form.identityType == 'mail' ? 'phone' : 'mail'"
          type="primary"
          style="border-radius: 100px; width: 100%; height: 56px; margin-bottom: 20px; color: #505050; background-color: #FFF; border-color: #eaeaea; box-shadow: none; font-size: 15px; font-weight: bold;"
          @click="handleClick">
          {{ buttonOneName }}
        </a-button>
        <a-button
          icon="wechat"
          type="primary"
          style="border-radius: 100px; width: 100%; height: 56px; margin-bottom: 20px; background-color: #3B5998; border-color: #3B5998; box-shadow: none; font-size: 15px; font-weight: bold;">
          使用微信登录
        </a-button>
        <a-button
          icon="qq"
          type="primary"
          style="color: white; border-radius: 100px; width: 100%; height: 56px; background-color: #000; border-color: #000; box-shadow: none; font-size: 15px; font-weight: bold;">
          使用QQ登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { get } from '@/api/axios'; // 导入http中创建的axios实例
export default {
  data () {
    return {
      loading: false,
      labelName: '手机号码：',
      buttonOneName: '使用电子邮件登录',
      form: {
        identityType: 'phone',
        identifier: null,
      },
    };
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'login' });
  },
  methods: {
    handleClick () {
      if (this.form.identityType == 'phone') {
        this.form.identityType = 'mail';
        this.labelName = '电子邮件地址：';
        this.buttonOneName = '使用手机号登录';
      }
      else if (this.form.identityType == 'mail') {
        this.form.identityType = 'phone';
        this.labelName = '手机号码：';
        this.buttonOneName = '使用电子邮件登录';
      }
    },
    async btnContinue () {
      try {
        var url = '/user';
        this.loading = true;
        const res = await get(url, this.form);
        this.loading = false;
        if (res.code === 200) {
          sessionStorage.setItem('account', this.form.identifier);
          this.$router.push('password');
        } else if (res.code === 210) {
          this.$message.error(res.msg);
        }
      } catch (e) {
        this.$message.error(e.msg);
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
