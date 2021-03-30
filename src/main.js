/*
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-01-29 20:40:09
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-03-05 17:58:37
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import * as tools from './utils/tools';
import VueAMap from 'vue-amap';
import axios from 'axios';

Vue.use(Antd);
Vue.prototype.$tools = tools;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios; // 把axios挂载到vue的原型中，在vue中每个组件都可以使用axios发送请求
Vue.prototype.HOME = '/api'; // 重要在于这里，Vue.prototype.HOME = '/api'是一个定值，默认指向localhost，所有修改指向路径为'/api'，配置文件index.js定义的可跨域路径

// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//   key: 'c423465b034a57736dbadac129438cef',
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   // 默认高德 sdk 版本为 1.4.4
//   v: '1.4.4',
// });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
