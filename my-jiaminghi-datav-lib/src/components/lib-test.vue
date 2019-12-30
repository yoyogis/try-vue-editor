<template>
    <div style="width:300px;height:400px">
        <dv-full-screen-container>
            <dv-water-level-pond :config="config" style="width:100%; height:100%">
            </dv-water-level-pond>
        </dv-full-screen-container>
    </div>
</template>
<script>
export default {
  data() {
    return {
      config: {
        data: [60, 45],
        shape: 'roundRect',
      },
    };
  },
};
</script>
