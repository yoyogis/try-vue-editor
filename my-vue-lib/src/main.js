import Vue from 'vue';
import App from './App.vue';
import router from './router';
import lib from './index';


Vue.config.productionTip = false;
Vue.use(lib);

new Vue({
  router,
  data: {
    editor: {},
  },
  render: h => h(App),
}).$mount('#app');
