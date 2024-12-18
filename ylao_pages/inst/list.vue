<template>
	<view>
		<u-navbar :is-fixed="true" back-icon-color="#333" :title="pageTitle" title-color="#010101"
			:background="background"></u-navbar>
		<map style="width: 100vw; height: 100vh;position: fixed;top:0;left: 0;" id="map" scale="14" show-location
			:latitude="latitude" :longitude="longitude" @tap="tapMap" @markertap="callouttap">
		</map>
		<view class="box">
			<view class="search">
				<view class="input">
					<u-search style="width: 100%;" bg-color="transparent" placeholder="请输入相关内容搜索" :show-action="true"
						@search="search" @custom="search" @clear="clear" v-model="organName"></u-search>
				</view>
			</view>
			<view class="menu">
				<view class="menu-item" @click="showMenu('1')">
					区域
					<u-icon style="margin-left: 16rpx;" name="arrow-down" color="#B2B0B0" size="12"></u-icon>
				</view>
				<view class="menu-item" @click="showMenu('2')">
					价格
					<u-icon style="margin-left: 16rpx;" name="arrow-down" color="#B2B0B0" size="12"></u-icon>
				</view>
				<view class="menu-item" @click="showMenu('3')">
					等级
					<u-icon style="margin-left: 16rpx;" name="arrow-down" color="#B2B0B0" size="12"></u-icon>
				</view>
				<!-- 				<view class="menu-item" @click="showMenu('4')">
					类型
					<u-icon style="margin-left: 16rpx;" name="arrow-down" color="#B2B0B0" size="12"></u-icon>
				</view> -->
			</view>
		</view>
		<view class="tool" :class="{ 'storeFlag': storeFlag }" v-if="!showMap" @click="handleViewMap">
			<v-image style="margin-right: 6rpx;" :src="icon19" width="36rpx" height="38rpx" />
			查看地图
		</view>
		<view class="tool showMap" v-if="showMap" @click="handleViewLIst">
			<v-image style="margin-right: 6rpx;" :src="icon20" width="31.21rpx" height="28.95rpx" />
			查看列表
		</view>
		<view class="mapDetail" v-if="storeFlag">
			<view class="item" @tap="jumpDetail">
				<view class="avatar">
					<v-image v-if="mapDetail.imgUrl" :src="baseUrl+mapDetail.imgUrl" radius="16" width="180rpx"
						height="180rpx" />
					<v-image v-else :src="defaultAvatar" radius="16" width="180rpx" height="180rpx" />
					<view class="levle"
						:style="mapDetail.institutionStar == 6||mapDetail.institutionStar == 7?'font-size:20rpx':''"
						v-if="mapDetail.institutionStar">
						{{ mapDetail.institutionStar | filterStar }}
					</view>
					<view class="levle" v-else>暂无</view>
				</view>
				<view class="info">
					<view class="title">
						<view class="title-left">
							<view class="name"> {{ mapDetail.name || '暂无' }}</view>
						</view>
						<view class="distance" v-if="mapDetail.distance">{{ mapDetail.distance }}km
						</view>
					</view>
					<view class="info-list">
						<v-image style="margin-right: 10rpx;font-size: 0;" :src="icon22" width="30rpx" height="30rpx" />
						{{ mapDetail.institutionPhone || '暂无' }}
					</view>
					<view class="info-list">
						<v-image style="margin-right: 10rpx;font-size: 0;" :src="icon23" width="27rpx" height="30rpx" />
						<view class="organAreaValue">
							{{ mapDetail.cityArea || '' }}{{ mapDetail.detailAddress || '' }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="list" :class="{ 'showMap': showMap, 'storeFlag': storeFlag }">
			<view class="line"></view>
			<view>
				<scroll-view @scrolltolower="scrolltolower" style="height: 800rpx;" scroll-y
					scroll-with-animation="true" enable-back-to-top="true">
					<u-empty :text="emptyTxt" v-if="!list.length" />
					<view class="item" v-for="(item, index) in list" :key="index" @tap="jumpDetail(item)">
						<view class="avatar">
							<v-image v-if="item.imgUrl" :src="baseUrl+item.imgUrl" radius="16" width="180rpx"
								height="180rpx" />
							<v-image v-else :src="defaultAvatar" radius="16" width="180rpx" height="180rpx" />
							<view class="levle"
								:style="item.institutionStar == 6||item.institutionStar == 7?'font-size:20rpx':''"
								v-if="item.institutionStar && item.institutionStar">
								{{ item.institutionStar | filterStar  }}
							</view>
							<view class="levle" v-else>暂无</view>
						</view>
						<view class="info">
							<view class="title">
								<view class="title-left">
									<view class="name"> {{ item.name || '' }}</view>
								</view>
								<view class="distance" v-if="item.distance">{{item.distance}}km
								</view>
							</view>
							<view class="info-list">
								<v-image style="margin-right: 10rpx;font-size: 0;" :src="icon22" width="30rpx"
									height="30rpx" />
								{{ item.institutionPhone || '暂无电话' }}
							</view>
							<view class="info-list">
								<v-image style="margin-right: 10rpx;font-size: 0;" :src="icon23" width="27rpx"
									height="30rpx" />
								<view class="organAreaValue">
									{{ item.cityArea || '' }}{{ item.detailAddress || '' }}
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<u-select v-model="show" :list="selectList" @confirm="confirm"></u-select>

		<u-select v-model="showArea" mode="single-column" :list="options1" label-name="name"
			@confirm="confirmArea"></u-select>
	</view>
</template>

<script>
	import Api from '@/common/api.js'
	import vImage from '@/ylao_pages/components/lazyImage.vue'
	const utils = require("@/utils/gdToBaidu.js")
	export default {
		props: {
			minHeight: {
				type: Number,
				default: 220
			},
			middleHeight: {
				type: Number,
				default: 380
			}
		},
		components: {
			vImage
		},
		data() {
			return {
				rlatitude:'',
				rlongitude:'',
				emptyTxt: '加载中',
				baseUrl: '',
				showArea: false,
				listArea: [],
				storeFlag: false,
				mapDetail: {},
				selectList: [],
				show: false,
				showMap: false,
				background: {
					backgroundColor: "transparent",
				},
				defaultAvatar: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon21.png'),
				icon22: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon22.png'),
				icon23: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon23.png'),
				icon19: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon19.png'),
				icon20: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon20.png'),
				banner: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/topic/icon1.png'),
				icon5: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon5.png'),
				icon4: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon4.png'),
				icon3: ('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon3.png'),
				organName: '',
				value1: '',
				value2: '',
				value3: '',
				options1: [{
						"name": "全部",
						"value": ""
					},
					{
						"name": "市辖区",
						"value": "150601"
					},
					{
						"name": "东胜区",
						"value": "150602"
					},
					{
						"name": "康巴什区",
						"value": "150603"
					},
					{
						"name": "达拉特旗",
						"value": "150621"
					},
					{
						"name": "准格尔旗",
						"value": "150622"
					},
					{
						"name": "鄂托克前旗",
						"value": "150623"
					},
					{
						"name": "鄂托克旗",
						"value": "150624"
					},
					{
						"name": "杭锦旗",
						"value": "150625"
					},
					{
						"name": "乌审旗",
						"value": "150626"
					},
					{
						"name": "伊金霍洛旗",
						"value": "150627"
					}
				],
				options2: [

				],
				options3: [{
						"label": "全部",
						"value": "",

					},
					{
						"label": "一星级",
						"value": "1",
					},
					{

						"label": "二星级",
						"value": "2",
					},
					{
						"label": "三星级",
						"value": "3",
					},
					{
						"label": "四星级",
						"value": "4",
					},
					{
						"label": "五星级",
						"value": "5",
					}
				],
				options4: [{
						"label": "全部",
						"value": "",

					}, {
						"label": "由近及远",
						"value": "2",
					},
					{
						"label": "由远及近",
						"value": "1",
					}
				],
				type: '',
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.821008,
				longitude: 109.949103,
				markers: [{
					id: 1,
					latitude: 39.909,
					longitude: 116.39742,
					width: '52rpx',
					height: '66rpx',
					iconPath: 'https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon1.png'
				}],
				star: '',
				distanceType: '',
				averagePriceRange: '',
				location: {},
				pageNum: 1,
				pageSize: 10,
				total: 0,
				list: [],
				startData: {},
				updDistance: 10,
				direction: '',
				maxHeight: 1000,
				height: 230,
				lastY: 0,
				up: true,
				direction_flag: true,
				isScroll: false,
				insType: '1',
				list1: [],
				_mapContext: '',
				pageTitle: '养老地图'
			}
		},
		created() {
			const info = uni.getSystemInfoSync()
			this.maxHeight = info.screenHeight - info.windowTop
		},
		onLoad(e) {
			this.baseUrl = Api.erdsUrl
			if (e.type) this.insType = e.type
			if (e.title) this.pageTitle = e.title
			if (e.mapType) this.distanceType = e.mapType

		},
		async onShow() {
			// this.insType = 1
			// dictType('average_price_range').then(res => {
			// 	this.options2 = [{
			// 		"label": "全部",
			// 		"value": "",
			// 	}].concat(res.data.map(ele => ({
			// 		label: ele.dictLabel,
			// 		value: ele.dictValue
			// 	})))
			// })
			this.options2 = [{
					"name": "全部",
					"value": ""
				},
				{
					"name": "市辖区",
					"value": "150601"
				},
				{
					"name": "东胜区",
					"value": "150602"
				},
				{
					"name": "康巴什区",
					"value": "150603"
				},
				{
					"name": "达拉特旗",
					"value": "150621"
				},
				{
					"name": "准格尔旗",
					"value": "150622"
				},
				{
					"name": "鄂托克前旗",
					"value": "150623"
				},
				{
					"name": "鄂托克旗",
					"value": "150624"
				},
				{
					"name": "杭锦旗",
					"value": "150625"
				},
				{
					"name": "乌审旗",
					"value": "150626"
				},
				{
					"name": "伊金霍洛旗",
					"value": "150627"
				}
			]
			this.getLocation()
		},
		filters: {
			filterStar(v) {
				if (v == 6) {
					return '未定级'
				} else if (v == 7) {
					return '未定级'
				} else {
					return v + '级'
				}
			},
		},
		methods: {
			jumpDetail(item) {
				if (item) {
					if (item.institutionType == 1 || item.institutionType == 3 || item.institutionType == 2) {
						this.$u.route('/ylao_pages/inst/detail', {
							insType: item.institutionType,
							id: item.id,
							deptId: item.deptId
						})
					}
				} else {
					if (this.mapDetail.institutionType == 1 || this.mapDetail.institutionType == 3) {
						this.$u.route('/ylao_pages/inst/detail', {
							insType: this.mapDetail.institutionType,
							id: this.mapDetail.id,
							deptId: this.mapDetail.deptId
						})
					}

				}
				// if (this.distanceType == 1) {

				// } else if (this.distanceType == 3) {

				// } else {

				// }

			},
			confirmArea(e) {
				console.log('[ e ] >', e)
				this.organAreaCode = e[0].value
				this.pageNum = 1
				this.handleMarkers()
				this.getList()
				this.includePoint()
			},
			clear() {
				this.organName = ''
				this.pageNum = 1
				this.getList()
				this.handleMarkers()
				this.includePoint()
			},
			search() {
				this.pageNum = 1
				this.handleMarkers()
				this.getList()
				this.includePoint()
			},
			handleViewLIst() {
				this.showMap = false
				this.storeFlag = false
			},
			handleViewMap() {
				this.showMap = true
				this.storeFlag = false
			},
			tapMap() {
				setTimeout(() => {
					if (!this.storeFlag) {
						this.storeFlag = false
					}
				}, 100);
			},
			/*点击气泡*/
			callouttap(e) {
				console.log(e, this.markers)
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				setTimeout(() => {
					uni.hideLoading()
					this.storeFlag = true
					this.showMap = false
					const {
						id
					} = this.markers.find(item => item.id === e.target.markerId)
					const array = this.list1.filter(ele => ele.id == id)
					this.mapDetail = array[0]
				}, 300);
			},
			confirm(e) {
				console.log('[ e ] >', e, this.type)
				if (this.type == '2') {
					this.averagePriceRange = e[0].value
				}
				if (this.type == '3') {
					this.star = e[0].value
				}
				if (this.type == '4') {
					this.distanceType = e[0].value
					this.insType = e[0].value
				}
				this.pageNum = 1
				this.handleMarkers()
				this.getList()
				this.includePoint()
			},
			showMenu(type) {
				this.type = type
				if (type == '1') {
					this.showArea = true
				}
				if (type == '2') {
					this.selectList = [{
							label: "全部",
							value: "",
						}, {
							label: '<3000',
							value: 3000,
						},
						{
							label: '3000 - 5000',
							value: 5000,
						},
						{
							label: '5000 - 6000',
							value: 6000,
						},
						{
							label: '6000 - 8000',
							value: 8000,
						},
						{
							label: '8000 - 10000',
							value: 10000,
						},
						{
							label: '>10000',
							value: 10001,
						}
					]
					this.show = true
				}
				if (type == '3') {
					this.selectList = [{
							label: "全部",
							value: "",
						}, {
							label: '一级',
							value: 1,
						},
						{
							label: '二级',
							value: 2,
						},
						{
							label: '三级',
							value: 3,
						},
						{
							label: '四级',
							value: 4,
						},
						{
							label: '五级',
							value: 5,
						},
						{
							label: '未参加评估',
							value: 6,
						},
						{
							label: '未达到评估等级',
							value: 7,
						}
					]
					this.show = true
				}
				if (type == '4') {
					this.selectList = [{
							label: "全部",
							value: '',
						}, {
							label: "机构",
							value: 1,
						}, {
							label: '居家',
							value: 3,
						},
						{
							label: '调度中心',
							value: 11,
						}
					]
					this.show = true
				}

			},
			includePoint() {
				this._mapContext.includePoints({
					points: this.markers,
					complete: (res) => {
						uni.hideLoading()
					},
					fail: (res) => {
						uni.hideLoading()
					},
				})
			},
			async handleMarkers() {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				let params = {
					regionCode: this.organAreaCode || '',
					institutionStar: this.star,
					servicesChargesWh: this.averagePriceRange,
					institutionName: this.organName.trim(),
					institutionType: this.distanceType, //机构类型1机构3居家11调度中心
					pageIndex: 1,
					pageSize: 1000000
				}
				let data = await Api.apiColleCall('get', Api.erdsUrl + Api.erds.loadQDInsForWX, params)
				let res = data.data
				this.markers = []
				this.list1 = res.rows
				res.rows.forEach(ele => {
					if (ele.posLat && ele.posLogt) {
						let location = this.bMapToQQMap(ele.posLogt, ele.posLat)
						this.markers.push({
							id: ele.id,
							latitude: Number(location[1]),
							longitude: Number(location[0]),
							width: 26,
							height: 33,
							iconPath: 'https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon1.png',
							// callout: {
							// 	color: "#FF6F3D",
							// 	fontSize: 11,
							// 	borderRadius: '32rpx',
							// 	borderWidth: '1rpx',
							// 	bgColor: '#ffffff',
							// 	padding: 10,
							// 	content: ele.name,
							// 	anchorY: 0, // Y轴偏移量
							// 	anchorX: 0, // X轴偏移量
							// 	display: "ALWAYS" // 一直展示
							// },
						})
					}
				})
				this._mapContext = uni.createMapContext("map", this);
				if (!this.markers) {
					uni.hideLoading()
					this._mapContext.addMarkers({
						markers: this.markers,
						clear: true,
						fail: (res) => {
							uni.hideLoading()
						},
						complete: (res) => {

						}
					})
				} else {
					this._mapContext.addMarkers({
						markers: this.markers,
						clear: true,
						fail: (res) => {
							uni.hideLoading()
						},
						complete: (res) => {
							uni.hideLoading()
							// this._mapContext.includePoints({
							// 	points:this.markers,
							// 	complete:(res)=>{
							// 		uni.hideLoading()
							// 	},
							// 	fail:(res)=>{
							// 		uni.hideLoading()
							// 	},
							// })
						}
					})
				}

				// uni.hideLoading()
				// organList({
				//   type: this.insType,
				//   latitude: this.location.latitude,
				//   longitude: this.location.longitude,
				//   order: 'ASC',
				//   pageNum: 1,
				//   pageSize: 1000000,
				//   organAreaCode: this.organAreaCode,
				// }).then(res => {

				// })
			},
			scrolltolower() {
				if (this.pageNum * this.pageSize >= this.total) {
					return uni.showToast({
						title: '到底啦~~',
						icon: 'none',
					})
				}
				this.pageNum++
				this.getList()
			},
			async getList() {
				// uni.showLoading({
				// 	title: '加载中',
				// 	mask: true
				// });
				this.emptyTxt = '加载中'
				let params = {
					regionCode: this.organAreaCode || '',
					institutionStar: this.star,
					servicesChargesWh: this.averagePriceRange,
					institutionName: this.organName.trim(),
					institutionType: this.distanceType, //机构类型1机构3居家11调度中心
					pageIndex: this.pageNum,
					pageSize: 10,
					latitude: this.rlatitude ||this.location.latitude,
					longitude: this.rlongitude || this.location.longitude
				}
				let data = await Api.apiColleCall('get', Api.erdsUrl + Api.erds.loadQDInsForWX, params)
				let res = data.data
				// this.list = res.rows
				this.total = res.pagi.records
				if (this.pageNum == 1) {
					this.list = res.rows
					if (!res.rows.length) {
						this.emptyTxt = '暂无数据'
					}
				}
				if (this.pageNum > 1) {
					this.list = [...this.list, ...res.rows]
				}
				// uni.hideLoading()
				// let data = {
				// 	type: this.insType,
				// 	star: this.star,
				// 	averagePriceRange: this.averagePriceRange,
				// 	distanceType: this.distanceType,
				// 	organName: this.organName.trim(),
				// 	latitude: this.location.latitude,
				// 	longitude: this.location.longitude,
				// 	order: 'ASC',
				// 	pageNum: this.pageNum,
				// 	pageSize: this.pageSize,
				// 	organAreaCode: this.organAreaCode,
				// }
				// organList(data).then(res => {
				// 	this.total = res.total
				// 	if (this.pageNum == 1) {
				// 		this.list = res.rows
				// 	}
				// 	if (this.pageNum > 1) {
				// 		this.list = [...this.list, ...res.rows]
				// 	}
				// 	uni.hideLoading()

				// })
			},
			getLocation() {
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success: (location) => {
						console.log(location)
						this.location = location
						 const marker = utils.transformFromGCJToBaidu(location.latitude, location.longitude)
						this.rlatitude = marker.latitude
						this.rlongitude = marker.longitude
						// this.latitude = location.latitude
						// this.longitude = location.longitude
						this.getMyLocaton()
					}
				})
			},
			

			getrovinceCode() {

			},
			getAreaCode(province, city) {
				this.getList()
				this.handleMarkers()
				// uni.request({
				// 	url: 'https://restapi.amap.com/v3/config/district',
				// 	data: {
				// 		key: 'c7685184ffe7a4db141ffd5d56155510',
				// 		keywords: province,
				// 		subdistrict: '2',
				// 	},
				// 	method: "GET",
				// 	success: (result1) => {
				// 		uni.request({
				// 			url: 'https://restapi.amap.com/v3/config/district',
				// 			data: {
				// 				key: 'c7685184ffe7a4db141ffd5d56155510',
				// 				keywords: city,
				// 				subdistrict: '2',
				// 			},
				// 			method: "GET",
				// 			success: (result2) => {
				// 				this.organAreaCode = result1.data.districts[0].adcode + ',' +
				// 					result2.data.districts[0].adcode

				// 				const districts = result2.data.districts[0].districts
				// 				districts.forEach(ele => {
				// 					ele.label = ele.name
				// 					ele.value = result1.data.districts[0].adcode + ',' +
				// 						ele.adcode
				// 					ele.children = ele.districts
				// 					ele.children.forEach(child => {
				// 						child.label = child.name
				// 						child.value = result1.data.districts[0]
				// 							.adcode + ',' + ele.adcode + ',' +
				// 							child.adcode
				// 					})
				// 				})
				// 				this.options1 = districts
				// 			}
				// 		})
				// 	}
				// })
			},
			getMyLocaton() {
				uni.request({
					url: 'https://restapi.amap.com/v3/geocode/regeo?parameters',
					data: {
						key: 'c7685184ffe7a4db141ffd5d56155510',
						location: this.location.longitude + ',' + this.location.latitude
					},
					method: "GET",
					success: (result) => {
						this.getAreaCode(result.data.regeocode.addressComponent.province, result.data.regeocode
							.addressComponent.city)
						const formatted_address = result.data.regeocode.formatted_address
						this.markers.push({
							id: this.list.length + 1,
							latitude: this.location.latitude,
							longitude: this.location.longitude,
							width: '52rpx',
							height: '66rpx',
							iconPath: 'https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon2.png',
							// callout: {
							// 	color: "rgba(255, 255, 255, 1)",
							// 	fontSize: 11,
							// 	borderRadius: '32rpx',
							// 	borderWidth: '1rpx',
							// 	bgColor: 'rgba(103, 195, 253, 1)',
							// 	padding: 3,
							// 	content: formatted_address,
							// 	anchorY: 0, // Y轴偏移量
							// 	anchorX: 0, // X轴偏移量
							// 	display: "ALWAYS" // 一直展示
							// },
						})
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.mapDetail {
		width: 710rpx;
		position: fixed;
		bottom: 4vh;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
	}

	.box {
		width: 714rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 6rpx 2rpx rgba(0, 0, 0, 0.2);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		opacity: 1;
		position: fixed;
		top: 186rpx;
		left: 50%;
		transform: translateX(-50%);
		padding: 22rpx 14rpx;
		box-sizing: border-box;
		z-index: 10;
	}

	.menu {
		width: 714rpx;
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 22rpx;
		box-sizing: border-box;

		.menu-item {
			width: 100%;
			height: 50rpx;
			background: #F6F6F6;
			border-radius: 200rpx 200rpx 200rpx 200rpx;
			opacity: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			color: #333333;
			margin-right: 24rpx;

			&:last-child {
				margin-right: 0;
			}
		}
	}

	.item {
		width: 686rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 1rpx 10rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 16rpx;
		margin: auto;
		margin-bottom: 20rpx;
		padding: 9rpx 19rpx;
		box-sizing: border-box;
		display: flex;

		.avatar {
			width: 180rpx;
			height: 180rpx;
			border-radius: 24rpx 24rpx 24rpx 24rpx;
			overflow: hidden;
			position: relative;
			flex-shrink: 0;

			.levle {
				width: 80rpx;
				height: 38rpx;
				position: absolute;
				right: 0;
				top: 0;
				background: url('https://www.ylaow.cn/fpng/networkpic/xiangzhaohu/ylao/icon24.png') no-repeat;
				background-size: 100% 100%;
				font-size: 26rpx;
				font-weight: normal;
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.info {
			padding-left: 22rpx;
			height: 160rpx;
			width: calc(100% - 160rpx);
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex-shrink: 0;
			padding-right: 16rpx;
			.info-list {
				display: flex;
				align-items: center;
				font-size: 26rpx;
				color: #727E94;
			}

			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.title-left {
				display: flex;
				align-items: center;
			}

			.name {
				width: 300rpx;
				// height: 29rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #282728;
				// line-height: 33rpx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}

			.distance {
				font-size: 28rpx;
				color: #505C71;

			}
		}
	}

	.search {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 16rpx;
		border-bottom: 1rpx solid #EEEEEE;


		.input {
			width: 702rpx;
			height: 64rpx;
			border-radius: 3 40rpx 40rpx 40rpx;
			opacity: 1;
			display: flex;
			align-items: center;
			font-size: 28rpx;

			font-weight: 400;
			color: #8D8E92;
			padding: 0 16rpx;
			box-sizing: border-box;
			position: relative;

		}

		/deep/ .u-action {
			background: transparent !important;
			color: #0E0C0F !important;
		}
	}

	.panel {
		z-index: 999;
		position: fixed;
		bottom: 0;
		height: 654rpx;
		width: 710rpx;
		left: 50%;
		transform: translateX(-50%);
		background: #FAFAFA;
	}

	.tool {
		width: 196rpx;
		height: 78rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 6rpx 2rpx rgba(0, 0, 0, 0.16);
		border-radius: 200rpx 200rpx 200rpx 200rpx;
		opacity: 1;
		position: fixed;
		right: 20rpx;
		z-index: 999;
		top: 40%;
		font-size: 28rpx;
		font-weight: normal;
		color: #0E0C0F;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all .2s ease;

		&.showMap {
			top: 94%;
		}

		&.storeFlag {
			top: 70%;
		}
	}

	.list {
		width: 710rpx;
		background: #FAFAFA;
		border-radius: 24rpx;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		z-index: 999;
		top: 47%;
		transition: all .2s ease;

		&.showMap {
			top: 100%;
		}

		&.storeFlag {
			top: 100%;
		}

		.line {
			width: 82rpx;
			height: 8rpx;
			background: #DDDDDD;
			border-radius: 4rpx;
			margin: auto;
			margin-top: 29rpx;
			margin-bottom: 41rpx;
		}
	}

	.content {
		width: 233rpx;
		background: #FFE1D6;
		border-radius: 32rpx;
		white-space: nowrap;
		font-size: 22rpx;
		font-weight: 500;
		color: #FF6F3D;
		padding: 9rpx 19rpx;
	}

	.organAreaValue {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>