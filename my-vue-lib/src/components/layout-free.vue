/* eslint-disable no-param-reassign */
<template>
  <div>
    <h1>Layout Free {{isEditing}}</h1>
    <div>
        <Button @click="addSlot">添加布局块</Button>
    </div>
    <slot name="title-slot">Title slot</slot>
    <div ref="canvas" class="canvas">
        <Moveable class="moveable" v-for="item of parts" v-bind="moveable" :key="item"
        style="width:200px; height:200px"
        :container="$refs.canvas"
        @drag="handleDrag"
        @resize="handleResize"
        @scale="handleScale"
        @rotate="handleRotate"
        @warp="handleWarp"
        @pinch="handlePinch">
            <span class="moveable-node">
                <slot :name="item">
                    <h3>{{item}}</h3>
                </slot>
            </span>
        </Moveable>
    </div>
  </div>
</template>
<style lang="less">
    .canvas{
        width: 500px;
        height: 600px;
        background: wheat;
        position: relative;
    }
    .moveable{
        position: absolute;
    }
    .moveable-node{
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
<script>
import Moveable from 'vue-moveable';

export default {
  components: {
    Moveable,
  },
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
        return [];
      },
    },
  },
  data() {
    return {
      slotToadd: 0,
      moveable: {
        draggable: true,
        throttleDrag: 0,
        resizable: true,
        throttleResize: 1,
        keepRatio: false,
        scalable: false,
        throttleScale: 0,
        rotatable: true,
        throttleRotate: 0,
        pinchable: true, // ["draggable", "resizable", "scalable", "rotatable"]
        origin: false,
        scrollable: true,
        dragArea: true,
        snappable: true,
        bounds: {
          left: 0, bottom: 0, top: 0, right: 0,
        },
      },
    };
  },

  mounted() {
    this.moveable.bounds.left = this.$refs.canvas.clientLeft;
    this.moveable.bounds.top = this.$refs.canvas.clientTop;
    this.moveable.bounds.bottom = this.moveable.bounds.top + 600;
    this.moveable.bounds.right = this.moveable.bounds.left + 500;
    this.parts.push('part1');
    this.parts.push('part2');
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
    addSlot(data) {
      // eslint-disable-next-line prefer-rest-params
      console.log(data, arguments);
      // eslint-disable-next-line no-plusplus
      this.parts.push(`slot${this.slotToadd++}`);
    },
    onDropComponent(value) {
      console.log(value);
    },
    handleDrag({ target, transform }) {
      console.log('onDrag left, top', transform);
      // eslint-disable-next-line no-param-reassign
      target.style.transform = transform;
    },
    handleResize({
      target, width, height, delta,
    }) {
      console.log('onResize', width, height);
      // eslint-disable-next-line no-unused-expressions,no-param-reassign
      delta[0] && (target.style.width = `${width}px`);
      // eslint-disable-next-line no-unused-expressions,no-param-reassign
      delta[1] && (target.style.height = `${height}px`);
    },
    handleScale({ target, transform, scale }) {
      console.log('onScale scale', scale);
      // eslint-disable-next-line no-param-reassign
      target.style.transform = transform;
    },
    handleRotate({ target, dist, transform }) {
      console.log('onRotate', dist);
      // eslint-disable-next-line no-param-reassign
      target.style.transform = transform;
    },
    handleWarp({ target, transform }) {
      console.log('onWarp', transform);
      // eslint-disable-next-line no-param-reassign
      target.style.transform = transform;
    },
    handlePinch({ target }) {
      console.log('onPinch', target);
    },
  },
};
</script>
