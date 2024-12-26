<template>
	<view class="indexContainer">
		<view class="navibar">
			<image @tap="goBack" src="https://xbx.obs.myhuaweicloud.com/jorujiahu/H5/bindOlder/navibackicon.png"
				mode=""></image>
			<view class="naviTitle">
				查询家属
			</view>
		</view>
		<view class="query_img">
			<view class="label">
				客户姓名
			</view>
			<view class="field">
				<input class="uni-input" v-model="name"
					placeholder-style="font-size:30rpx;color:rgba(56,50,47,0.5);font-weight:400;"
					placeholder="请输入客户姓名" />
			</view>
			<view class="label" style="margin-top: 40rpx;">
				身份证号
			</view>
			<view class="field">
				<input class="uni-input" v-model="idcard"
					placeholder-style="font-size:30rpx;color:rgba(56,50,47,0.5);font-weight:400;"
					placeholder="请输入身份证号" />
			</view>
			<view class="btn">
				<u-button @click="handleSumbit" type="primary"
					:custom-style="{background:'rgba(252, 106, 30, 1)',fontSize:'34rpx',height: '88rpx'}">查询老人</u-button>
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
				name: '',
				idcard: '',
				appid: "wx8ec95e2b2902127e",
				openid: "",
				type: 1, //0未登录、1登陆成功、2异常
				isquery: false
			}
		},
		onLoad(e) {
			console.log(e);
			// uni.setStorageSync("openid",'orOjO6PF3jHN4Dnr-sQu9Au36iog')
			if (e.query) {
				debugger
				console.log(e.query);
				this.isquery = true
			} else {
				uni.showLoading({
					title: '查询家属列表中',
					mask: true,
				})
				this.getCode()
			}
		},
		onShow() {
			console.log(this.isquery,uni.getStorageSync('openid'));
			if (this.isquery && uni.getStorageSync('openid')) {
			
			} else if (uni.getStorageSync('openid')) {
				uni.showLoading({
					title: '查询家属列表中',
					mask: true,
				})
				this.getBindList()
			} else {

			}
			// this.getAppLastVersion();

		},
		onHide() {

		},
		methods: {
			...mapMutations(['login', 'setReceiveStatus']),
			async getBindList() {//获取绑定列表
				let params = {
					openId: uni.getStorageSync('openid'),
				}
				let data = await Api.apiCall('get', Api.api.getPersonListByOpenId, params, true)
				console.log(data);
				if (data) { //判断是否有已绑定的老人，有就直接跳转到家属列表没有就停留当前页
					if (data.data.length) {
						uni.navigateTo({
							url:'/pages/familyBindList/familyBindList'
						})
					} else {
						uni.hideLoading()
						// uni.showToast({
						// 	title: '暂无家属',
						// 	icon: 'error'
						// })
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
			getCode() {
				let appid = this.appid; //个人开发者appid
				// let redirect = encodeURIComponent(window.location.href); //重定向回来的地址
				let redirect = encodeURIComponent('http://t797zg.natappfree.cc/'); //重定向回来的地址
				console.log(redirect);
				let wx_code = this.getUrlParam("code"); // 截取url中的code
				//判断有没有code
				if (!wx_code) {
					//获取code的地址。获取成功重定向后地址栏中将会带有code，判断没有code的话，就跳转到微信官方链接上获取，获取成功后会再重定向回来，注意url是需要使用encodeURIComponent处理一下编码的
					window.location.href =
						`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
				} else {
					// 获取到了code
					this.getOpenId(wx_code); //把code传给后台获取用户信息
				}
			},
			async getOpenId(code) {
				//这里调用后端给的接口吧code传过去就好了
				let params = {
					code: code,
					state: 'STATE',
					type: 1
				}
				let data = await Api.apiCall('get', Api.api.getWxOpenId, params, true)
				console.log(data);
				if (data && data.data.openid) {
					this.type = data.data.islogin || '';
					this.openid = data.data.openid;
					uni.setStorageSync("openid", data.data.openid)
					this.getBindList()
					console.log(this.openid, data);
				} else {
					this.type = 2;
					uni.showToast({
						title: '登陆错误，请联系管理员！',
						icon: 'error'
					})
				}
			},
			goBack() {
				let canNavBack = getCurrentPages()
				if(canNavBack && canNavBack.length>1) {  
				    uni.navigateBack() 
				} else {  
				    history.back();  
				}
			},
			getUrlParam: function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return unescape(r[2]);
				return null;
			},
			async getOlderList() {
				let params = {
					code: code,
					state: 'STATE',
					type: 1
				}
				let data = await Api.apiCall('get', Api.api.getWxOpenId, params, true)
				console.log(data);
				if (data && data.data.openid) {
					this.type = data.data.islogin || '';
					this.openid = data.data.openid;
					uni.setStorageSync("openid", data.data.openid)
					console.log(this.openid, data);
				} else {
					this.type = 2;
					uni.showToast({
						title: '登陆错误，请联系管理员！',
						icon: 'error'
					})
				}
			},
			async handleSumbit() {
				if (!this.name.trim()) {
					uni.showToast({
						title: '请输入姓名',
						icon: 'none'
					})
					return
				}
				if (!this.$u.test.chinese(this.name.trim())) {
					uni.showToast({
						title: '请输入正确的姓名',
						icon: 'none'
					})
					return
				}
				if (!this.idcard.trim()) {
					uni.showToast({
						title: '请输入身份证号',
						icon: 'none'
					})
					return
				}

				if (!this.$u.test.idCard(this.idcard.trim())) {
					uni.showToast({
						title: '请输入正确的身份证号',
						icon: 'none'
					})
					return
				}
				let params = {
					name: this.name.trim(),
					identity: this.idcard.trim(),
				}
				let res = await Api.apiCall('get', Api.api.getPersonInfoByNameAndIdentity, params, true)
				console.log(res);
				if(res.data&&res.data.length){
					uni.navigateTo({
						url:`/pages/familyBindList/familyBindList?dataJson=${JSON.stringify(res.data)}&isQuery=1`
					})
				}else{
					uni.showToast({
						title: '暂未查询到老人',
						icon: 'none'
					})
				}
				// uni.navigateTo({
				// 	url:`/pages/familyBindList/familyBindList?dataJson=${JSON.stringify([{},{}])}&isQuery=1`
				// })
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
		background: url(https://xbx.obs.myhuaweicloud.com/jorujiahu/H5/bindOlder/bind_bg.png) no-repeat;
		background-size: 100% 701rpx;
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

	.query_img {
		width: 100%;
		height: calc(100vh - 557rpx);
		position: absolute;
		bottom: 0%;
		background: #FFFFFF;
		border-radius: 40rpx 40rpx 0rpx 0rpx;
		padding: 55rpx 50rpx;

		.label {
			height: 48rpx;
			font-weight: 500;
			font-size: 34rpx;
			color: #38322F;
			line-height: 48rpx;
		}

		.field {
			margin-top: 20rpx;

			.uni-input {
				width: 100%;
				height: 88rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 6rpx 0rpx #E4E3E3;
				border-radius: 6rpx;
				border: 1rpx solid rgba(56, 50, 47, 0.2);
				padding-left: 20rpx;
			}
		}

		.btn {
			box-shadow: 0rpx 4rpx 10rpx 0rpx #FFAE83;
			border-radius: 6rpx;
			position: absolute;
			bottom: 127rpx;
			left: 50rpx;
			height: 86rpx;
			width: 650rpx;
		}
	}
</style>