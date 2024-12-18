<template>
	<view class="matchingContainer">
		<view class="navbar">
			<image src="../../static/img/navbarbg.png" mode=""></image>
			<view class="navt flex">
				<view @tap="back" class="" style="position: absolute;left: 0;top: 50rpx;width: 70rpx;height: 70rpx;">

				</view>
				<image @tap="back" style="width: 14rpx;height: 28rpx;margin-left: 22rpx;margin-right: 303rpx;"
					src="../../static/img/back.png" mode=""></image>
				<view class="title" style="">
					匹配结果
				</view>
			</view>
		</view>
		<view class="content" v-if="!isEmpty">
			<view class="matchTitle">
				<text>根据匹配结果，您满足以下政策补贴</text>
				<text>（橙色标识）</text>
			</view>
			<view class="oldAgeAllowance">
				<image class="headerBg" src="../../static/img/headerBg.png"></image>
				<view class="headerText">老年综合津贴（高龄补贴）</view>
				<view class="oldAgeContent">
					<view :class="['age_1',navParams.ageIndex==='0'&& navParams.censusIndex ==='0'?'checkedColor':'']">
						60至69周岁，每人每月75元；</view>
					<view :class="['age_2',navParams.ageIndex==='1'&& navParams.censusIndex ==='0'?'checkedColor':'']">
						70至79周岁，每人每月150元；</view>
					<view :class="['age_3',navParams.ageIndex==='2'&& navParams.censusIndex ==='0'?'checkedColor':'']">
						80至89周岁，每人每月180元；</view>
					<view :class="['age_4',navParams.ageIndex==='3'&& navParams.censusIndex ==='0'?'checkedColor':'']">
						90至99周岁，每人每月350元；</view>
					<view :class="['age_5',navParams.ageIndex==='4'&& navParams.censusIndex ==='0'?'checkedColor':'']">
						100周岁及以上，每人每月600元。</view>
				</view>
			</view>
			<view class="meal">
				<image class="headerBg" src="../../static/img/headerBg.png"></image>
				<view class="headerText">助餐补贴</view>
				<view class="mealContent">
					<view style="margin-bottom: 15rpx;">（1）堂食补贴</view>
					<view style="margin-bottom: 15rpx;">支付满15元可享受堂食补贴。</view>
					<view
						:class="['planA',navParams.ageIndex!=''&& navParams.censusIndex === '0'&& navParams.personTypesIndex != 5&& navParams.personTypesIndex != 6&& navParams.personTypesIndex != ''?'checkedColor':'']">
						A类：60周岁及以上，低保、低收入、特困、重残无业等经济困难老年人（以上海民政救助信息管理平台系统中数据为准），给予每人每天6元堂食补贴。</view>
					<view
						:class="['planB',navParams.ageIndex==='0'|| navParams.ageIndex === '1'&& navParams.censusIndex === '0'?'checkedColor':'']">
						B类：60周岁至79周岁的老年人，给予每人每天2元堂食补贴。</view>
					<view
						:class="['planC',navParams.ageIndex==='2'|| navParams.ageIndex === '3'|| navParams.ageIndex === '4'&& navParams.censusIndex === '0'?'checkedColor':'']">
						C类：80周岁及以上的老年人，给予每人每天3元堂食补贴。</view>
					<view style="margin-bottom: 15rpx;margin-top: 20rpx;">（2）送餐补贴</view>
					<view
						:class="['butie',navParams.ageIndex!=''&& navParams.nurseIndex != '0'&& navParams.nurseIndex != '1'&& navParams.nurseIndex != ''?'checkedColor':'']">
						60周岁及以上，老年照护统一需求评估2级及以上的老年人，给予每人每天4元送餐费补贴。</view>
				</view>
			</view>
			<view class="oldAge">
				<image class="headerBg" src="../../static/img/headerBg.png"></image>
				<view class="headerText">养老服务补贴</view>
				<view class="oldAgeContent">
					<view style="margin-bottom: 15rpx;">（1）照护一级的困难对象</view>
					<view
						:class="['A',navParams.censusIndex==='0'&& navParams.nurseIndex === '1'&& navParams.personTypesIndex === '0'?'checkedColor':'']">
						A类：最低生活保障家庭的老年人，补贴标准调整为每人每月1110元；</view>
					<view
						:class="['B',navParams.censusIndex==='0'&& navParams.nurseIndex === '1'&& navParams.personTypesIndex === '2'?'checkedColor':'']">
						B类：低收入家庭的老年人，补贴标准调整为每人每月888元；</view>
					<view style="margin-bottom: 15rpx;">（2）照护二级至四级的困难对象</view>
					<view
						:class="['A2',navParams.censusIndex==='0'&& (navParams.nurseIndex === '2'|| navParams.nurseIndex === '3'|| navParams.nurseIndex === '4')&& navParams.personTypesIndex === '0'?'checkedColor':'']">
						A类：最低生活保障家庭的老年人，每人每月1036元；</view>
					<view
						:class="['B2',navParams.censusIndex==='0'&& (navParams.nurseIndex === '2'|| navParams.nurseIndex === '3'|| navParams.nurseIndex === '4')&& navParams.personTypesIndex === '2'?'checkedColor':'']">
						B类：低收入家庭的老年人，每人每月补贴740元。</view>
					<view style="margin-bottom: 15rpx;">（3）照护五级至六级的困难对象</view>
					<view
						:class="['A3',navParams.censusIndex==='0'&& navParams.nurseIndex === '5'|| navParams.nurseIndex === '6'&& navParams.personTypesIndex === '0'?'checkedColor':'']">
						A类：最低生活保障家庭的老年人，每人每月740元；</view>
					<view
						:class="['B3',navParams.censusIndex==='0'&& navParams.nurseIndex === '5'|| navParams.nurseIndex === '6'&& navParams.personTypesIndex === '2'?'checkedColor':'']">
						B类：低收入家庭的老年人，每人每月补贴444元。</view>
				</view>
			</view>
			<view class="bottomTips">提示：本页面政策匹配结果均为体验，不可作为实际补贴申请参考</view>
		</view>
		<view v-else class="empty">
			<image class="emptyImg" src="../../static/img/empty.png"></image>
			<view class="emptyText">暂无与您匹配的政策补贴哦~</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEmpty: false,
				navParams: {
					ageIndex: '',
					censusIndex: '',
					nurseIndex: '',
					personTypesIndex: '',
					personTypesIndex: '',

				},
			}
		},
		methods: {
			back() {
				uni.navigateBack()
			},
		},
		onLoad(e) {
			console.log(e);
			if (!e.censusIndex||e.censusIndex==1) {
				this.isEmpty = true
			}
			if (e.ageIndex) {
				this.navParams.ageIndex = e.ageIndex
			}
			if (e.censusIndex) {
				this.navParams.censusIndex = e.censusIndex
			}
			if (e.nurseIndex) {
				this.navParams.nurseIndex = e.nurseIndex
			}
			if (e.personTypesIndex) {
				this.navParams.personTypesIndex = e.personTypesIndex
			}
			if (e.personTypesIndex) {
				this.navParams.personTypesIndex = e.personTypesIndex
			}

		}
	}
