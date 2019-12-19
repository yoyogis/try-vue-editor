<template>
    <div>
        <h1>测试LayoutFree</h1>
        <LayoutFree v-model="config">
            <LayoutFree v-model="config1" slot="part1"></LayoutFree>
            <LayoutFree v-model="config2" slot="slot1"></LayoutFree>
        </LayoutFree>
    </div>
</template>

<script>
import LayoutFree from './layout-free.vue';

export default {
  data() {
    return {
      config: {
        tag: 'LayoutFree',
        children: [],
      },
      config1: {
        tag: 'LayoutFree',
        children: [],
      },
      config2: {
        tag: 'LayoutFree',
        children: [],
      },
    };
  },
  components: {
    LayoutFree,
  },
};
</script>
