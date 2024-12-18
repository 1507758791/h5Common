<template>
	<view class="">
		<view class="navbar">
			<image src="../../static/img/navbarbg.png" mode=""></image>
			<view class="navt flex">
				<view @tap="back" class="" style="position: absolute;left: 0;top: 50rpx;width: 70rpx;height: 70rpx;">
					
				</view>
				<image @tap="back" style="width: 14rpx;height: 28rpx;margin-left: 22rpx;margin-right: 303rpx;" src="../../static/img/back.png" mode=""></image>
				<view class="title" style="">
				详情	
				</view>
			</view>
		</view>
		<popupFowTip v-model="showTipForServer" title="填写受服务人信息" desc="请使用微信扫码二维码填写受服务人信息" :src="ercode"></popupFowTip>
		<popupFowTip v-model="showTip" title="填写收货地址" desc="请使用微信扫码二维码填写收货信息" src="/static/noPic/360.png"></popupFowTip>
		<view class="" style="margin-top: 110rpx;">
			<view class="" style="width: 100%;">
				<u-swiper mode="none" height="424" :list="list"></u-swiper>
			</view>
			<view class="de_com">
				<view class="goods_name">
					{{detail.name}}
				</view>
				<view class="price_act flex-justify-between">
					<view class="price">
						<text>￥</text>
						<text>{{detail.price}}</text>
					</view>
					<view class="yishou" v-if="type ==2">
						<u-button @click="handleAddGood(detail)" border-radius="6rpx" :hair-line="false" ripple :custom-style="customStyle">立即购买</u-button>
					</view>
					<number-box v-if="type ==1" :txtStyle="{color:'#333333',fontSize:'32rpx',height:'48rpx',width:'48rpx'}"
						btnWidth="48" btn-height="48" @add="(e)=>{addGoodCart()}" num="0"
						></number-box>
				</view>
			</view>
			
			<view class="details">
				<view class="flex-center" style="height: 45rpx;margin-top: 29rpx;		position: relative;">
					<view class="">
						商品详情
					</view>
					<view class="flex-center" style="width: 100%;height: 45rpx;position: absolute;left: 0;top: 0;">
						<image style="width: 290rpx;height: 38rpx;" src="../../static/img/detail_bg.png" mode=""></image>
					</view>
				</view>
				<view class="" style="width: 100%;padding: 28rpx;height: fit-content;">
					<uParse :content="detail.detailHtml"></uParse>
				</view>
				
			</view>
		</view>
		<!-- 规格弹窗服务 -->
		<u-popup :z-index="10078" v-model="skuShowServer" mode="bottom"height="896rpx"
			border-radius="17">
			<view class="sku_content" style="position: relative;padding-top: 47rpx;padding-bottom: 200rpx;">
		
				<!-- 						<image class="set_dikou_logo"
					src="https://hkyl.obs.cn-east-3.myhuaweicloud.com:443/PMrES2ZXchcyfa477b5ff6094402b14294a7b79d2e9c.png"
					mode=""></image> -->
				<view class="close_tag" @click="skuShowServer = false" style="position: absolute;right: 22rpx;top: 28rpx;z-index: 2222;">
					<image style="width: 48rpx;height: 48rpx;"
						src="/static/closedb.png"
						mode=""></image>
					<!-- <u-icon name="close-circle" size="60rpx" color="#9E8F8D"></u-icon> -->
				</view>
				<scroll-view :scroll-y="true" class="scroll_dikou">
					<view class="list_dikou">
						<addService @addGoods="addGoodsSkuServer" :selectnum="false" :defaultItem="serviceInfoServer" :info="serviceInfoServer"
							></addService>
					</view>
		
				</scroll-view>
				<!-- <view class="confrim-btn">
					<button @click="dikouShow = false;">确定</button>
				</view> -->
			</view>
		
		</u-popup>
		
		<!-- 规格弹窗 -->
		<u-popup :z-index="10078" v-model="skuShow" mode="bottom"height="896rpx"
			border-radius="17">
			<view class="sku_content" style="position: relative;padding-top: 47rpx;padding-bottom: 200rpx;">
		
				<!-- 						<image class="set_dikou_logo"
					src="https://hkyl.obs.cn-east-3.myhuaweicloud.com:443/PMrES2ZXchcyfa477b5ff6094402b14294a7b79d2e9c.png"
					mode=""></image> -->
				<view class="close_tag" @click="skuShow = false" style="position: absolute;right: 22rpx;top: 28rpx;z-index: 2222;">
					<image style="width: 48rpx;height: 48rpx;"
						src="/static/closedb.png"
						mode=""></image>
					<!-- <u-icon name="close-circle" size="60rpx" color="#9E8F8D"></u-icon> -->
				</view>
				<scroll-view :scroll-y="true" class="scroll_dikou">
					<view class="list_dikou">
						<addService @addGoods="addGoodsSku" :defaultItem="serviceInfo" :info="serviceInfo"
							></addService>
					</view>
		
				</scroll-view>
				<!-- <view class="confrim-btn">
					<button @click="dikouShow = false;">确定</button>
				</view> -->
			</view>
		
		</u-popup>
		
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	import popupFowTip from '@/components/popupForTip/popupForTip.vue'
	import numberBox from '@/components/numberBox.vue'
	import addService from '@/components/addService.vue'
	import Api from '@/common/api.js'
	export default {
		data(){ 
			return {
				list:['../../static/img/tipBg.png','../../static/img/tipBg.png'],
				customStyle: {
					width: '129rpx', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					height: '48rpx',
					background: 'linear-gradient( 133deg, #F98D2B 0%, #FE6327 100%)',
					borderRadius: '6rpx 6rpx 6rpx 6rpx',
					fontSize: '28rpx',
					color: '#ffffff',
					border: 'none'
				},
				showTipForServer:false,
				showTip:false,
				type:1,
				detail:'',
				skuShow:false,
				serviceInfo:'',
				skuShowServer:false,
				serviceInfoServer:'',
				ercode:''
			}
		},
		components:{uParse,popupFowTip,numberBox,addService},
		onLoad(e){
			if(e.type){
				this.type = e.type
			}
			if(e.id){
				this.id = e.id
			}
			this.detail = uni.getStorageSync('detail')
			this.list = this.detail.albumPics.split(',')
			
		},
		methods:{
			back(){
				let canNavBack = getCurrentPages()
				if(canNavBack && canNavBack.length>1) {  
				    uni.navigateBack() 
				} else {  
				    history.back();  
				}
			},
			addGoodsSkuServer(chooseItem,selectedNum){
				this.genereServerCode(chooseItem)
			},
			async genereServerCode(item){
				this.skuShowServer = false
				if(item.productId){
					let fArr = [{
						type:2,
						goodsId:item.productId,
						total:1,
						skuId:item.id
					}]
					let data = await Api.apiCall('post',Api.api.getQrcodeForpms,fArr,true)
					this.ercode = data
					this.showTipForServer = true
				}else{
					let fArr = [{
						type:2,
						goodsId:item.id,
						total:1
					}]
					let data = await Api.apiCall('post',Api.api.getQrcodeForpms,fArr,true)
					this.ercode = data
					this.showTipForServer = true
				}
			},
			handleAddGood(item,i){
				if(item.skuStockList&&item.skuStockList.length){
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
				}else{
					this.genereServerCode(item)
				}
			},
			addGoodsSku(chooseItem,selectedNum){
				let pages = getCurrentPages();//当前页面栈
				let beforePage = pages[pages.length - 2];//指定调用页面为上个页面
				beforePage.$vm.addGoodsSku(chooseItem,selectedNum,true)
				this.$u.toast(`向购物车添加了${selectedNum}件商品`)
				this.skuShow = false
			},
			addGoodCart(){
				if(this.detail.skuStockList&&this.detail.skuStockList.length){
					let dealSkuDefaultArr = this.detail.productAttributeValueList.map(item => {
						return {
							...item,
							selectedIndex: 0
						} 
					})
					let chooseSpecDeal = dealSkuDefaultArr.map(item => {
						return item.pics[0]
					})
					this.serviceInfo = {
						...this.detail,
						productAttributeValueList: dealSkuDefaultArr,
						selectedNum: 1,
						chooseSpec: chooseSpecDeal
					}
					this.skuShow = true
				}else{
					let pages = getCurrentPages(); // 当前页面
					let beforePage = pages[pages.length - 2]
					let indexs = beforePage.$vm.goodsList.findIndex(item=>item.id == this.detail.id)
					beforePage.$vm.addGood('',this.detail,indexs)
					console.log(beforePage);
					this.$u.toast('向购物车添加了1件商品')
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	
	.de_com{
		width: 750rpx;
		height: fit-content;
		background: #FFFFFF;
		padding: 27rpx 26rpx 21rpx;
		.goods_name{
			// height: 46rpx;
			font-weight: 500;
			font-size: 35rpx;
			color: #333333;
			line-height: 46rpx;
			margin-bottom: 10rpx;
		}
		.price_act{
			.price {
				&>text:first-child {
					font-size: 29rpx;
					font-weight: 500;
					color: rgba(255, 7, 7, 1);
					margin-right: 4rpx;
				}
			
				&>text:last-child {
					font-size: 50rpx;
					font-weight: 500;
					color: rgba(255, 7, 7, 1);
				}
			}
		}
	}
	.navbar{
		height: 110rpx;
		position: fixed;
		top: 0%;
		left: 0;
		width: 100%;
		overflow:hidden;
		z-index:22;
		&>image{
			position: absolute;
			left: 0;
			top: 0;
			width:100%;
			height: 234rpx;
		}
		.navt{
			width: 100%;
			margin-top: 62rpx;
		}
		.title{
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
	.details{
		width: 750rpx;
		min-height: 674rpx;
		background: #FFFFFF;
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		margin-top: 21rpx;
		overflow: hidden;
		&>view{
			height: 45rpx;
			font-size: 32rpx;
			color: #222222;
			line-height: 45rpx;
		}
	}
</style>