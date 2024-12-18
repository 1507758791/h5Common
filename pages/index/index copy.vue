<template>
	<view class="dcbox">
		<image class="bgimg" src="../../static/bgs.png" mode=""></image>
		<view class="yinc" style="width: 100rpx;height: 100rpx;position: absolute;left: 20rpx;top: 40rpx;"
			@longpress="showLogin = true">

		</view>
		<popupFowTip v-model="showTipForServer" title="填写受服务人信息" desc="请使用微信扫码二维码填写受服务人信息" :src="ercode"></popupFowTip>
		<popupFowTip v-model="showTip" title="填写收货地址" desc="请使用微信扫码二维码填写收货信息" :src="ercode"></popupFowTip>

		<view class="cbox" :style="{height:`${goodsList.length * ceilHeight}rpx`}">
			<!-- <view class="tabs_box">

				<view class="flex">
					<view class="tabs_items" :style="index == 0?'margin-right:20rpx;':''" v-for="(item,index) in list"
						:key="item">
					</view>
				</view>
				<view class="tabs_items_label_x flex-justify-between">
					<view class="tabs_items_label_xs" :style="index == 0?'margin-right:20rpx;':''"
						:class="{'selected_label':curIndex == index}" v-for="(item,index) in list" :key="item"
						@tap="tabIndex(index)">
						{{item}}
					</view>
				</view>
				<view class="selected_tabs" :style="curIndex === 0?'left:0;':'left:0;margin-left:364rpx;'">
					<image src="../../static/tabselected.png" mode=""></image>
				</view>
			</view> -->

			<view v-show="curIndex == 0" class="scview_dc">
				<!-- style="padding-bottom: 122rpx;" -->
				<view class="flex flex-wrap flex-justify-between bbx"  ref="list_box" :style="{height: `${renderHeight}px`, top:`${offsetDistance}rpx`,position:'abosolute' }" >
					<view class="item flex-column" v-for="(item,index) in visibleData" :key="index"
						@tap="tapToDec(item.type, item, index,1)">
						<!-- <image :src="item.pic ? item.pic :'/static/noPic/360.png'" style="width: 322rpx;height: 322rpx;" mode=""></image> -->
						<u-image width="322" height="322" :src="item.pic ? item.pic :'/static/noPic/360.png'">
							<u-loading slot="loading"></u-loading>
						</u-image>
						<view class="g_name two_ellipsis">
							{{item.name||'--'}}
						</view>
						<!-- <view class="one_ellipsis" style="height: 44rpx;">
							<view class="coupon_tag">
								{{item.name}}
							</view>
					
						</view> -->
						<view class="p_sell flex-justify-between">
							<view class="price">
								<text>￥</text>
								<text>{{ item.price | priceDecimal }}</text>
							</view>

							<!-- <view class="yishou" v-if="item.selectedNum == 0">
								<u-button @click="handleAddGood(index)" border-radius="6rpx" :hair-line="false" ripple :custom-style="customStyle">立即购买</u-button>
							</view> -->
							<view class="" style="margin-right: 16rpx;">
								<number-box :txtStyle="{color:'#333333',fontSize:'32rpx',height:'48rpx',width:'48rpx'}"
									btnWidth="48" btn-height="48" @remove="removeGood(item,index)"
									@add="(e)=>{addGood(e,item,index)}" :num="item.selectedNum"></number-box>
							</view>
						</view>
					</view>

					<view class="noData" v-if="!goodsList.length">
						<u-image width="247" height="240" style="margin: 0 auto;margin-bottom: 55rpx;"
							src="/static/cartNo.png">
							<u-loading slot="loading"></u-loading>
						</u-image>
						<view class="no_line">

						</view>
						<view class="tips">
							该站点暂无商品
						</view>
						<view class="loginBtn" @tap="showLogin = true">
							更改店铺
						</view>
					</view>
				</view>
			</view>

			<view v-show="curIndex == 1" class="scview_dc">
				<view class="flex flex-wrap flex-justify-between bbx" style="padding-bottom: 122rpx;">
					<view class="item flex-column" v-for="(item,index) in serverList" :key="index"
						@tap="tapToDec(item.type, item, index,2)">
						<u-image width="322" height="322"
							:src="item.pic ? item.pic + '?x-oss-process=image/resize,m_lfit,h_500,w_500' : '' || '/static/noPic/360.png'">
							<u-loading slot="loading"></u-loading>
						</u-image>
						<view class="g_name two_ellipsis">
							{{item.name||'--'}}
						</view>
						<!-- <view class="one_ellipsis" style="height: 44rpx;">
							<view class="coupon_tag">
								{{item.name}}
							</view>
					
						</view> -->
						<view class="p_sell flex-justify-between">
							<view class="price">
								<text>￥</text>
								<text>{{ item.price | priceDecimal }}</text>
							</view>

							<view class="yishou">
								<u-button @click="handleAddGood(item,index)" border-radius="6rpx" :hair-line="false"
									ripple :custom-style="customStyle">立即购买</u-button>
							</view>
							<!-- <view class="" style="margin-right: 16rpx;">
								<number-box :txtStyle="{color:'#333333',fontSize:'32rpx',height:'48rpx',width:'48rpx'}"
									btnWidth="48" btn-height="48" @remove="removeGood(item,index)" @add="addGood(item,index)"
									:num="item.selectedNum"></number-box>
							</view> -->
						</view>
					</view>
					<view class="noData" v-if="!serverList.length">
						<u-image width="247" height="240" style="margin: 0 auto;margin-bottom: 55rpx;"
							src="/static/cartNo.png">
							<u-loading slot="loading"></u-loading>
						</u-image>
						<view class="no_line">

						</view>
						<view class="tips">
							该站点暂无商品
						</view>
						<view class="loginBtn" @tap="showLogin = true">
							更改店铺
						</view>
					</view>
				</view>
			</view>

		</view>

		<view v-if="curIndex == 0" class="gcart flex-items-center flex-justify-between" id="fixBox"
			:class="{'isShowCart':watchList.length}">
			<view class="flex-items-center" @tap="showCart = true">
				<view class="scass" style="" :class="{'scales':isScale}">
					<u-image width="78" height="78" style="margin-right: 10rpx;margin-top: -8rpx;"
						src="/static/img/cartlan.png">
						<u-loading slot="loading"></u-loading>
					</u-image>
				</view>
				<view class="total_goods mt-20">
					共{{total}}件
				</view>
				<view class="hji mt-20" style="margin-top: 18rpx;">
					合计
				</view>
				<view class="prices" style="margin-top: 10rpx;">
					<text>￥</text>
					<text>{{totalPrice}}</text>
				</view>
			</view>
			<view class="" style="width: fit-content;height: fit-content;">
				<u-button @click="handleSubmit()" shape="circle" :hair-line="false" ripple
					:custom-style="customStyle1">去结算</u-button>
			</view>
		</view>
		<acart ref="inCart" :cartBasketRect="cartBasketRect"></acart>
		<!-- 购物车弹窗 -->
		<u-popup v-model="showCart" mode="bottom" border-radius="17" height="574rpx" z-index="300">
			<view class="cartPop" style="padding: 32rpx 20rpx 120rpx;">
				<view class="actions flex flex-justify-between flex-items-center"
					style="margin-right:18rpx;margin-bottom: 34rpx;">
					<view class="flex flex-items-center" @tap="handleSelectAll()">
						<image v-if="!allCheck" style="width: 40rpx;height: 40rpx;" src="../../static/img/noselect.png"
							mode=""></image>
						<image v-else style="width: 40rpx;height: 40rpx;" src="../../static/img/selected.png" mode="">
						</image>
						<view class="quanxuan">
							全选
						</view>
					</view>

					<view class="dela flex-items-center" @tap="handleClear">
						<image style="width: 26rpx;height: 28rpx;" src="../../static/img/deletes.png" mode=""></image>
						<view class="qingk">
							清空
						</view>
					</view>

				</view>

				<view class="watch_list flex-items-center" v-for="(item,index) in watchList" :key="index">
					<image v-if="!item.checked" @tap="handleCheck(index)"
						style="width: 40rpx;height: 40rpx;margin-right: 19rpx;flex-shrink: 0;"
						src="../../static/img/noselect.png" mode=""></image>
					<image v-if="item.checked" @tap="handleCheck(index)"
						style="width: 40rpx;height: 40rpx;margin-right: 19rpx;flex-shrink: 0;"
						src="../../static/img/selected.png" mode=""></image>
					<image style="width: 158rpx;height: 158rpx;margin-right: 20rpx;border-radius: 10rpx;flex-shrink: 0;"
						:src="item.pic ? item.pic + '?x-oss-process=image/resize,m_lfit,h_500,w_500' : '' || '/static/noPic/360.png'"
						mode=""></image>
					<view class="hw_gd flex-column flex-justify-between">
						<view class="good_name one_ellipsis">
							{{item.productName||item.name}}
						</view>
						<view class="flex" style="margin: 14rpx 0 12rpx 0;">
							<view class="tags one_ellipsis" v-for="(item1,index) in item.pareArr" :key="index">
								{{item1}}
							</view>
						</view>

						<view class="pad_goods flex-items-center flex-justify-between">
							<view class="price">
								<text>￥</text>
								<text>{{item.price}}</text>
							</view>
							<number-box :txtStyle="{color:'#333333',fontSize:'32rpx',height:'48rpx',width:'48rpx'}"
								btnWidth="48" btn-height="48" @remove="removeGoodCart(item,index)"
								@add="(e)=>{addGoodCart(item,index)}" :num="item.selectedNum"></number-box>
						</view>
					</view>
				</view>

			</view>

		</u-popup>

		<!-- 规格弹窗食物 -->
		<u-popup :z-index="10078" v-model="skuShow" mode="bottom" height="896rpx" border-radius="17">
			<view class="sku_content" style="position: relative;padding-top: 47rpx;padding-bottom: 200rpx;">

				<!-- 						<image class="set_dikou_logo"
					src="https://hkyl.obs.cn-east-3.myhuaweicloud.com:443/PMrES2ZXchcyfa477b5ff6094402b14294a7b79d2e9c.png"
					mode=""></image> -->
				<view class="close_tag" @click="skuShow = false"
					style="position: absolute;right: 22rpx;top: 28rpx;z-index: 2222;">
					<image style="width: 48rpx;height: 48rpx;" src="/static/closedb.png" mode=""></image>
					<!-- <u-icon name="close-circle" size="60rpx" color="#9E8F8D"></u-icon> -->
				</view>
				<scroll-view :scroll-y="true" class="scroll_dikou">
					<view class="list_dikou">
						<addService @addGoods="addGoodsSku" :defaultItem="serviceInfo" :info="serviceInfo"></addService>
					</view>

				</scroll-view>
				<!-- <view class="confrim-btn">
					<button @click="dikouShow = false;">确定</button>
				</view> -->
			</view>

		</u-popup>

		<!-- 规格弹窗服务 -->
		<u-popup :z-index="10078" v-model="skuShowServer" mode="bottom" height="896rpx" border-radius="17">
			<view class="sku_content" style="position: relative;padding-top: 47rpx;padding-bottom: 200rpx;">

				<!-- 						<image class="set_dikou_logo"
					src="https://hkyl.obs.cn-east-3.myhuaweicloud.com:443/PMrES2ZXchcyfa477b5ff6094402b14294a7b79d2e9c.png"
					mode=""></image> -->
				<view class="close_tag" @click="skuShowServer = false"
					style="position: absolute;right: 22rpx;top: 28rpx;z-index: 2222;">
					<image style="width: 48rpx;height: 48rpx;" src="/static/closedb.png" mode=""></image>
					<!-- <u-icon name="close-circle" size="60rpx" color="#9E8F8D"></u-icon> -->
				</view>
				<scroll-view :scroll-y="true" class="scroll_dikou">
					<view class="list_dikou">
						<addService @addGoods="addGoodsSkuServer" :selectnum="false" :defaultItem="serviceInfoServer"
							:info="serviceInfoServer"></addService>
					</view>

				</scroll-view>
				<!-- <view class="confrim-btn">
					<button @click="dikouShow = false;">确定</button>
				</view> -->
			</view>

		</u-popup>


		<u-popup v-model="showLogin" mode="top" length="33%">
			<view class="" style="padding: 40rpx;">

				<view class="form-item" style="margin-top: 40rpx;margin-bottom: 0;">
					<image src="/static/img/login/phone.png" style="height: 34rpx;margin-top: 15rpx;"></image>
					<input placeholder="请输入店铺ID" placeholder-style="color:#DCDCDC" @input="accountInput" />
					<view class="err-message" v-if="accountErr">请输入店铺ID</view>
				</view>
				<!-- <view class="form-item">
					<image src="/static/img/login/lock.png" style="height: 34rpx;margin-top: 15rpx;"></image>
					<input placeholder="请输入密码" placeholder-style="color:#DCDCDC" style="padding-right: 160rpx;"
						@input="passwordInput" type="password" />
					<view class="err-message" v-if="passwordErr">{{isPasswordText}}</view>
				</view> -->
				<button class="form-btn" :style="isLogin ? 'background:rgba(255,112,0,0.5)' : ''" :loading="isLogin"
					:disabled="isLogin" @tap="handleLogin">
					登 录
				</button>
			</view>

		</u-popup>
		<updateApp :show="isShowUpdate" :isForce="isForce" :apkUrl="apkUrl" @close="hideModal"
			:updateContent="updateContent"></updateApp>
	</view>
