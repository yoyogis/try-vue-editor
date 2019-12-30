import {
  waterLevelPond, flylineChart, fullScreenContainer, conicalColumnChart,
} from '@jiaminghi/data-view';
import libConfig from './lib.config';

function install(Vue) {
  Vue.use(waterLevelPond);
  Vue.use(flylineChart);
  Vue.use(fullScreenContainer);
  Vue.use(conicalColumnChart);
}

export default { install, libConfig };
