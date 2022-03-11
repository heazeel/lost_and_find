<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-02-18 16:20:32
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-21 13:05:04
-->
<template>
  <div class="login-and-register-container">
    <div class="tips-container">
      <div class="title-name">
        创建账户
      </div>
      <div class="create-account">
        <span>已有账户？</span>
        <router-link to="account">
          登录
        </router-link>
      </div>
    </div>
    <a-form
      :form="form"
      layout="vertical"
      auto-complete="off">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon type="phone" />
            手机号
          </span>
          <a-form-item
            label="电话号码"
            style="margin-bottom: 20px; margin-top: 10px;">
            <a-input
              v-decorator="['phone', validatorRules.phone]"
              placeholder="输入常用的11位电话号码" />
            <!-- <a-input-search v-decorator="['phone', validatorRules.phone]"
              placeholder="输入常用的11位电话号码"
              size="default"
              @search="sendCode('phone')">
              <a-button slot="enterButton" :disabled="sendCodeBtnStatus" style="border-radius: 10px;">
                {{ btnText }}
              </a-button>
            </a-input-search> -->
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <a-icon type="mail" />
            电子邮件
          </span>
          <a-form-item
            label="电子邮件地址"
            style="margin-bottom: 20px; margin-top: 10px;">
            <a-input
              v-decorator="['email', validatorRules.email]"
              placeholder="输入常用的电子邮件地址" />
            <!-- <a-input-search v-decorator="['email', validatorRules.email]"
              placeholder="输入常用的电子邮件地址"
              size="default"
              @search="sendCode('email')">
              <a-button slot="enterButton" :disabled="sendCodeBtnStatus" style="border-radius: 10px;">
                {{ btnText }}
              </a-button>
            </a-input-search> -->
          </a-form-item>
        </a-tab-pane>
      </a-tabs>
      <!-- <a-form-item
        label="验证码"
        style="margin-bottom: 20px;">
        <a-input
          v-decorator="['code', validatorRules.code]"
          placeholder="输入10字符以内的昵称" />
      </a-form-item> -->
      <a-form-item
        label="昵称"
        style="margin-bottom: 20px;">
        <a-input
          v-decorator="['username', validatorRules.username]"
          placeholder="输入10字符以内的昵称" />
      </a-form-item>
      <a-form-item
        label="密码"
        style="margin-bottom: 20px;">
        <a-input-password
          v-decorator="['credential', validatorRules.credential]"
          placeholder="至少包含大小写字母、数字、符号中的三个" />
      </a-form-item>
      <a-form-item
        label="确认密码"
        style="margin-bottom: 40px;">
        <a-input-password
          v-decorator="['credentialAgain', validatorRules.credentialAgain]"
          placeholder="再次输入密码" />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          style="border-radius: 100px; width: 95px; background-color: #1473E6; font-weight: bold; letter-spacing: 0px; float: right"
          :loading="loading"
          @click="handleSubmit">
          创建账户
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { post } from '@/api/axios'; // 导入http中创建的axios实例
import { mapState, mapActions } from 'vuex';
export default {
  data () {
    return {
      delivery: false,
      loading: false,
      sendCodeBtnStatus: false,
      btnText: '发送验证码',
      localCode: null,
      validatorRules: {
        // email: { rules: [{ type: 'email', message: '电子邮件格式错误！' }, { required: true, message: '请输入电子邮件地址!' }] },
        // phone: { rules: [{ required: true, message: '请输入电话号码' }, { validator: this.phoneCheck }] },
        email: { rules: [{ type: 'email', message: '电子邮件格式错误！' }] },
        phone: { rules: [{ validator: this.phoneCheck }] },
        code: { rules: [{ required: true, message: '请输入验证码' }, { validator: this.codeCheck }]},
        username: { rules: [{ required: true, message: '请输入姓名' }] },
        credential: { rules: [{ required: true, message: '请输入密码' }] },
        credentialAgain: { rules: [{ required: true, message: '请再次输入密码' }, { validator: this.passwordCheck }]},
      },
    };
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    ...mapActions(['onRegister']),
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        if (errors === null) {
          this.register(values);
        }
      });
    },
    async register (values) {
      var url = '/user';
      this.loading = true;
      const res = await post(url, { ...values, identityType: '邮箱', _method: 'PUT' });
      this.loading = false;
      if (res.code === 200) {
        // 环信注册
        this.onRegister({
          username: res.content,
          password: values.credential,
          nickname: '',
        });
        this.$message.success('注册成功，三秒后跳转登录页！');
        setTimeout(() => {
          this.$router.push('account');
        }, 3000);
      }
    },
    phoneCheck (rule, value, callback) {
      const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (value !== '') {
        if (!reg.test(value)) {
          callback('请输入正确的手机号码');
          return;
        }
      }
      callback();
    },
    passwordCheck (rule, value, callback) {
      if (value !== '') {
        let pass = this.form.getFieldValue('credential');
        if (value != pass) {
          callback('两次密码不一致');
          return;
        }
      }
      callback();
    },
    // codeCheck (rule, value, callback) {
    //   if (value !== '') {
    //     if (value != this.localCode) {
    //       callback('验证码错误');
    //       return;
    //     }
    //   }
    //   callback();
    // },
    // async sendCode (type) {
    //   let url = '/sendEmail';
    //   let count = 5;
    //   let self = this;
    //   this.btnText = `重新发送（${count}）`;
    //   this.sendCodeBtnStatus = true;
    //   let timer = setInterval(() => {
    //     if (count!=0) {
    //       count = count - 1;
    //       self.btnText = `重新发送（${count}）`;
    //     }
    //     else {
    //       clearInterval(timer);
    //       timer = null;
    //       self.btnText = '发送验证码';
    //       self.sendCodeBtnStatus = false;
    //     }
    //   }, 1000);
    //   const res = await post(url, { email: this.form.getFieldValue('email') });
    //   if (res.code == 200) {
    //     this.localCode = res.content;
    //   }
    //   console.log(this.localCode);
    // },
  },
};
</script>
<style lang="scss" scoped>

</style>
