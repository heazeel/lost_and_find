<!--
 * @Description: 高德地图
 * @Author: hezhijie
 * @Date: 2021-03-04 18:15:42
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-21 13:31:37
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
        :key="index+1"
        :position="marker.position"
        :events="marker.events"
        :offset="[-15, -30]"
        :vid="index">
        <div :style="{width:'30px', height:'40px'}">
          <img style="width:100%; height:100%; object-fit: contain;" :src="ICON[marker.type]">
        </div>
      </el-amap-marker>
      <el-amap-info-window v-if="window"
        :position="window.position"
        :visible="window.visible"
        :offset="[0, -30]"
        :auto-move="true"
        :show-shadow="false"
        :close-when-click-map="true">
        <div :style="slotStyle">
          <img style="width:300px; height:250px; object-fit: contain; margin-bottom: 10px;" :src="window.content.photos.split(',')[0]">
          <a-descriptions :title="window.content.type" size="small" :column="1">
            <a-descriptions-item label="标题">
              {{ window.content.title }}
            </a-descriptions-item>
            <a-descriptions-item label="区域">
              {{ window.content.positionArea }}
            </a-descriptions-item>
            <a-descriptions-item label="日期">
              {{ window.content.date }}
            </a-descriptions-item>
            <a-descriptions-item>
              <a-button type="primary" @click="showDetail(window.content)">
                查看详情
              </a-button>
            </a-descriptions-item>
          </a-descriptions>
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
import { AMapManager } from 'vue-amap';
import { get } from '@/api/axios'; // 导入http中创建的axios实例
let amapManager = new AMapManager();
const ICON = {
  '证件': 'https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/card.png',
  '钱包': 'https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/moneyBag.png',
  '手机': 'https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/phone.png',
  '钥匙': 'https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/key.png',
  '银行卡': 'https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/card.png',
  '校园卡': 'https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/card.png',
  '手提包': 'https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/handBag.png',
  '笔记本': 'https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/books.png',
  '电脑': 'https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/computer.png',
  '首饰': 'https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/earings.png',
  '衣服': 'https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/cloth.png',
  '耳机': 'https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/airpods.png',
  '相机': 'https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/camera.png',
  '电动车': 'https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/bike.png',
  '自行车': 'https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/bike.png',
  '其他': 'https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/bike.png',
};
export default {
  name: 'Amap',
  components: {
    Drawer: () => import('./drawer'),
  },
  data () {
    return {
      map: null,
      visible: false,
      ICON,
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
        defaultType: 0,
        showTrafic: false,
        events: {
          init (o) {
            console.log(o);
          },
        },
      }],
      slotStyle: {
        padding: '10px 0 0 8px',
        color: '#333',
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
  computed: {
    itemArr () {
      return this.$store.state.goodsItem.itemArr;
    },
  },
  watch: {
    itemArr () {
      this.initData();
    },
  },
  created () {
    this.init();
  },
  mounted () {
    this.initData();
  },
  methods: {
    async init () {
      const url = '/goods';
      const res = await get(url, { ...this.$store.state.goodsItem.searchCriteria });
      this.$store.commit('setGoodsItem', res.content);
      // this.$store.dispatch('init');
    },
    initData () {
      let markers = [];
      let windows = [];

      let self = this;

      this.itemArr.forEach((item, index) => {
        markers.push({
          position: item.positionLngLat.split(','),
          // template: `<div style="background-color: white; width: 30px; height: 30px; background-image: url('../../../../assets/imgs/card.png')"></div>`,
          type: item.type,
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
