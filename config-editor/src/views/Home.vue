<template>
  <div class="home">
    <Layout>
      <Header>
        <Input style="width:250px; margin-right:12px" v-model="currentExtLib"/>
        <Button @click="importExtLib">导入组件库</Button>
      </Header>
      <Layout>
        <Sider hide-trigger>
          <Collapse>
              <Panel v-for="(val) of allLibs" :key="val.name">
                  {{val.libConfig.name}}
                  <div slot="content">
                    <div v-for="comp of val.libConfig.components" :key="comp.tag">
                      <drag :transfer-data="comp">
                        {{comp.title}}&lt;{{comp.tag}}&gt;
                      </drag>
                    </div>
                  </div>
              </Panel>
          </Collapse>
        </Sider>
        <Content>
          <container v-if="config" :config="config" :metadata="allLibsMap"
          @on-component-select="onSelectComponent"></container>
          <drop v-else @drop="onDropComponent" class="editor-root-drop"></drop>
        </Content>
        <Sider v-if="editingConfig" :config="editingConfig" :metadata="allLibsMap">Sider</Sider>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  </div>
</template>
<style lang="less">
  .editor-root-drop{
    width: 100%;
    height: 100%;
    background: wheat
  }
</style>
<script>
import Vue from 'vue';
import container from './config-edit/container.vue';

export default {
  name: 'home',
  data() {
    return {
      allLibs: this.$libs,
      config: null,
      editingConfig: null,
      currentExtLib: '',
    };
  },
  components: {
    container,
  },

  computed: {
    allLibsMap() {
      console.log(this.$libs);
      const allLibsMap = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const key in this.allLibs) {
        // eslint-disable-next-line no-prototype-builtins
        if (this.allLibs.hasOwnProperty(key)) {
          const lib = this.allLibs[key];
          const { components } = lib.libConfig;
          // eslint-disable-next-line no-plusplus
          for (let j = 0; j < components.length; j++) {
            const component = components[j];
            allLibsMap[component.tag] = component;
          }
        }
      }
      return allLibsMap;
    },
  },
  methods: {
    onDropComponent(comp) {
      if (!this.config) {
        this.config = {
          id: `${Math.random()}`,
          tag: comp.tag,
          children: [],
        };
      }
    },
    onSelectComponent(config) {
      this.editingConfig = config;
    },
    importExtLib() {
      // eslint-disable-next-line no-undef
      window.System.import(this.currentExtLib).then((data) => {
        const lib = data.default.default;
        Vue.set(Vue.prototype.$libs, lib.libConfig.name, lib);
        Vue.use(lib);
        console.log(data);
      });
    },
  },
};
</script>
