<template>
  <div class="layout-free">
    <div ref="canvas" class="canvas">
      <resize-observer @notify="handleCanvasResize" />
      <template v-for="item of parts">
        <Moveable
          class="moveable"
          :key="item.name"
          v-bind="item===$root.editor.selected?moveable:unmoveable"
          style="width:100px; height:100px"
          :container="$refs.canvas"
          @drag="handleDrag"
          @resize="handleResize"
          @scale="handleScale"
          @rotate="handleRotate"
          @warp="handleWarp"
          @pinch="handlePinch"
        >
          <div
            @dblclick="focuce(arguments[0], item)"
            style="width:100%; height:100%; position: absolute"
          >
            <slot :name="item.name">
              <h3>{{item.name}}</h3>
            </slot>
          </div>
        </Moveable>
      </template>
    </div>
    <div class="float">
      <h1>Layout Free {{isEditing}}</h1>
      <div>
        <Button @click="addSlot">添加布局块</Button>
      </div>
      <slot name="title-slot">Title slot</slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.layout-free {
  width: 100%;
  height: 100%;
  position: relative;
  .canvas {
    background: wheat;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .moveable {
    position: absolute;
  }
  .moveable-node {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .float{
      position: absolute;
      background: springgreen;
  }
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
      selected: null,
      editor: this.$root.editor,
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
        dragArea: false,
        snappable: true,
        bounds: {
          left: 0,
          bottom: 0,
          top: 0,
          right: 0,
        },
      },
      unmoveable: {
        draggable: false,
        throttleDrag: 0,
        resizable: false,
        throttleResize: 1,
        keepRatio: false,
        scalable: false,
        throttleScale: 0,
        rotatable: false,
        throttleRotate: 0,
        pinchable: false, // ["draggable", "resizable", "scalable", "rotatable"]
        origin: false,
        scrollable: false,
      },
    };
  },

  mounted() {
    setTimeout(() => {
      this.moveable.bounds.left = this.$refs.canvas.clientLeft;
      this.moveable.bounds.top = this.$refs.canvas.clientTop;
      this.moveable.bounds.bottom = this.moveable.bounds.top + this.$refs.canvas.clientHeight;
      this.moveable.bounds.right = this.moveable.bounds.left + this.$refs.canvas.clientWidth;
    }, 0);

    // this.parts.push({ name: 'part1' });
    // this.parts.push({ name: 'part2' });
  },

  watch: {
    parts: {
      handler() {
        this.$emit('on-dynamic-slot-change', this.parts.map(v => v.name));
      },
      immediate: true,
    },
  },

  methods: {
    addSlot(data) {
      // eslint-disable-next-line prefer-rest-params
      console.log(data, arguments);
      // eslint-disable-next-line no-plusplus
      const part = { name: `slot${this.slotToadd++}` };
      this.parts.push(part);
      this.$set(this.$root.editor, 'selected', part);
      this.$emit('on-select-slot', part.name);
    },
    onDropComponent(value) {
      console.log(value);
    },
    focuce(event, item) {
      console.log('select', item);
      event.stopPropagation();
      this.selected = item;
      this.$set(this.$root.editor, 'selected', item);
      this.$emit('on-select-slot', item.name);
    },
    handleCanvasResize() {
      this.moveable.bounds.left = this.$refs.canvas.clientLeft;
      this.moveable.bounds.top = this.$refs.canvas.clientTop;
      this.moveable.bounds.bottom = this.moveable.bounds.top + this.$refs.canvas.clientHeight;
      this.moveable.bounds.right = this.moveable.bounds.left + this.$refs.canvas.clientWidth;
    },
    handleDrag({ target, transform, inputEvent }) {
      console.log('onDrag left, top', transform);
      // eslint-disable-next-line no-param-reassign
      target.style.transform = transform;
      inputEvent.stopPropagation();
      // this.config.props.position.transform = transform;
    },
    handleResize({
      target, width, height, delta,
    }) {
      console.log('onResize', width, height);
      // eslint-disable-next-line no-unused-expressions,no-param-reassign
      delta[0] && (target.style.width = `${width}px`);
      // eslint-disable-next-line no-unused-expressions,no-param-reassign
      delta[1] && (target.style.height = `${height}px`);
      //   window.dispatchEvent(new Event('resize'));
      this.$emit('on-slot-resize');
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
