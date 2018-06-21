import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        message: "Rollup + Vue"
    },
    getters: {
        message: state => state.message
    }
})