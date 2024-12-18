<template>
	<view>
		<u-gap height="100"></u-gap>
		<view class="btn" v-if="isShowBtn"  @click="show = true"></view>

		<u-popup v-model="show" mode="bottom" border-radius="20" :closeable="true">
			<view class="popup-title">预约信息</view>
			<view class="popup-form">
				<view class="popup-form-item">
					<view class="popup-form-item-label">预约人姓名</view>
					<view class="popup-form-item-value">
						<u-input v-model="form.appointName" placeholder="请输入预约人姓名" />
					</view>
				</view>
				<view class="popup-form-item">
					<view class="popup-form-item-label">联系电话</view>
					<view class="popup-form-item-value">
						<u-input v-model="form.appointTelephone" maxlength="11" placeholder="请输入联系电话" />
					</view>
				</view>
				<view class="popup-form-item">
					<view class="popup-form-item-label">老人姓名</view>
					<view class="popup-form-item-value">
						<u-input v-model="form.personName" placeholder="请输入老人姓名" />
					</view>
				</view>
				<view class="popup-form-item">
					<view class="popup-form-item-label">老人身份证号</view>
					<view class="popup-form-item-value">
						<u-input v-model="form.personIdcard" @blur="getAge" placeholder="请输入老人身份证号" />
					</view>
				</view>
				<view class="popup-form-item">
					<view class="popup-form-item-label">老人年龄</view>
					<view class="popup-form-item-value">
						<u-input v-model="form.personAge" disabled placeholder="老人年龄(由身份证生成)" />
					</view>
				</view>
				<view class="popup-form-item">
					<view class="popup-form-item-label">老人性别</view>
					<view class="popup-form-item-value">
						<view class="sexs">
							<view class="sex" :class="{ 'active': sexIndex == 1 }" @click="getSex(1)"
								style="margin-right: 20rpx;">
								<v-image style="margin-right: 10rpx;" :src="icon51" width="41.8rpx" height="41.6rpx" />
								男
							</view>
							<view class="sex" :class="{ 'active': sexIndex == 2 }" @click="getSex(2)">
								<v-image style="margin-right: 10rpx;" :src="icon50" width="41.8rpx" height="41.6rpx" />
								女
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="popup-form-item" @click="showCalendar = true">
          <view class="popup-form-item-label">预约时间</view>
          <view class="popup-form-item-value">
            <u-input v-model="form.appointmentTime" disabled placeholder="请选择预约时间" />
            <v-image style="margin-left: 10rpx;" :src="icon52" width="36rpx" height="36rpx" />
          </view>
        </view> -->
				<view class="popup-form-item">
					<view class="popup-form-item-label">老人地址</view>
					<view class="popup-form-item-value">
						<u-input v-model="form.personAddress" placeholder="请输入老人地址" />
					</view>
				</view>
				<!-- <view class="popup-form-item" @click="showSelf = true">
          <view class="popup-form-item-label">老人自理情况</view>
          <view class="popup-form-item-value">
            <u-input v-model="form.selfCareSituation" disabled placeholder="请选择老人自理情况" />
            <u-icon style="margin-left: 10rpx" name="arrow-right"></u-icon>
          </view>
        </view> -->
			</view>
			<u-gap height="30"></u-gap>
			<view class="popup-btn" @click="handleSubmit"></view>
			<u-gap height="30"></u-gap>
		</u-popup>

		<u-calendar v-model="showCalendar" :mode="mode" max-date="2999-12-31" @change="confirmDate"></u-calendar>
		<u-select v-model="showSelf" :list="list" @confirm="confirmSelf"></u-select>
	</view>
</template>

