/* eslint-disable guard-for-in */
import LayoutFree from './components/layout-free.vue';
import TestComp from './components/test-comp.vue';
import libConfig from './lib.config';

const components = {
  LayoutFree,
  TestComp,
};

function install(Vue) {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in components) {
    Vue.component(key, components[key]);
  }
}

export default { install, libConfig };
