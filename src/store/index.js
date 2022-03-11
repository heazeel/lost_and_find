/*
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-01-29 20:40:09
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-21 11:25:28
 */
import Vue from 'vue';
import Vuex from 'vuex';
import Login from './login';
import Chat from './chat';
import FriendModule from './friendModule';
import { get } from '@/api/axios'; // 导入http中创建的axios实例

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showMap: false,
    switchBtnName: '列表模式',
    modal: {
      modalVisible: false,
      modelTitle: '发布失物招领',
      createOrUpdate: 'create',
      itemData: null,
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
        userId: null,
      },
    },
    spinning: false,
  },
  mutations: {
    changeSpinStatus (state, data) {
      state.spinning = data;
    },
    setSearchCriteria (state, data) {
      // state.goodsItem.searchCriteria = JSON.parse(JSON.stringify(data));
      Object.assign(state.goodsItem.searchCriteria, data);
    },
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
      if (data !== null) {
        state.modal.modalTitle = data.formType == 'find' ? '寻物启事' : '失物招领';
        state.modal.createOrUpdate = data.createOrUpdate;
        if (data.itemData) {
          state.modal.itemData = data.itemData;
        }
      } else {
        state.modal.modelTitle = '失物招领';
        state.modal.createOrUpdate = 'create';
        state.modal.itemData = null;
      }
    },
    setGoodsItem (state, data) {
      if (Array.isArray(data)) {
        state.goodsItem.itemArr = data;
      }
    },
  },
  actions: {
    async init (context) {
      context.commit('changeSpinStatus', true);
      const url = '/goods';
      let searchCriteria = JSON.parse(JSON.stringify(context.state.goodsItem.searchCriteria));
      const res = await get(url, { ...searchCriteria });
      context.commit('setGoodsItem', res.content);
      context.commit('changeSpinStatus', false);
    },
  },
  modules: {
    login: Login,
    chat: Chat,
    friendModule: FriendModule,
  },
});
