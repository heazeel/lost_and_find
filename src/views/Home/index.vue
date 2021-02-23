<!--
 * @Description: 首页
 * @Author: hezhijie
 * @Date: 2021-01-29 20:40:09
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-02-18 15:10:46
-->
<template>
  <div class="home">
    <a-layout>
      <Header />
      <Content />
      <Footer />
    </a-layout>
  </div>
</template>

<script>

import Header from './components/header/index'
import Content from './components/content/index'
import Footer from './components/footer'

export default {
  name: 'Home',
  components: {
    Header,
    Content,
    Footer
  }
};
</script>
<style lang="scss" scoped>
.home{
  height: 100%;
  width: 100%;
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
    bottom: 35px;
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
