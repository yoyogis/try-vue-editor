<template>
  <div class="home">
    <Layout>
      <Header>
        <Button>创建</Button>
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
          <container v-if="config" :config="config" :metadata="allLibsMap"></container>
          <drop v-else @drop="onDropComponent" class="editor-root-drop"></drop>
        </Content>
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
import container from './config-edit/container.vue';

export default {
  name: 'home',
  data() {
    return {
      allLibs: this.$libs,
      allLibsMap: {},
      config: null,
    };
  },
  components: {
    container,
  },
  created() {
    console.log(this.$libs);
    // eslint-disable-next-line no-restricted-syntax
    for (const key in this.allLibs) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.allLibs.hasOwnProperty(key)) {
        const lib = this.allLibs[key];
        const { components } = lib.libConfig;
        // eslint-disable-next-line no-plusplus
        for (let j = 0; j < components.length; j++) {
          const component = components[j];
          this.allLibsMap[component.tag] = component;
        }
      }
    }
  },
  methods: {
    onDropComponent(comp) {
      if (!this.config) {
        this.config = {
          tag: comp.tag,
          children: [],
        };
      }
    },
  },
};
</script>
