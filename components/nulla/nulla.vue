<template>
	<view >
		<view class="null"  v-if='nullShow'>				
			<!-- <image src="/static/img/images/no-record.png" mode=""></image> -->
			<image src="/static/ipad/icon_none.png" mode=""></image>
			<!-- <view>暂无数据!</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		
		data() {
			return{
				nullShow:false
			}
		},
		mounted(){
			var that=this;
			setTimeout(function(){
				that.nullShow=true;
			},800)
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.null {
		width: 100%;
		margin-top: 250rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		image{
			width: 230rpx;
			height: 280rpx;
		}
		view{
			width: 100%;
			text-align: center;
			font-size: 34rpx;
			margin-top: 50rpx;
		}
	}
</style>