</template>

<script>
	import acart from '@/components/flyInCart.vue'
	import numberBox from '@/components/numberBox.vue'
	import popupFowTip from '@/components/popupForTip/popupForTip.vue'
	import addService from '@/components/addService.vue'
	import Api from '@/common/api.js'
	import updateApp from '@/components/updateApp/updateApp.vue';
	import {
		mapMutations,
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				pageNum: 1,
				pageNum1: 1,
				pageSize: 30,
				ercodePic: '',
				showTip: false,
				showTipForServer: false,
				isScale: false,
				cartBasketRect: {},
				allCheck: false,
				showCart: false,
				showLogin: false,
				list: ['生活好物', '便民服务'],
				curIndex: 0,
				serverList: [1, 2, 3, 45, 6],
				goodsList: [{
					selectedNum: 0,
					price: '18.3',
					id: 1221,
					checked: false
				}, {
					selectedNum: 0,
					price: 18.3,
					id: 1222,
					checked: false
				}, {
					selectedNum: 0,
					price: 18.3,
					id: 1223,
					checked: false
				}, {
					selectedNum: 0,
					price: 18.3,
					id: 1224,
					checked: false
				}, {
					selectedNum: 0,
					price: 18.3,
					id: 1225,
					checked: false
				}],
				watchList: [],
				form: {},
				accountErr: '',
				passwordErr: '',
				customStyle: {
					width: '129rpx', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					height: '48rpx',
					background: 'linear-gradient( 133deg, #F98D2B 0%, #FE6327 100%)',
					borderRadius: '6rpx 6rpx 6rpx 6rpx',
					fontSize: '26rpx',
					color: '#ffffff',
					border: 'none'
				},
				customStyle1: {
					width: '208rpx', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					height: '80rpx',
					background: 'linear-gradient( 180deg, #FF7634 0%, #FF5C14 100%)',
					fontSize: '32rpx',
					color: '#ffffff',
					border: 'none'
				},
				isLogin: false,
				skuShow: false, //规格控制
				serviceInfo: {},
				skuShowServer: false,
				serviceInfoServer: {},
				ercode: '',
				isShowUpdate: false,
				apkUrl: '',
				isForce: true,
				updateContent: '',


				renderHeight: 0, //用户的视口高度
				ceilHeight: 252, //单行高度 rpx
				// visibleData: [], //可视区显示的数据
				startIndex: 0, //起始位置
				endIndex: 0, //结束位置
				top: 0,
				// visibleCount: 0, //
				offsetDistance: 0, //偏移量

			}
		},
		components: {
			numberBox,
			acart,
			popupFowTip,
			addService,
			updateApp
		},
		watch: {
			watchList: {
				handler(nv, ov) {
					let arr = nv.filter(item => item.checked)
					if (arr.length == nv.length) {
						this.allCheck = true
					} else {
						this.allCheck = false
					}
				},
				deep: true
			},
			goodsList: {
				handler(nv, ov) {
					// let arr = nv.filter(item=>item.selectedNum>0)
					// this.watchList = arr
					if (!this.watchList.length) {
						this.showCart = false
					}
					// this.watchList.forEach(item=>{
					// 	let indexo = nv.findIndex(item1=>item1.id == item.id)
					// 	console.log(indexo,nv[indexo].selectedNum,ov[indexo].selectedNum);
					// 	if(nv[indexo].selectedNum == 1&&ov[indexo].selectedNum == 0){
					// 		console.log('ddddada');
					// 		item.checked = true
					// 	}
					// })
					// console.log(this.watchList);
				},
				deep: true
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'statusBar']),
			total() {
				let arr1 = this.watchList.filter(item => item.selectedNum > 0)
				let total = arr1.reduce((prev, curv, index) => {
					return prev + curv.selectedNum
				}, 0)
				return total
			},
			totalPrice() {
				let arr1 = this.watchList.filter(item => item.selectedNum > 0)
				let total = arr1.reduce((prev, curv, index) => {
					return prev + curv.selectedNum * parseFloat(curv.price)
				}, 0)
				return total.toFixed(2)
			},
			// 可视区显示的item 数量：设备屏幕高度/ 每个item的高度
						visibleCount() {
							// 向上取整
							let count = Math.ceil(this.renderHeight / this.rpxToPx(this.ceilHeight))
							return count
			
						},
						visibleData() {
							// 返回最小的哪个数字 Math.min
							let list = this.goodsList.slice(this.startIndex, Math.min(this.endIndex, this.goodsList.length))
							return Object.freeze(list)
						},


		},
		onPageScroll({
					scrollTop
				}) {
					// console.log(scrollTop);
					// 计算起始位置：距离顶部高度/ 每个item的高度
					if( (Math.floor(scrollTop /this.rpxToPx(this.ceilHeight))%2 == 0)){
						this.startIndex = Math.floor(scrollTop / this.rpxToPx(this.ceilHeight))
						// 计算结束位置
						this.endIndex = this.startIndex + this.visibleCount
						//计算偏移量（防止闪烁跳跃） ↓
						this.offsetDistance = this.pxToRpx(scrollTop - (scrollTop % this.rpxToPx(this.ceilHeight)))
					}
					this.$refs.inCart.addToCart();
				},
		mounted() {
					// 结束位置：起始位置+可视区显示的item 数量
					this.endIndex = this.startIndex + this.visibleCount
				},
		onLoad() {
			uni.setStorageSync('storeId', 1515)
			let sysInfo = uni.getSystemInfoSync()
			this.renderHeight = sysInfo.windowHeight; //获取设备屏幕的高度
			this.getGoodsList()

		},
		
		onShow() {
			this.getAppLastVersion()
		},
		onReady() {
			const self = this

			let q = uni.createSelectorQuery()
			//获取购物车位置
			setTimeout(function() {
				q.select('#fixBox').boundingClientRect(data => {
					self.cartBasketRect = data
				}).exec();
			}, 100)
		},
		// onPageScroll() {
		// 	//调用是因为 重复使用了点击动画位置 保证不抖动。 不传参调用即清空点击点
			
		// },
		onReachBottom() {
			if (this.curIndex == 0) {
				this.getGoodsList()
			} else {
				this.getServerList()
			}
		},
		methods: {
			...mapMutations(['login', 'setReceiveStatus']),
			pxToRpx(px) {
			    const screenWidth = uni.getSystemInfoSync().screenWidth
			    return (750 * Number.parseInt(px)) / screenWidth
			},
			rpxToPx(rpx) {
			    const screenWidth = uni.getSystemInfoSync().screenWidth
			    return (screenWidth * Number.parseInt(rpx)) / 750
			},
			 
			//规格商品选择完成
			addGoodsSku(chooseItem, selectedNum, flag) {
				console.log(chooseItem, selectedNum);
				let indexfind = this.watchList.findIndex(item1 => {
					return item1.id == chooseItem.id
				})
				let indexfindForGoods = this.goodsList.findIndex(item1 => {
					return item1.id == chooseItem.productId
				})


				if (indexfind != -1) {
					if (this.watchList[indexfind].selectedNum + selectedNum > chooseItem.stock) {
						this.$u.toast('所选商品数超出最大库存！')
						return
					}
					this.watchList[indexfind].selectedNum = this.watchList[indexfind].selectedNum + selectedNum
				} else {
					this.watchList.push({
						...chooseItem,
						selectedNum: selectedNum,
						checked: true
					})
				}
				this.goodsList[indexfindForGoods].selectedNum = this.goodsList[indexfindForGoods].selectedNum + selectedNum
				this.skuShow = false
				if (!flag) {
					this.animate(this.event, chooseItem.productId)
				}
			},
			async handleSubmit() {
				let dealArr = this.watchList.filter(item => item.checked)
				console.log(this.watchList)
				if (!dealArr.length) {
					this.$u.toast('请选择商品')
					return
				}
				let fArr = dealArr.map((item, index) => {
					if (item.productId) {
						return {
							goodsId: item.productId,
							type: 1,
							total: item.selectedNum,
							skuId: item.id
						}
					} else {
						return {
							goodsId: item.id,
							type: 1,
							total: item.selectedNum,
						}
					}
				})
				let data = await Api.apiCall('post', Api.api.getQrcodeForpms, fArr, true)
				this.ercode = data
				this.showTip = true
			},
			handleSelectAll() {
				this.watchList = this.watchList.map(item => {
					return {
						...item,
						checked: true
					}
				})
			},
			handleClear() {
				uni.showModal({
					title: '警告',
					content: '是否确认清空所有购物车商品？',
					success: (res) => {
						if (res.confirm) {
							this.watchList = []
							this.goodsList = this.goodsList.map(item => {
								return {
									...item,
									selectedNum: 0
								}
							})
							this.$u.toast('清空成功')
						}
					}

				})
			},
			//隐藏更新弹窗
			hideModal(e) {
				this.isShowUpdate = false;
			},
			hotUpdate(url) {
				console.log('热更新');
				uni.downloadFile({
					url: url,
					success: downloadResult => {
						if (downloadResult.statusCode === 200) {
							plus.runtime.install(
								downloadResult.tempFilePath, {
									force: false
								},
								function() {
									console.log('install success...');
									plus.runtime.restart();
								},
								function(e) {
									console.error('install fail...', e);
								}
							);
						} else {
							console.log(downloadResult.statusCode);
						}
					},
					fail: res => {
						console.log('热更新shibai', res);
					}
				});
			},
			//获取版本号
			async getAppLastVersion() {
				if (uni.getSystemInfoSync().platform == 'android') {
					let params = {};
					let data = await Api.apiCall('get', Api.api.getAppLastVersion, params);
					if (data) {
						// console.log(data);
						let versonCode = plus.runtime.version.split('.').join('');
						console.log(versonCode, data.versionCode, 'ccodecodecodecodecodecodeodecode');
						Api.appVersion = plus.runtime.version;
						if (Number(versonCode) < data.versionCode) {
							if (data.forceType == 'Y') {
								console.log('强制更新');
								this.isForce = false;
							} else if (data.forceType == 'U') {
								console.log('热更新');
								this.hotUpdate(data.packageUrl);
								return
							} else if (data.forceType == 'N') {
								// this.hotUpdate(data.packageUrl);
							}
							console.log(this.isForce);
							this.updateContent = data.versionExplain;
							this.isShowUpdate = true;
							// if (this.isShowUpdate) {
							// 	uni.hideTabBar();
							// } else {
							// 	uni.showTabBar();
							// }
							this.apkUrl = data.packageUrl;
						}
					}
				} else {
					let params = {
						type: 1
					};
					let data = await Api.apiCall('get', Api.api.getAppLastVersion, params);
					if (data) {
						// console.log(data);
						let versonCode = plus.runtime.version.split('.').join('');
						console.log(versonCode, data.versionCode);
						if (Number(versonCode) < data.versionCode) {
							if (data.forceType == 'Y') {
								console.log('强制更新');
								this.isForce = false;
							} else if (data.forceType == 'U') {
								this.hotUpdate(data.packageUrl);
								return
							}
							console.log(this.isForce);
							this.updateContent = data.versionExplain;
							this.isShowUpdate = true;
							if (this.isShowUpdate) {
								uni.hideTabBar();
							} else {
								uni.showTabBar();
							}
							this.apkUrl = data.packageUrl;
						}
					}
				}
			},
			tabIndex(i) {
				this.curIndex = i
				this.getAppLastVersion()
				if (i == 0) {
					if (this.pageNum == 1) {
						this.getGoodsList()
					}
				} else {
					if (this.pageNum1 == 1) {
						this.getServerList()
					}
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
			// 密码登入
			async handleLogin() {
				if (!this.form.account) {
					this.isPhoneText = '请输入店铺ID';
					this.accountErr = true;
					return false;
				}
				// if (!this.form.password) {
				// 	this.passwordErr = true;
				// 	this.isPasswordText = '请输入密码'
				// 	return false;
				// }
				// if (!this.phoneErr && !this.passwordErr) {
				// 	this.isLogin = true
				// }
				var info = {
					clientid: '8126871628'
				}
				uni.setStorageSync('storeId', this.form.account)
				uni.showToast({
					title: '更改成功',
					icon: 'none'
				});
				this.initState()
				this.getGoodsList()
				this.getServerList()
				this.watchList = []
				// setTimeout(()=>{
				// 	uni.reLaunch({
				// 		url:'/pages/index/index'
				// 	})
				// },500)

				this.showLogin = false
				// // ,cid:info.clientid
				// // console.log('cid='+info.clientid)
				// let params = {
				// 	username: this.form.account,
				// 	password: this.form.password,
				// 	loginType: 0,
				// 	cid: info.clientid
				// };
				// console.log(params);
				// let data = await Api.apiCall('post', Api.api.passwordLogin, params);
				// console.log(data)
				// if (data) {
				// 	uni.setStorageSync('userInfo', data.userInfo);
				// 	uni.setStorageSync('storeInfo', data.storeInfo)
				// 	uni.setStorageSync('token', data.token);
				// 	uni.setStorageSync('username', this.form.account);
				// 	uni.setStorageSync('password', this.form.password);
				// 	this.login(data);
				// 	uni.showToast({
				// 		title: '登录成功',
				// 		icon: 'none'
				// 	});
				// } else {

				// 	this.viewShow = true
				// 	this.isLogin = false;
				// }
			},
			handleAddGood(item, i) {
				if (item.skuStockList && item.skuStockList.length) {
					let dealSkuDefaultArr = item.productAttributeValueList.map(item => {
						return {
							...item,
							selectedIndex: 0
						}
					})
					let chooseSpecDeal = dealSkuDefaultArr.map(item => {
						return item.pics[0]
					})
					this.serviceInfoServer = {
						...item,
						productAttributeValueList: dealSkuDefaultArr,
						selectedNum: 1,
						chooseSpec: chooseSpecDeal
					}
					this.skuShowServer = true
					return
				} else {
					this.genereServerCode(item)
				}


			},
			//多规格服务弹窗点击选完了
			addGoodsSkuServer(chooseItem, selectedNum) {
				console.log(chooseItem, selectedNum);
				this.genereServerCode(chooseItem)
			},
			async genereServerCode(item) {
				this.skuShowServer = false
				if (item.productId) {
					let fArr = [{
						type: 2,
						goodsId: item.productId,
						total: 1,
						skuId: item.id
					}]
					let data = await Api.apiCall('post', Api.api.getQrcodeForpms, fArr, true)
					this.ercode = data
					this.showTipForServer = true
				} else {
					let fArr = [{
						type: 2,
						goodsId: item.id,
						total: 1
					}]
					let data = await Api.apiCall('post', Api.api.getQrcodeForpms, fArr, true)
					this.ercode = data
					this.showTipForServer = true
				}
			},
			handleCheck(index) {
				this.watchList[index].checked = !this.watchList[index].checked
			},
			removeGood(item, i) {
				if (item.skuStockList && item.skuStockList.length) {
					this.$u.toast('多规格商品需要在购物车中减少')
					this.showCart = true
					return
				}
				let finindex = this.watchList.findIndex(item1 => item1.id == item.id)
				if (finindex != -1) {
					this.goodsList[i].selectedNum = this.goodsList[i].selectedNum - 1
					if (this.watchList[finindex].selectedNum <= 1) {
						this.watchList.splice(finindex, 1)
					} else {
						this.watchList[finindex].selectedNum = this.watchList[finindex].selectedNum - 1
					}
					console.log(this.goodsList, this.watchList);
				}
			},

			addGood(e, item, i) {
				debugger
				if (item.skuStockList && item.skuStockList.length) {
					let dealSkuDefaultArr = item.productAttributeValueList.map(item => {
						return {
							...item,
							selectedIndex: 0
						}
					})
					let chooseSpecDeal = dealSkuDefaultArr.map(item => {
						return item.pics[0]
					})
					this.serviceInfo = {
						...item,
						productAttributeValueList: dealSkuDefaultArr,
						selectedNum: 1,
						chooseSpec: chooseSpecDeal
					}
					this.skuShow = true
					this.event = e
					return
				}
				console.log(e);

				if (item.selectedNum > 99) {
					item.selectedNum = 99;
					return
				}
				if (!item.stock) {
					this.$u.toast('库存不足')
					return
				}
				let finindex = this.watchList.findIndex(item1 => item1.id == item.id)
				if (finindex != -1) {
					if (item.stock <= this.watchList[finindex].selectedNum) {
						this.$u.toast('库存不足')
						return
					}
					this.goodsList[i].selectedNum = this.goodsList[i].selectedNum + 1
					let cnum = this.watchList[finindex].selectedNum
					this.watchList[finindex].selectedNum = cnum + 1
				} else {
					let cloneItem = {
						...item,
						selectedNum: item.selectedNum + 1
					}
					this.goodsList[i].selectedNum = this.goodsList[i].selectedNum + 1
					this.watchList.push({
						...cloneItem,
						checked: true
					})
					console.log(this.watchList);
				}
				if (e) {
					this.animate(e, item.id)
				}

				// if(item.selectedNum == 0){
				// 	// item.selectedNum = item.selectedNum + 1
				// 	this.goodsList[i].selectedNum = this.goodsList[i].selectedNum + 1
				// 	this.watchList.push(item)
				// }else{
				// 	this.goodsList[i].selectedNum = this.goodsList[i].selectedNum + 1
				// 	this.watchList[finindex].selectedNum = this.watchList[finindex].selectedNum + 1
				// }
			},
			animate(e, id) {
				this.$refs.inCart.addToCart(e, id);
				this.isScale = true
				setTimeout(() => {
					this.isScale = false
				}, 600)
			},
			removeGoodCart(item, i) {
				if (item.productId) {
					let finindexpr = this.goodsList.findIndex(item1 => item1.id == item.productId)
					this.goodsList[finindexpr].selectedNum = this.goodsList[finindexpr].selectedNum - 1
					if (item.selectedNum == 1) {
						this.watchList.splice(i, 1)
					} else {
						this.watchList[i].selectedNum = this.watchList[i].selectedNum - 1
					}
				} else {
					let finindex = this.goodsList.findIndex(item1 => item1.id == item.id)

					this.goodsList[finindex].selectedNum = this.goodsList[finindex].selectedNum - 1
					if (item.selectedNum == 1) {
						this.watchList.splice(i, 1)
					} else {
						this.watchList[i].selectedNum = this.watchList[i].selectedNum - 1
					}
				}



			},
			tapToDec(type, item, index, fla) {
				uni.setStorageSync('detail', item)
				uni.navigateTo({
					url: `/pages/detail/detail?type=${fla}&id=${item.id}`
				})

			},
			addGoodCart(item, i) {
				if (item.productId) {
					let finindexpr = this.goodsList.findIndex(item1 => item1.id == item.productId)

					this.goodsList[finindexpr].selectedNum = this.goodsList[finindexpr].selectedNum + 1
					this.watchList[i].selectedNum = this.watchList[i].selectedNum + 1
				} else {
					let finindex = this.goodsList.findIndex(item1 => item1.id == item.id)

					this.goodsList[finindex].selectedNum = this.goodsList[finindex].selectedNum + 1
					this.watchList[i].selectedNum = this.watchList[i].selectedNum + 1
				}

			},
			initState() {
				this.pageNum = 1
				this.pageNum1 = 1
			},
			async getGoodsList() {
				let params = {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					storeId: uni.getStorageSync('storeId'),
				}
				let data = await Api.apiCall('get', Api.api.getGoodsList, params, true)
				console.log(data);

				if (this.pageNum == 1) {
					this.goodsList = data.records.map(item => {
						return {
							...item,
							selectedNum: 0
						}
					})
					this.pageNum++
					return
				}
				if (this.goodsList.length >= data.total) {
					this.$u.toast('暂无更多')
					return
				}
				if (this.goodsList.length < data.total) {
					let dar = data.records.map(item => {
						return {
							...item,
							selectedNum: 0
						}
					})
					this.goodsList = this.goodsList.concat(dar)
				}

				this.pageNum++

			},
			async getServerList() {
				let params = {
					pageNum: this.pageNum1,
					pageSize: this.pageSize,
					storeId: uni.getStorageSync('storeId'),
				}
				let data = await Api.apiCall('get', Api.api.getServerList, params, true)
				if (this.pageNum1 == 1) {
					this.serverList = data.records.map(item => {
						return {
							...item,
							selectedNum: 0
						}
					})
					this.pageNum1++
					return
				}
				if (this.serverList.length >= data.total) {
					this.$u.toast('暂无更多')
					return
				}
				if (this.serverList.length < data.total) {
					let dar = data.records.map(item => {
						return {
							...item,
							selectedNum: 0
						}
					})
					this.serverList = this.serverList.concat(dar)
				}

				this.pageNum1++
				console.log(data);

			}
		}
	}
</script>
<style>
	page {
		background: rgba(247, 247, 247, 1);

	}
</style>
<style lang="scss" scoped>
	.tags {
		padding: 0 10rpx;
		text-align: center;
		line-height: 42rpx;
		height: 42rpx;
		background: #F1F1F1;
		border-radius: 4rpx 4rpx 4rpx 4rpx;
		font-weight: 400;
		font-size: 26rpx;
		color: #686868;
		margin-right: 10rpx;
		max-width: 150rpx;
	}

	.noData {
		width: 100%;
		margin-top: 50rpx;

		image {
			width: 247rpx;
			height: 240rpx;


		}

		.no_line {
			width: 40rpx;
			height: 4rpx;
			background: #FF6B26;
			margin: 0 auto;
			margin-bottom: 18rpx;
		}

		.tips {
			width: 100%;
			height: 38rpx;
			font-weight: 400;
			font-size: 28rpx;
			color: #1B2344;
			line-height: 38rpx;
			text-align: center;
			margin-bottom: 54rpx;
		}

		.loginBtn {
			width: 482rpx;
			height: 81rpx;
			background: linear-gradient(180deg, #FF7634 0%, #FF5C14 100%);
			border-radius: 69rpx 69rpx 69rpx 69rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			line-height: 81rpx;
			text-align: center;
			margin: 0 auto;
		}

	}

	.popTips {
		position: fixed;
		top: 0%;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.50);
		z-index: 20000;

		.pop_con {
			width: 633rpx;
			height: 822rpx;
			background: #FFFFFF;
			border-radius: 35rpx 35rpx 35rpx 35rpx;
			position: relative;

			.title {
				width: 100%;
				position: absolute;
				top: 28rpx;
				left: 214rpx;
				height: 49rpx;
				font-size: 35rpx;
				color: #000000;
				line-height: 49rpx;
				z-index: 8;
			}

			.bgb {
				width: 633rpx;
				height: 360rpx;
				background: #FFFFFF;
				border-radius: 0rpx 0rpx 35rpx 35rpx;
				position: absolute;
				bottom: 0%;
				left: 0;
				z-index: 5;
			}

			&>.ddimg {
				width: 633rpx;
				height: 514rpx;
				position: absolute;
				top: 0%;
				left: 0;
			}

			.ercode {
				margin-top: 380rpx;
				position: relative;
				z-index: 6;

				.code_s {
					width: 285rpx;
					height: 285rpx;
					background: #FFFFFF;
					border-radius: 31rpx 31rpx 31rpx 31rpx;
					border: 7rpx solid #FF7700;
					padding: 24rpx;

					&>image {
						width: 100%;
						height: 100%;
					}
				}

				.tiptxt {
					width: 472rpx;
					height: 63rpx;
					background: #FFF6EC;
					border-radius: 11rpx 11rpx 11rpx 11rpx;
					margin-top: 34rpx;
					text-align: center;
					line-height: 63rpx;
					font-size: 28rpx;
					color: #FF641E;
				}
			}
		}
	}



	.scass {
		transition: all .3s ease;
		width: 78rpx;
		height: 78rpx;
		transition-delay: .3s;
	}

	.scales {
		transform: scale(2);
		transform-origin: center;
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

	.bbx {
		padding: 24rpx 21rpx 0;
		position: absolute;
	}

	.gcart {
		width: 100%;
		height: 114rpx;
		background: #FFFFFF;
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		position: fixed;
		bottom: -114rpx;
		left: 0;
		z-index: 400;
		padding: 0 28rpx;
		transition: all .3s ease;
		border-top: 1rpx solid #bbbbbb;
	}

	.isShowCart {
		bottom: 0rpx;
	}

	.total_goods {
		height: 37rpx;
		font-family: MiSans, MiSans;
		font-weight: 400;
		font-size: 28rpx;
		color: #BBBBBB;
		line-height: 35rpx;
		margin-right: 18rpx;
	}

	.mt-20 {
		margin-top: 20rpx;
	}

	.hji {
		height: 42rpx;
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
		margin-right: 6rpx;
	}

	.prices {
		height: 56rpx;
		font-weight: 500;
		font-size: 42rpx;
		color: #FF0707;
		line-height: 56rpx;

		&>text:first-child {
			font-size: 28rpx;

		}

		&>text:last-child {
			font-size: 42rpx;

		}
	}

	.dela {}

	.qingk {
		height: 41rpx;
		font-size: 29rpx;
		color: #6A6A6A;
		line-height: 41rpx;
		margin-left: 6rpx;
	}

	.quanxuan {
		height: 43rpx;
		font-size: 31rpx;
		color: #333333;
		line-height: 43rpx;
		margin-left: 18rpx;
	}

	.watch_list {
		margin-bottom: 42rpx;

		.hw_gd {
			flex: 1;
			height: 158rpx;

			.good_name {
				width: 480rpx;
				height: 47rpx;
				font-weight: 500;
				font-size: 32rpx;
				color: #333333;
				line-height: 47rpx;
			}

			.pad_goods {}
		}
	}

	.price {
		&>text:first-child {
			font-size: 28rpx;
			font-weight: 500;
			color: rgba(255, 7, 7, 1);
			margin-right: 4rpx;
		}

		&>text:last-child {
			font-size: 35rpx;
			font-weight: 500;
			color: rgba(255, 7, 7, 1);
		}
	}

	.item {
		width: 323rpx;
		height: 480rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 1rpx 11rpx 1rpx rgba(0, 0, 0, 0.16);
		border-radius: 18rpx 18rpx 18rpx 18rpx;
		margin-bottom: 24rpx;
		overflow: hidden;

		.g_name {
			width: 286rpx;
			margin-top: 16rpx;
			margin-left: 16rpx;
			height: fit-content;
			font-weight: 400;
			font-size: 29rpx;
			color: #333333;
			line-height: 34rpx;
		}

		.p_sell {
			margin-left: 10rpx;
			margin-top: 20rpx;

			.price {
				&>text:first-child {
					font-size: 28rpx;
					font-weight: 500;
					color: rgba(255, 7, 7, 1);
					margin-right: 4rpx;
				}

				&>text:last-child {
					font-size: 35rpx;
					font-weight: 500;
					color: rgba(255, 7, 7, 1);
				}
			}

			.yishou {
				width: fit-content;
				white-space: nowrap;
				height: 48rpx;
				margin-right: 17rpx;
				font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
				text-transform: none;
				margin-right: 12rpx;
			}
		}
	}

	.dcbox {
		position: relative;

		.cbox {
			width: 100%;
			padding: 0 20rpx;
			// height: 100vh;
			padding-top: 384rpx;

			.scview_dc {
				min-height: calc(100% - 140rpx);
				margin-top: 32rpx;
				width: 100%;
				background: #FFFFFF;
				box-shadow: 0rpx 1rpx 3rpx 1rpx rgba(0, 0, 0, 0.06);
				border-radius: 18rpx 18rpx 18rpx 18rpx;
			}

			.tabs_box {
				position: sticky;
				top: 0rpx;
				left: 0;
				z-index: 22;

				.tabs_items {
					width: 344rpx;
					height: 108rpx;
					background: #FFFFFF;
					box-shadow: 0rpx 0rpx 8rpx 1rpx rgba(0, 0, 0, 0.16);
					border-radius: 14rpx 14rpx 14rpx 14rpx;
				}

				.tabs_items_label_x {
					position: absolute;
					left: 0%;
					top: 0;
					width: 100%;
					height: 100%;

					.tabs_items_label_xs {
						width: 344rpx;
						height: 108rpx;
						// background: #FFFFFF;
						// box-shadow: 0rpx 0rpx 8rpx 1rpx rgba(0,0,0,0.16);
						// border-radius: 14rpx 14rpx 14rpx 14rpx;
						font-weight: 600;
						font-size: 36rpx;
						color: #000000;
						line-height: 108rpx;
						text-align: center;
						position: relative;
						z-index: 2;
						transition: all .3s linear;
					}

					.selected_label {
						color: #ffffff;
					}



				}

				.selected_tabs {
					position: absolute;
					top: 0;
					transition: all .3s ease;

					// .txt{
					// 	position: absolute;
					// 	left: 101rpx;
					// 	top: 29rpx;
					// }
					image {
						width: 344rpx;
						height: 118rpx;
					}
				}
			}
		}

		.bgimg {
			position: absolute;
			top: 0%;
			left: 0;
			width: 750rpx;
			height: 422rpx;
			z-index: 0;

		}
	}
</style>