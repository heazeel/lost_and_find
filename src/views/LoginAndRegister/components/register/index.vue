<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-02-18 16:20:32
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-02-23 13:32:50
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
    >
      <a-form-item
        label="电子邮件地址"
        :label-col="{span: 6, offset: 0 }"
        :wrapper-col="{ span: 24, offset: 0}"
        style="margin-bottom: 20px;"
      >
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  message: '电子邮件格式错误！',
                },
                {
                  required: true,
                  message: '请输入电子邮件地址!',
                },
              ],
            },
          ]"
          placeholder="输入常用的电子邮件地址"
        />
      </a-form-item>
      <a-form-item
        label="电话号码"
        :label-col="{span: 4, offset: 0 }"
        :wrapper-col="{ span: 24, offset: 0}"
        style="margin-bottom: 20px;"
      >
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  message: '电子邮件格式错误！',
                },
                {
                  required: true,
                  message: '请输入电子邮件地址!',
                },
              ],
            },
          ]"
          placeholder="输入常用的电话号码"
        />
      </a-form-item>
      <a-form-item
        label="姓名"
        :label-col="{span: 2, offset: 0 }"
        :wrapper-col="{ span: 24, offset: 0}"
        style="margin-bottom: 20px;"
      >
        <a-input placeholder="建议输入真实姓名，便于其他人联系您" />
      </a-form-item>
      <a-form-item
        label="密码"
        :label-col="{span: 2, offset: 0 }"
        :wrapper-col="{ span: 24, offset: 0}"
        style="margin-bottom: 40px;"
      >
        <a-input-password placeholder="至少包含大小写字母、数字、符号中的三个" />
      </a-form-item>
      <a-form-item
        :wrapper-col="{ span: 6, offset: 18 }"
      >
        <a-button
          type="primary"
          style="border-radius: 100px; width: 95px; background-color: #1473E6; font-weight: bold; letter-spacing: 0px;"
        >
          创建账户
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      delivery: false,
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>

</style>
