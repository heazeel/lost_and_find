<!--
 * @Description: 高德地图
 * @Author: hezhijie
 * @Date: 2021-03-04 18:15:42
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-04 19:37:34
-->
<template>
  <!-- <div id="amap-container" class="amap-wrapper">
    <ControlBtn @changeMapType="changeMapType" />
    <Drawer :visible="visible" :detail-data="detailData" @close="closeDrawer" />
  </div> -->
  <div class="amap-wrapper">
    <el-amap ref="map"
      vid="amapDemo"
      :amap-manager="amapManager"
      :center="center"
      :zoom="zoom"
      :zooms="[15, 20]"
      :events="events"
      :plugin="plugin"
      :expand-zoom-range="true"
      class="amap-demo">
      <el-amap-marker v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
        :events="marker.events"
        :vid="index"></el-amap-marker>
      <el-amap-info-window v-if="window"
        :position="window.position"
        :visible="window.visible"
        :offset="[0, -30]"
        :auto-move="true"
        :show-shadow="false"
        :close-when-click-map="true">
        <div :style="slotStyle">
          <b>{{ window.content.title }}</b>
          <button @click="showDetail(window.content)">
            Add
          </button>
        </div>
      </el-amap-info-window>
      <el-amap-polygon v-for="(polygon, index) in polygons"
        :key="index"
        :ref="`polygon_${index}`"
        :fill-opacity="0"
        stroke-color="#FF0000"
        :vid="index"
        :path="polygon.path"
        :draggable="polygon.draggable"
        :events="polygon.events"></el-amap-polygon>
    </el-amap>
    <Drawer :visible="visible" :detail-data="detailData" @close="closeDrawer" />
  </div>
</template>
<script>
// import {lazyAMapApiLoaderInstance, AMapUI} from 'vue-amap';
// import AMapUI from 'AMapUI';
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap';
let amapManager = new AMapManager();
import ControlBtn from './controlBtn';
import { get } from '@/api/axios'; // 导入http中创建的axios实例
export default {
  name: 'Amap',
  components: {
    Drawer: () => import('./drawer'),
  },
  data () {
    return {
      map: null,
      visible: false,
      itemArr: this.$store.state.goodsItem.itemArr,
      markers: [],
      windows: [],
      window: '',
      detailData: {
        photos: '',
      },
      amapManager,
      zoom: 16,
      center: [120.016282, 30.292866],
      events: {
        // init: (o) => {
        //   console.log(o.getCenter());
        //   console.log(this.$refs.map.$$getInstance());
        //   o.getCity(result => {
        //     console.log(result);
        //   });
        // },
        // 'moveend': () => {
        // },
        // 'zoomchange': () => {
        // },
        // click: (e) => {
        //   alert('map clicked');
        // }
      },
      plugin: [{
        pName: 'MapType',
        defaultType: 1,
        showTrafic: false,
        events: {
          init (o) {
            console.log(o);
          },
        },
      }],
      slotStyle: {
        padding: '2px 8px',
        background: '#eee',
        color: '#333',
        border: '1px solid #aaa',
      },
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
            // click: () => {
            //   alert('click polygon');
            //   console.log(amapManager.getComponent(0));
            //   console.log(this.$refs.map.$$getCenter());
            //   console.log(this.$refs.polygon_0[0].$$getPath());
            // },
          },
        },
      ],
    };
  },
  created () {
    this.init();
  },
  mounted () {
    let markers = [];
    let windows = [];

    let self = this;

    this.itemArr.forEach((item, index) => {
      markers.push({
        position: item.positionLngLat.split(','),
        events: {
          click () {
            self.windows.forEach(window => {
              window.visible = false;
            });

            self.window = self.windows[index];
            self.$nextTick(() => {
              self.window.visible = true;
            });
          },
        },
      });

      windows.push({
        position: item.positionLngLat.split(','),
        content: item,
        visible: false,
      });
    });

    this.markers = markers;
    this.windows = windows;
  },
  methods: {
    async init () {
      const url = this.HOME + '/goods';
      const res = await get(url, { ...this.$store.state.goodsItem.searchCriteria });
      this.$store.commit('setGoodsItem', res.content);
      this.itemArr = this.$store.state.goodsItem.itemArr;
    },
    showDetail (value) {
      this.visible = true;
      this.detailData = value;
    },
    closeDrawer () {
      this.visible = false;
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
