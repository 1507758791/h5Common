<template>
  <view style="font-size: 0;"><u-image :src="src" :mode="mode" :width="width" :height="height" :shape="shape"
      :border-radius="radius">
      <u-loading slot="loading"></u-loading>
    </u-image></view>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'aspectFill'
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    shape: {
      type: String,
      default: ''
    },
    radius: {
      type: String,
      default: ''
    }
  },
}
</script>

<style lang="scss" scoped></style>