</script>

<style lang="scss" scoped>
	.matchingContainer {
		.checkedColor {
			color: #FFAC79 !important;
		}

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

		.empty {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100vh;

			.emptyImg {
				width: 318rpx;
				height: 224rpx;
			}

			.emptyText {
				color: #999999;
				font-size: 29rpx;
			}
		}

		.content {
			margin-left: 18rpx;

			.matchTitle {
				margin-top: 125rpx;
				margin-bottom: 22rpx;
				font-size: 31rpx;
				font-weight: 500;

				text:first-child {
					color: #000000;
				}

				text:last-child {
					color: #FF6F00;
				}
			}

			.oldAgeAllowance {
				position: relative;
				width: 714rpx;
				height: 391rpx;
				background: linear-gradient(#FFFFFF 80%, #FFFFFF 16%, #FFEEDB 100%);
				border-radius: 32rpx 32rpx 32rpx 32rpx;

				.headerBg {
					position: absolute;
					left: 47rpx;
					width: 618rpx;
					height: 62rpx;
					z-index: 888;
				}

				.headerText {
					position: absolute;
					top: 6rpx;
					z-index: 999;
					left: 150rpx;
					font-size: 35rpx;
					color: #FFFFFF;
					text-shadow: 1px 1px 0px rgba(214, 71, 0, 0.5);
					font-weight: bold;
				}

				.oldAgeContent {
					position: absolute;
					top: 12rpx;
					width: 686rpx;
					padding: 68rpx 0 30rpx 22rpx;
					margin-left: 12rpx;
					height: 364rpx;
					background: #FFFFFF;
					border-radius: 21rpx 21rpx 21rpx 21rpx;
					background: linear-gradient(#FFFFFF 80%, #FFFFFF 16%, #FFEEDB 100%);
					border: 1rpx solid #FFAC79;

					.age_1,
					.age_2,
					.age_3,
					.age_4,
					.age_5,
					{
					font-size: 31rpx;
					color: #333333;
					margin-bottom: 10rpx;
				}
			}
		}

		.meal {
			margin-top: 24rpx;
			position: relative;
			width: 714rpx;
			height: 840rpx;
			background: linear-gradient(#FFFFFF 80%, #FFFFFF 16%, #FFEEDB 100%);
			border-radius: 32rpx 32rpx 32rpx 32rpx;

			.headerBg {
				position: absolute;
				left: 47rpx;
				width: 618rpx;
				height: 62rpx;
				z-index: 888;
			}

			.headerText {
				position: absolute;
				top: 6rpx;
				z-index: 999;
				left: 280rpx;
				font-size: 35rpx;
				color: #FFFFFF;
				text-shadow: 1px 1px 0px rgba(214, 71, 0, 0.5);
				font-weight: bold;
			}

			.mealContent {
				position: absolute;
				top: 12rpx;
				width: 686rpx;
				padding: 68rpx 0 30rpx 22rpx;
				margin-left: 12rpx;
				height: 812rpx;
				background: #FFFFFF;
				border-radius: 21rpx 21rpx 21rpx 21rpx;
				background: linear-gradient(#FFFFFF 80%, #FFFFFF 16%, #FFEEDB 100%);
				border: 1rpx solid #FFAC79;

				.planA,
				.planB,
				.planC,
				.butie {
					font-size: 31rpx;
					color: #333333;
					margin-bottom: 15rpx;
				}
			}
		}

		.oldAge {
			margin-top: 24rpx;
			position: relative;
			width: 714rpx;
			height: 840rpx;
			background: linear-gradient(#FFFFFF 80%, #FFFFFF 16%, #FFEEDB 100%);
			border-radius: 32rpx 32rpx 32rpx 32rpx;

			.headerBg {
				position: absolute;
				left: 47rpx;
				width: 618rpx;
				height: 62rpx;
				z-index: 888;
			}

			.headerText {
				position: absolute;
				top: 6rpx;
				z-index: 999;
				left: 250rpx;
				font-size: 35rpx;
				color: #FFFFFF;
				text-shadow: 1px 1px 0px rgba(214, 71, 0, 0.5);
				font-weight: bold;
			}

			.oldAgeContent {
				position: absolute;
				top: 12rpx;
				width: 686rpx;
				padding: 68rpx 0 30rpx 22rpx;
				margin-left: 12rpx;
				height: 812rpx;
				background: #FFFFFF;
				border-radius: 21rpx 21rpx 21rpx 21rpx;
				background: linear-gradient(#FFFFFF 80%, #FFFFFF 16%, #FFEEDB 100%);
				border: 1rpx solid #FFAC79;

				.A,
				.B,
				.A2,
				.B2,
				.B3,
				.A3 {
					font-size: 31rpx;
					color: #333333;
					margin-bottom: 10rpx;
				}
			}
		}

		.bottomTips {
			margin-top: 24rpx;
			padding: 20rpx;
			width: 714rpx;
			// height: 100rpx;
			background: linear-gradient(#FFFFFF 60%, #FFFFFF 16%, #FFEEDB 100%);
			border-radius: 32rpx 32rpx 32rpx 32rpx;
			color: #333333;
			font-size: 29rpx;
		}
	}


	}
</style>