<template>
	<view class="">
		
		<view  class="item_box">
			<view class="item_list">
				<view class="item_list_img">
					<view class="tags" v-if="item.stock==0">
						售罄
					</view>
					<image :src="item.pic?item.pic:(info.pic?info.pic:'/static/noPic/360.png')" mode="aspectFill"></image>
				</view>
				<view class="item_list_content">
					<view class="top_box" style="width: 262rpx;">
						<view class="food_title shenglue_one two_ellipsis">
							{{item.name}}
						</view>
					</view>
					<view class="tags">
						<view class="goods_tags" v-for="item2 in item.tags" :key="item2">
							{{ item2}}
						</view>
					</view>
			
					<view class="price_btn">
						<price :yijia="item.price>0?false:true" :price="item.price" :pmsUnity="item.pmsUnity">
						</price>
						
					</view>
				</view>
			
			
			</view>
		</view>
		
		<view class="sku_item">
			<view v-for="(item1,index1) in item.productAttributeValueList" :key="index1" class="sku_list">
				<view class="sku_name">
					{{item1.name}}
				</view>
				<view style="display: flex;flex-wrap: wrap;" class="ccs_d">
					<view v-for="(item2,index2) in item1.pics" :key="index2" @tap="handleSelectSpec(index2,item2,index1)" :class="item1.selectedIndex==index2?'sku_name_list_active one_ellipsis':'sku_name_list one_ellipsis'">
						{{item2}}
					</view>
				</view>
				
			</view>
			
		</view>
		<view class="sku_item" v-if="selectnum">
			<view class="sku_list flex-justify-between flex-items-center">
				<view class="sku_name">
					数量
				</view>
				<view @tap.stop="()=>{}" style=" display: flex;align-items: flex-end;">
					<numberBox type="2" :txtStyle="{color:'#333333',fontSize:'32rpx',height:'48rpx',width:'48rpx'}"
							btnWidth="48" btn-height="48" @add="changeAdd(item.id,item.stock,item)"
						@remove="changeRemove(item.id)" :num="item.selectedNum">
					</numberBox>
				</view>
			</view>
		</view>
		<view @tap="addGoods" class="skuAddSpec">
			<view class="">
				选好了
			</view>
			
		</view>
		<!-- <view class="btn_act flex flex-justify-between">
			
			<view @tap="submitPreview" class="skuAddSpec">
				立即购买
			</view>
		</view> -->
		
	</view>

</template>

