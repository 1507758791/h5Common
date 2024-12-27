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
					<view class="name_care_level1 flex-justify-between flex-items-center">
						<view class="flex name_care_level">
							<text>{{detail.perosnName}}</text>
							<view class="">
								{{baseInfo.nurseLevel}}
							</view>
						</view>
						<text
							@tap="$u.route('/pages/billPayRecord/billPayRecord?info='+JSON.stringify(baseInfo)+'&billBalance='+detail.personBalance)"
							style="color: #FE6001;">缴费记录</text>
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
								{{detail.personBalance}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="flex-center" v-if="detail&&!detail.billDetail.length"
				style="width: 100%;height: 400rpx;background: #fff;">
				暂无预缴账单
			</view> -->
			<view class="pre_bill_month">
				<view class="" style="padding-bottom: 20rpx;">
					<u-subsection @change="sectionChange" bgColor="rgb(253, 133, 49)" active-color="rgb(252, 106, 30)"
						inactive-color="#fff" :list="list" :current="current"></u-subsection>
				</view>
				<view class="flex-center" v-if="detail&&!detail.billDetail.length&&current == 0"
					style="width: 100%;height: 400rpx;background: #fff;">
					暂无预缴账单
				</view>
				<view class="flex-center" v-if="detailPre&&!detailPre.billDetail.length&&current == 1"
					style="width: 100%;height: 400rpx;background: #fff;">
					暂无账单信息
				</view>
				<template v-if="current == 1&&detailPre&&detailPre.billDetail.length">
					<view class="pb_title">
						<text>预缴账单月份</text>
						<view class="">
							<text>{{detailPre.billDate}}</text>
							<text>月</text>
						</view>
					</view>
					<view class="ccclose">
						<uni-collapse>
							<!-- 因为list默认带一条分隔线，所以使用 titleBorder="none" 取消面板的分隔线 -->
							<uni-collapse-item
								:show-arrow="(item.consumeRegisterDeatail&&item.consumeRegisterDeatail.length>0)?true:false"
								:disabled="!(item.consumeRegisterDeatail&&item.consumeRegisterDeatail.length)"
								v-for="(item,index) in detailPre.billDetail" :key="index">
								<template v-slot:title>
									<view class="pb_con"
										:style="(item.consumeRegisterDeatail&&item.consumeRegisterDeatail.length>0)?'padding-right:10rpx;':''">
										<text>{{item.insCostTypeName}}</text>
										<view class="">
											<text>¥</text>
											<text>{{item.price}}</text>
										</view>
									</view>
								</template>
								<view class="child_item"
									v-if="item.consumeRegisterDeatail&&item.consumeRegisterDeatail.length>0">
									<view class="pb_con" v-for="(item,index) in item.consumeRegisterDeatail"
										:key="index">
										<text>{{item.costTypeName}}</text>
										<view class="" style="font-weight: 400;">
											<text style="font-weight: 400;font-size: 28rpx;">¥</text>
											<text style="font-weight: 400;font-size: 28rpx;">{{item.price}}</text>
										</view>
									</view>
								</view>
							</uni-collapse-item>
						</uni-collapse>
					</view>

					<!-- <template v-if="current == 0">
						<view class="inner_item" v-for="(item,index) in detail.billDetail" :key="index"
							@tap="item.isOpen = !item.isOpen">
							<view class="pb_con">
								<text>{{item.insCostTypeName}}</text>
								<view class="">
									<text>¥</text>
									<text>{{item.price}}</text>
								</view>
							</view>
							<view class="child_item"
								v-if="item.consumeRegisterDeatail&&item.consumeRegisterDeatail.length>0&&item.isOpen">
								<view class="pb_con" v-for="(item,index) in detail.billDetail" :key="index">
									<text>{{item.insCostTypeName}}</text>
									<view class="">
										<text>¥</text>
										<text>{{item.price}}</text>
									</view>
								</view>
							</view>
						</view>
					</template> -->

					<view class="pb_con">
						<text>合计</text>
						<view class="">
							<text>¥</text>
							<text>{{detailPre.billPrice}}</text>
						</view>
					</view>
				</template>
				<template v-if="current == 0&&detail&&detail.billDetail.length">
					<view class="pb_title">
						<text>预缴账单月份</text>
						<view class="">
							<text>{{detail.billDate}}</text>
							<text>月</text>
						</view>
					</view>
					<view class="pb_con" v-for="(item,index) in detail.billDetail" :key="index">
						<text>{{item.insCostTypeName}}</text>
						<view class="">
							<text>¥</text>
							<text>{{item.price}}</text>
						</view>
					</view>
					<view class="pb_con">
						<text>合计</text>
						<view class="">
							<text>¥</text>
							<text>{{detail.billPrice}}</text>
						</view>
					</view>
				</template>

			</view>

			<view class="could_pay_amount" v-if="detail&&detail.billDetail.length">
				<view class="pb_con">
					<text>本次需预缴金额</text>
					<view class="">
						<text>¥</text>
						<text>{{finalPay}}</text>
					</view>
				</view>
				<view class="field flex-items-center flex-justify-between" style="justify-content: space-between;">
					<text style="margin-right: 20rpx;font-size: 16px;
    color: #38322F;
    line-height: 22px;">本次充值金额 </text>
					<input class="uni-input" type="digit" v-model="changeValue"
						placeholder-style="font-size:30rpx;color:rgba(56,50,47,0.5);font-weight:400;"
						placeholder="输入其他金额" />
				</view>
			</view>

			<view class="btn" v-if="detail&&detail.billDetail.length">
				<u-button type="primary" @click="payAmount"
					:custom-style="{background:'rgba(252, 106, 30, 1)',fontSize:'34rpx',height: '88rpx'}">{{btnAct}}</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import Api from '@/common/api.js'
	var wx = require('jweixin-module')

	export default {
		components: {},
		data() {
			return {
				title: '预缴金额账单详情',
				btnAct: '进行充值缴费',
				personId: '',
				detail: '',
				detailPre:'',
				baseInfo: {},
				changeValue: '',
				finalPay: 0,
				list: [{
						name: '当月预缴'
					},
					{
						name: '上月账单'
					}
				],
				current: 0
			}
		},
		async onLoad(e) {
			console.log(encodeURIComponent(window.location.href))
			if (e.personId) {
				this.personId = e.personId
				await this.getPersonBillDetail()
				await this.getPersonBillDetailPre()
				this.getSignature()
			}
			if (e.info) {
				this.baseInfo = JSON.parse(e.info)
			}

		},
		onShow() {
			// this.getAppLastVersion();

		},
		onHide() {

		},
		methods: {
			sectionChange(index) {
				this.current = index;
			},
			initSdk(info) {
				this.infos = info
				console.log(info, window.location.href, encodeURIComponent(window.location.href))
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: Api.appId, // 必填，公众号的唯一标识
					timestamp: info.timestamp, // 必填，生成签名的时间戳
					nonceStr: info.nonce, // 必填，生成签名的随机串
					signature: info.signature, // 必填，签名
					jsApiList: ['chooseWXPay'], // 必填，需要使用的JS接口列表
					success: (res) => {
						console.log(res)

						// wx.ready(() => {

						// })
					},
					fail: function(res) {
						console.log(res);
					}
				});
			},
			goBack() {
				let canNavBack = getCurrentPages()
				if (canNavBack && canNavBack.length > 1) {
					uni.navigateBack()
				} else {
					history.back();
				}
			},
			async getPersonBillDetail() {

				let params = {
					personId: this.personId,
				}
				let data = await Api.apiCall('get', Api.api.getBillYuGuDetailByPersonId, params, true)
				console.log(data);
				if (data && data.data) {
					
					this.detail = data.data
					// this.detail.personBalance = 9999
					let dd = this.detail.personBalance - this.detail.billPrice
					if ((this.detail.personBalance - this.detail.billPrice) > 0) {
						this.finalPay = 0
					} else {
						this.finalPay = Math.abs((this.detail.personBalance - this.detail.billPrice).toFixed(2))
					}
				} else {
					uni.showToast({
						title: '错误',
						icon: 'error'
					})
				}

			},
			async getPersonBillDetailPre() {
			
				let params = {
					personId: this.personId,
				}
				// let data = await Api.apiCall('get', Api.api.getBillYuGuDetailByPersonId, params, true)
				let data = await Api.apiCall('get', Api.api.getBillDetailByPersonId, params, true)
				console.log(data);
				if (data && data.data) {
					// this.detail = data.data
					let datas = data.data
					// let data = {
					// 	"billId": 637225,
					// 	"personId": 192768,
					// 	"identity": "066666",
					// 	"bedName": "3",
					// 	"billDeposit": "0.00",
					// 	"perosnName": "孙浩铭",
					// 	"isCheckName": "已核对 ",
					// 	"isCheck": 2,
					// 	"billPrice": "6831.00",
					// 	"billDate": "2023-08",
					// 	"startDate": "2023-08-01",
					// 	"endDate": "2023-08-31",
					// 	"remak": "",
					// 	"countDay": "31",
					// 	"billDetail": [{
					// 		"billDetailId": 5221454,
					// 		"insCostTypeId": 1336,
					// 		"insCostTypeName": "护理费",
					// 		"price": "1860.00",
					// 		"checkPrice": "1860.00",
					// 		"newCheckPrice": "1860.00",
					// 		"isCheck": 0,
					// 		"type": 1,
					// 		"afkPrice": "0.00"
					// 	}, {
					// 		"billDetailId": 5221455,
					// 		"insCostTypeId": 1338,
					// 		"insCostTypeName": "餐饮费",
					// 		"price": "930.00",
					// 		"checkPrice": "930.00",
					// 		"newCheckPrice": "930.00",
					// 		"isCheck": 0,
					// 		"type": 1,
					// 		"afkPrice": "0.00"
					// 	}, {
					// 		"billDetailId": 5221456,
					// 		"insCostTypeId": 1337,
					// 		"insCostTypeName": "床位费",
					// 		"price": "3100.00",
					// 		"checkPrice": "3100.00",
					// 		"newCheckPrice": "3100.00",
					// 		"isCheck": 0,
					// 		"type": 1,
					// 		"afkPrice": "0.00"
					// 	}, {
					// 		"billDetailId": 5221457,
					// 		"insCostTypeId": 2146,
					// 		"insCostTypeName": "水费费用",
					// 		"price": "341.00",
					// 		"checkPrice": "341.00",
					// 		"newCheckPrice": "341.00",
					// 		"isCheck": 0,
					// 		"type": 1,
					// 		"afkPrice": "0.00"
					// 	}, {
					// 		"billDetailId": 5221458,
					// 		"insCostTypeId": 2239,
					// 		"insCostTypeName": "电费费用",
					// 		"price": "0.00",
					// 		"checkPrice": "0.00",
					// 		"newCheckPrice": "0.00",
					// 		"isCheck": 0,
					// 		"type": 1,
					// 		"afkPrice": "0.00"
					// 	}, {
					// 		"billDetailId": 5221459,
					// 		"insCostTypeId": "",
					// 		"insCostTypeName": "代收代付",
					// 		"price": "0.00",
					// 		"checkPrice": "0.00",
					// 		"newCheckPrice": "0.00",
					// 		"isCheck": 0,
					// 		"type": 4,
					// 		"afkPrice": "0.00"
					// 	}, {
					// 		"billDetailId": 5221460,
					// 		"insCostTypeId": "",
					// 		"insCostTypeName": "临时收费",
					// 		"consumeRegisterDeatail": [],
					// 		"price": "0.00",
					// 		"checkPrice": "0.00",
					// 		"newCheckPrice": "0.00",
					// 		"isCheck": 0,
					// 		"type": 5,
					// 		"afkPrice": "0.00"
					// 	}, {
					// 		"billDetailId": 5221461,
					// 		"insCostTypeId": "",
					// 		"insCostTypeName": "临时收费-节假日收费(月结)",
					// 		"price": "100.00",
					// 		"checkPrice": "100.00",
					// 		"newCheckPrice": "100.00",
					// 		"isCheck": 0,
					// 		"type": 13,
					// 		"afkPrice": "0.00"
					// 	}, {
					// 		"billDetailId": 5221462,
					// 		"insCostTypeId": "",
					// 		"insCostTypeName": "临时收费-已结算(不计入账单)",
					// 		"consumeRegisterDeatail": [{
					// 			"costTypeName": "医疗消费",
					// 			"price": "1.00",
					// 			"date": "2023-05-17",
					// 			"type": 1,
					// 			"remark": "孙浩铭长者于2023-05-17 15:58:37导入医疗消费1.00元,月份:2023-05"
					// 		}, {
					// 			"costTypeName": "医疗消费",
					// 			"price": "2.00",
					// 			"date": "2023-05-17",
					// 			"type": 1,
					// 			"remark": "孙浩铭长者于2023-05-17 16:06:58导入医疗消费2.00元,月份:2023-05"
					// 		}],
					// 		"price": "3.00",
					// 		"checkPrice": "3.00",
					// 		"newCheckPrice": "3.00",
					// 		"isCheck": 0,
					// 		"type": 6,
					// 		"afkPrice": "0.00"
					// 	}]
					// }
					datas.billDetail.forEach(item => {
						item.isOpen = false
					})
					this.detailPre = datas
					// this.detail.personBalance = 9999
				} else {
					uni.showToast({
						title: '错误',
						icon: 'error'
					})
				}
			
			},
			async getSignature() {
				let params = {
					url: encodeURIComponent(window.location.href)
				}
				let data = await Api.apiCall('get', Api.api.getWxTicket, params, true)
				console.log(data);
				if (data) {
					let payInfo = data.data
					this.initSdk(payInfo)
				} else {
					uni.showToast({
						title: '错误',
						icon: 'error'
					})
				}

			},
			async payAmount() {
				if(this.finalPay <= 0&&(!this.changeValue.trim() || this.changeValue.trim() == 0)){
					uni.showModal({
						title:'温馨提示',
						content:'账户余额充足无需缴费,如想要充值,您可手动填入其他充值金额',
						confirmText:'好的'
					})
					return
				}
				wx.ready(res => {
					wx.checkJsApi({
						jsApiList: ['chooseWXPay'],
						success: res => {
							console.log('checked api:', res)
						},
						fail: err => {
							console.log('check api fail:', err)
						}
					})
				})
				if (!this.changeValue.trim() || this.changeValue.trim() == 0) {
					uni.showModal({
						title: '提醒',
						content: `本次账单费用应缴${this.finalPay}元,是否确认缴费!`,
						success: async (res) => {
							if (res.confirm) {
								if (this.finalPay > 0) {
									let params = {
										price: this.finalPay,
										openId: uni.getStorageSync('openid'),
										personId: this.personId,
										url: encodeURIComponent(window.location.href)
									}
									let data = await Api.apiCall('get', Api.api.addTracelessOrderForH5,
										params,
										true)
									if (data) {
										let payInfo = data.data
										wx.chooseWXPay({
											timestamp: payInfo.timeStamp, // 时间戳
											nonceStr: payInfo.nonceStr, // 随机数
											package: payInfo.package, //订单详情扩展字符串
											signType: 'MD5',
											paySign: payInfo.paySign, // 签名
											success: () => {
												this.$u.toast("支付成功!")
												setTimeout(() => {
													// uni.navigateBack()
												}, 1500);
											},
											cancel: function() {
												this.$u.toast("取消支付")
											},
											fail: function() {
												this.$u.toast("支付失败")
											}
										})
									}
								} else {
									this.$u.toast("支付成功!")
								}

							}

						}
					})

				} else {
					let params = {
						price: this.changeValue.trim(),
						openId: uni.getStorageSync('openid'),
						personId: this.personId,
						url: encodeURIComponent(window.location.href)
					}
					let data = await Api.apiCall('get', Api.api.addTracelessOrderForH5, params, true)
					if (data) {
						let payInfo = data.data
						wx.chooseWXPay({
							timestamp: payInfo.timeStamp, // 时间戳
							nonceStr: payInfo.nonceStr, // 随机数
							package: payInfo.package, //订单详情扩展字符串
							signType: 'MD5',
							paySign: payInfo.paySign, // 签名
							success: () => {
								this.$u.toast("支付成功!")
								setTimeout(() => {
									// uni.navigateBack()
								}, 1500);
							},
							cancel: function() {
								this.$u.toast("取消支付")
							},
							fail: function() {
								this.$u.toast("支付失败")
							}
						})
					}
				}
			},

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

			.inner_item {
				.child_item {
					padding: 0 0 0 32rpx;
					background: rgb(255, 247, 237);

					.pb_con {
						padding: 0 40rpx;
						display: flex;
						justify-content: space-between;
						width: 100%;
						height: fit-content;
						padding-bottom: 8rpx;
						padding-top: 8rpx;
						border-bottom: 1rpx solid rgba(56, 50, 47, 0.10);

						&>text {
							// height: 45rpx;
							font-size: 28rpx;
							color: #38322F;
							line-height: 45rpx;
						}

						&>view {
							&>text:first-child {
								// height: 33rpx;
								font-size: 22rpx;
								color: #38322F;
								line-height: 33rpx;
							}

							&>text:last-child {
								// height: 45rpx;
								font-size: 28rpx;
								color: #38322F;
								line-height: 45rpx;
							}
						}
					}
				}
			}

			.pb_con {
				padding: 0 40rpx;
				display: flex;
				justify-content: space-between;
				width: 100%;
				height: fit-content;
				padding-bottom: 25rpx;
				padding-top: 28rpx;
				border-bottom: 1rpx solid rgba(56, 50, 47, 0.10);

				&>text {
					// height: 45rpx;
					font-size: 32rpx;
					color: #38322F;
					line-height: 45rpx;
				}

				&>view {
					&>text:first-child {
						// height: 33rpx;
						font-size: 24rpx;
						color: #38322F;
						line-height: 33rpx;
					}

					&>text:last-child {
						// height: 45rpx;
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



	.ccclose {
		.pb_con {
			padding: 0 40rpx;
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: fit-content;
			padding-bottom: 25rpx;
			padding-top: 28rpx;
			border-bottom: 1rpx solid rgba(56, 50, 47, 0.10);

			&>text {
				// height: 45rpx;
				font-size: 32rpx;
				color: #38322F;
				line-height: 45rpx;
			}

			&>view {
				&>text:first-child {
					// height: 33rpx;
					font-size: 24rpx;
					color: #38322F;
					line-height: 33rpx;
				}

				&>text:last-child {
					// height: 45rpx;
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
					// font-weight: 500;
				}

				&>text:last-child {
					height: 45rpx;
					font-size: 32rpx;
					color: #38322F;
					line-height: 45rpx;
					// font-weight: 500;
				}
			}
		}

		.child_item {
			padding: 0 0 0 32rpx;
			background: rgb(255, 247, 237);

			.pb_con {
				padding: 0 40rpx;
				display: flex;
				justify-content: space-between;
				width: 100%;
				height: fit-content;
				padding-bottom: 8rpx;
				padding-top: 8rpx;
				border-bottom: 1rpx solid rgba(56, 50, 47, 0.10);

				&>text {
					// height: 45rpx;
					font-size: 28rpx;
					color: #38322F;
					line-height: 45rpx;
				}

				&>view {
					&>text:first-child {
						// height: 33rpx;
						font-size: 22rpx;
						color: #38322F;
						line-height: 33rpx;
					}

					&>text:last-child {
						// height: 45rpx;
						font-size: 28rpx;
						color: #38322F;
						line-height: 45rpx;
					}
				}
			}
		}

		/deep/ .uni-collapse-item__title-arrow {
			margin-right: 10rpx;
		}
	}
</style>