<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-01-29 21:51:15
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-21 10:34:33
-->
<template>
  <div id="home-header">
    <div id="head">
      <img
        id="logo"
        src="https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/logo.png"
        alt="">
      <Login v-if="account == null" />
      <PersonInfo v-if="account !== null" />
    </div>
    <a-divider />
    <Search />
    <FilterBtn />
  </div>
</template>
<script>
import Login from './components/login';
import PersonInfo from './components/personInfo';
import Search from './components/search';
import FilterBtn from './components/filterBtn';
export default {
  name: 'Header',
  components: {
    Login,
    PersonInfo,
    Search,
    FilterBtn,
  },
  data () {
    return {
      account: null,
    };
  },
  mounted () {
    this.account = localStorage.getItem('userId');
  },
};
</script>
<style lang="scss" scoped>
#home-header{
  box-shadow: 0px 2px 2px #F2F2F2;
  transition: all 0.3s ease;
  height: auto;
  width: 100%;
  background-color: white;
  transition: all 0.3s ease;
  #head{
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px 0 30px;
    z-index: 999;
    // overflow: hidden;
    #logo{
      width: 270px;
      height: auto;
    }
    #login{
      height: fit-content;
      height: -moz-fit-content;
    }
  }
  #search{
    margin: 20px 0 20px 0;
    z-index: 1;
  }
  #filter-btn{
    margin-bottom: 20px;
  }
}
</style>
