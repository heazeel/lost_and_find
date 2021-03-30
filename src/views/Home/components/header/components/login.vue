<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-01-29 22:50:32
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-03-04 21:18:06
-->
<template>
  <div id="login">
    <a-button>登录</a-button>
    <a-button type="primary">
      注册
    </a-button>
  </div>
</template>
<script>
export default {

};
</script>
<style lang="scss" scoped>
#login{
  .ant-btn{
    width: 66px;
    height: 32px;
    border-radius: 16px;
    font-size: 14px;
    font-weight: bold;
  }
  .ant-btn-primary{
    margin-left: 10px;
    background-color: $mainColor;
  }
}
</style>
