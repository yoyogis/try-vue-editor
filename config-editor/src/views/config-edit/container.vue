<template>
  <div>
    {{config.tag}}
    <Icon type="md-close" @click="removeComponet" />
    <component
      ref="instance"
      :is="config.tag"
      :isEditing="true"
      @on-dynamic-slot-change="onDynamicSlotChange"
    >
      {{config.text}}
      <template v-if="config.children">
          <h2>has children:{{config.children}}</h2>
        <template v-for="node in config.children">
            <container v-if="node.slot" :slot="node.slot" :config="node" :key="node.id"
            :metadata="metadata" @on-remove-component="removeFromParent"></container>
            <container v-else :config="node" :key="node.id"
            :metadata="metadata" @on-remove-component="removeFromParent"></container>
        </template>
      </template>
      <template v-for="item of slots">
          <container :key="item.name" v-if="item.config" :config="item.config" :slot="item.name"
          :metadata="metadata" @on-remove-component="removeFromParent"></container>
          <SlotPlaceHolder :key="item.name" :slotName="item.name" v-else
            @onAddedComponent="onAddComponent" :slot="item.name"></SlotPlaceHolder>
      </template>
    </component>
  </div>
</template>
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
    slots() {
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
  created() {},
  methods: {
    onDynamicSlotChange(dynamicSlots) {
      this.dynamicSlots = dynamicSlots;
    },

    onAddComponent(event) {
      console.log(4, event.tag);
      this.config.children = this.config.children || [];
      this.config.children.push({
        tag: event.tag, slot: event.slot, children: [],
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
  },
};
</script>
