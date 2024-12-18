<template>
	<view class="indexContainer">
		<view class="bg_bar"></view>
		<view class="navibar">
			<image @tap="goBack" src="https://xbx.obs.myhuaweicloud.com/jorujiahu/H5/bindOlder/gobackicon.png" mode="">
			</image>
			<view class="naviTitle">
				{{title}}
			</view>
		</view>
		<view class="list_bg">
			<view class="list_opt">
				<image src="https://xbx.obs.myhuaweicloud.com/jorujiahu/H5/bindOlder/headimg_default.png" mode="">
				</image>
				<view class="opt_item">
					<view class="name_care_level">
						<text>{{baseInfo.name}}</text>
						<view class="">
							{{baseInfo.nurseLevel}}
						</view>
					</view>

					<view class="lebel_desc">
						<text>身份证号：</text>
						<view class="one_ellipsis">
							{{baseInfo.identity}}
						</view>
					</view>
					<view class="lebel_desc" style="margin-top: 15rpx;">
						<text>所属机构：</text>
						<view class="one_ellipsis">
							{{baseInfo.insName}}
						</view>
					</view>

					<view class="account_overmount">
						<text>当前账户余额：</text>
						<view class="amount">
							<text>¥</text>
							<view class="">
								{{billBalance}}
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="pre_bill_month" v-for="(item,index) in list" :key="index" v-if="list.length">
				<view class="pb_title">
					<text>缴费金额</text>
					<view class="">
						<text>{{item.price}}</text>
						<text>元</text>
					</view>
				</view>
				<view class="pb_con">
					<text>缴费时间</text>
					<view class="">
						<text></text>
						<text>{{item.orderTime}}</text>
					</view>
				</view>
				<view class="pb_con">
					<text>订单号</text>
					<view class="">
						<text></text>
						<text style="font-size: 28rpx;" @tap="copyOder('ddd')">{{item.orderNo}}</text>
					</view>
				</view>
			</view>
			<view v-if="!list.length" style="background: #fff;width: 100%;height: 300rpx;" class="flex-center">
				暂无记录
			</view>
			

			<!-- <view class="could_pay_amount">
				<view class="pb_con">
					<text>预计缴费金额</text>
					<view class="">
						<text>¥</text>
						<text>121212</text>
					</view>
				</view>
				<view class="field">
					<input class="uni-input" @input="replaceInput" v-model="changeValue" placeholder-style="font-size:30rpx;color:rgba(56,50,47,0.5);font-weight:400;" placeholder="输入其他金额" />
				</view>
			</view> -->

			<!-- <view class="btn">
				<u-button type="primary"
					:custom-style="{background:'rgba(252, 106, 30, 1)',fontSize:'34rpx',height: '88rpx'}">{{btnAct}}</u-button>
			</view> -->
		</view>
	</view>
</template>

<script>
	import Api from '@/common/api.js'

	import {
		mapMutations,
		mapState
	} from 'vuex';
	export default {
		components: {},
		data() {
			return {
				title: '缴费记录',
				btnAct: '进行缴费',
				list:[],
				billBalance:''
			}
		},
		onLoad(e) {
			if(e.info){
				this.baseInfo = JSON.parse(e.info)
				this.billBalance = e.billBalance
				this.getPayRecord()
			}
		},
		onShow() {
			// this.getAppLastVersion();

		},
		onHide() {

		},
		methods: {
			...mapMutations(['login', 'setReceiveStatus']),
			goBack() {
				let canNavBack = getCurrentPages()
				if(canNavBack && canNavBack.length>1) {  
				    uni.navigateBack() 
				} else {  
				    history.back();  
				}
			},
			copyOder(code) {
				uni.setClipboardData({
					data: code,
					success: function() {
						uni.showToast({
							title:'已复制到剪贴板'
						})
					}
				})
			},
			async getPayRecord(){
				let params = {
					personId: this.baseInfo.personId
				}
				let data = await Api.apiCall('get', Api.api.getWxICBCOrderByPersonId, params, true)
				if(data){
					this.list = data.data
				}
			}

		},
		mounted() {},
	}
</script>
<style>
	page {
		background: rgba(241, 241, 241, 1);
		width: 100%;
		height: 100%;
	}
