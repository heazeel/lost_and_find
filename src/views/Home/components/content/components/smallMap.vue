<!--
 * @Description: 小地图
 * @Author: hezhijie
 * @Date: 2021-03-04 23:53:04
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-03-29 23:45:38
-->
<template>
  <div id="smallMap-container" class="smallMap-wrapper">
    <ControlBtn @changeMapType="changeMapType" />
  </div>
</template>
<script>
import ControlBtn from './controlBtn';
import {lazyAMapApiLoaderInstance} from 'vue-amap';
/* eslint-disable */
const layer1 = new AMap.TileLayer();
const layer2 = new AMap.TileLayer.Satellite();
export default {
  name: 'SmallMap',
  data () {
    let self = this;
    return {
      markerArr: [],
    };
  },
  components: {
    ControlBtn,
  },
  mounted () {
    this.initMap();
    this.getLngLat();
  },
  methods: {
    initMap () {
      this.map = new AMap.Map('smallMap-container', {
        center: new AMap.LngLat(120.017137, 30.292295),
        zoom: 15,
        expandZoomRange: true,
        zooms: [14, 20],
      });
      this.map.add(layer2);
      this.markArea();
    },
    markArea(){
      var schoolArea = [
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
        [120.007323, 30.285862]
      ]
      this.polygon = new AMap.Polygon({
        path: schoolArea,
        fillColor: '#fff', // 多边形填充颜色
        fillOpacity: 0,
        strokeWeight: 2, // 线条宽度，默认为 1
        strokeColor: 'red', // 线条颜色
      });
      this.map.add(this.polygon);
    },
    changeMapType(key){
      switch (key) {
        case '0':
          layer2.hide();
          break;
        case '1':
          layer2.show();
          break;
        default:
          break;
      }
    },
    marker (lng, lat) {
      this.map.remove(this.markerArr);
      this.markerArr.length = 0;
      
      var icon = new AMap.Icon({
        size: new AMap.Size(18, 25), // 图标尺寸
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png', // Icon的图像
        imageOffset: new AMap.Pixel(0, 0), // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new AMap.Size(18, 25), // 根据所设置的大小拉伸或压缩图片
      });

      var marker = new AMap.Marker({
        // icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        icon: icon,
        anchor: 'bottom-center', // 设置锚点
        position: [lng, lat],
        offset: new AMap.Pixel(0, 0),
      });

      var circle = new AMap.Circle({
        center: [lng, lat],  // 圆心位置
        radius: 10, // 圆半径
        fillColor: '#1791fc',   // 圆形填充颜色
        fillOpacity: 0.4,
        strokeColor: '#fff', // 描边颜色
        strokeWeight: 2, // 描边宽度
      });

      this.markerArr.push(marker);
      this.markerArr.push(circle);

      this.map.add(this.markerArr)
    },
    getLngLat () {
      var self = this;
      console.log('getLngLat', this.map)
      this.map.on('click', function (e) {
        console.log(e.lnglat.getLng() + ',' + e.lnglat.getLat());
        console.log(self.polygon.contains([e.lnglat.getLng(), e.lnglat.getLat()]));
        if(!self.polygon.contains([e.lnglat.getLng(), e.lnglat.getLat()])){
          self.$message.warning('请在指定范围内标注位置！');
        }
      });
      this.polygon.on('click', function(e){
        self.marker(e.lnglat.getLng(), e.lnglat.getLat());
        self.$emit('getLngLat', e.lnglat.getLng(), e.lnglat.getLat());
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.smallMap-wrapper {
  width: 100%;
  height: 100%;
}
</style>

