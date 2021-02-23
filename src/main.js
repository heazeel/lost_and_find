/*
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-01-29 20:40:09
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-02-18 14:53:12
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import * as tools from './utils/tools'
import VueAMap from 'vue-amap';

Vue.use(Antd)
Vue.prototype.$tools = tools;
Vue.config.productionTip = false;

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '92f07f724434faa134a57c532d2fb5ef',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
