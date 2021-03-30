<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-01-29 21:51:15
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-02-18 14:26:49
-->
<template>
  <div id="home-footer">
    <a-layout-footer>Footer</a-layout-footer>
  </div>
</template>
<script>
export default {
  name: 'Footer',
};
</script>
<style lang="scss" scoped>
#home-footer{
  box-shadow: 0px -2px 8px 1px #CCC;
  .ant-layout-footer{
    height: 35px;
    width: 100%;
    background-color: white;
  }
}
</style>
