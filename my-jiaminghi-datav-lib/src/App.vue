<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <LibTest/>
  </div>
</template>

<script>
import LibTest from './components/lib-test.vue';

export default {
  name: 'app',
  components: {
    LibTest,
  },
};
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
