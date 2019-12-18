import Vue from 'vue';
import iview from 'iview';
import 'iview/dist/styles/iview.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import myVueLib from 'myVueLib';

import VueDragDrop from 'vue-drag-drop';

import App from './App.vue';
import router from './router';

Vue.use(VueDragDrop);

Vue.prototype.$libs = { myVueLib };
Vue.config.productionTip = false;
Vue.use(iview);
Vue.use(myVueLib);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
