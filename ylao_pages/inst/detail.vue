<template>
	<view>
		<u-image width="100%" height="400rpx"
				 :src="instDetail?instDetail.orgImage:'../../static/noPic/210.png'">
			<u-loading slot="loading"></u-loading>
		</u-image>
		<!-- <u-swiper :list="swiperList" height="400"></u-swiper> -->
		<view class="info">
			<view class="txt1">
				{{ instDetail.name || '' }}
				<view class="levle" style="font-size:20rpx;margin-left: 14rpx;" v-if="instDetail.institutionStar"> {{
          instDetail.institutionStar | filterStar }}</view>
			</view>
			<view class="txt5" v-if="instDetail.insType==1&&instDetail.priceMin">
				<span></span>￥{{ instDetail.priceMin||'--' }}~￥{{ instDetail.priceMax||'--' }}
			</view>
			<view class="txt2">
				<view style="display: flex;align-items: center;">
					<v-image style="margin-right: 14rpx;font-size: 0;" :src="icon99" width="29.42rpx"
						height="29.22rpx" />
					{{ instDetail.principalPhone ||'--' }}
				</view>
				<view class="" @click="edipoi(1)">
					<v-image :src="icon22" width="30rpx" height="30rpx" />
				</view>
			</view>
			<view class="txt3">
				<view style="display: flex;align-items: center;" class="">
					<v-image style="margin-right: 14rpx;font-size: 0;" :src="icon46" width="26.3rpx"
						height="29.22rpx" />
						<view class="one_ellipsis" style="width: 566rpx;">
							{{ instDetail.addressCity || '' }}{{instDetail.addressArea||''}}{{ instDetail.addressDetail || '' }}
						</view>
				</view>
				<view class="distance" @click="edipoi(2)">
					<!-- {{ (infoObj.distance).toFixed(2) || '' }}km -->
					<v-image style="margin-left: 14rpx;font-size: 0;" src="https://xbx.obs.cn-east-3.myhuaweicloud.com/xiangzhaohu/pages/position.png" width="27rpx" height="30rpx" />
				</view>
			</view>
			<view class="txt4">
				<view class="txt4-item">
					<view class="txt4-item-title">
						{{instDetail.institutionType==1?'民办':instDetail.institutionType==2?'公办公营':instDetail.institutionType==3?'公办民营':'--' }}
					</view>
					<view class="txt4-item-sub-title">运营方式</view>
				</view>
				<view  class="txt4-item">
					<view class="txt4-item-title">{{ instDetail.insType|formaType1 }}</view>
					<view class="txt4-item-sub-title">机构类型</view>
				</view>
				<view v-if="instDetail.insType==1" class="txt4-item">
					<view class="txt4-item-title" >{{ instDetail.bedNumber }}</view>
					<view class="txt4-item-sub-title">床位数</view>
				</view>
				<view v-if="instDetail.insType!=1" class="txt4-item">
					<view class="txt4-item-title">{{ instDetail.operationDate |formatDate }}</view>
					<view class="txt4-item-sub-title">成立日期</view>
				</view>
				<!--<view v-if="instDetail.insType!=1" class="txt4-item">-->
					<!--<view class="txt4-item-title" >{{ instDetail.institutionStar|filterStar }}</view>-->
					<!--<view class="txt4-item-sub-title">机构等级</view>-->
				<!--</view>-->


			</view>
		</view>
		<!--<view>-->
			<!--<view class="tabs">-->
				<!--<view class="tab" @click="changeTab(1)" :class="{ 'active': curIndex == 1 }">-->
					<!--<view class="tab-bg"></view>-->
					<!--<view class="tab-title">机构简介</view>-->
					<!--<view class="tab-sub-title">基本信息</view>-->
				<!--</view>-->
			<!--</view>-->
		<!--</view>-->


		<Introduction :introduction="introduction" v-if="curIndex == 1" />
		<Pension :instId="id" @appointmentSuccess="appointmentSuccess" :organFeature="organFeature" :isShowBtn="isShowBtn"
			v-if="insType == '1'" />
		<u-gap height="100"></u-gap>


		<view class="ok" :class="{ 'active': show }">
			<view class="ok-mask" @click="close"></view>
			<view class="ok-content">
				<view class="ok-content-txt1">预约提交成功</view>
				<!--<view class="ok-content-txt2">请及时查看审批结果哦</view>-->
				<v-image style="position: absolute;left: 50%;transform: translateX(-50%);top: -70rpx;" :src="icon60"
					width="146rpx" height="202rpx" />
				<view class="ok-close" @click="close">
					<u-icon size="48" name="close-circle" color="#FFFFFF" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		yldtOrganDetail,
		getOrgActivitiList,
		zhucanSubmit,
		getAreaCodeList,
		getRepairOrder,
		getServicesAvailable,
		getServicerList,
		getPaymethods,
		getSubsidyTimeMeal,
		judgeOrgIsBA,
		addCheckInAppointment
	} from '@/ylao_pages/api/page.js'
	import vImage from '@/ylao_pages/components/lazyImage.vue'
	import {
		dictType
	} from '@/ylao_pages/api/page.js'
	import Introduction from './panel/Introduction.vue'
	import Pension from './panel/Pension.vue'
	export default {
		components: {
			Introduction,
			Pension,
			vImage
		},
		data() {
			return {
				curIndex: 1,
				id: '',
				icon60: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon60.png'),
				icon43: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon43.png'),
				icon44: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon44.png'),
				icon45: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon45.png'),
				icon99: ('https://xbx.obs.cn-east-3.myhuaweicloud.com/xiangzhaohu/pages/phone.png'),
				icon46: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon46.png'),
				icon23: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon23.png'),
				icon22: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon22.png'),
				icon8: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon8.png'),
				icon9: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon9.png'),
				icon10: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon10.png'),
				icon11: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon11.png'),
				swiperList: [],
				insType: '1',
				introduction: '',
				infoObj: {},
				weekIndex: 0,
				priceList: [],
				location: {},
				organFeature: '',
                isShowBtn:false,
				operationList: [],
				businessTypeList: [],
				businessList: [],
				show: false,
				deptId: '',
				appointmentObj: {},
				vuex_imgUrl: '',
				instDetail:{},
			}
		},
		onLoad(e) {
			if(e){
			    this.instDetail=JSON.parse(decodeURIComponent(e.instDetail));
				this.introduction =this.instDetail.institutionSynopsis;
            }
            if(this.instDetail.insType==1){
                this.isShowBtn=true;
			}else{
                this.isShowBtn=false;
            }
            uni.setNavigationBarTitle({
                title:'详情'
            })
			uni.getLocation({
				type: 'wgs84',
				geocode: true,
				success: (location) => {
					this.location = location
					// this.yldtOrganDetail()
					// dictType('average_price_range').then(res1 => {
					//   dictType('organ_operation_mode').then(res2 => {
					//     dictType('business_type').then(res3 => {
					//       this.priceList = res1.data
					//       this.operationList = res2.data
					//       this.businessList = res3.data
					//       this.id = e.id
					//       this.insType = e.insType
					//       this.deptId = e.deptId
					//     })
					//   })
					// })
				},
				fail: (err) => {}
			})

		},
		onShow() {
			uni.removeStorageSync('appointmentInst');
		},
		filters:{
            formaType1(value) {
                if (value === 1) {
                    return '机构';
                } else if(value === 2){
                    return '居家';
                } else if(value === 3){
                    return '助餐点';
                } else if(value === 4){
                    return '社区卫生服务站';
                } else if(value === 5){
                    return '调度中心';
                }else{
                    return '--';
                }
            },
			filterStar(value){
                if (value === 1) {
                    return '一级';
                } else if (value === 2) {
                    return '二级';
                } else if (value === 3) {
                    return '三级';
                } else if (value === 4) {
                    return '四级';
                } else if (value === 5) {
                    return '五级';
                } else if (value === 6) {
                    return '未参加评估';
                } else if (value === 7) {
                    return '未达到评估等级';
                }else{
                    return '--';
                }
			},
		},
		methods: {
			edipoi(e){
				if(e == 1){
					if(this.instDetail.principalPhone || this.instDetail.principalPhone){
						uni.makePhoneCall({
							phoneNumber:this.instDetail.principalPhone
						})
					}else{
						this.$u.toast('没有电话')
					}

				}else{
					if(this.instDetail.addressLat && this.instDetail.addressLng){
						let location = this.bMapToQQMap(this.instDetail.addressLng, this.instDetail.addressLat)
						uni.openLocation({
							latitude: Number(location[1]),
							longitude: Number(location[0]),
							name: this.instDetail.addressDetail,
							scale: 28,
							success: function() {
								console.log('success');
							},
							fail: function(res) {
								console.log('fail');
							}
						});
					}else{
						this.$u.toast('没有定位信息')
					}
				}
			},
			appointmentSuccess(){
				this.show = true
			},
			appointment(carList) {
				uni.setStorageSync('carList', carList)
				this.$u.route('/ylao_pages/inst/appointment', {
					insType: this.insType,
					id: this.id,
					deptId: this.infoObj.deptId,
					organName: this.infoObj.organName,
				})
			},
			otherFun() {
				this.show = true
			},
			close() {
				this.show = false
			},
			priceType(type) {
				if (!type) return
				const array = this.priceList.filter(ele => ele.dictValue == type)
				if (array.length) {
					return array[0].dictLabel
				}
			},
			replaceImgSrc(basePrefix, rep, questionContent) {
				questionContent = questionContent.replace(
					new RegExp(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi),
					function(match, capture) {
						if (rep) {
							match = match.replace(new RegExp(capture, "g"), basePrefix + capture);
						} else {
							match = match.replace(
								new RegExp(capture, "g"),
								basePrefix +
								capture.slice(capture.indexOf("/", capture.indexOf("/") + 1))
							);
						}
						return match;
					}
				);
				//添加图片样式属性
				questionContent = questionContent.replace(/<img\b/gi, `<img  style="max-width:100%;height:auto"`)
				return questionContent;
			},
			operationModeType(type) {
				if (!type) return
				const array = this.operationList.filter(ele => ele.dictValue == type)
				if (array.length) {
					return array[0].dictLabel
				}
			},
			async yldtOrganDetail() {


				// yldtOrganDetail({
				//   id: this.id,
				//   latitude: this.location.latitude,
				//   longitude: this.location.longitude,
				// }).then(res => {

				// })
			},
			getChild(child, item) {
				item.children.forEach(element => {
					element.active = false
				});
				child.active = true
			},
			changeTab(index) {
				this.curIndex = index
				if (index == 3) {
					this.$nextTick(() => {
						this.$refs.Service.getListByDeptName()
					})
				}
				if (index == 4) {
					this.$nextTick(() => {
						this.$refs.Meal.init(this.deptId)
					})
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.ok {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 3;
		opacity: 0;
		transform: scale(0);
		transition: all .1s ease;

		&.active {
			opacity: 1;
			transform: scale(1);
		}

		.ok-mask {
			width: 100vw;
			height: 100vh;
			position: absolute;
			top: 0;
			left: 0;
			background: rgba(0, 0, 0, 0.5);
			z-index: 3;
		}

		.ok-content {
			width: 650rpx;
			height: 354rpx;
			background: #FFFFFF;
			border-radius: 48rpx 48rpx 48rpx 48rpx;
			opacity: 1;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 4;

			.ok-content-txt1 {
				font-size: 36rpx;
				font-family: Alibaba PuHuiTi 2.0-75 SemiBold, Alibaba PuHuiTi 20;
				font-weight: normal;
				color: #000000;
				padding-top: 172rpx;
				text-align: center;
			}

			.ok-content-txt2 {
				font-size: 32rpx;
				font-family: Alibaba PuHuiTi 2.0-55 Regular, Alibaba PuHuiTi 20;
				font-weight: normal;
				color: #7D839D;
				padding-top: 20rpx;
				text-align: center;

			}
		}

		.ok-close {
			width: 48rpx;
			height: 48rpx;
			position: absolute;
			bottom: -80rpx;
			left: 50%;
			transform: translateX(-50%);
			z-index: 4;

		}
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
			background: url('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon44.png') no-repeat;
			background-size: 100% 100%;
			width: 364rpx;
			height: 52rpx;
			margin: auto;
			margin-bottom: 20rpx;
		}

		.desc-content {
			font-size: 26rpx;
			font-weight: 500;
			color: #333333;
			margin-top: 36rpx;
		}
	}

	.tabs {
		display: flex;
		justify-content: space-between;
		padding: 30rpx 20rpx 20rpx 20rpx;

		.tab {
			width: 100%;
			background: #FFFFFF;
			box-shadow: 0rpx 2rpx 12rpx 2rpx rgba(0, 0, 0, 0.1);
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			opacity: 1;
			padding: 19rpx;
			box-sizing: border-box;
			text-align: center;
			position: relative;
			margin-right: 24rpx;

			&:last-child {
				margin-right: 0;
			}

			&.active {
				background: transparent;
				box-shadow: none;

				.tab-bg {
					width: 100%;
					height: 130rpx;
					background: url('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon43.png') no-repeat;
					background-size: 100% 100%;
					position: absolute;
					top: 0;
					left: 0;
				}

				.tab-title {
					color: #FFFFFF;
				}

				.tab-sub-title {
					color: #FFFFFF;
				}

			}

			.tab-title {
				font-size: 32rpx;
				font-family: Alibaba PuHuiTi 2.0-75 SemiBold, Alibaba PuHuiTi 20;
				font-weight: normal;
				color: #0E0E0E;
				position: relative;
				white-space: nowrap;
			}

			.tab-sub-title {
				font-size: 26rpx;
				font-family: Alibaba PuHuiTi 2.0-55 Regular, Alibaba PuHuiTi 20;
				font-weight: normal;
				color: #999999;
				position: relative;
			}
		}
	}

	.info {
		width: 722rpx;
		background: #FFFFFF;
		border-radius: 24rpx 24rpx 24rpx 24rpx;
		opacity: 1;
		margin: auto;
		margin-top: -20rpx;
		padding: 28rpx 18rpx;
		box-sizing: border-box;
		position: relative;
		z-index: 2;

		.txt5 {
			font-size: 36rpx;
			font-weight: 500;
			color: #FF2A08;
			padding: 8rpx 0rpx;

			span {
				font-size: 26rpx;
			}
		}

		.txt1 {
			font-size: 36rpx;
			color: #111111;
			display: flex;
			align-items: center;

			.levle {
				// width: 80rpx;
				padding: 20rpx;
				height: 38rpx;
				background: url('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon24.png') no-repeat;
				background-size: 100% 100%;
				font-size: 26rpx;
				font-weight: normal;
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
				white-space: nowrap;
			}
		}

		.txt2 {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 30rpx;
			font-weight: normal;
			color: #727E94;
		}

		.txt3 {
			padding-top: 16rpx;
			font-size: 30rpx;
			font-weight: normal;
			color: #727E94;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 41rpx;

			.distance {
				display: flex;
				align-items: center;
				font-size: 22rpx;
				font-weight: 500;
				color: #FF693D;
			}

		}

		.txt4 {
			display: flex;
			// justify-content: space-between;


			.txt4-item {
				width: 212rpx;
				background: #FFF6F2;
				border-radius: 12rpx 12rpx 12rpx 12rpx;
				opacity: 1;
				box-shadow: 0rpx 1rpx 10rpx 0rpx rgba(0, 0, 0, 0.1);
				border-radius: 8rpx;
				text-align: center;
				padding: 17rpx;
				margin-right: 19rpx;

				&:last-child {
					margin-right: 0;
				}

				.txt4-item-title {
					font-size: 30rpx;
					font-weight: normal;
					color: #FF3F02;
					white-space: nowrap;
				}

				.txt4-item-sub-title {
					font-size: 26rpx;
					font-weight: normal;
					color: #727E94;
					padding-top: 2;
				}
			}
		}
	}
</style>
