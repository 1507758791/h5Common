<template>
	<view class="cu-modal" @touchmove.stop.prevent :class="show ? 'show' : ''">
		<view class="cu-dialog">
			<!-- style="border-bottom: 1px solid #F2F2F2;" -->
			<view class="cu-bar bg-white justify-end" >
				<view class="content">{{ title }}</view>
				<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
			</view>
			<view style="padding: 30rpx;font-size: 36rpx;font-weight: bold;color: #090909;">{{ content }}</view>
			<view class="cu-bar bg-white justify-end ssz">
				<view class="action bottombtn">
					<view @tap="hideModal" class="btna">{{cancel}}</view>
					<view @tap="confirm" class="btnb" >{{ok}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: '提示'
		},
		ok:{
			type:String,
			default:'确     定'
		},
		cancel:{
			type:String,
			default:'取     消'
		}
	},
	data() {
		return {
			show: false,
			content: '',
			resolve: '',
			reject: '',
			promise: '',
		};
	},
	methods: {
		hideModal() {
			this.show = false;
			this.reject('cancel');
			// this.remove();
		},
		showModel(con) {
			this.content = con;
			this.show = true;
			this.promise = new Promise((resolve, reject) => {
				this.resolve = resolve;
				this.reject = reject;
			});
			// 返回promise对象
			return this.promise;
		},
		confirm() {
			this.show = false;
			if (this.isShowInput) {
				this.resolve(this.inputValue);
			} else {
				this.resolve('confirm');
			}
			// this.remove();
		},
		remove() {
			setTimeout(() => {
				this.destroy();
			}, 300);
		},
		destroy() {
			this.$destroy();
			document.body.removeChild(this.$el);
		}
	}
};
</script>

<style lang="scss" scoped>
.ssz {
	margin-top: 50rpx;
	// border-top: 2rpx solid #eeeeee;
}
.bottombtn {
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	margin-bottom: 30rpx;
	// view:first-child {
	// 	border-right: 2rpx solid #eeeeee;
	// }
	view {
		text-align: center;
		flex: 1;
	}
}
.cu-dialog{
	width: 600rpx;
	min-height: 400rpx;
	background: #FFFFFF;
	border-radius: 10rpx;
}
.content{
	font-size: 34rpx;
	font-weight: 400;
	color: #090909;
}
.btna{
	width: 260rpx;
	height: 100rpx;
	border: 1px solid #FF7000;
	border-radius: 8rpx;
	font-size: 34rpx;
	font-weight: bold;
	color: #FF7000;
	line-height: 100rpx;
	text-align: center;
}
.btnb{
	width: 260rpx;
	height: 100rpx;
	background: #FF7000;
	border: 1px solid #FF7000;
	border-radius: 8rpx;
	font-size: 34rpx;
	font-weight: bold;
	color: #fff;
	line-height: 100rpx;
	text-align: center;
	margin-left: 16rpx;
}
.text-red{
	width: 60rpx;
	height: 60rpx;
	color: #CDCDCD;
}
</style>
