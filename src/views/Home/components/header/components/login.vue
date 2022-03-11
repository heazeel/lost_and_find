<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-01-29 22:50:32
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-17 12:47:35
-->
<template>
  <div id="login">
    <a-button @click="$router.push('/account')">
      登录
    </a-button>
    <a-button type="primary" @click="$router.push('/register')">
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
