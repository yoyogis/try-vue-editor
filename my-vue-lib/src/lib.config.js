const components = [
  {
    title: '自由布局',
    tag: 'LayoutFree',
    isLayout: true,
    props: [
      {
        title: '背景色',
        name: 'background',
        type: 'color',
      },
      {
        title: '分块',
        name: 'parts',
      },
    ],
    slots: ['title-slot'],
    events: ['click', 'change'],
    actions: [{
      method: 'changeColor',
      name: '修改颜色',
    }],
  },
  {
    title: '测试组件',
    tag: 'TestComp',
    props: [
      {
        title: '文字颜色',
        name: 'color',
        type: 'color',
      },
    ],
  },
];
const name = 'My-Vue-Lib';
export default {
  name,
  components,
};
