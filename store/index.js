import Vue from 'vue'
import Vuex from 'vuex'

import student from './modules/student'

Vue.use(Vuex)

const state = {
	request_number:0
}

const mutations = {
	setRequestNumber(state, num) {
		state.request_number = num
	}
}

const actions = {
	requestNumber({commit}, num){
		commit('setRequestNumber', num)
	}
}

const getters = {
	request_number: state => state.request_number,
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    student
  }
})

export default store
