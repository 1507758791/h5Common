<template>
	<view class="setvv">
		<view class="navbar">
			<image src="../../static/img/navbarbg.png" mode=""></image>
			<view class="navt flex">
				<view @tap="back" class="" style="position: absolute;left: 0;top: 50rpx;width: 70rpx;height: 70rpx;">

				</view>
				<image @tap="back" style="width: 14rpx;height: 28rpx;margin-left: 22rpx;margin-right: 303rpx;"
					src="../../static/img/back.png" mode=""></image>
				<view class="title" style="">
					周边机构
				</view>
			</view>
		</view>

		<map style="width: 100vw; height: calc(100vh - 900rpx);position: relative;top:110rpx;left: 0;" id="map" scale="12"
			show-location :latitude="latitude" :longitude="longitude" @tap="tapMap" @markertap="callouttap" :markers="markers">
			<!-- <cover-view style="position: absolute;top:10px;left:10px;width:200px;height:200px;background: red;">123</cover-view> -->
		</map>
<!-- 		<view class="tool" :class="{ 'storeFlag': storeFlag }" v-if="!showMap" @click="handleViewMap">
			<v-image style="margin-right: 6rpx;" :src="icon19" width="34rpx" height="36rpx" />
			查看地图
		</view>
		<view class="tool showMap" v-if="showMap" @click="handleViewLIst">
			<v-image style="margin-right: 6rpx;" :src="icon20" width="31.21rpx" height="28.95rpx" />
			查看列表
		</view> -->
		<view class="mapDetail" v-if="storeFlag">

			<view class="item" @tap="jumpDetail2">
				<view class="avatar">
					<v-image v-if="mapDetail.logoUrl" :src="mapDetail.logoUrl" radius="16" width="180rpx"
						height="180rpx" />
					<v-image v-else :src="defaultAvatar" radius="16" width="180rpx" height="180rpx" />
					<view class="levle"
						style="font-size:20rpx"
						v-if="mapDetail.institutionStar">
						{{ mapDetail.institutionStar | filterStar }}
					</view>
				</view>
				<view class="info">
					<view class="title">
						<view class="title-left">
							<view class="name"> {{ mapDetail.name || '暂无' }}</view>
						</view>
						<view class="distance" v-if="mapDetail.distance">{{ mapDetail.distance.toFixed(1) }}km
						</view>
					</view>
					<view class="info-list">
						<v-image style="margin-right: 10rpx;font-size: 0;" :src="icon22" width="30rpx" height="30rpx" />
						{{ mapDetail.principalPhone || '暂无' }}
					</view>
					<view class="info-list">
						<v-image style="margin-right: 10rpx;font-size: 0;" :src="icon23" width="27rpx" height="30rpx" />
						<view class="organAreaValue">
							{{ mapDetail.addressCity || '' }}{{mapDetail.addressArea||''}}{{ mapDetail.addressDetail || '' }}

						</view>
					</view>
				</view>
			</view>
			<view class="" style="margin: auto; margin-bottom: 20rpx;width: 686rpx;">
				<u-button @click="()=>{storeFlag = false}" type="warning">返回列表</u-button>
			</view>
		</view>
		<view class="flex-items-center flex-column" style="position: fixed;bottom: 0;left: 0;width: 100%;">
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
					<view class="menu-item" @click="showMenu('4')">
						类型
						<u-icon style="margin-left: 16rpx;" name="arrow-down" color="#B2B0B0" size="12"></u-icon>
					</view>
					<view class="menu-item" @click="showMenu('3')">
						等级
						<u-icon style="margin-left: 16rpx;" name="arrow-down" color="#B2B0B0" size="12"></u-icon>
					</view>
					<view class="menu-item" @click="showMenu('2')">
						价格
						<u-icon style="margin-left: 16rpx;" name="arrow-down" color="#B2B0B0" size="12"></u-icon>
					</view>
				</view>
			</view>
			<view class="list" :class="{ 'showMap': showMap, 'storeFlag': storeFlag }">
				<view class="line"></view>
				<view>
					<scroll-view @scrolltolower="scrolltolower" style="height: 460rpx;padding-bottom: 10rpx;" scroll-y
						scroll-with-animation="true" enable-back-to-top="true">
						<u-empty :text="emptyTxt" v-if="!list.length" />
						<view class="item" v-for="(item, index) in list" :key="index" @tap="jumpDetail(item)">
							<view class="avatar">
								<v-image v-if="item.logoUrl" :src="item.logoUrl" radius="16" width="180rpx"
									height="180rpx" />
								<v-image v-else :src="defaultAvatar" radius="16" width="180rpx" height="180rpx" />
								<view class="levle"
									  style="font-size:20rpx"
									  v-if="item.institutionStar">
									{{ item.institutionStar | filterStar }}
								</view>
							</view>
							<view class="info">
								<view class="title">
									<view class="title-left">
										<view class="name"> {{ item.name || '' }}</view>
									</view>
									<view class="distance" v-if="item.distance">{{item.distance.toFixed(1)}}km
									</view>
								</view>
								<view class="info-list">
									<v-image style="margin-right: 10rpx;font-size: 0;" :src="icon22" width="30rpx"
										height="30rpx" />
									{{ item.principalPhone || '暂无电话' }}
								</view>
								<view class="info-list">
									<v-image style="margin-right: 10rpx;font-size: 0;" :src="icon23" width="27rpx"
										height="30rpx" />
									<view class="organAreaValue">
										{{ item.addressCity || '' }}{{item.addressArea||''}}{{ item.addressDetail || '' }}
									</view>
								</view>
							</view>
						</view>

					</scroll-view>
				</view>
			</view>
		</view>

		<u-picker mode="region" v-model="showArea" :params="params" @confirm="confirmArea" :defaultRegion="defaultRegion"></u-picker>
		<u-select v-model="show" :list="selectList" :default-value="defautValueq" @confirm="confirm"></u-select>

		<!-- 		<u-select v-model="showArea" :default-value="defautValue1" mode="single-column" :list="options1"
			label-name="name" @confirm="confirmArea"></u-select> -->
	</view>
