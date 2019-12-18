import Vue from 'vue';
import VueDragDrop from 'vue-drag-drop';
import App from './App.vue';

Vue.use(VueDragDrop);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