<script>
	import numberBox from '@/components/numberBox.vue'
	import price from '@/components/price.vue'
	import{getMyDate} from '@/utils/date.js'
	export default {
		name: 'dikou',
		data(){
			return {
				item:{},
				chooseSpec:[],
				isNoGood:false,
				// defaultItem:{},
				chooseGood:{}
			}
		},
		props: {
			info: {
				type: Object,
				default: ()=>{
					return {}
				}
				
			},
			defaultItem:{
				type: Object,
				default: {}
			},
			selectnum:{
				type: Boolean,
				default: true
			},
		},
		watch: {
			info: {
				deep: true,
				immediate: true,
				handler(nv, ov) {
					console.log(nv)
					let aa = {}
					// if(ov == undefined){
					// 	return
					// }
					// if(!ov&&nv){
					// 	this.defaultItem = this.deepClone(nv,aa)
					// }
					this.item = nv
					this.$forceUpdate()
					let pareArr = this.item.skuStockList.map((item,index)=>{
						let preda = this.item.chooseSpec.map((item1,index1)=>{
							return item['sp'+(index1+1)]
						})
						return {
							...item,
							pareArr:preda
						}
					})
					let paredealArr = pareArr.filter((item,index)=>{
						return item.pareArr.join()===this.item.chooseSpec.join()
					})
					if(!paredealArr.length){
						this.$api.msg('暂无该所选规格商品，请选择其他规格！')
						this.isNoGood = true
					}else{
						this.chooseGood = paredealArr[0]
						this.chooseGood.productName = nv.name
						this.chooseGood.price = paredealArr[0].price
						this.chooseGood.stock = paredealArr[0].stock
						this.chooseGood.pic = paredealArr[0].pic||this.defaultItem.pic
						this.isNoGood = false
						this.item.price = paredealArr[0].price
						this.item.stock = paredealArr[0].stock
						this.item.pic = paredealArr[0].pic||this.defaultItem.pic
						
						
					}
					// debugger
				}
			}
		},
		components: {
			numberBox,
			price
		},
		methods:{
			deepClone(obj, newObj) {
			        var newObj = newObj || {};
			        for (let key in obj) {
			            if (typeof obj[key] == 'object') {
			                newObj[key] = (obj[key].constructor === Array) ? [] : {}
			                this.deepClone(obj[key], newObj[key]);
			            } else {
			                newObj[key] = obj[key]
			            }
			        }
			        return newObj;
			    },
			handleSelectSpec(index,item,index1){
				this.item.productAttributeValueList[index1].selectedIndex = index
				
				this.item.chooseSpec[index1] = item
				// if()
			},
			formatTime(time) {
			      if (time == null || time === "") {
			        return "";
			     }
			      return getMyDate(time).substring(0,10)
			},
			changeAdd(id) {
				// this.$emit('changeAddDikou',id)
				this.item.selectedNum = this.item.selectedNum+1
			
			},
			changeRemove(id) {
				if(this.item.selectedNum>0){
					this.item.selectedNum = this.item.selectedNum - 1
				}else{
					
				}
				// this.$emit('changeRemoveDikou',id)
			},
			submitPreview(){
				let total1 = this.item
				if(this.item.selectedNum<=0){
					this.$api.msg('请添加购买数量')
					return false
				}
				if(this.isNoGood){
					this.$api.msg('暂无该所选规格商品，请选择其他规格！')
					return false
				}
				if(this.item.stock==0||!this.item.stock){
					uni.showToast({
						title:'所选规格商品已售罄！',
						duration:1000,
						icon:'none'
					})
					return false
				}
				if(parseInt(this.item.stock)<parseInt(this.item.selectedNum)){
					uni.showToast({
						title:'所选规格商品库存不足！',
						duration:1000,
						icon:'none'
					})
					return false
				}
				
				this.$emit('submitPreview',this.chooseGood,this.item.selectedNum)
				// if(this.item)
			},
			addGoods(){
				let total1 = this.item
				if(this.item.selectedNum<=0){
					this.$api.msg('请添加购买数量')
					return false
				}
				if(this.isNoGood){
					this.$api.msg('暂无该所选规格商品，请选择其他规格！')
					return false
				}
				if(this.item.stock==0||!this.item.stock){
					uni.showToast({
						title:'所选规格商品已售罄！',
						duration:1000,
						icon:'none'
					})
					return false
				}
				if(parseInt(this.item.stock)<parseInt(this.item.selectedNum)){
					uni.showToast({
						title:'所选规格商品库存不足！',
						duration:1000,
						icon:'none'
					})
					return false
				}
				
				this.$emit('addGoods',this.chooseGood,this.item.selectedNum)
				// if(this.item)
			}
		}
	}
</script>

