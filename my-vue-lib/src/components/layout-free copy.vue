<template>
  <div>
    <Input v-model="slotToadd"></Input>
    <Button @click="addSlot">添加slot</Button>
    <h1>Layout Free {{isEditing}}</h1>
    <slot name="title-slot"></slot>
    <div>
        <slot v-for="item of parts" :name="item">
            <h3 :key="item">{{item}}</h3>
        </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isEditing: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '#FFFFFF',
    },
    parts: {
      type: Array,
      default() {
        return ['test1', 'test2'];
      },
    },
  },
  data() {
    return {
      slotToadd: '',
    };
  },

  watch: {
    parts: {
      handler() {
        this.$emit('on-dynamic-slot-change', this.parts);
      },
      immediate: true,

    },
  },

  methods: {
    addSlot() {
      if (this.parts.indexOf(this.slotToadd) === -1) {
        this.parts.push(this.slotToadd);
      } else {
        console.warn('不能重复添加同名slot');
      }
    },
    onDropComponent(value) {
      console.log(value);
    },
  },
};
</script>
