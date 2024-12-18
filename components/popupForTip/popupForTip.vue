<template>
	<view class="popTips flex-justify-center" v-if="show">
		<view class="pop_con flex-items-center flex-column" style="margin-top: 234rpx;">
			<image class="ddimg" src="../../static/img/tipBg.png" mode=""></image>
			<image @click="$emit('click',false)" style="width: 59rpx;height: 59rpx;position: absolute;z-index: 9;bottom: -87rpx;left: 286rpx;" src="../../static/img/closed.png" mode=""></image>
			<view class="bgb">
				
			</view>
			<view class="title">
				{{title}}
			</view>
			<view class="ercode flex-items-center flex-column">
				<view class="code_s">
					<u-image width="100%" height="100%"
						:src="src ? src + '?x-oss-process=image/resize,m_lfit,h_500,w_500' : '' || '/static/noPic/360.png'">
						<u-loading slot="loading"></u-loading>
					</u-image>
					<!-- <image src="../../static/img/tipBg.png" mode=""></image> -->
				</view>
				<view class="tiptxt" style="width: fit-content;padding: 0 17rpx;">
					{{desc}}
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		model: {
		    prop: "show",
		    event: "click",
		  },
		props:{
			src:{
				type:String,
				default:'/static/noPic/360.png'
			},
			show:{
				type:Boolean,
				default:false
			},
			desc:String,
			title:String,
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style lang="scss">
	.popTips{
		position: fixed;
		top: 0%;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.50);
		z-index: 20000;
		.pop_con{
			width: 633rpx;
			height: 822rpx;
			background: #FFFFFF;
			border-radius: 35rpx 35rpx 35rpx 35rpx;
			position: relative;
			.title{
				width: 100%;
				position: absolute;
				top: 28rpx;
				left: 0rpx;
				height: 49rpx;
				font-size: 35rpx;
				color: #000000;
				line-height: 49rpx;
				z-index: 8;
				text-align: center;
			}
			.bgb{
				width: 633rpx;
				height: 360rpx;
				background: #FFFFFF;
				border-radius: 0rpx 0rpx 35rpx 35rpx;
				position: absolute;
				bottom: 0%;
				left: 0;
				z-index: 5;
			}
			&>.ddimg{
				width: 633rpx;
				height: 514rpx;
				position: absolute;
				top: 0%;
				left: 0;
			}
			.ercode{
				margin-top: 380rpx;
				position: relative;
				z-index: 6;
				.code_s{
					width: 285rpx;
					height: 285rpx;
					background: #FFFFFF;
					border-radius: 31rpx 31rpx 31rpx 31rpx;
					border: 7rpx solid #FF7700;
					padding: 24rpx;
					&>image{
						width: 100%;
						height: 100%;
					}
				}
				.tiptxt{
					width: 472rpx;
					height: 63rpx;
					background: #FFF6EC;
					border-radius: 11rpx 11rpx 11rpx 11rpx;
					margin-top: 34rpx;
					text-align: center;
					line-height: 63rpx;
					font-size: 28rpx;
					color: #FF641E;
				}
			}
		}
	}
</style>