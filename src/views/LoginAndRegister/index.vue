<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-02-18 16:21:55
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-03-03 17:13:17
-->
<template>
  <div class="login-and-register">
    <div class="background">
      <img
        class="login-logo"
        src="../../assets/imgs/login-logo.png">
      <transition name="fade">
        <div
          v-if="!$store.state.loginPage.createAccount && !$store.state.loginPage.inputPassword"
          class="login-and-register-container">
          <Account />
        </div>
      </transition>
      <transition name="fade">
        <div
          v-if="!$store.state.loginPage.createAccount && $store.state.loginPage.inputPassword"
          class="login-and-register-container">
          <Password />
        </div>
      </transition>
      <transition name="fade">
        <div
          v-if="$store.state.loginPage.createAccount"
          class="login-and-register-container">
          <Register />
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import Account from './components/account/index';
import Password from './components/password/index';
import Register from './components/register/index';
export default {
  name: 'LoginAndRegister',
  components: {
    Account,
    Password,
    Register,
  },
  data () {
    return {
      isLogin: true,
      isRegister: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.fade-enter-active {
  transition: all 0.5s ease;
}
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter, .fade-leave-to{
  transform: translateX(50px);
  opacity: 0;
}
.login-and-register{
  width: 100%;
  height: 100%;
  background-image: url('../../assets/imgs/TomHegen.jpg');
  background-size: cover;
  .background{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    .login-logo{
      width: 300px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 20%;
      margin: auto;
    }
    .login-and-register-container{
      /deep/ .tips-container{
        width: fit-content;
        font-size: 16px;
        margin-bottom: 30px;
        h1{
          width: fit-content;
          font-size: 35px;
          font-weight: bold;
        }
        .create-account{
          width: fit-content;
          margin: 10px 0;
        }
      }
      /deep/ .ant-form-explain{
        width: fit-content;
      }
      /deep/ .ant-form-item-label{
        line-height: 20px;
      }
      /deep/ .ant-form-item-control{
        input{
          border-top: 0px;
          border-left: 0px;
          border-right: 0px;
          border-radius: 0;
          &:focus{
            box-shadow: none;
          }
        }
      }
      padding: 50px;
      width: 510px;
      height: fit-content;
      position: absolute;
      right: 20%;
      top: 0;
      bottom: 0;
      margin: auto;
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      // align-items: center;
      border: 1px solid #000;
      border-radius: 5px;
      background-color: #FFF;
    }
  }
}
</style>
