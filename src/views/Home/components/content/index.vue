<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-01-29 21:51:15
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-19 21:36:27
-->
<template>
  <div id="home-content">
    <!-- <ListCard v-show="!($store.state.showMap)" />
    <Amap v-show="$store.state.showMap" /> -->
    <CreateModal />
    <router-view></router-view>
  </div>
</template>
<script>
import CreateModal from './components/createModal';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'Content',
  components: {
    CreateModal,
  },
  data () {
    return {
      showType: 1, // 0代表列表模式， 1代表地图模式
    };
  },
  mounted () {
    this.login();
  },
  methods: {
    ...mapActions(['onLogin', 'setRegisterFlag', 'onRegister']),
    login () {
      if (localStorage.getItem('userInfo') != '') {
        this.onLogin({
          username: JSON.parse(localStorage.getItem('userInfo')).userId,
          password: JSON.parse(localStorage.getItem('userInfo')).password,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#home-content{
  overflow: auto;
  position: relative;
  max-width: 2968px;
  background-color: #FFF;
  transition: all 0.3s ease;
}
</style>