<script>
	import vImage from '../../components/lazyImage.vue'
	import Api from '@/common/api.js'
	export default {
		props: {
			organFeature: {
				type: String,
				default: ''
			},
			isShowBtn:{
			    type:Boolean,
                default: false
			}
			// instId: {
			// 	type: Number,
			// 	default: undefined
			// }
		},
		mounted() {
			// console.log(this.instId);
		},
		data() {
			return {
				icon50: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon50.png'),
				icon51: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon51.png'),
				icon52: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon52.png'),
				show: false,
				mode: 'date',
				showSelf: false,
				list: [{
					label: '自理',
					value: '自理',
				}, {
					label: '半失能',
					value: '半失能',
				}, {
					label: '完全失能',
					value: '完全失能',
				}],
				showCalendar: false,
				form: {
					sex: '男',
					personAddress: ''
				},
				sexIndex: '1',
			}
		},
		components: {
			vImage
		},
		methods: {
			getAge() {
				if (!this.form.personIdcard) return
				const userCard = this.form.personIdcard
				const num = 3
				//获取出生日期
				var birth;
				if (num == 1) {
					birth = userCard.substring(6, 10) + "-" + userCard.substring(10, 12) + "-" + userCard.substring(12,
					14);
					return birth;
				}
				//获取性别
				if (num == 2) {
					if (parseInt(userCard.substr(16, 1)) % 2 == 1) {
						return "男";
					} else {
						return "女";
					}
				}
				//获取年龄
				if (num == 3) {
					var myDate = new Date();
					var month = myDate.getMonth() + 1;
					var day = myDate.getDate();
					var age = myDate.getFullYear() - userCard.substring(6, 10) - 1;
					if (userCard.substring(10, 12) < month || userCard.substring(10, 12) == month && userCard.substring(12,
							14) <= day) {
						age++;
					}
					this.$set(this.form, 'personAge', age)
				}
			},
			async handleSubmit() {
				if (!this.form.appointName) {
					return uni.showToast({
						title: '请输入预约人姓名~~',
						icon: 'none',
					})
				}
				if (!this.form.appointTelephone) {
					return uni.showToast({
						title: '请输入联系电话',
						icon: 'none',
					})
				}
				if (!this.$u.test.mobile(this.form.appointTelephone)) {
					return uni.showToast({
						title: '联系电话格式不正确',
						icon: 'none',
					})
				}
				if (!this.form.personName) {
					return uni.showToast({
						title: '请输入老人姓名',
						icon: 'none',
					})
				}
				if (!this.form.personIdcard) {
					return uni.showToast({
						title: '请输入老人身份证号',
						icon: 'none',
					})
				}
				if (!this.$u.test.idCard(this.form.personIdcard)) {
					return uni.showToast({
						title: '老人身份证号格式不正确',
						icon: 'none',
					})
				}
				if (!this.form.personAge) {
					return uni.showToast({
						title: '请输入老人年龄',
						icon: 'none',
					})
				}
				if (!this.form.personAddress) {
					return uni.showToast({
						title: '请输入地址',
						icon: 'none',
					})
				}
				let params = {
					insId: 2,
					personName: this.form.personName,
					appointName: this.form.appointName,
					appointTelephone: this.form.appointTelephone,
					personIdcard: this.form.personIdcard,
					personAge:this.form.personAge,
					personAddress: this.form.personAddress,
					personSex: this.sexIndex == 1 ? 1 : 0,
					// isPrivateRoom: this.form.isPrivateRoom ? 1 : 0,
					// bedId: this.form.bedId,
				}
				let data = await Api.apiCall('post', Api.api.saveCreateForPad, params, true)
				console.log(data,'00000000')
				if (data) {
					this.$emit('appointmentSuccess')
					// uni.showToast({
					//     title: '预约成功',
					//     icon: 'none',
					//   })
					this.show = false
				} else {
					uni.showToast({
						title: msg,
						icon: 'none',
					})
				}
				// if (!this.form.selfCareSituation) {
				//   return uni.showToast({
				//     title: '请选择老人自理情况',
				//     icon: 'none',
				//   })
				// }
				// uni.setStorageSync('appointmentObj', this.form)
				// this.$u.route('/ylao_pages/inst/bed')
			},
			getSex(index) {
				this.sexIndex = index
				if (index == '1') {
					this.form.sex = '男'
				} else if (index == '2') {
					this.form.sex = '女'
				}

			},
			confirmDate(e) {
				this.form.appointmentTime = e.result
			},
			confirmSelf(e) {
				this.form.selfCareSituation = e[0].value
			}
		},
	}
</script>

<style lang="scss" scoped>
	.sexs {
		display: flex;

		.sex {
			width: 136rpx;
			height: 70rpx;
			background: #F6F7FB;
			border-radius: 200rpx 200rpx 200rpx 200rpx;
			opacity: 1;
			border: 2rpx solid transparent;
			font-size: 32rpx;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #3D4B61;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.active {
			border: 2rpx solid #E85856;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 8rpx 2rpx rgba(192, 71, 69, 0.4);
		}
	}

	.popup-form {
		padding: 0 30rpx;

		.popup-form-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10rpx 0;
			border-bottom: 1rpx solid #EEEEEE;

			.popup-form-item-label {
				font-size: 32rpx;
				font-family: Alibaba PuHuiTi 2.0-55 Regular, Alibaba PuHuiTi 20;
				font-weight: normal;
				color: #63697D;
			}

			.popup-form-item-value {
				display: flex;
				align-items: center;
			}
		}
	}

	.popup-title {
		font-size: 36rpx;
		font-family: Alibaba PuHuiTi 2.0-75 SemiBold, Alibaba PuHuiTi 20;
		font-weight: normal;
		color: #000000;
		text-align: center;
		padding: 44rpx 0;
	}

	.popup-btn {
		width: 710rpx;
		height: 88rpx;
		background: url('https://xbx.obs.cn-east-3.myhuaweicloud.com/xiangzhaohu/pages/submit.png') no-repeat;
		background-size: 100% 100%;
		margin: auto;
	}

	.btn {
		width: 710rpx;
		height: 88rpx;
		background: url('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon49.png') no-repeat;
		background-size: 100% 100%;
		position: fixed;
		bottom: 0vh;
		left: 50%;
		transform: translateX(-50%);
	}

	.desc {
		width: 710rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 1rpx 10rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 16rpx;
		margin: auto;
		padding: 30rpx;
		margin-top: 20rpx;
		box-sizing: border-box;

		.desc-title {
			font-size: 30rpx;
			font-weight: bold;
			color: #000000;
			margin-bottom: 20rpx;

			width: 364rpx;
			height: 52rpx;
			margin: auto;
			margin-bottom: 20rpx;
		}

		.icon47 {
			background: url('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon47.png') no-repeat;
			background-size: 100% 100%;
		}

		.icon48 {
			background: url('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon48.png') no-repeat;
			background-size: 100% 100%;
		}

		.desc-content {
			font-size: 26rpx;
			font-weight: 500;
			color: #333333;
			margin-top: 36rpx;
		}
	}
</style>
