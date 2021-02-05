<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-01-29 21:51:15
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-02-01 01:48:03
-->
<template>
  <div id="home-header">
    <a-layout-header>
      <div id="head">
        <img
          id="logo"
          src="../../../../assets/imgs/logo.png"
          alt=""
        >
        <Login />
      </div>
      <a-divider />
      <Search />
      <FilterBtn />
      <a-divider />
    </a-layout-header>
  </div>
</template>
<script>
import Login from './components/login'
import Search from './components/search'
import FilterBtn from './components/filterBtn'
export default {
  name: 'Header',
  components: {
    Login,
    Search,
    FilterBtn
  }
}
</script>
<style lang="scss" scoped>
#home-header{
  .ant-layout-header{
    height: auto;
    width: 100%;
    background-color: white;
    box-shadow: 0px 2px 2px #F2F2F2;
    #head{
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px 0 30px;
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
    }
    #filter-btn{
      margin-bottom: 20px;
    }
  }
}
</style>
