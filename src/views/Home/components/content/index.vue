<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-01-29 21:51:15
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-03-25 15:05:51
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
};
</script>
<style lang="scss" scoped>
#home-content{
  overflow: hidden;
  position: relative;
  max-width: 2968px;
  // padding: 0px 10px 0px 20px;
  // margin-bottom: 20px;
  transition: all 0.3s ease;
}
</style>
