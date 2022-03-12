/*
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-01-29 20:40:09
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-21 13:02:37
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import * as tools from "./utils/tools";
import VueAMap from "vue-amap";
import axios from "axios";
import WebIM from "./utils/WebIM";
// import ElementUI from 'element-ui';
import { Icon } from "vant";

Vue.use(Antd);
Vue.use(Icon);
Vue.prototype.$tools = tools;
Vue.config.productionTip = false;
axios.defaults.baseURL = "http://118.31.59.223:8080/lost-and-find/";
// axios.defaults.baseURL = '/api';
Vue.prototype.HOME = "http://118.31.59.223:8080/lost-and-find/"; // 重要在于这里，Vue.prototype.HOME = '/api'是一个定值，默认指向localhost，所有修改指向路径为'/api'，配置文件index.js定义的可跨域路径
Vue.prototype.$axios = axios; // 把axios挂载到vue的原型中，在vue中每个组件都可以使用axios发送请求

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: "c423465b034a57736dbadac129438cef", // 需要写自己的高德地图key
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor",
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: "1.4.15",
});

window.Vue = new Vue({
  router,
  store,
  WebIM,
  render: (h) => h(App),
}).$mount("#app");
