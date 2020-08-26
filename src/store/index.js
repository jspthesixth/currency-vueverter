import Vue from 'vue';
import Vuex from 'vuex';
import { isAuthenticated } from '../utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currencyData: [],
    isLoggedIn: false
  },
  mutations: {
    SET_CURRENCY_DATA(state, payload) {
      state.currencyData = payload;
    },
    SET_LOGIN_STATUS(state) {
      if (isAuthenticated()) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    }
  },
  actions: {
    async getCurrencyData({ commit }) {
      const response = await fetch('http://localhost:5000/tecajn/v1');
      const data = await response.json();
      commit('SET_CURRENCY_DATA', data);
    },
    setLoginStatus({ commit }) {
      commit('SET_LOGIN_STATUS');
    }
  },
  getters: {
    currencyData: state => state.currencyData,
    loginStatus: state => state.isLoggedIn
  }
});
