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
    resizeMethod: 'init',
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
    resizeMethod: 'debounceInitWHFun',
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
        default: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576931169144&di=ae132b2735daf0eb651ab9150c7f84cb&imgtype=0&src=http%3A%2F%2F211.159.149.56%3A8080%2Fmap%2F64%2F4o28b0625501ad13015501ad2bfc0045.jpg',
      },
    ],
  },
  {
    title: '锥形柱图',
    tag: 'dv-conical-column-chart',
    resizeMethod: 'debounceInitWHFun',
    props: [
      {
        title: '图标',
        name: 'img',
        type: 'code',
        default: [
          '/img/conicalColumnChart/1st.png',
          '/img/conicalColumnChart/2st.png',
          '/img/conicalColumnChart/3st.png',
          '/img/conicalColumnChart/4st.png',
          '/img/conicalColumnChart/5st.png',
          '/img/conicalColumnChart/6st.png',
          '/img/conicalColumnChart/7st.png',
        ],
      },
      {
        title: '是否显示值',
        name: 'showValue',
        type: 'boolean',
        default: true,
      },
      {
        title: '数据',
        name: 'data',
        type: 'code',
        default: [
          {
            name: '周口',
            value: 55,
          },
          {
            name: '南阳',
            value: 120,
          },
          {
            name: '西峡',
            value: 71,
          },
          {
            name: '驻马店',
            value: 66,
          },
          {
            name: '新乡',
            value: 80,
          },
          {
            name: '信阳',
            value: 35,
          },
          {
            name: '漯河',
            value: 15,
          },
        ],
      },
    ],
  },
];
const propEditor = {
  default: {
    tag: 'jiaminghi-datav-prop-editor',
  },
};
const name = 'My-JiaMingHi-Datav-Lib';
export default {
  name,
  components,
  propEditor,
};
