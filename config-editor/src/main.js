import Vue from 'vue';
import iview from 'iview';
import 'iview/dist/styles/iview.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import myVueLib from 'myVueLib';
// 此处代码应为注册组件库时生成
// eslint-disable-next-line import/no-extraneous-dependencies
import myJiaminghiDatavLib from 'myJiaminghiDatavLib';

import VueDragDrop from 'vue-drag-drop';

import App from './App.vue';
import router from './router';

Vue.use(VueDragDrop);
Vue.prototype.$libs = {
  myVueLib, myJiaminghiDatavLib,
};
Vue.prototype.$instances = {};
Vue.config.productionTip = false;
Vue.use(iview);
Vue.use(myVueLib);
Vue.use(myJiaminghiDatavLib);

new Vue({
  router,
  data: {
    editor: {},
  },
  render: h => h(App),
}).$mount('#app');
