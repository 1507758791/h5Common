<template>
	<view class="zcContainer" style="height: 100vh;overflow: hidden;">
		<image src="../../static/img/topZcBg.png" class="topZcBg"></image>
		<!-- <view class="zxContent">
			<view class="zxText">快来看看</view>
			<view class="zxText">您符合哪些政策吧</view>
		</view> -->
<!-- 		<view class="bgckk">
			
		</view> -->
		<view @tap="goBack" class="goback flex-center" style="position: absolute;left: 20rpx;top: 40rpx;z-index: 99; background: rgba(0,0,0,.4);width: 60rpx;height: 60rpx;border-radius: 50%;">
			<u-icon style="margin-bottom: 2rpx;" name="arrow-left" size="38" color="#fff"></u-icon>
		</view>
		<view class="questionContent">
			<view class="body">
				<image src="../../static/img/headerBg.png" class="headerBg"></image>
				<view class="headerBgText">回答下列问题，查看符合的政策</view>
				<view class="contet">
					<view class="oneBody">
						<view class="one">
							<image src="../../static/img/one.png"></image>
							<text>年龄：</text>
						</view>
						<u-input border placeholder="请选择" type="select" :select-open="ageShow" @click="ageShow = true"
							v-model="age"></u-input>
					</view>
					<view class="oneBody">
						<view class="one">
							<image src="../../static/img/two.png"></image>
							<text>户籍：</text>
						</view>
						<u-input border placeholder="请选择" type="select" :select-open="censusRegisterShow"
							@click="censusRegisterShow = true" v-model="census"></u-input>
					</view>
					<view class="oneBody">
						<view class="one">
							<image src="../../static/img/three.png"></image>
							<text>能力等级：</text>
						</view>
						<u-input border placeholder="请选择" type="select" :select-open="nurseLevelShow"
							@click="nurseLevelShow = true" v-model="nurse"></u-input>
					</view>
					<view class="oneBody">
						<view class="one">
							<image src="../../static/img/four.png"></image>
							<text>老人类型：</text>
						</view>
						<u-input border placeholder="请选择" type="select" :select-open="personTypeShow"
							@click="personTypeShow = true" v-model="personTypes"></u-input>
					</view>
					<view class="oneBody">
						<view class="one">
							<image src="../../static/img/five.png"></image>
							<text>居住情况：</text>
						</view>
						<u-input border placeholder="请选择" type="select" :select-open="liveTypeShow"
							@click="liveTypeShow = true" v-model="liveTypes"></u-input>
					</view>
					<view class="tips">提示：以上题目均以上海市为例，其他城市请参考当地政策</view>
				</view>
				<view class="matchBtn" @click="toMatch">
					<image src="../../static/img/matched.png"></image>
				</view>

			</view>
		</view>
		<u-select mode="single-column" :list="ageList" v-model="ageShow" @confirm="selectAgeConfirm"></u-select>
		<u-select mode="single-column" :list="censusRegister" v-model="censusRegisterShow"
			@confirm="selectCensusRegisterConfirm"></u-select>
		<u-select mode="single-column" :list="nurseLevel" v-model="nurseLevelShow"
			@confirm="selectNurseLevelConfirm"></u-select>
		<u-select mode="single-column" :list="personType" v-model="personTypeShow"
			@confirm="selectPersonTypeConfirm"></u-select>
		<u-select mode="single-column" :list="liveType" v-model="liveTypeShow"
			@confirm="selectLiveTypeConfirm"></u-select>
	</view>
</template>

