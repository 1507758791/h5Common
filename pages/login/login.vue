<template>
	<view class="login-page" v-if='viewShow'>
		<view class="cuIcon-back" @tap="back"></view>
		<image src="/static/img/login/bg3.png" class="bg1"></image>
		<view class="logoBox">
			<image src="/static/img/login/logo.png" class="logo"></image>
		</view>
		<view class="loginBox">
			<view class="nav-tab">
				<!-- <view class="tab-item" @tap="handleChangeTab(0)">
					<view class="tab-name" :style="tabIndex==0?'color: #0E1019':''">手机号登录</view>
					<view class="line" v-if="tabIndex==0"></view>
				</view> -->
				<view class="tab-item" @tap="handleChangeTab(1)">
					<view class="tab-name" :style="tabIndex==1?'color: #0E1019':''">账号登录</view>
					<view class="line" v-if="tabIndex==1" style="width: 140rpx;"></view>
				</view>
			</view>
			<view class="login-form">
				<view class="form-item" v-if="tabIndex==0">
					<image src="/static/img/login/phone.png"></image>
					<input placeholder="请输入手机号" @input="phoneInput" type="number" maxlength="11" />
					<view class="err-message" v-if="phoneErr">{{isPhoneText}}</view>
				</view>
				<view class="yzm-box" v-if="tabIndex==0">
					<view class="ver-code form-item" style="margin-bottom: 0;">
						<image src="/static/img/login/lock.png" style="height: 34rpx;margin-top: 15rpx;"></image>
						<input placeholder="请输入验证码" @input="codeInput" type="number" />
						<view class="err-message" v-if="codeErr">请输入验证码</view>
					</view>
					<view class="codeBtn" @tap="getCode" :class="codeTime != 60 ? 'form-btn-disable':''">{{getcode}}
					</view>
				</view>
				<view class="form-item" v-if="tabIndex==1">
					<image src="/static/img/login/phone.png" style="height: 34rpx;margin-top: 15rpx;"></image>
					<input placeholder="请输入账号" placeholder-style="color:#DCDCDC" @input="accountInput" />
					<view class="err-message" v-if="accountErr">请输入账号</view>
				</view>
				<view class="form-item" v-if="tabIndex==1">
					<image src="/static/img/login/lock.png" style="height: 34rpx;margin-top: 15rpx;"></image>
					<input placeholder="请输入密码" placeholder-style="color:#DCDCDC" style="padding-right: 160rpx;"
						@input="passwordInput" type="password" />
					<view class="err-message" v-if="passwordErr">{{isPasswordText}}</view>
					<!-- <view class="forgetPwd" @click="goResetPwd">忘记密码</view> -->
				</view>
				<button class="form-btn" :style="isLogin ? 'background:rgba(255,112,0,0.5)' : ''" :loading="isLogin"
					:disabled="isLogin" @tap="handleLogin">
					登 录
				</button>
				<view class="checkedYs">
					<text class="checkedIcon" :class="checked?'cuIcon-squarecheck':'cuIcon-square'"
						@tap="handleChecked"></text>
					登录代表同意
					<text @tap="toyx(1)">《用户协议》</text>
					<text @tap="toyx(2)">《隐私条款》</text>
					<!-- <text @click="goReg" class="checkedYsReg">马上注册</text> -->
				</view>

			</view>
		</view>
	</view>

