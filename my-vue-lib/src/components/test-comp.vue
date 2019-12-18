<template>
  <div>
    <h1 v-bind:style="{color:color}">Test Components {{isEditing}}</h1>
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
      default: '#000000',
    },
  },
};
</script>