</style>
<style lang="scss" scoped>
	.indexContainer {
		width: 100%;
		height: 100%;

		.bg_bar {
			background: rgba(254, 96, 1, 1);
			height: 388rpx;
			position: fixed;
			width: 100%;
			left: 0%;
			top: 0;
		}
	}

	.navibar {
		position: fixed;
		left: 0%;
		top: 12rpx;
		width: 100vw;

		image {
			position: absolute;
			top: 0;
			left: 24rpx;
			width: 48rpx;
			height: 48rpx;
		}

		.naviTitle {
			width: 100%;
			text-align: center;
			height: 43rpx;
			font-weight: 500;
			font-size: 40rpx;
			color: #FFFFFF;
			line-height: 43rpx;
		}
	}

	.btn {
		box-shadow: 0rpx 4rpx 10rpx 0rpx #FFAE83;
		border-radius: 6rpx;
		position: fixed;
		bottom: 127rpx;
		left: 30rpx;
		height: 86rpx;
		width: 690rpx;
	}

	.list_bg {
		width: 100%;
		height: calc(100vh - 90rpx);
		background: transparent;
		// border-radius: 40rpx 40rpx 0rpx 0rpx;
		position: absolute;
		bottom: 0%;
		z-index: 2;
		padding: 0rpx 30rpx 260rpx;
		overflow: scroll;

		.list_opt {
			width: 100%;
			height: 290rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 4rpx 8rpx 0rpx #EDEAE8;
			border-radius: 10rpx;
			padding: 30rpx;
			display: flex;
			margin-bottom: 30rpx;

			&>image {
				width: 120rpx;
				height: 120rpx;
				margin-right: 20rpx;
				margin-top: 4rpx;
			}

			.opt_item {
				.name_care_level {
					display: flex;
					align-items: center;
					margin-bottom: 15rpx;

					text {
						height: 50rpx;
						font-weight: 500;
						font-size: 36rpx;
						color: #38322F;
						line-height: 50rpx;
						margin-right: 15rpx;
					}

					view {
						padding: 0 17rpx;
						line-height: 40rpx;
						height: 40rpx;
						background: rgba(254, 96, 1, 0.16);
						border-radius: 4rpx;
						font-size: 24rpx;
						color: #FE6001;
					}
				}

				.lebel_desc {
					display: flex;
					align-items: center;

					text {
						width: 140rpx;
						height: 40rpx;
						font-size: 28rpx;
						color: rgba(56, 50, 47, 0.8);
						line-height: 40rpx;
					}

					view {
						width: 344rpx;
						height: 34rpx;
						font-family: DIN, DIN;
						font-weight: 400;
						font-size: 28rpx;
						color: #38322F;
						line-height: 34rpx;
						text-align: left;
						font-style: normal;
					}
				}

				.account_overmount {
					height: 50rpx;
					padding: 0 50rpx 0 17rpx;
					background: linear-gradient(270deg, RGBA(255, 240, 231, 1) 0%, RGBA(255, 240, 231, 1) 100%);
					border-radius: 6rpx;
					margin-top: 15rpx;
					display: flex;
					align-items: center;

					&>text {
						width: 196rpx;
						height: 40rpx;
						font-size: 28rpx;
						color: rgba(56, 50, 47, 0.8);
						line-height: 40rpx;
					}

					.amount {
						display: flex;
						align-items: center;

						text {
							font-size: 24rpx;
							color: rgba(254, 67, 1, 1);
							font-weight: 500;
							height: 29rpx;
							line-height: 34rpx;
						}

						view {
							font-family: DIN, DIN;
							font-weight: 500;
							font-size: 32rpx;
							color: #FE4301;
						}
					}

				}
			}
		}


		.pre_bill_month {
			width: 690rpx;
			height: fit-content;
			background: #FFFFFF;
			border-radius: 14rpx;
			border: 1rpx solid rgba(56, 50, 47, 0.1);
			margin-top: 30rpx;
			padding-bottom: 10rpx;

			.pb_title {
				padding: 0 40rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				height: 70rpx;
				background: linear-gradient(270deg, #FFF4ED 0%, #FFE5D6 100%);

				&>text {
					width: 192rpx;
					height: 45rpx;
					font-size: 32rpx;
					color: #38322F;
					line-height: 45rpx;
				}

				&>view {
					&>text:first-child {
						height: 45rpx;
						font-size: 32rpx;
						color: #38322F;
						line-height: 45rpx;
					}

					&>text:last-child {
						height: 33rpx;
						font-size: 24rpx;
						color: rgba(56, 50, 47, 0.5);
						line-height: 33rpx;
					}
				}
			}

			.pb_con {
				padding: 0 40rpx;
				display: flex;
				justify-content: space-between;
				width: 100%;
				height: 90rpx;
				padding-top: 28rpx;
				border-bottom: 1rpx solid rgba(56, 50, 47, 0.10);

				&>text {
					height: 45rpx;
					font-size: 32rpx;
					color: #38322F;
					line-height: 45rpx;
				}

				&>view {
					&>text:first-child {
						height: 33rpx;
						font-size: 24rpx;
						color: #38322F;
						line-height: 33rpx;
					}

					&>text:last-child {
						height: 45rpx;
						font-size: 32rpx;
						color: #38322F;
						line-height: 45rpx;
					}
				}
			}

			.pb_con:last-child {
				border-bottom: none;

				&>view {
					&>text:first-child {
						height: 33rpx;
						font-size: 24rpx;
						color: #38322F;
						line-height: 33rpx;
						font-weight: 500;
					}

					&>text:last-child {
						height: 45rpx;
						font-size: 32rpx;
						color: #38322F;
						line-height: 45rpx;
						font-weight: 500;
					}
				}
			}
		}

		.could_pay_amount {
			width: 690rpx;
			height: 200rpx;
			background: #FFFFFF;
			border-radius: 14rpx;
			border: 1rpx solid rgba(56, 50, 47, 0.1);
			padding: 35rpx 40rpx 42rpx;
			margin-top: 30rpx;

			.pb_con {
				border-bottom: none;
				display: flex;
				align-items: center;
				justify-content: space-between;

				&>text {
					height: 45rpx;
					font-size: 32rpx;
					color: #38322F;
					line-height: 45rpx;
				}

				&>view {
					&>text:first-child {
						height: 33rpx;
						font-size: 24rpx;
						color: #38322F;
						line-height: 33rpx;
						font-weight: 500;
					}

					&>text:last-child {
						height: 45rpx;
						font-size: 32rpx;
						color: #38322F;
						line-height: 45rpx;
						font-weight: 500;
					}
				}

			}

			.field {
				margin-top: 20rpx;
				display: flex;
				justify-content: flex-end;

				.uni-input {
					width: 289rpx;
					height: 64rpx;
					background: #FFFFFF;
					box-shadow: 0rpx 2rpx 6rpx 0rpx #E4E3E3;
					border-radius: 6rpx;
					border: 1rpx solid rgba(56, 50, 47, 0.2);
					padding-left: 20rpx;
				}
			}
		}
	}
</style>