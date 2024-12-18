<template>
	<view>
		<view class="cu-modal" :class="show ? 'show' : ''" style="z-index: 3333;">
			<view class="cu-dialog updateModel">
				<view class="contsa">
					<view class="top">
						<image src="/static/updateGif.gif"></image>
						<view class="text-t">发现新版本</view>
					</view>
					<view class="bottom" style="top: -4rpx;">
						<view v-if="type == 0" class="bo1">
							<!-- <view class="text">检测到有新版本可更新</view> -->
							<!-- <view class="jies">{{updateContent}}</view> -->
							<!-- <rich-text :nodes="updateContent"></rich-text> -->
							<uParse :content="updateContent" style="max-height: 300rpx;overflow-y: auto;text-align: left;"></uParse>
							<u-button class="btn" type="warning" @click="updateNow">马上升级</u-button>
						</view>
						<view v-if="type == 1" class="bo2">
							<view class="text">正在为您更新，请耐心等待</view>
							<view class="jdu">
								<view>已下载{{ jdu }}%</view>
								<view class="changtiao"><view class="dd" :style="{ width: jdu + '%' }"></view></view>
							</view>
							<u-button style="color: #fff;" class="btn" type="default" @click="closeUpdate" v-if="isForce">取消更新</u-button>
						</view>
					</view>
				</view>
				<view class="close" @tap="hideModal"><text class="cuIcon-roundclose" v-if="isForce"></text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
export default {
	components: {
		uParse
	},
	props: {
		show: {
			type: Boolean,
			default: false
		},
		apkUrl: {
			type: String,
			defalut: ''
		},
		isForce:{
			type:Boolean,
			defalut:true
		},
		updateContent:{
			type:String,
			defalut:''
		}
	},
	data() {
		return {
			type: 0,
			jdu: 0,
			timer: '',
			downloadTask:undefined
		};
	},
	watch:{
		show(){
			if(this.show){
				uni.hideTabBar()
			} else {
				uni.showTabBar()
			}
		}
	},
	methods: {
		hideModal() {
			this.type = 0;
			this.jdu = 0;
			setTimeout(()=>{
				uni.showTabBar()
			},200)
			this.$emit('close', false);
		},
		closeUpdate() {
			if(this.downloadTask){
				this.downloadTask.abort()
			}
			this.hideModal();
		},
		updateNow() {
			console.log(this.isForce)
			if (uni.getSystemInfoSync().platform == 'android') {
				if (this.apkUrl != '') {
					this.type = 1;
					this.downloadTask = uni.downloadFile({
						url: this.apkUrl, //仅为示例，并非真实的资源
						success: res => {
							console.log('success', res);
							if (res.statusCode === 200) {
								let path = res.tempFilePath;
								plus.runtime.install(path);
							}
						},
						fail: err => {
							console.log('fail', err);
						},
						complete: res => {
							console.log('complete', res);
							 // this.downloadTask.abort();
						}
					});
				
					this.downloadTask.onProgressUpdate(res => {
						// console.log('下载进度', res.progress);
						this.jdu=res.progress
						// console.log('已经下载的数据长度' + res.totalBytesWritten);
						// console.log('预期需要下载的数据总长度' + res);
				
						// 测试条件，取消下载任务。
						if (res.progress == 100) {
						    // this.downloadTask.abort();
							
						}
					});
				} else {
					this.$api.msg('版本更新失败');
				}
			}else{
					let appleId= 1521113390
					plus.runtime.launchApplication({
					    action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`
					}, function(e) {
					    console.log('Open system default browser failed: ' + e.message);
					});
				}
			
		}
	}
};
</script>

<style lang="scss" scoped>
.updateModel {
	width: 70vw;
	background: transparent;
	position: relative;
	.contsa{
		background: #fff;
		border-radius: 40rpx;
		padding: 30rpx 18rpx;
	}
	.top {
		width: 100%;
		height: 0;
		padding-bottom: 69.3%;
		position: relative;
		image {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
		.text-t{
			position: absolute;
			bottom: 20rpx;
			left: 50%;
			transform: translate(-50%);
			font-size: 34rpx;
			color: #333;
			font-weight: bold;
			&::after, &::before{
				content: '';
				position: absolute;
				width: 30rpx;
				height: 6rpx;
				background: #FFA45D;
				display: inline-block;
				border-radius: 20rpx;
				top: 50%;
				transform: translateY(-50%);
			}
			&::before{
				left: -50rpx;
			}
			&::after{
				right: -50rpx;
			}
		}
	}
	.bottom {
		// height: 360rpx;
		// width: 70vw;
		background: #fff;
		// padding: 60rpx 0 140rpx 0;
		position: relative;
		.text {
			font-size: 32rpx;
		}
		.btn {
			margin-top: 20rpx;
			width: 80%;
			margin-left: 10%;
			// color: #fff;
			// position: absolute;
			// bottom: 40rpx;
			font-size: 32rpx;
			letter-spacing: 4rpx;
			border-radius: 40rpx;
			background: linear-gradient(90deg, #FFA45D 0%, #FF7000 100%);
		}
		.bo1 {
			padding: 0 20rpx;
			.text {
			}
			.jies{
				padding: 20rpx;
				max-height: 450rpx;
				overflow: auto;
			}
		}
		.bo2 {
			.text {
				margin-bottom: 24rpx;
			}
			.jdu {
				color: #ff7700;
				.changtiao {
					margin: 10rpx auto;
					width: 80%;
					border: 2rpx solid #ccc;
					height: 22rpx;
					border-radius: 20rpx;
					.dd {
						background: #ff7700;
						height: 18rpx;
						border-radius: 20rpx;
					}
				}
			}
		}
	}
	.close {
		// position: absolute;
		margin-top: 40rpx;
		font-size: 60rpx;
		color: #ffffff;
		font-weight: 300;
		z-index: 1;
	}
}
</style>
