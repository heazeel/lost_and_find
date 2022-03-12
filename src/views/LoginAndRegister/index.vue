<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-02-18 16:21:55
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-21 10:34:06
-->
<template>
  <div class="login-and-register">
    <div class="background">
      <img
        class="login-logo"
        src="https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/login-logo.png"
      />
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoginAndRegister",
  data() {
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
.fade-enter,
.fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
.login-and-register {
  width: 100%;
  height: 100%;
  background-image: url("https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/TomHegen.jpg");
  background-size: cover;
  .background {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    .login-logo {
      width: 300px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 20%;
      margin: auto;
    }
    .login-and-register-container {
      ::v-deep .tips-container {
        font-size: 16px;
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .title-name {
          font-size: 35px;
          font-weight: bold;
          margin-bottom: 20px;
        }
      }
      ::v-deep .ant-form-explain {
        width: fit-content;
        width: -moz-fit-content;
      }
      ::v-deep .ant-form-item-label {
        line-height: 20px;
      }
      ::v-deep .ant-form-item-control {
        input {
          border-top: 0px;
          border-left: 0px;
          border-right: 0px;
          border-radius: 0;
          &:focus {
            box-shadow: none;
          }
        }
      }
      ::v-deep .ant-tabs {
        margin-top: -15px;
        .ant-tabs-nav-wrap {
          .ant-tabs-nav-scroll {
            display: flex;
            justify-content: flex-start;
            .ant-tabs-tab:hover {
              color: $mainColor;
            }
            .ant-tabs-tab-active {
              color: $mainColor;
            }
            .ant-tabs-ink-bar {
              background-color: $mainColor;
            }
          }
        }
      }
      padding: 50px;
      width: 510px;
      height: fit-content;
      height: -moz-fit-content;
      position: absolute;
      right: 20%;
      // top: 0;
      // bottom: 0;
      // margin: auto;
      border: 1px solid #000;
      border-radius: 5px;
      background-color: #fff;
    }
  }
}
</style>
