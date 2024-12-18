<template>
	<view class="flex-center flex-column">
		<view style="font-size: 38rpx;color:darkorange;margin-top: 100rpx;">支付成功 {{info.price||''}}元</view>
		<button
			style="font-size: 28rpx;color:darkorange;margin-top: 50rpx;border-radius: 50rpx;border: 2rpx solid darkorange;overflow: hidden;"
			id="success" @click="toPage">返回家属列表</button>
	</view>
</template>
<script>
	import Api from '@/common/api.js'
	export default {
		data() {
			return {
				info: {
					price:'',
					orderNum:''
				}
			}
		},
		onLoad() {},
		onShow() {},
		async created() {
			try {
				document.querySelector("html").style.fontSize = "10px"; // 解决进入小票html 的font-size = 0 的问题
				const urlone = window.location.href; //获取当前路径
				const pages = getCurrentPages();
				const currentPage = pages[pages.length - 1]; //当前页面的全部信息
				const route = currentPage.route; //当前路由的路径 pages/login/login
				const options = currentPage.options; //url里面的参数json类型
				let subMchId = options.sub_mch_id;
				let outTradeNo = options.out_trade_no;
				let checkCode = options.check_code;
				let t = options.t;
				let params = {
					out_trade_no: options.out_trade_no
				}
				this.orderNum = outTradeNo + 'xxx' + subMchId
				
				let data = await Api.apiCall('get', Api.api.getInfoForOrder, params, true)
				if(data){
					this.info = data.data;
				}
			} catch (err) {
				console.log(err)
			}
		},
		mounted() {

			// #ifdef H5
			let initData = {
				action: 'onIframeReady',
				displayStyle: 'SHOW_CUSTOM_PAGE',
				// height: 960
			}
			let initPostData = JSON.stringify(initData)
			window.parent.postMessage(initPostData, "*")

			// const link = location.href
			// let sub_mch_id = this.getQueryString(link, "sub_mch_id"); //特约商户号
			// let out_trade_no = this.getQueryString(link, "out_trade_no"); //商户订单号    
			// console.log("以下进入操作")
			// #endif
		},

		methods: {

			toPage() {
				var mchData = {
					action: 'jumpOut',
					jumpOutUrl: 'https://oa.joru.cn/web/' //跳转你想去的页面
				}
				var postData = JSON.stringify(mchData)
				window.parent.postMessage(postData, "*")
			},
			//获取URL参数
			getQueryString(path, name) {
				const reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
				if (reg.test(path)) {
					return unescape(RegExp.$2.replace(/\+/g, " "));
				}
				return "";
			},

		},
	}
</script>
<style>
	page{
		background: #fff;
	}
</style>