<script>
	import {
		ageList,
		censusRegister,
		nurseLevel,
		personType,
		liveType
	} from '../../common/constant.js';
	export default {
		data() {
			return {
				ageShow: false,
				censusRegisterShow: false,
				nurseLevelShow: false,
				personTypeShow: false,
				liveTypeShow: false,
				ageList,
				censusRegister,
				nurseLevel,
				personType,
				liveType,
				age: '', //年龄
				ageIndex: '',
				census: '', //户籍
				censusIndex: '',
				nurse: '', //能力等级
				nurseIndex: '',
				personTypes: '', //老人类型
				personTypesIndex: '',
				liveTypes: "", //居住情况	
				liveTypesIndex: ''
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			toMatch() {
				uni.navigateTo({
					url: `/pages/policyMatching/policyMatching?ageIndex=${this.ageIndex}&censusIndex=${this.censusIndex}&nurseIndex=${this.nurseIndex}&personTypesIndex=${this.personTypesIndex}&liveTypesIndex=${this.liveTypesIndex}`,
				})
			},
			selectAgeConfirm(e) {
				console.log(e, '99999');
				this.age = e[0].label
				this.ageIndex = e[0].value
			},
			selectCensusRegisterConfirm(e) {
				this.census = e[0].label
				this.censusIndex = e[0].value
			},
			selectNurseLevelConfirm(e) {
				this.nurse = e[0].label
				this.nurseIndex = e[0].value
			},
			selectPersonTypeConfirm(e) {
				this.personTypes = e[0].label
				this.personTypesIndex = e[0].value
			},
			selectLiveTypeConfirm(e) {
				this.liveTypes = e[0].label
				this.liveTypesIndex = e[0].value
			},
		},
		mounted() {

		},
	}
</script>

<style lang="scss" scoped>
	.bgckk{
		background: linear-gradient(180deg, #FE931F 0%, #FFFFFF 100%);
		position: absolute;
		top: 310rpx;
		width: 750rpx;
		height: 1051rpx;
		z-index: 1;
	}
	.zcContainer {
		.navbar {
			height: 110rpx;
			position: fixed;
			top: 0%;
			left: 0;
			width: 100%;
			overflow: hidden;
			z-index: 9999999;
		
			&>image {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 234rpx;
			}
		
			.navt {
				width: 100%;
				margin-top: 62rpx;
			}
		
			.title {
				height: 46rpx;
				font-family: MiSans, MiSans;
				font-weight: 500;
				font-size: 35rpx;
				color: #FFFFFF;
				line-height: 47rpx;
				z-index: 999;
				margin-top: -6rpx;
			}
		}
		/deep/.uni-input-input {
			color: #FF6F00;
			font-size: 32rpx;
			font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
		}

		position: relative;

		.topZcBg {
			position: absolute;
			width: 750rpx;
			height: 960rpx;
			// background: #FFFFFF;
			border-radius: 0rpx 0rpx 0rpx 0rpx;
			z-index: 2;
		}

		.zxContent {
			top: 0rpx;
			left: 204rpx;
			position: absolute;
			z-index: 999;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.zxText {
				font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
				font-weight: bold;
				font-size: 44rpx;
				color: #FF822E;
				line-height: 80rpx;
				text-shadow: 4rpx 4rpx 0 #FFFFFF;
				text-align: center;
				font-style: normal;
				text-transform: none;
			}
		}

		.questionContent {
			position: absolute;
			top: 580rpx;
			width: 750rpx;
			height: 1051rpx;
			z-index: 3;
			// background: linear-gradient(180deg, #FE931F 0%, #FFFFFF 100%);
			border-radius: 0rpx 0rpx 0rpx 0rpx;

			.body {
				position: absolute;
				top: -350rpx;
				margin-left: 18rpx;
				width: 714rpx;
				height: 1012rpx;
				background: linear-gradient(#FFFFFF 0%, #FFFFFF 16%, RGBA(255, 240, 224, 1) 100%);
				border-radius: 32rpx 32rpx 32rpx 32rpx;

				.headerBg {
					margin: 0 24rpx;
					width: 666rpx;
					height: 62rpx;
					z-index: 999;
				}

				.headerBgText {
					position: absolute;
					width: 488rpx;
					top: 5rpx;
					left: 110rpx;
					z-index: 8888;
					text-shadow: 1px 1px 0px rgba(214, 71, 0, 0.5);
					color: #FFFFFF;
					font-size: 35rpx;
					font-weight: bold;
					font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
					text-align: center;
					margin: auto;
				}

				.contet {
					// position: absolute;
					// top: 10rpx;
					padding-top: 35rpx;
					padding-left: 12rpx;
					padding-right: 12rpx;
					margin-top: -40rpx;
					margin-left: 12rpx;
					margin-bottom: 4rpx;
					width: 686rpx;
					height: 890rpx;
					background: #FFFFFF;
					border-radius: 21rpx 21rpx 21rpx 21rpx;
					background: linear-gradient(#FFFFFF 90%, #FFFFFF 16%, #FFEEDB 100%);
					border: 1rpx solid #FFAC79;

					.oneBody {
						margin-bottom: 20rpx;

						.one {
							display: flex;
							align-items: center;
							margin-bottom: 15rpx;

							image {
								width: 40rpx;
								height: 44rpx;
								margin-right: 14rpx;
							}

							text {
								font-size: 32rpx;
								color: #333333;
							}

						}
					}

					.tips {
						font-size: 29rpx;
						color: #333333;
						width: 631rpx;
					}

				}

				.matchBtn {
					margin-left: 12rpx;

					image {
						width: 694rpx;
						height: 86rpx;
					}
				}

			}
		}
	}
</style>