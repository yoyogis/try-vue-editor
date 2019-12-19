/* eslint-disable guard-for-in */
import VueDragDrop from 'vue-drag-drop';
import VueResize from 'vue-resize';
import LayoutFree from './components/layout-free.vue';
import TestComp from './components/test-comp.vue';
import libConfig from './lib.config';
import 'vue-resize/dist/vue-resize.css';

const components = {
  LayoutFree,
  TestComp,
};

function install(Vue) {
  Vue.use(VueDragDrop);
  Vue.use(VueResize);
  // eslint-disable-next-line no-restricted-syntax
  for (const key in components) {
    Vue.component(key, components[key]);
  }
}

export default { install, libConfig };
