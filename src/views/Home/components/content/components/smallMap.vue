<!--
 * @Description: 高德地图
 * @Author: hezhijie
 * @Date: 2021-03-04 18:15:42
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-21 02:17:14
-->
<template>
  <div class="amap-wrapper">
    <el-amap ref="map"
      vid="smallMap"
      :amap-manager="amapManager"
      :center="center"
      :zoom="15"
      :zooms="[15, 20]"
      :events="events"
      :plugin="plugin"
      :expand-zoom-range="true"
      class="amap-demo">
      <el-amap-marker v-for="(marker, index) in markers"
        :key="`marker${index}`"
        :position="marker.position"
        :vid="`marker${index}`"></el-amap-marker>
      <el-amap-polygon v-for="(polygon, index) in polygons"
        :key="`polygon${index}`"
        :ref="`polygon_${index}`"
        :fill-opacity="0"
        stroke-color="#FF0000"
        :vid="`polygon${index}`"
        :path="polygon.path"
        :draggable="polygon.draggable"
        :events="polygon.events"></el-amap-polygon>
    </el-amap>
  </div>
</template>
<script>
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap';
let amapManager = new AMapManager();
export default {
  name: 'SmallMap',
  props: {
    lngLat: {
      type: Array,
      default: () => { []; },
    },
  },
  data () {
    let vm = this;
    return {
      amapManager,
      center: [120.016282, 30.292866],
      markers: [],
      events: {
        click: (e) => {
          vm.$message.warning('请在指定范围内标注点！');
        },
      },
      plugin: [{
        pName: 'MapType',
        defaultType: 0,
        showTrafic: false,
        events: {
          init (o) {
            console.log(o);
          },
        },
      }],
      polygons: [
        {
          draggable: false,
          path: [
            [120.004499, 30.290223],
            [120.012689, 30.293738],
            [120.011602, 30.297256],
            [120.023401, 30.300292],
            [120.024026, 30.297135],
            [120.026119, 30.291341],
            [120.019795, 30.289399],
            [120.019738, 30.289527],
            [120.019644, 30.289581],
            [120.019299, 30.289488],
            [120.019362, 30.28931],
            [120.015955, 30.288397],
            [120.015834, 30.288695],
            [120.014873, 30.288511],
            [120.014971, 30.288094],
            [120.007323, 30.285862],
          ],
          events: {
            click: (e) => {
              let { lng, lat } = e.lnglat;
              vm.setMarker(lng, lat);
              vm.$emit('getLngLat', lng, lat);
              vm.center = [lng, lat];
            },
          },
        },
      ],
    };
  },
  mounted () {
    console.log(this.lngLat);
    if (this.lngLat && this.lngLat.length != 0) {
      this.markers = [{
        position: this.lngLat,
      }];
    }
  },
  methods: {
    setMarker (lng, lat) {
      this.markers = [{
        position: [lng, lat],
      }];
    },
  },
};
</script>
<style lang="scss" scoped>
.amap-wrapper {
  width: 100%;
  height: 100%;
}
</style>
