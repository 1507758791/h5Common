<template>
	<view v-show="show">
		<u-modal
		v-model="ipShow" 
		title="IP变更" 
		:show-cancel-button="true"
		ref="uModal" 
		:async-close="true"
		@cancel="ipCancel"
		@confirm="ipConfirm">
			<view class="slot-content">
				<view class="cyhj" style="margin-bottom: 10rpx;">网关</view>
				<input class="ip-ipt" v-model.trim="mineIp" :focus="ipIpt" placeholder="请输入网关"/>
				<!-- <view class="cyhj" style="margin: 10rpx 0;">端口号</view>
				<input class="ip-ipt" v-model.trim="mineDk" type="number" placeholder="请输入端口号"/> -->
				<view class="tip">
					<text class="cuIcon-infofill"></text>
					<text>/api端口号默认为8083，es为8081</text>
				</view>
				<view class="cyhj" style="margin-top: 10rpx;" v-if="ipList.length > 0">填写记录</view>
				<view class="ip-tag">
					<u-tag 
					:text="item" 
					bg-color="#F4F4F5" 
					closeable 
					type="info" 
					mode="dark"
					color="#909399"
					close-color="#909399"
					v-for="(item, index) in ipList"
					@click="tagClick1(item)"
					@close="tagClose(index)"/>
				</view>
				<view class="cyhj">常用环境</view>
				<view class="ip-tag">
					<u-tag 
					:text="item.name" 
					mode="light"
					v-for="(item, index) in cyHj"
					@click="tagClick(item)"/>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import Api from '@/common/api.js'
	export default {
		props:{
			show: false
		},
		watch:{
			show(val){
				console.log(val)
				if(val){
					this.ipShow = true
					this.ipList = uni.getStorageSync('ipList')
					setTimeout(()=>{
						this.ipIpt = true
					},200)
				}
			}
		},
		data() {
			return {
				ipShow: false,
				ipIpt: false,
				mineDk: '',
				mineIp: '',
				ipList: [],
				cyHj: [
					{name: '线上环境'},
					{name: '预生产环境'},
					{name: '测试环境'}
				]
			}
		},
		created() {
			this.ipList = uni.getStorageSync('ipList') || []
		},
		methods: {
			ipConfirm(){
				this.ipIpt = false
				// if(!this.mineIp || !this.mineDk){
				// 	this.$api.msg('请输入完整')
				// 	setTimeout(() => {
				// 		this.$refs.uModal.clearLoading();
				// 	}, 1000)
				// 	return
				// }
				let that = this
				let reg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/
				if(reg.test(this.mineIp)){
					if(!that.ipList){
						that.ipList = []
					}
					that.ipList.push(this.mineIp)
					that.ipList = that.unique(that.ipList)
					uni.setStorageSync('ipList', that.ipList)
					setTimeout(() => {
						that.ipShow = false
						this.changeIp(that.mineIp,1)
					}, 1000)
				} else {
					this.$api.msg('IP地址不太对')
					setTimeout(() => {
						this.$refs.uModal.clearLoading();
					}, 1000)
				}
				
			},
			ipCancel(){
				// this.ipShow = false
				this.ipIpt = false
				setTimeout(()=>{
					this.$emit('close', false)
				},500)
			},
			tagClick(e){
				this.changeIp(e,2)
			},
			tagClick1(e){
				this.changeIp(e,1)
			},
			tagClose(e){
				this.ipList.splice(e, 1)
				uni.setStorageSync('ipList', this.ipList)
			},
			unique(arr){
			   var arr1 = [];
			   for(var i=0,len=arr.length;i<len;i++){
				   if(arr1.indexOf(arr[i]) === -1){
					   arr1.push(arr[i]);
				   }
			   }
			   return arr1;
			},
			changeIp(e,type){
				if(type == 2){
					if(e.name == '线上环境'){
						Api.TencentAppId = 1400415289						
						Api.BASEURL= 'http://www.99kangyang.com:8085/house'
						Api.BASEURLt= 'http://www.99kangyang.com:8085'
						Api.BASEURI= 'http://www.99kangyang.com/api/'
						
					} else if(e.name == '预生产环境'){					
						Api.TencentAppId = 1400497128				
						Api.BASEURL= 'http://test99.99kangyang.com:8085/admin/house'
						Api.BASEURLt='http://test99.99kangyang.com:8085/admin'
						Api.BASEURI= 'http://test99.99kangyang.com/api/'
						

					}else{
						Api.TencentAppId = 1400497128
						Api.BASEURL= 'http://124.71.179.225:8085/admin/house'
						Api.BASEURLt='http://124.71.179.225:8085/admin'
						Api.BASEURI= 'http://124.71.179.225/api/'
					}
				} else {
					Api.TencentAppId = 1400497128
					Api.BASEURL = 'http://' + e + ':8085/admin/house'
					Api.BASEURLt = 'http://' + e + ':8085/admin'
					Api.BASEURI= 'http://'+e+'/api/'
					
				}
				this.ipShow = false
				this.ipIpt = false
				console.log(Api.BASEURL,Api.BASEURLt,Api.BASEURI,9977)
				setTimeout(()=>{
					this.$emit('close', false)
					this.mineIp = ''
					uni.switchTab({
						url: '/pages/index/index'
					})
				},300)
			}
		}
	}
</script>

<style lang="scss" scoped>
.slot-content{
	padding: 40rpx 30rpx 20rpx 30rpx;
	.ip-ipt{
		border: 2rpx solid #DFE2E5;
		border-radius: 10rpx;
		padding: 0 10rpx;
		font-size: 26rpx;
		height: 60rpx;
		letter-spacing: 2rpx;
	}
	.ip-tag{
		display: flex;
		flex-wrap: wrap;
		margin-top: 20rpx;
		.ip-item{
			
		}
	}
}
/deep/.u-tag{
	margin-right: 10rpx;
	margin-bottom: 10rpx;
}
.cyhj{
	font-size: 26rpx;
}
.tip{
	color: #8799A3;
	font-size: 24rpx;
	margin-top: 10rpx;
	text:first-child{
		margin-right: 10rpx;
	}
}
</style>
