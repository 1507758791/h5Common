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
			<template v-if="isQuery">
				<view class="list_opt" v-for="(item,index) in needBindlist" :key="index" @tap="activeIndex = index"
					:style="activeIndex == index?'border:4rpx dashed #FE6001':''">
					<image :src="item.portraitPic?item.portraitPic:'https://xbx.obs.myhuaweicloud.com/jorujiahu/H5/bindOlder/headimg_default.png'" mode="">
					</image>
					<view class="opt_item">
						<view class="name_care_level">
							<text>{{item.personName}}</text>
							<view class="">
								{{item.nurseLevelName}}
							</view>
						</view>

						<view class="lebel_desc">
							<text>身份证号：</text>
							<view class="one_ellipsis">
								{{item.identity}}
							</view>
						</view>
						<view class="lebel_desc" style="margin-top: 15rpx;">
							<text>所属机构：</text>
							<view class="one_ellipsis">
								{{item.institutionName}}
							</view>
						</view>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="list_opt" :style="item.isTui == 1?'background:#d2d2d2;opacity:0.7;':''" v-for="(item,index) in list" :key="index"
					@tap="item.isTui == 1?'':$u.route('/pages/preBillDetail/preBillDetail?personId='+item.personId+'&info='+ JSON.stringify(item))">
					<image :src="item.portraitPic?item.portraitPic:'https://xbx.obs.myhuaweicloud.com/jorujiahu/H5/bindOlder/headimg_default.png'" mode="">
					</image>
					<view class="opt_item">
						<view class="name_care_level">
							<text>{{item.name}}</text>
							<view class="">
								{{item.nurseLevel}}
							</view>
						</view>

						<view class="lebel_desc">
							<text>身份证号：</text>
							<view class="one_ellipsis">
								{{item.identity}}
							</view>
						</view>
						<view class="lebel_desc" style="margin-top: 15rpx;">
							<text>所属机构：</text>
							<view class="one_ellipsis">
								{{item.insName}}
							</view>
						</view>
					</view>
				</view>
			</template>



			<view class="btn" v-if="isQuery">
				<u-button type="primary" @click="bindOlder"
					:custom-style="{background:'rgba(252, 106, 30, 1)',fontSize:'34rpx',height: '88rpx'}">{{btnAct}}</u-button>
			</view>
			<view class="btn" v-if="!isQuery">
				<u-button type="primary" @click="addBind"
					:custom-style="{background:'rgba(252, 106, 30, 1)',fontSize:'34rpx',height: '88rpx'}">添加绑定</u-button>
			</view>
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
				title: '',
				btnAct: '绑定老人',
				list: [],
				needBindlist: [],
				activeIndex: 0,
				isQuery: false,
			}
		},
		onLoad(e) {
			// window.location.h
			if (e.isQuery) {
				this.isQuery = true
			}
			if (e.dataJson) {
				this.needBindlist = JSON.parse(e.dataJson)
			}
			console.log(window.location.href);
			// this.getFamilyList()
		},
		onShow() {
			if(!this.isQuery){
				this.getFamilyList()
			}
			// this.getAppLastVersion();
			this.isQuery ? this.title = '家属绑定' : this.title = '家属列表'
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
			addBind(){
				// this.$u.route('/pages/newIndex/newIndex?query=1')
				uni.navigateTo({
					url:'/pages/bindFamily/bindFamily?query=1'
				})
			},
			async getFamilyList() { //获取绑定列表
				let params = {
					openId: uni.getStorageSync('openid'),
				}
				let data = await Api.apiCall('get', Api.api.getPersonListByOpenId, params, true)
				console.log(data);
				if (data) {
					if (data.data.length) {
						this.list = data.data
					} else {
						uni.hideLoading()
						uni.showToast({
							title: '暂未查询到家属，请稍后再重新进入',
							icon: 'error'
						})
					}
					console.log(this.openid, data);

				} else {
					this.type = 2;
					uni.showToast({
						title: '服务器错误',
						icon: 'error'
					})
					uni.hideLoading()

				}
			},
			async bindOlderOk() {
				let params = {
					openId: uni.getStorageSync('openid'),
					personId: this.needBindlist[this.activeIndex].personId,
				}
				let that = this
				let res = await Api.apiCall('get', Api.api.wxSaveBindPerson, params, true)
				console.log(res);
				if (res) {
					uni.showModal({
						title: '温馨提醒',
						content: '绑定成功，点击确定前往查看家属列表',
						showCancel: false,
						success(res) {
							if (res.confirm) {
								uni.reLaunch({
									url:'/pages/familyBindList/familyBindList'
								})
							}
						}
					})
				}
			},
			bindOlder() {
				let that = this
				uni.showModal({
					title: '温馨提醒',
					content: '是否绑定当前选中老人',
					success(res) {
						if (res.confirm) {
							that.bindOlderOk()
						}
					}
				})

			}

		},
		mounted() {},
	}
</script>
<style>
	page {
		background: rgba(242, 247, 253, 1);
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
			height: 622rpx;
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
		background: #F2F2F2;
		border-radius: 40rpx 40rpx 0rpx 0rpx;
		position: absolute;
		bottom: 0%;
		z-index: 2;
		padding: 36rpx 30rpx 260rpx;
		overflow: scroll;

		.list_opt {
			width: 100%;
			height: 221rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 4rpx 8rpx 0rpx #EDEAE8;
			border-radius: 10rpx;
			padding: 30rpx;
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;

			&>image {
				width: 120rpx;
				height: 120rpx;
				margin-right: 20rpx;
				border-radius: 50%;
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
			}
		}
	}
</style>