import Vue from "vue";

import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";

Vue.use(Element);
Vue.config.productionTip = false;

import store from "./store";

new Vue({
    store,
    render: (h) => h(App),
}).$mount("#app");
