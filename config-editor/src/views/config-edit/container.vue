<template>
  <div style="width:100%;height:100%">
    <component
      ref="instance"
      :is="config.tag"
      :isEditing="true"
      v-bind="config.props"
      style="width:100%;height:100%"
      @on-dynamic-slot-change="onDynamicSlotChange"
      @on-slot-resize="onSlotResize"
      @on-select-slot="onSelectSlot"
    >
      {{config.text}}
      <template v-if="config.children">
        <template v-for="node in config.children">
            <container v-if="node.slot" :slot="node.slot" :config="node" :key="node.id"
            :metadata="metadata" @on-remove-component="removeFromParent"
            @on-component-select="onSelectComponent" ></container>
            <container v-else :config="node" :key="node.id"
            :metadata="metadata" @on-remove-component="removeFromParent"
            @on-component-select="onSelectComponent"></container>
        </template>
      </template>
      <template v-for="item of emptySlots">
          <SlotPlaceHolder :key="item.name" :slotName="item.name"
            @onAddedComponent="onAddComponent" :slot="item.name"></SlotPlaceHolder>
      </template>
    </component>
    <div class="float">
          {{config.tag}}
            <Icon type="md-close" @click="removeComponet" />
      </div>
  </div>
</template>
<style lang="less" scoped>
    .float{
        position: absolute;
    }
</style>
<script>
import SlotPlaceHolder from './slot-place-holder.vue';

export default {
  name: 'container',
  components: {
    SlotPlaceHolder,
  },
  props: {
    config: {
      type: Object,
      default() {
        return {
          children: [],
        };
      },
    },
    metadata: {
      type: Object,
    },
  },
  data() {
    return {
      props: {},
      events: {},
      dynamicSlots: [],
    };
  },
  computed: {
    emptySlots() {
      const result = [];
      const definedSlots = this.metadata[this.config.tag] && this.metadata[this.config.tag].slots;
      if (definedSlots) {
        for (let i = 0; i < definedSlots.length; i++) {
          const name = definedSlots[i];
          const config = (this.config.children
            && this.config.children.find(child => child.slot === name));
          if (!config) {
            result.push({ name });
          }
        }
      }
      if (this.dynamicSlots) {
        for (let i = 0; i < this.dynamicSlots.length; i++) {
          const name = this.dynamicSlots[i];
          const config = this.config.children
            && this.config.children.find(child => child.slot === name);
          if (!config) {
            result.push({ name });
          }
        }
      }
      return result;
    },
  },
  created() {
    // 此处逻辑应转移到每个组件的配置编辑组件中
    if (!this.config.props && this.metadata[this.config.tag].props) {
      this.config.props = { config: {} };
      for (let i = 0; i < this.metadata[this.config.tag].props.length; i++) {
        const prop = this.metadata[this.config.tag].props[i];
        this.config.props.config[prop.name] = prop.default;
      }
    }
  },
  mounted() {
    this.$instances[this.config.id] = this.$refs.instance;
  },
  methods: {
    // 容器组件发出的事件
    onDynamicSlotChange(dynamicSlots) {
      this.dynamicSlots = dynamicSlots;
    },
    // 容器组件发出的事件
    onSlotResize() {
      for (let i = 0; i < this.config.children.length; i++) {
        const child = this.config.children[i];
        const instance = this.$instances[child.id];
        const resizeMethodName = this.metadata[child.tag].resizeMethod;
        if (resizeMethodName && instance[resizeMethodName]) {
          setTimeout(() => {
            instance[resizeMethodName].call(instance);
          }, 0);
        }
      }
    },

    onAddComponent(event) {
      console.log(4, event.tag);
      this.config.children = this.config.children || [];
      this.config.children.push({
        tag: event.tag, slot: event.slot, children: [], id: `${Math.random()}`,
      });
    },

    removeComponet() {
      this.$emit('on-remove-component', this.config);
    },

    removeFromParent(child) {
      if (this.config.children) {
        this.config.children.splice(this.config.children.indexOf(child), 1);
      }
    },

    onSelectSlot(slotName) {
      const componentConfig = this.children && this.children
        .find(c => c.slot && c.slot === slotName);
      this.onSelectComponent(componentConfig);
    },

    onSelectComponent(componentConfig) {
      this.$emit('on-component-select', componentConfig);
    },
  },
};
</script>
