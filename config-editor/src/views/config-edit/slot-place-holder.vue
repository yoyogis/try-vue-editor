<template>
    <drop class="slot-place-holder" @drop="onDrop"></drop>
</template>
<style lang="less">
    .slot-place-holder{
        width: 100%;
        height: 100%;
        min-width: 20px;
        min-height: 20px;
        background: #ffffff;
        background-image: linear-gradient(#AEB4C1 1px, transparent 0),
        linear-gradient(90deg, #AEB4C1 1px, transparent 0);
        background-size:5px 5px;
    }
</style>
<script>
export default {
  props: ['slotName'],
  methods: {
    onDrop(component) {
      console.log(component);
      this.$emit('onAddedComponent', { tag: component.tag, slot: this.slotName });
    },
  },
};
</script>
