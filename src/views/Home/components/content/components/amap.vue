<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-02-18 15:00:22
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-02-18 15:36:42
-->
<template>
  <div
    class="amap-wrapper"
  >
    <el-amap
      class="amap-box"
      :vid="'amap-vue'"
      :expand-zoom-range="true"
      :center="[120.017137,30.292295]"
      :zoom="17"
      :zooms="[3,20]"
    />
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.amap-wrapper {
  width: 100%;
  height: 100%;
}
</style>
