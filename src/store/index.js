/*
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-01-29 20:40:09
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-02-23 14:34:41
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showMap: true,
    switchBtnName: '地图模式',
    loginPage: {
      createAccount: false,
      inputPassword: false,
    }
  },
  mutations: {
    switchListType(state) {
      state.showMap = !state.showMap;
      if (state.showMap) {
        state.switchBtnName = '地图模式'
      } else {
        state.switchBtnName = '列表模式'
      }
    },
    goToCreateAccount(state) {
      state.loginPage.createAccount = !state.loginPage.createAccount;
    },
    goToInputPassword(state) {
      state.loginPage.inputPassword = !state.loginPage.inputPassword;
    }
  },
  actions: {},
  modules: {}
});
