<template>
  <view class="desc">
    <view class="desc-title"></view>
    <view class="desc-content">
		<u-empty text="暂无内容" v-if="!introduction"></u-empty>
      <u-parse v-if="introduction" :html="introduction"></u-parse>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    introduction: {
      type: String,
      default: ''
    },
  },
}
</script>

<style lang="scss" scoped>
.desc {
  width: 710rpx;
  background: #FFFFFF;
  box-shadow: 0rpx 1rpx 10rpx 0rpx rgba(0, 0, 0, 0.1);
  border-radius: 16rpx;
  margin: auto;
  padding: 30rpx;

  margin-top: 20rpx;
  box-sizing: border-box;

  .desc-title {
    font-size: 30rpx;
    font-weight: bold;
    color: #000000;
    margin-bottom: 20rpx;
    background: url('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon44.png') no-repeat;
    background-size: 100% 100%;
    width: 364rpx;
    height: 52rpx;
    margin: auto;
    margin-bottom: 20rpx;
  }

  .desc-content {
    font-size: 26rpx;
    font-weight: 500;
    color: #333333;
    margin-top: 36rpx;
  }
}
</style>
