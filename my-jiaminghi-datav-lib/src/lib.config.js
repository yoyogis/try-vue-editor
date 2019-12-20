const components = [
  {
    title: '全屏容器',
    tag: 'dv-full-screen-container',
    isLayout: true,
    slots: ['default'],
  },
  {
    title: '水位图',
    tag: 'dv-water-level-pond',
    isLayout: false,
    props: [
      {
        title: '数据',
        name: 'data',
        type: 'code',
        default: [60, 45],
      },
      {
        title: '形状',
        name: 'shape',
        type: 'string',
        default: 'roundRect',
      },
    ],
    slots: [],
    events: [],
  },
  {
    title: '飞线图',
    tag: 'dv-flyline-chart',
    props: [
      {
        title: '目标点',
        name: 'centerPoint',
        type: 'code',
        default: [0.48, 0.35],
      },
      {
        title: '出发点',
        name: 'points',
        type: 'code',
        default: [[0.52, 0.23],
          [0.43, 0.29],
          [0.59, 0.35],
          [0.53, 0.47],
          [0.45, 0.54],
          [0.36, 0.38],
          [0.62, 0.55],
          [0.56, 0.56],
          [0.37, 0.66],
          [0.55, 0.81],
          [0.55, 0.67],
          [0.37, 0.29],
          [0.20, 0.36],
          [0.76, 0.41],
          [0.59, 0.18],
          [0.68, 0.17],
          [0.59, 0.10]],
      },
      {
        title: '背景图',
        name: 'bgImgUrl',
        type: 'string',
        default: '/img/flylineChart/map.jpg',
      },
    ],
  },
];
const propEditor = {
  default: {
    tag: 'jiaminghi-datav-prop-editor',
  },
};
const name = 'My-Vue-Lib';
export default {
  name,
  components,
  propEditor,
};
