import { waterLevelPond, flylineChart, fullScreenContainer } from '@jiaminghi/data-view';
import libConfig from './lib.config';

function install(Vue) {
  Vue.use(waterLevelPond);
  Vue.use(flylineChart);
  Vue.use(fullScreenContainer);
}

export default { install, libConfig };
