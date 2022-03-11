<!--
 * @Description: 首页
 * @Author: hezhijie
 * @Date: 2021-01-29 20:40:09
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-18 20:44:06
-->
<template>
  <div class="home">
    <a-layout>
      <Header />
      <Content />
      <!-- <Footer /> -->
      <Spin v-show="spinning" />
    </a-layout>
  </div>
</template>

<script>

import Header from './components/header/index';
import Content from './components/content/index';
// import Footer from './components/footer';
import Spin from './components/spin';
export default {
  name: 'Home',
  components: {
    Header,
    Content,
    // Footer,
    Spin,
  },
  computed: {
    spinning () {
      return this.$store.state.spinning;
    },
  },
};
</script>
<style lang="scss" scoped>
.home{
  height: 100%;
  width: 100%;
  background-color: #FFF;
  #home-header{
    width: 100%;
    position: absolute;
    top: 0px;
    z-index: 10;
  }
  #home-content{
    width: 100%;
    position: absolute;
    top: 216px;
    bottom: 0px;
    z-index: 1;
  }
  #home-footer{
    width: 100%;
    position: absolute;
    bottom: 0px;
    z-index: 10;
  }
}
</style>
