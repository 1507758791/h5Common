<template>
	<view class="numberBox flex-justify-end" :style="'height:'+btnHeight+';'" :class="{'ccwidth':num == 0,'isnew':type==2}">
		<!-- <view class="btn1"
			:style="'height:'+btnHeight+';'+'width:'+btnWidth+';'+'line-height:'+btnHeight+';'">
			<u-icon size="30" name="minus"></u-icon>
		</view> -->
		<template v-if="type == 1">
			<view class="" @click.stop="handleRemove">
				<u-image  :width="btnWidth" :height="btnHeight"
					src="https://xbx.obs.cn-east-3.myhuaweicloud.com/xiangzhaohu/components/remove.png">
					<u-loading slot="loading"></u-loading>
				</u-image>
			</view>
				
			
			
			<view class="setnumber" :style="{...txtStyle}">
				<text>{{num}}</text>
			</view>
			<view class="" @click.stop="handleAdd($event)">
				<u-image :width="btnWidth" :height="btnHeight"
					src="https://xbx.obs.cn-east-3.myhuaweicloud.com/xiangzhaohu/components/adds.png">
					<u-loading slot="loading"></u-loading>
				</u-image>
			</view>
		</template>
		
		<template v-if="type == 2">
			<view class="flex-items-center">
				<view class="flex-justify-center flex-column" style="height: 4rpx;height: 48rpx;" @click.stop="handleRemove">
					
					<image style="width: 24rpx;height: 4rpx;" width="24" height="4" src="/static/components/jian.png" mode=""></image>
				</view>
					
				
				
				<view class="tydds flex-center" style="" >
					<text>{{num}}</text>
				</view>
				<view class="" @click.stop="handleAdd($event)">
					<image style="width: 24rpx;height: 24rpx;" width="24" height="4" src="/static/components/jia.png" mode=""></image>
					<!-- <u-image :width="24" :height="24"
						src="">
						<u-loading slot="loading"></u-loading>
					</u-image> -->
				</view>
			</view>
			
		</template>
		
		<!-- <view class="btn" @tap.stop="handleAdd"
			:style="'height:'+btnHeight+';'+'width:'+btnWidth+';'+'line-height:'+btnHeight+';'">
			<u-icon size="34" name="plus"></u-icon>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			num: {
				type: String | Number,
				default: () => {
					return 0
				}
			},
			type: {
				type: String | Number,
				default: () => {
					return 1
				}
			},
			txtStyle:{
				type: Object,
				default: () => {
					return {}
				}
			},
			// 按钮宽度
			btnWidth: {
				type: String || Number,
				default: () => {
					return '64rpx'
				}
			},
			// 按钮高度
			btnHeight: {
				type: String || Number,
				default: () => {
					return '64rpx'
				}
			}
		},
		methods: {
			handleRemove() {
				this.$emit('remove')
			},
			handleAdd($event) {
				// console.log($event);
				this.$emit('add',$event)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.numberBox {
		display: flex;
		transition: all .3s ease;
		width: 144rpx;
		overflow: hidden;
		.setnumber {
			width: 64rpx;
			height: 64rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		text {
			font-size: 40rpx;
			color: #282A39;
			line-height: 48rpx;
		}

		.btn {
			// border: 2rpx solid rgba(40, 42, 57, 0.3);
			border-radius: 50%;
			background: $primary;
			font-size: 40rpx;
			color: #ffffff;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.btn1 {
			color: $primary;
			// box-shadow: 0px 2rpx 6rpx 0px #D1D6FE;
			border: 2rpx solid $primary;
			border-radius: 50%;
			background: #ffffff;
			font-size: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.ccwidth{
		width: 48rpx;
	}
	
	.tydds{
		width: 88rpx;
		height: 58rpx;
		background: #F2F2F2;
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		font-weight: 500;
		font-size: 31rpx;
		color: #333333;
		line-height: 58rpx;
		text-align: center;
		margin: 0 18rpx;
	}
	.isnew{
		width: fit-content;
	}
</style>
