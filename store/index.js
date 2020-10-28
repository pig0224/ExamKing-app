import Vue from 'vue'
import Vuex from 'vuex'

import student from './modules/student'

Vue.use(Vuex)

const state = {}

const mutations = {}

const actions = {}

const getters = {}

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