</template>

<script>
	import Api from '@/common/api.js'
	import vImage from '@/components/lazyImage.vue'
	const utils = require("@/utils/gdToBaidu.js")
	import {
		mapMutations,
		mapState
	} from 'vuex';
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
				defautValue1: [0],
				defautValue2: [0],
				defautValue3: [0],
				defautValue4: [0],
				defautValueq: [0],
				rangKey: 'name',
				defaultRegion:['上海市','市辖区','黄浦区'],
				params: {
					province: true,
					city: true,
					area: true,
				},
				rlatitude: '',
				rlongitude: '',
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
				// options1: [{
				// 		"name": "全部",
				// 		"value": ""
				// 	},
				// 	{
				// 		"name": "市辖区",
				// 		"value": "150601"
				// 	},
				// 	{
				// 		"name": "东胜区",
				// 		"value": "150602"
				// 	},
				// 	{
				// 		"name": "康巴什区",
				// 		"value": "150603"
				// 	},
				// 	{
				// 		"name": "达拉特旗",
				// 		"value": "150621"
				// 	},
				// 	{
				// 		"name": "准格尔旗",
				// 		"value": "150622"
				// 	},
				// 	{
				// 		"name": "鄂托克前旗",
				// 		"value": "150623"
				// 	},
				// 	{
				// 		"name": "鄂托克旗",
				// 		"value": "150624"
				// 	},
				// 	{
				// 		"name": "杭锦旗",
				// 		"value": "150625"
				// 	},
				// 	{
				// 		"name": "乌审旗",
				// 		"value": "150626"
				// 	},
				// 	{
				// 		"name": "伊金霍洛旗",
				// 		"value": "150627"
				// 	}
				// ],
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
				latitude: 31.21,
				longitude: 121.53,
				markers: [],
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
			}
		},
		created() {
			const info = uni.getSystemInfoSync()
			this.maxHeight = info.screenHeight - info.windowTop
		},
		onLoad(e) {
			uni.setStorageSync('storeId')
			this.baseUrl = Api.erdsUrl
			if (e.type) this.insType = e.type
			this.handleMarkers()
			// this.getList()

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
			this.getLocation();
            this.handleMarkers();
		},
		filters: {
			filterStar(value) {
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
                    return '';
                }
			},
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'tabbar'])
		},
		methods: {
			back() {
				let canNavBack = getCurrentPages()
				if(canNavBack && canNavBack.length>1) {  
				    uni.navigateBack() 
				} else {  
				    history.back();  
				}
			},
            jumpDetail2(){
          		let str=JSON.stringify(this.mapDetail);
                str = str.replace(/%/g, '%25');
			    if(this.mapDetail){
                    uni.navigateTo({
                        url: `/ylao_pages/inst/detail?instDetail=`+encodeURIComponent(str),
                    })
				}
			},
			jumpDetail(item) {
                let str=JSON.stringify(item);
                str = str.replace(/%/g, '%25');
				if (item) {
                    uni.navigateTo({
                        url: `/ylao_pages/inst/detail?instDetail=`+encodeURIComponent(str),
                    })
				}

			},
			confirmArea(e) {
				this.organAreaCode = e.area.value
				this.defaultRegion=[e.province.label,e.city.label,e.area.label]
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
					this.defautValue2 = [this.selectList.findIndex(item => item.value == e[0].value)]
					this.averagePriceRange = e[0].value
				}
				if (this.type == '3') {
					this.defautValue3 = [this.selectList.findIndex(item => item.value == e[0].value)]
					this.star = e[0].value
				}
				if (this.type == '4') {
					this.defautValue4 = [this.selectList.findIndex(item => item.value == e[0].value)]
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
					this.defautValueq = this.defautValue2
					this.selectList = [{
							label: "全部",
							value: "",
						}, {
							label: '<3000元',
							value: 1,
						},
						{
							label: '3000元 - 5000元',
							value: 2,
						},
						{
							label: '5000元 - 8000元',
							value: 3,
						},
						{
							label: '8000元 - 10000元',
							value: 4,
						},
						{
							label: '>10000元',
							value: 5,
						}
					]
					this.show = true
				}
				if (type == '3') {
					this.defautValueq = this.defautValue3
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
					this.defautValueq = this.defautValue4
					this.selectList = [{
							label: "全部",
							value: '',
						}, {
							label: "机构",
							value: 1,
						}, {
							label: '居家',
							value: 2,
						},
						{
							label: '助餐点',
							value: 3,
						},
						{
							label: '社区卫生服务站',
							value: 4,
						},
						{
							label: '调度中心',
							value: 5,
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
					quCode: this.organAreaCode || '',
					institutionStar: this.star,
					priceStatus: this.averagePriceRange,
					institutionName: this.organName.trim(),
					insType: this.distanceType, //机构类型1机构3居家11调度中心
				}
				let data = await Api.apiCall('get', Api.api.getInsMapList, params, true)
				console.log(data, '333');
				let res = data
                this.total = res.length
                this.list = res
				this.markers = []
				this.list1 = res
				console.log(this.list1, 'this.list1');
				res.forEach(ele => {
					if (ele.addressLat && ele.addressLng) {
						let location = this.bMapToQQMap(ele.addressLng, ele.addressLat)
						console.log(location,'locationlocation');
						this.markers.push({
							id: ele.id,
							latitude: Number(location[1]),
							longitude: Number(location[0]),
							width: 26,
							height: 33,
							iconPath: '../../static/img/icon1.png',
                            label: {
                                width: 25,
                                height: 25,
                                borderWidth: 1,
                                borderRadius: 10,
                            }
							// callout: {
							// 	color: "#FF6F3D",
							// 	fontSize: 11,
							// 	borderRadius: '32rpx',
							// 	borderWidth: '1rpx',
							// 	bgColor: '#ffffff',
							// 	padding: 13,
							// 	content: ele.name,
							// 	anchorY: 0, // Y轴偏移量
							// 	anchorX: 0, // X轴偏移量
							// 	display: "ALWAYS" // 一直展示
							// },
						})
					}
				})
				console.log(this.markers,'-------');
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
							this._mapContext.includePoints({
								points:this.markers,
								complete:(res)=>{
									uni.hideLoading()
								},
								fail:(res)=>{
									uni.hideLoading()
								},
							})
						}
					})
				}
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
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				this.emptyTxt = '加载中'
				let params = {
					storeId: uni.getStorageSync('storeId'),
					quCode: this.organAreaCode || '',
					institutionStar: this.star,
					priceStatus: this.averagePriceRange,
					institutionName: this.organName.trim(),
					insType: this.distanceType, //机构类型1机构3居家11调度中心
				}
				console.log(params, '');

				let data = await Api.apiCall('get', Api.api.getInsMapList, params, true)
				console.log(data, '');
				let res = data
				this.total = res.length
				this.list = res
				if (res.length === 0) {
					this.emptyTxt = '暂无数据'
				}
			},
			getLocation() {
				console.log(888);
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: (location) => {
						console.log(location, 111)
						this.location = location
						const marker = utils.transformFromGCJToBaidu(location.latitude, location.longitude)
						this.rlatitude = marker.latitude
						this.rlongitude = marker.longitude
						// this.latitude = location.latitude
						// this.longitude = location.longitude
						this.getMyLocaton()
					},
					fail() {
						console.log(3333);
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
	.setvv {
		/deep/ .u-tabbar__content {
			z-index: 999;
		}

		/deep/ .u-drawer {
			z-index: 1100;
		}

		.navbar {
			height: 110rpx;
			position: fixed;
			top: 0%;
			left: 0;
			width: 100%;
			overflow: hidden;
			z-index: 22;

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
	}

	.mapDetail {
		width: 710rpx;
		position: fixed;
		bottom: 11vh;
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
		// position: fixed;
		// top: 51%;
		// left: 50%;
		// transform: translateX(-50%);
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
			top: 84%;
		}

		&.storeFlag {
			top: 70%;
		}
	}

	.list {
		width: 710rpx;
		background: #FAFAFA;
		border-radius: 24rpx;
		// position: fixed;
		// left: 50%;
		// bottom: 0%;
		// transform: translateX(-50%);
		position: relative;
		top: 0;
		z-index: 999;
		transition: all .2s ease;
		overflow: scroll;
		margin-top: 20rpx;
		&.showMap {
			top: 100%;
		}

		&.storeFlag {
			top: 2000px;
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
