<template>
	<view class="z-nav-bar">
		<view class="cuIcon-back" @tap="back" v-if="backBtn&&!newImg"></view>
		<image class="back_img" v-if='backBtn&&newImg' src="/static/img/icon/back_icon.png"  @tap="back" ></image>
		<view class="nav-title u-line-1">{{title}}</view>
		<view class="nav-right" v-if="rightBtn" @tap="rightBtnClick">{{rightText}}</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		props:{
			title: {
				type: String,
				default: ''
			},
			backBtn: {
				type: Boolean,
				default: true
			},
			rightBtn: {
				type: Boolean,
				default: false
			},
			rightText:{
				type: String,
				default: ''
			},
			size:{
				type: Boolean,
				default: false
			},
			newImg:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			};
		},
		computed:{
			...mapState(['statusBar'])
		},
		methods:{
			back(){
				// console.log(this.size)
				if(this.size){
					uni.navigateBack({
						delta:2
					})
				}else{
					uni.navigateBack({
						delta:1
					})
				}
				
			},
			rightBtnClick(){
				this.$emit('rightBtnClick')
			}
		}
	}
</script>

<style lang="scss" scoped>
.z-nav-bar{
	height: 140rpx;
	background: #fff;
	position: fixed;
	top: 0;
	width: 100vw;
	z-index: 100;
	border-bottom: 2rpx solid #EBEBEB;
	padding: 70rpx 30rpx 0 30rpx;
	.cuIcon-back{
		font-size: 36rpx;
		color: #43474A;
		line-height: 70rpx;
		width: 50rpx;
		position: absolute;
		left: 30rpx;
	}
	.back_img{
		margin-top: 10rpx;
		width: 50rpx;
		position: absolute;
		left: 30rpx;
		height: 50rpx;
	}
	.nav-title{
		line-height: 70rpx;
		color: #0E1019;
		font-size: 36rpx;
		font-weight: bold;
		width: calc(100% - 340rpx);
		text-align: center;
		position: absolute;
		left: 170rpx;
	}
	.nav-right{
		line-height: 70rpx;
		color: #FE872E;
		font-size: 28rpx;
		width: 140rpx;
		text-align: right;
		position: absolute;
		right: 30rpx;
	}
}
</style>
