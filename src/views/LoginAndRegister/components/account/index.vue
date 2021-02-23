<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-02-23 16:20:41
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-02-23 20:02:41
-->
<template>
  <div class="login-content">
    <div class="tips-container">
      <h1>登录</h1>
      <div class="create-account">
        <span>新用户？</span>
        <a @click="$store.commit('goToCreateAccount')">创建账户</a>
      </div>
    </div>
    <a-form
      :form="form"
    >
      <a-form-item
        label="电子邮件地址"
        :label-col="{span: 6, offset: 0 }"
        :wrapper-col="{ span: 24, offset: 0}"
        style="margin-bottom: 40px;"
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
        />
      </a-form-item>
      <!-- <a-form-item
      label="是否为管理员"
      prop="delivery"
      :label-col="{span: 6, offset: 0 }"
      :wrapper-col="{ span: 3, offset: 15}"
    >
      <a-switch v-model="delivery" />
    </a-form-item> -->
      <a-form-item
        :wrapper-col="{ span: 5, offset: 19 }"
      >
        <a-button
          type="primary"
          style="border-radius: 100px; width: 72px; background-color: #1473E6; font-weight: bold; letter-spacing: -1px;"
          @click="$store.commit('goToInputPassword')"
        >
          继续
        </a-button>
      </a-form-item>
      <a-divider>或者</a-divider>
      <a-form-item>
        <a-button
          icon="phone"
          type="primary"
          style="border-radius: 100px; width: 100%; height: 56px; margin-bottom: 20px; color: #505050; background-color: #FFF; border-color: #eaeaea; box-shadow: none; font-size: 15px; font-weight: bold;"
        >
          继续使用手机号
        </a-button>
        <a-button
          icon="wechat"
          type="primary"
          style="border-radius: 100px; width: 100%; height: 56px; margin-bottom: 20px; background-color: #3B5998; border-color: #3B5998; box-shadow: none; font-size: 15px; font-weight: bold;"
        >
          继续使用微信
        </a-button>
        <a-button
          icon="qq"
          type="primary"
          style="color: white; border-radius: 100px; width: 100%; height: 56px; background-color: #000; border-color: #000; box-shadow: none; font-size: 15px; font-weight: bold;"
        >
          继续使用QQ
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
