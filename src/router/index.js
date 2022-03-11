/*
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-01-29 20:40:09
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-18 01:53:23
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/LoginAndRegister/index.vue'),
    redirect: {
      name: 'Home',
    },
    children: [
      {
        path: 'account',
        name: 'Account',
        component: () => import(/* webpackChunkName: "Account" */ '../views/LoginAndRegister/components/account/index.vue'),
      },
      {
        path: 'password',
        name: 'Password',
        component: () => import(/* webpackChunkName: "Password" */ '../views/LoginAndRegister/components/password/index.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "Register" */ '../views/LoginAndRegister/components/register/index.vue'),
      },
    ],
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home/index.vue'),
    redirect: {
      name: 'List',
    },
    children: [
      {
        path: 'map',
        name: 'Map',
        component: () => import(/* webpackChunkName: "Map" */ '../views/Home/components/content/components/amap.vue'),
      },
      {
        path: 'list',
        name: 'List',
        component: () => import(/* webpackChunkName: "List" */ '../views/Home/components/content/components/listCard.vue'),
        children: [
          {
            path: 'detail',
            name: 'Detail',
            component: () => import(/* webpackChunkName: "Map" */ '../views/Home/components/content/components/drawer.vue'),
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
