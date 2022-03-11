<!--
 * @Description: spin
 * @Author: hezhijie
 * @Date: 2021-04-09 20:57:13
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-10 01:21:33
-->
<template>
  <div class="span-container">
    <a-spin tip="Loading..." size="large" />
  </div>
</template>
<script>
export default {
  name: 'Span',
  data () {
    return {
      spinning: false,
    };
  },
};
</script>
<style scoped>
.span-container {
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
