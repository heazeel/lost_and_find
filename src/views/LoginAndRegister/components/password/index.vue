<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-02-23 16:20:47
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-02-23 17:33:34
-->
<template>
  <div class="login-content">
    <div class="tips-container">
      <h1>输入您的密码</h1>
      <div class="info-container">
        <div class="photo" />
        <div class="account-info">
          <span>个人账户</span>
          <span>1520800291@qq.com</span>
        </div>
      </div>
    </div>
    <a-form
      :form="form"
    >
      <a-form-item
        label="密码"
        :label-col="{span: 2, offset: 0 }"
        :wrapper-col="{ span: 24, offset: 0}"
        style="margin-bottom: 40px;"
      >
        <a-input-password />
      </a-form-item>
      <a-form-item
        :wrapper-col="{ span: 24, offset: 0}"
      >
        <div style="width: fit-content; float: left">
          <a-switch v-model="delivery" />
          <span style="margin-left: 10px;">保持登陆状态</span>
        </div>
        <a-button
          type="primary"
          style="border-radius: 100px; width: 72px; background-color: #1473E6; font-weight: bold; letter-spacing: -1px; float: right;"
        >
          继续
        </a-button>
      </a-form-item>
      <a-divider style="margin-top: 120px;" />
      <a-form-item style="margin-top: 20px;">
        <a class="link">重置您的密码</a>
      </a-form-item>
      <a-form-item>
        <a
          class="link"
          @click="$store.commit('goToInputPassword')"
        >登录到其他账户</a>
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
