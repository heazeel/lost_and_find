<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-02-18 16:20:32
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-03-04 21:26:55
-->
<template>
  <div>
    <div class="tips-container">
      <h1>创建账户</h1>
      <div class="create-account">
        <span>已有账户？</span>
        <a @click="$store.commit('goToCreateAccount')">登录</a>
      </div>
    </div>
    <a-form
      :form="form"
      auto-complete="off">
      <a-form-item
        label="电子邮件地址"
        :label-col="{span: 6, offset: 0 }"
        :wrapper-col="{ span: 24, offset: 0}"
        style="margin-bottom: 20px;">
        <a-input
          v-decorator="['email', validatorRules.email]"
          placeholder="输入常用的电子邮件地址" />
      </a-form-item>
      <a-form-item
        label="电话号码"
        :label-col="{span: 4, offset: 0 }"
        :wrapper-col="{ span: 24, offset: 0}"
        style="margin-bottom: 20px;">
        <a-input
          v-decorator="['phone', validatorRules.phone]"
          placeholder="输入常用的11位电话号码" />
      </a-form-item>
      <a-form-item
        label="姓名"
        :label-col="{span: 3, offset: 0 }"
        :wrapper-col="{ span: 24, offset: 0}"
        style="margin-bottom: 20px;">
        <a-input
          v-decorator="['username', validatorRules.username]"
          placeholder="建议输入真实姓名，便于其他人联系您" />
      </a-form-item>
      <a-form-item
        label="密码"
        :label-col="{span: 3, offset: 0 }"
        :wrapper-col="{ span: 24, offset: 0}"
        style="margin-bottom: 40px;">
        <a-input-password
          v-decorator="['credential', validatorRules.credential]"
          placeholder="至少包含大小写字母、数字、符号中的三个" />
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
export default {
  data () {
    return {
      delivery: false,
      loading: false,
      validatorRules: {
        email: { rules: [{ type: 'email', message: '电子邮件格式错误！' }, { required: true, message: '请输入电子邮件地址!' }] },
        phone: { rules: [{ required: true, message: '请输入电话号码' }, { validator: this.phoneCheck }] },
        username: { rules: [{ required: true, message: '请输入姓名' }] },
        credential: { rules: [{ required: true, message: '请输入密码' }] },
      },
    };
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        if (errors === null) {
          this.register(values);
        }
      });
    },
    async register (values) {
      var url = this.HOME + '/user';
      this.loading = true;
      const res = await post(url, { ...values, identityType: '邮箱', _method: 'PUT' });
      this.loading = false;
      if (res.code === 200) {
        this.$message.success('注册成功，三秒后跳转登录页！');
        setTimeout(() => {
          this.$store.commit('goToCreateAccount');
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
  },
};
</script>
<style lang="scss" scoped>

</style>
