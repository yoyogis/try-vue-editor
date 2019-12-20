<template>
    <div>
        <button @click="updateProps">确定</button>
        <div v-if="metadata&&metadata.props">
            <div v-for="prop of metadata.props" :key="prop.name">
                {{prop.title}}:
                <input v-model='config[prop.name]' />
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['value', 'metadata'],
  data() {
    return {
      config: {},
    };
  },
  mounted() {
    if (this.metadata && this.metadata.props) {
      for (let i = 0; i < this.metadata.props.length; i++) {
        const propDefine = this.metadata.props[i];
        this.config[propDefine.name] = propDefine.default;
      }
    }
  },
  watch: {
    value: {
      handler() {
        this.config = this.value.config;
      },
      immediate: true,
    },
  },
  methods: {
    updateProps() {
      this.$emit('input', { config: this.config });
    },
  },
};
</script>
