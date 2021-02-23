<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-01-29 21:51:15
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-02-18 15:50:31
-->
<template>
  <div id="home-content">
    <ListCard v-if="!($store.state.showMap)" />
    <Amap v-if="$store.state.showMap" />
  </div>
</template>
<script>
import Amap from './components/amap'
import ListCard from './components/listCard'
export default {
  name: 'Content',
  components: {
    Amap,
    ListCard
  },
  data() {
    return {
      showType: 1, // 0代表列表模式， 1代表地图模式
    }
  },
}
</script>
<style lang="scss" scoped>
#home-content{
  overflow: hidden;
  position: relative;
  max-width: 2968px;
  padding: 0px 10px 0px 20px;
  // margin-bottom: 20px;
  transition: all 0.3s ease;
}
</style>
