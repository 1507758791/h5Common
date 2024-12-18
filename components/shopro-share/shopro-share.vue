<template>
	<view class="content">
		<view class="cu-modal bottom-modal" style="z-index: 1111;" :class="[{ show: showModal }, modalType]" @touchmove.stop.prevent='' @tap="hideModal">
			<view class="cu-dialog" @tap.stop style="background: none; overflow: visible;">
				<view class="share-box">
					<view class="share-list-box x-f">
						<view class="share-item y-f" @tap="shareFrend(0)">
							<image class="share-img" src="http://shopro.7wpp.com/imgs/share_wx.png" mode=""></image>
							<text class="share-title">微信好友</text>
						</view>
						<view v-if="posterType != 'cardShare' && posterType != 'activityShare'&&isShowFrends==0" class="share-item y-f" @tap="shareFrend(1)">
							<image class="share-img" src="/static/friends.png" mode=""></image>
							<text class="share-title">分享到朋友圈</text>
						</view>
					</view>
					<view class="share-foot x-c" @tap="hideModal">取消</view>
				</view>
			</view>
		</view>
		<!-- 指引 -->
		<shopro-share-guide v-model="showShareGuide"></shopro-share-guide>
	</view>
</template>

<script>
import shoproShareGuide from '@/components/modal/shopro-share-guide.vue'
import Api from '@/common/api';
import {shareGoods, joinTeamShare, signShare, joinTeamGShare, freeShare, cardShare,shareFenXiao,activityShare} from '@/utils/share.js'
export default {
	components: {
		shoproShareGuide
	},
	data() {
		return {
			showShareGuide: false,
			shareData: {} //组装海报分享信息
		};
	},
	props: {
		value: {},
		modalType: {
			type: String,
			default: ''
		},
		goodsType:{
			typr:Number,
			default:0
		},
		groupRecordId:{
			typr:Number,
			default:0
		},
		isShowFrends:{
					typr:Number,
					default:0
				},
		posterType: '',
		goodsInfo: {},
		groupInfo:{},
		invitecode:{
			typr:Number,
			default:0
		}
	},
	computed: {
		showModal: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('input', val);
			}
		}
	},
	created() {
		// console.log(this.goodsInfo)
		// let that = this;
		// if (that.posterType === 'groupon') {
		// 	that.shareData = that.goodsInfo.goods;
		// 	that.shareData.id = that.goodsInfo.id;
		// } else {
		// 	that.shareData = that.goodsInfo;
		// 	that.shareData.image = that.goodsInfo.image;
		// }
		// that.setShareInfo({
		// 	query: {
		// 		url: that.posterType + '-' + that.shareData.id
		// 	},
		// 	title: that.shareData.title,
		// 	image: that.shareData.image
		// });
	},

	methods: {
		shareFrend(i){
			let scene = i
			
			if(this.posterType=='trends') {
				this.goodsInfo.scene = scene
				console.log(this.goodsInfo)
				shareGoods(this.goodsInfo)
			}
		},
		hideModal() {
			this.showModal = false;
		},
	}
};
</script>


<style lang="scss">
	.cu-modal::before{
		margin-top: -70rpx;
		
	}
.share-box {
	background: #fff;
	width: 750rpx;
	border-radius: 30rpx 30rpx 0 0;
	padding-top: 30rpx;
	position: relative;
	

	.share-foot {
		font-size: 24rpx;
		color: #bfbfbf;
		height: 80rpx;
		border-top: 1rpx solid #eee;
	}
	.x-c{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.x-f{
		display: flex;
		align-items: center;
		flex-direction: row;
	}
	.y-f{
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.share-list-box {
		
		.share-btn {
			background: none;
			border: none;
			line-height: 1;
			padding: 0;
			&::after {
				border: none;
			}
		}
		.share-item {
			flex: 1;
			padding-bottom: 20rpx;
			.share-img {
				width: 70rpx;
				height: 70rpx;
				background: rgba(246, 246, 254, 1);
				border-radius: 50%;
				margin-bottom: 20rpx;
			}

			.share-title {
				font-size: 24rpx;
				color: #666;
			}
		}
	}
}
</style>
