/*
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-01-29 20:40:09
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-03-31 03:29:55
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showMap: false,
    switchBtnName: '列表模式',
    modal: {
      modalVisible: false,
      modelTitle: '发布失物招领',
    },
    loginPage: {
      createAccount: false,
      inputPassword: false,
    },
    goodsItem: {
      itemArr: [],
      searchCriteria: {
        submissionType: 'lost',
        type: null,
        description: null,
        positionArea: null,
        time: null,
      },
    },
  },
  mutations: {
    switchListType (state) {
      state.showMap = !state.showMap;
      if (state.showMap) {
        state.switchBtnName = '地图模式';
      } else {
        state.switchBtnName = '列表模式';
      }
    },
    goToCreateAccount (state) {
      state.loginPage.createAccount = !state.loginPage.createAccount;
    },
    goToInputPassword (state) {
      state.loginPage.inputPassword = !state.loginPage.inputPassword;
    },
    showModal (state, data) {
      state.modal.modalVisible = !state.modal.modalVisible;
      state.modal.modalTitle = data;
    },
    setGoodsItem (state, data) {
      if (Array.isArray(data)) {
        state.goodsItem.itemArr = data;
      }
    },
  },
  actions: {},
  modules: {},
});