</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex';
	import Api from '@/common/api.js'
	export default {
		data() {
			return {
				tabIndex: 1,
				checked: false,
				isLogin: false,
				form: {
					phone: '',
					code: '',
					password: '',
					account: ''
				},
				phoneErr: false,
				isPhoneText: '',
				codeErr: false,
				passwordErr: false,
				accountErr: false,
				isPasswordText: '',
				getcode: '获取验证码',
				codeTime: 60,
				viewShow: false,
				messageNum: 0,
				nextSeq: 0,
				tabNum: 0
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'statusBar'])
		},
		onLoad() {
			// console.log(this.hasLogin)
			// if(this.hasLogin){
			// 	uni.switchTab({
			// 		url:'/pages/index/index/index'
			// 	})
			// }
			this.viewShow = (uni.getStorageSync('username') ? false : true)
			if (uni.getStorageSync('username')) {
				this.form.account = uni.getStorageSync('username')
				this.form.password = uni.getStorageSync('password')
				this.loginForPassword()
			}

		},
		onShow() {
			// if(uni.getStorageSync('username')){
			// 	this.form.account=uni.getStorageSync('username')
			// 	this.form.password=uni.getStorageSync('password')
			// 	this.loginForPassword()
			// }
			plus.screen.lockOrientation('portrait-primary');
		},
		onHide() {
			plus.screen.unlockOrientation();
			plus.screen.lockOrientation('portrait-primary');
		},
		methods: {
			...mapMutations(['login', 'setReceiveStatus']),
			// 登录tab切换
			handleChangeTab(i) {
				this.tabIndex = i
			},
			goReg() {
				uni.navigateTo({
					url: '/pages/login/register'
				})
			},
			back() {
				let canNavBack = getCurrentPages()
				if(canNavBack && canNavBack.length>1) {  
				    uni.navigateBack() 
				} else {  
				    history.back();  
				}
			},
			// 勾选协议
			handleChecked() {
				this.checked = !this.checked
			},
			goResetPwd() {
				this.$util.navigateToPage('/pages/login/resetPwd')
			},
			// 登录
			handleLogin() {
				// console.log(uni.getStorageSync('clinetId'))
				console.log(this.form)

				if (this.tabIndex == 0) {
					if (!this.form.phone) {
						this.isPhoneText = '请输入手机号码';
						this.phoneErr = true;
					}
					if (!this.form.code) {
						this.codeErr = true;
					}
					if (!this.phoneErr && !this.codeErr) {
						this.isLogin = true
						this.loginForCode()
					}
				} else {
					if (!this.form.account) {
						this.isPhoneText = '请输入账号';
						this.accountErr = true;
						return false;
					}
					if (!this.form.password) {
						this.passwordErr = true;
						this.isPasswordText = '请输入密码'
						return false;
					}
					if (!this.checked) {
						uni.showToast({
							title: '请先勾选同意隐私协议',
							icon: 'none'
						});
						return false;
					}
					if (!this.phoneErr && !this.passwordErr) {
						this.isLogin = true
						this.loginForPassword()
					}
				}
			},
			// 密码登入
			async loginForPassword() {
				let clientId = 1212
				//#ifdef APP-PLUS
				var info = plus.push.getClientInfo();
				clientId = info.clientid;
				//#endif

				// ,cid:info.clientid
				// console.log('cid='+info.clientid)
				// let params = {  username: this.form.account, password: this.form.password,loginType:0,cid:clientId
				// };
				let params = {
					loginName: this.form.account,
					password: this.form.password
				};
				// params.contentType="application/json";
				console.log(params);
				let data = await Api.apiCallJoRu('post', Api.api.passwordLogin, params);
				console.log(data)
				
				if (data) {
					data.belongto ? '' : data.belongto = '/static/img/noPic/210.png';
					if (data.belongto) {
						data.belongto = data.belongto
					} else {
						data.belongto = '/static/img/noPic/210.png'
					}
					uni.setStorageSync("servicePersonId", data.servicePersonId);
					uni.setStorageSync("openid", data.openid);
					uni.setStorageSync("insId", data.insId);
					uni.setStorageSync("role", data.institutionType);
					
					uni.setStorageSync("actionCode", 0);
					uni.setStorageSync("loginId",  this.form.account);
					uni.setStorageSync("passWd", this.form.password);
					uni.setStorageSync("ldName", data.enpName);
					uni.setStorageSync("accessToken", data.accessToken);
					uni.setStorageSync("info", data);
					let typeData = await Api.apiCall('get', Api.api.instInfo, {openId: data.openid});
					if(typeData){
						uni.setStorageSync("roleType", typeData.storeType);//站点
					}
					setTimeout(() => {
						this.isLogin = false;
						// uni.navigateTo({
						// 	url:'/pages/ipad/index/index'
						// })
						if (data.userInfo.storeAdmin == 0 && data.userInfo.siteAdmin == 0 && data.userInfo
							.isSite == 1) {
							uni.navigateTo({
								url: '/pages/ipad/index/index'
							})
						} else {
							uni.switchTab({
								url: '/pages/index/index/index'
							})
						}
					}, 800);
					// if (data.registerFlag) {
					// 	uni.navigateTo({
					// 		url: '/pages/login/authorization'
					// 	})
					// 	return
					// }
					
					console.log(data.userInfo)
					uni.setStorageSync('userInfo', data.userInfo);
					// uni.setStorageSync('storeInfo', data.storeInfo)
					uni.removeStorageSync('pickerSite')
					uni.setStorageSync('token', data.token);
					uni.setStorageSync('username', this.form.account);
					uni.setStorageSync('password', this.form.password);
					// this.getUserSig(data)//即时通讯Im
					this.login(data);
					if (this.viewShow) {
						uni.showToast({
							title: '登录成功',
							icon: 'none'
						});
						this.requestPermission()
					}

					setTimeout(() => {
						this.isLogin = false;
						// uni.navigateTo({
						// 	url:'/pages/ipad/index/index'
						// })
						if (data.userInfo.storeAdmin == 0 && data.userInfo.siteAdmin == 0 && data.userInfo
							.isSite == 1) {
							uni.navigateTo({
								url: '/pages/ipad/index/index'
							})
						} else {
							uni.switchTab({
								url: '/pages/index/index/index'
							})
						}
					}, 800);

				} else {
					// uni.showToast({
					// 	title: '用户名或密码有误',
					// 	icon: 'none'
					// })
					this.viewShow = true
					this.isLogin = false;
				}
			},
			requestPermission() {
				plus.android.requestPermissions(
					["android.permission.ACCESS_FINE_LOCATION", "android.permission.WRITE_EXTERNAL_STORAGE",
						"android.permission.READ_PHONE_STATE"
					],
					function(resultObj) {
						for (var i = 0; i < resultObj.granted.length; i++) {
							var grantedPermission = resultObj.granted[i];
							// console.log('已获取的权限：'+ grantedPermission);
						}
						for (var i = 0; i < resultObj.deniedPresent.length; i++) {
							var deniedPresentPermission = resultObj.deniedPresent[i];
							// console.log('拒绝本次申请的权限：'+ deniedPresentPermission );
						}
						for (var i = 0; i < resultObj.deniedAlways.length; i++) {
							var deniedAlwaysPermission = resultObj.deniedAlways[i];
							// console.log('永久拒绝申请的权限：'+ deniedAlwaysPermission);
						}
						// 若所需权限被永久拒绝,则打开APP设置界面,可以在APP设置界面打开相应权限
						if (resultObj.deniedAlways.length > 0) {
							var Intent = plus.android.importClass("android.content.Intent");
							var Settings = plus.android.importClass("android.provider.Settings");
							var Uri = plus.android.importClass("android.net.Uri");
							var mainActivity = plus.android.runtimeMainActivity();
							var intent = new Intent();
							intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
							var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
							intent.setData(uri);
							mainActivity.startActivity(intent);
						}
					},
					function(error) {
						console.log('申请权限错误：' + error.code + " = " + error.message);
					});
			},
			async getUserSig(info) {
				if (!Api.isChat) {
					return
				}
				console.log(info)
				let params = {
					userId: 'user' + info.userInfo.storeId
				};
				let data = await Api.apiColleCall('get', Api.BASEURI + Api.api.getUmsSig, params);
				if (data) {
					console.log(data, params)
					Api.Im.login({
						userId: 'user' + info.userInfo.storeId,
						userSig: data
					}, (ret) => {
						console.log(ret)
						Api.isLogin = true
						this.getUnreadCount()
						this.setListener()
						this.setUserInfo(info)
					}, (err) => {
						console.log(err)
					});
				}
			},
			setListener() {
				let that = this
				Api.Im.setAdvancedMsgListener({}, ret => {
					that.setReceiveStatus(ret)
					console.log(ret)
					if (ret.message) {
						if (ret.message.msgId) {
							var options = {
								cover: false
							};
							var str = "您收到一条消息";
							plus.push.createMessage(str, "LocalMSG", options);
							that.getUnreadCount()
						}
					} else {}
				});
			},
			async getUnreadCount() {
				this.nextSeq = 0
				let params = {
					baseUrlt: 1
				};

				let data = await Api.apiCall('get', Api.api.getUnreadCount, params);
				if (data || data == 0) {
					if (data == 0) {
						uni.removeTabBarBadge({
							index: 1
						})
					}
					this.messageNum = data
					this.tabNum = this.messageNum
					this.getMessageList()
				} else {
					uni.removeTabBarBadge({
						index: 1
					})
				}
			},
			getMessageList() {
				if (!Api.isLogin) {
					return
				}
				let that = this
				Api.Im.getConversationList({
					nextSeq: that.nextSeq,
					count: 10,
					msgId: ''
				}, ret => {
					// console.log(ret)
					if (ret.conversationList) {
						if (ret.conversationList.length < 1) {
							if (that.tabNum == 0) {
								uni.removeTabBarBadge({
									index: 1
								})
							} else {
								if (that.tabNum > 99) {
									uni.setTabBarBadge({
										index: 1,
										text: '99+'
									})
								} else {
									uni.setTabBarBadge({
										index: 1,
										text: that.tabNum + ''
									})
								}

							}
							return
						}
						ret.conversationList.forEach((item, index) => {
							that.tabNum = that.tabNum + item.unreadCount
						})
						that.nextSeq = ret.nextSeq
						that.getMessageList()
					} else {
						if (that.tabNum == 0) {
							uni.removeTabBarBadge({
								index: 1
							})
						} else {
							if (that.tabNum > 99) {
								uni.setTabBarBadge({
									index: 1,
									text: '99+'
								})
							} else {
								uni.setTabBarBadge({
									index: 1,
									text: that.tabNum + ''
								})
							}

						}
						return
					}

				});
			},
			setUserInfo(info) {
				console.log(info)
				var Im = uni.requireNativePlugin("RY-TencentIM");
				Im.setSelfInfo({
					nickName: info.storeName,
					faceUrl: info.storeLogo
				}, ret => {
					console.log(ret)
					// uni.showToast({
					//     title: JSON.stringify(ret),
					//     icon: "none"
					// });
				});
			},
			// 验证码登入
			async loginForCode() {
				let cid = uni.getStorageSync('clinetId')
				let params = {
					cid: cid,
					phone: this.form.phone,
					code: this.form.code
				};
				// console.log(params);
				let data = await Api.apiCall('post', Api.api.smsCodeLogin, params);
				console.log(data)
				if (data) {
					uni.setStorageSync('phone', this.form.phone);
					uni.setStorageSync('token', data.token);
					this.login(data);
					this.getUserSig(data.userInfo)
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					});
					setTimeout(() => {
						this.isLogin = false;
						this.back();
					}, 800);
				} else {
					uni.showToast({
						title: '验证码错误',
						icon: 'none'
					})
					this.isLogin = false;
				}
			},
			phoneInput(e) {
				var vailPhone =
					/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
				this.form.phone = e.detail.value
				if (vailPhone.test(e.detail.value)) {
					this.phoneErr = false;
				} else {
					this.isPhoneText = '请输入正确的手机号码';
					this.phoneErr = true;
				}
			},
			codeInput(e) {
				this.form.code = e.detail.value
				if (e.detail.value) {
					this.codeErr = false;
				}
			},
			passwordInput(e) {
				this.form.password = e.detail.value
				if (e.detail.value) {
					this.passwordErr = false;
				}
			},
			accountInput(e) {
				this.form.account = e.detail.value
				if (e.detail.value) {
					this.accountErr = false;
				}
			},
			async getCode() {
				if (this.getcode != '获取验证码') return
				if (!this.form.phone || this.phoneErr) {
					this.$api.msg('请输入正确手机号')
					return false
				}
				let params = {
					phone: this.form.phone
				};
				// console.log(params);
				let data = await Api.apiCall('get', Api.api.sendSms, params);
				console.log(data)
				if (data) {
					this.getcode = '60秒'
					this.codeTime--
					var timer = setInterval(() => {
						this.getcode = this.codeTime + '秒'
						this.codeTime--
						if (this.codeTime < 0) {
							this.codeTime = 60
							this.getcode = '获取验证码'
							clearInterval(timer)
						}
					}, 1000)
				}
			},
			toyx(i) {
				if (i == 0) {
					uni.navigateTo({
						url: '../mine/about/ysxy?type=1'
					})
				} else {
					uni.navigateTo({
						url: '../mine/about/ysxy?type=2'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-page {
		width: 100vw;
		height: 100vh;
		background: #fff;

		.bg1 {
			width: 100vw;
			height: 100vw;
			position: absolute;
		}

		.logoBox {
			// display: flex;
			// flex-direction: column;
			// align-items: center;
			// padding-top: 30vw;
			padding: 134rpx 0 0 45rpx;

			.logo {
				width: 200rpx;
				height: 200rpx;
			}
		}

		.loginBox {
			background: #fff;
			padding: 50rpx 70rpx 80rpx;
			border-radius: 16rpx;
			position: relative;
			z-index: 1;

			.nav-tab {
				display: flex;

				// text-align: center;
				.tab-item:first-child {
					// border-right: 2rpx solid #E7E7E7;
				}

				.tab-item {
					flex: 1;
					position: relative;

					.tab-name {
						font-size: 44rpx;
						font-weight: bold;
						color: #0E1019;
						position: relative;
						z-index: 1;
					}

					.active {
						color: #0E1019 !important;
					}

					.line {
						width: 170rpx;
						height: 10rpx;
						// background: linear-gradient(263deg, #FFB55D, #FE8127);
						opacity: 0.8;
						border-radius: 10rpx;
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						bottom: 2rpx;
					}
				}
			}
		}

		.login-form {
			margin-top: 80rpx;

			.yzm-box {
				display: flex;
				text-align: center;

				.codeBtn {
					width: 150rpx;
					height: 70rpx;
					margin-left: 20rpx;
					background: linear-gradient(90deg, #FE700C, #FF8E2C);
					border-radius: 40rpx;
					color: #fff;
					line-height: 70rpx;
					font-size: 22rpx;
				}
			}

			.ver-code {
				width: calc(100% - 170rpx);
			}

			.forgetPwd {
				position: absolute;
				right: 20rpx;
				line-height: 70rpx;
				color: #ff7700;
				z-index: 1;
				font-size: 24rpx;
			}

			.form-item {
				height: 70rpx;
				border: 2rpx solid #D4D4D4;
				border-radius: 40rpx;
				display: flex;
				margin-bottom: 50rpx;
				position: relative;

				image {
					width: 28rpx;
					height: 40rpx;
					margin: 12rpx 16rpx 0 40rpx;
				}

				input {
					text-align: left;
					height: 64rpx;
					font-size: 26rpx;
					width: calc(100% - 70rpx);
					padding-right: 40rpx;
				}
			}

			.form-btn {
				height: 80rpx;
				background: linear-gradient(to right, #FF9546, #FFB260);
				border-radius: 40rpx;
				margin-top: 179rpx;
				height: 80rpx;
				line-height: 80rpx;
				color: #fff;
				font-size: 30rpx;
				font-weight: 500;
			}

			.form-btn::after {
				border: none;
			}

			.form-btn-disable {
				background: #dedee0 !important;
			}

			.checkedYs {
				margin-top: 32rpx;
				margin-left: 44rpx;
				color: #5B5B5B;
				font-size: 20rpx;

				.checkedIcon {
					font-size: 28rpx;
					margin-right: 10rpx;
					position: relative;
					top: 4rpx;
				}

				text {
					color: #FF8221;
				}

				.checkedYsReg {
					margin-left: 20rpx;
				}
			}
		}
	}

	.err-message {
		font-size: 24rpx;
		color: #de1a1a;
		position: absolute;
		bottom: -40rpx;
	}

	.cuIcon-back {
		position: absolute;
		left: 60rpx;
		top: 70rpx;
		font-size: 42rpx;
		color: #fff;
		z-index: 1;
	}
</style>