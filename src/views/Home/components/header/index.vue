<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-01-29 21:51:15
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-03-25 12:15:12
-->
<template>
  <div id="home-header">
    <a-layout-header>
      <div id="head">
        <img
          id="logo"
          src="../../../../assets/imgs/logo.png"
          alt="">
        <Login v-if="account == null" />
        <PersonInfo v-if="account !== null" />
      </div>
      <a-divider />
      <Search />
      <FilterBtn />
    </a-layout-header>
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
    this.account = localStorage.getItem('account');
  },
};
</script>
<style lang="scss" scoped>
#home-header{
  box-shadow: 0px 2px 2px #F2F2F2;
  transition: all 0.3s ease;
  .ant-layout-header{
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
}
</style>
