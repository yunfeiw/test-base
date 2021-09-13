import Vue from 'vue'
import Vuex from "../plugin/f-vuex";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        counter: 0
    },
    getters: {
        doubelCounter: (state) => {
            return state.counter * 2
        }
    },
    mutations: {
        add(state) {
            state.counter++
        }
    },
    actions: {
        add({ commit }) {
            setTimeout(() => {
                commit('add')
            })
        }
    }
})