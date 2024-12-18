<template>
	<view class="price">
		<text v-if="!yijia">¥</text>
		<!-- priceDecimal -->
		<text :style="fontStyle" v-if="!yijia">{{price}}{{pmsUnity?pmsUnity:''}} </text>
		<text v-else>议价</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			price: {
				type: Number || String,
				default: 0
			},
			pmsUnity: {
				type:String,
				default: ''
			},
			yijia: {
				type: Boolean,
				default: false
			},
			fontStyle:{
				type: String,
				default: ''
			},
		}
	}
</script>

<style lang="scss" scoped>
	.price {
		// font-size: 36rpx;
		font-size: 24rpx;
		font-weight: 500;
		color: #FE581F;
		line-height: 44rpx;

		text:last-child {
			// font-size: 48rpx;
			font-size: 32rpx;
		}
	}
</style>