<style scoped lang="scss">
	.btn_act{
		
		padding: 0 30rpx;
		width: 100%;
	}
	.skuAddSpec{
		width: 100vw;
		position: fixed;
		bottom: 60rpx;
		left: 30rpx;
		view{
			width: 482rpx;
			height: 80rpx;
			background: linear-gradient( 180deg, #FF7634 0%, #FF5C14 100%);
			// box-shadow: 0px 2rpx 6rpx 0px rgba(255,202,195,1);
			border-radius: 69rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 80rpx;
			text-align: center;
			z-index:2000;
			margin: 0 auto;
		}
	}
	.sku_item{
		margin: 0 auto;
		width: 710rpx;
		height: fit-content;
		.sku_list{
			margin-top: 38rpx;
			.sku_name{
				font-size: 34rpx;
				font-weight: 500;
				color: #000000;
				line-height: 45rpx;
				margin: 0 0 16rpx 0;
			}
			
			.sku_name_list{
				height: 66rpx;
				background: #F2F2F2;
				border-radius: 69rpx 69rpx 69rpx 69rpx;
				font-weight: 400;
				font-size: 32rpx;
				color: #000000;
				line-height: 66rpx;
				text-align: center;
				font-style: normal;
				text-transform: none;
				width: 208rpx;
				margin-right: 40rpx;
				margin-bottom: 14rpx;
			}
			.sku_name_list_active{
				width: 208rpx;
				height: 66rpx;
				background: #FFEDDF;
				border-radius: 69rpx 69rpx 69rpx 69rpx;
				border: 1rpx solid #FE7215;
				font-weight: 400;
				font-size: 32rpx;
				color: #FF4307;
				line-height: 66rpx;
				text-align: center;
				margin-bottom: 14rpx;
				margin-right: 40rpx;
			}
			.ccs_d{
				&>view:nth-of-type(3n){
					margin-right: 0rpx;
				}
				&>view:nth-of-type(3n){
					margin-right: 0rpx;
				}
			}
			
		}
		
	}
	.item_box{
		// display: flex;flex-direction: column;
		// border-top: 2rpx solid #ffffff;
		// background: linear-gradient(180deg, #FFF7F6 0%, #FFFFFF 100%);
		// border-radius: 10rpx;
		margin: 0 auto;
		width: 710rpx;
		height: fit-content;
		// border-radius: 10rpx;
		// padding: 20rpx 30rpx 20rpx 20rpx;
		// margin-bottom: 30rpx;
		// box-shadow: 0px 2rpx 12rpx 0px #f9e5e8;
		.price_btn {
			// height: 64rpx;
			.validate_date{
				font-size: 28rpx;
				color: $primary;
				line-height: 34rpx;
			}
			.choose_type {
				width: 150rpx;
				height: 64rpx;
				background: #5465FC;
				box-shadow: 0px 2rpx 6rpx 0px #D1D6FE;
				border-radius: 32rpx;
				font-size: 34rpx;
				color: #FFFFFF;
				text-align: center;
				line-height: 64rpx;
				margin-right: 28rpx;
			}
		}
		.item_list {
			// border-top: 2rpx solid #ffffff;
			// background: linear-gradient(180deg, #FFF7F6 0%, #FFFFFF 100%);
			// box-shadow: 0px 2rpx 12rpx 0px #FFF7F6;
			// border-radius: 10rpx;
			margin: 0 auto;
			display: flex;
			width: 100%;
			border-radius: 10rpx;
			box-shadow: 0px 2rpx 12rpx 0px #FFF7F6;
			.item_list_img {
				width: 158rpx;
				margin-right: 20rpx;
				flex-shrink: 0;
				height: 158rpx;
				border-radius: 10rpx;
				overflow: hidden;
				position: relative;
				.tags{
					width: 70rpx;
					height: 30rpx;
					font-size: 24rpx;
					text-align: center;
					display: flex;
					justify-content: center;
					align-items: center;
					line-height: 20rpx;
					color: #ffffff;
					background: #999999;
					position: absolute;
					left: 0;
					top: 0;
					z-index: 2;
				}
				image {
					width: 158rpx;
					height: 158rpx;
				}
			}
		
			.item_list_content {
				flex: 1;
				height: 158rpx;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
		
				.food_title {
					width: 428rpx;
					font-size: 32rpx;
					font-weight: 500;
					color: #3D2F2E;
				}
		
				.food_desc {
					width: 356rpx;
					font-size: 30rpx;
					color: rgba(40, 42, 57, 0.6);
					line-height: 42rpx;
				}
		
				.price_btn {
					// height: 64rpx;
					display: flex;
					justify-content: space-between;
		
					.choose_type {
						width: 150rpx;
						height: 64rpx;
						background: #5465FC;
						box-shadow: 0px 2rpx 6rpx 0px #D1D6FE;
						border-radius: 32rpx;
						font-size: 34rpx;
						color: #FFFFFF;
						text-align: center;
						line-height: 64rpx;
						margin-right: 28rpx;
					}
					.spec_in{
						width: 170rpx;
						height: 64rpx;
						background: #FF6F5E;
						box-shadow: 0px 2rpx 12rpx 0px rgba(255,202,195,1);
						border-radius: 32rpx;
						font-size: 32rpx;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 64rpx;
						text-align: center;
					}
				}
			}
		}
	}
	
</style>
