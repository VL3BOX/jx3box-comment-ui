import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import frames from "@jx3box/jx3box-common/data/user_avatar_frame.json";

// 默认仓储
let store = {
    state: {
        frames
    },
    mutations: {
    },
    getters: {},
    actions: {},
    modules: {},
};

export default new Vuex.Store(store);
