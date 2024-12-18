import {
	apiBaseUrl
} from './config.js';
import Api from '@/common/api';
import * as common from './common.js' //引入common
import * as db from './db.js' //引入common
// 需要登陆的，都写到这里，否则就是不需要登陆的接口
const methodsToken = [
	'user.info',
	'user.editinfo',
	'user.changeavatar',
	'user.logout',
	'user.addgoodsbrowsing',
	'user.delgoodsbrowsing',
	'user.goodsbrowsing',
	'user.goodscollection',
	'user.goodscollectionlist',
	'user.vuesaveusership',
	'user.saveusership',
	'user.getshipdetail',
	'user.setdefship',
	'user.editship',
	'user.removeship',
	'user.getusership',
	'user.pay',
	'user.orderevaluate',
	'user.getuserdefaultship',
	'user.issign',
	'user.sign',
	'user.mypoint',
	'user.userpointlog',
	'user.getbankcardlist',
	'user.getdefaultbankcard',
	'user.addbankcard',
	'user.removebankcard',
	'user.setdefaultbankcard',
	'user.getbankcardinfo',
	'user.editpwd',
	'user.forgotpwd',
	'user.recommend',
	'user.balancelist',
	'user.sharecode',
	'user.cash',
	'user.cashlist',
	'user.myinvite',
	'user.activationinvite',
	'coupon.getcoupon',
	'coupon.usercoupon',
	'cart.add',
	'cart.del',
	'cart.getlist',
	'cart.setnums',
	'cart.getnumber',
	'order.cancel',
	'order.del',
	'order.details',
	'order.confirm',
	'order.getlist',
	'order.create',
	'order.getship',
	'order.getorderlist',
	'order.getorderstatusnum',
	'order.aftersaleslist',
	'order.aftersalesinfo',
	'order.aftersalesstatus',
	'order.addaftersales',
	'order.sendreship',
	'order.iscomment',
	'payments.getinfo',
	'user.getuserpoint',
	'coupon.getcouponkey',
	'store.isclerk',
	'store.storeladinglist',
	'store.ladinginfo',
	'store.lading',
	'store.ladingdel',
	'distribution_center-api-info',
	'distribution_center-api-applydistribution',
	'distribution_center-api-setstore',
	'distribution_center-api-myorder',
	'pintuan.pintuanteam',
	'lottery-api-getLotteryConfig',
	'lottery-api-lottery',
	'lottery-api-lotteryLog'
];

const post = (method, data, callback) => {
	uni.showLoading({
		title: '加载中'
	});

	// 判断token是否存在
	if (methodsToken.indexOf(method) >= 0) {
		// 获取用户token
		let userToken = db.get("userToken");
		if (!userToken) {
			common.jumpToLogin();
			return false;
		} else {
			data.token = userToken;
		}
	}

	data.method = method;

	uni.request({
		url: apiBaseUrl + 'api.html',
		data: data,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
		},
		method: 'POST',
		success: (response) => {
			uni.hideLoading();
			const result = response.data
			if (!result.status) {
				// 登录信息过期或者未登录
				if (result.data === 14007 || result.data === 14006) {
					db.del("userToken");
					uni.showToast({
						title: result.msg,
						icon: 'none',
						duration: 1000,
						complete: function() {
							setTimeout(function() {
								uni.hideToast();
								// #ifdef H5 || APP-PLUS
								uni.navigateTo({
									url: '/pages/login/login/index1'
								})
								// #endif
								// #ifdef MP-WEIXIN || MP-ALIPAY
								uni.navigateTo({
									url: '/pages/login/choose/index',
									animationType: 'pop-in',
									animationDuration: 200
								});
								// #endif
							}, 1000)
						}
					});
				}
			}
			callback(result);
		},
		complete: () => {
			uni.hideLoading();
		},
		fail: (error) => {
			uni.hideLoading();
			if (error && error.response) {
				showError(error.response);
			}
		},
	});

}

//插件post
const pluginsPost = (method, data, callback) => {
	uni.showLoading({
		title: '加载中'
	});

	// 判断token是否存在
	if (methodsToken.indexOf(method) >= 0) {
		// 获取用户token
		let userToken = db.get("userToken");
		if (!userToken) {
			common.jumpToLogin();
			return false;
		} else {
			data.token = userToken;
		}
	}
	uni.request({
		url: apiBaseUrl + 'plugins/' + method + '.html',
		data: data,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
		},
		method: 'POST',
		success: (response) => {
			uni.hideLoading();
			const result = response.data
			if (!result.status) {
				// 登录信息过期或者未登录
				if (result.data === 14007 || result.data === 14006) {
					db.del("userToken");
					uni.showToast({
						title: result.msg,
						icon: 'none',
						duration: 3000,
						complete: function() {
							setTimeout(function() {
								uni.hideToast();
								// #ifdef H5 || APP-PLUS
								uni.navigateTo({
									url: '/pages/login/login/index1'
								})
								// #endif
								// #ifdef MP-WEIXIN || MP-ALIPAY
								uni.navigateTo({
									url: '/pages/login/choose/index',
									animationType: 'pop-in',
									animationDuration: 200
								});
								// #endif
							}, 1000);
						}
					});
				}
			}
			callback(result);
		},
		fail: (error) => {
			uni.hideLoading();
			if (error && error.response) {
				showError(error.response);
			}
		},
		complete: () => {
			setTimeout(function() {
				uni.hideLoading();
			}, 250);
		}
	});

}

const get = (url, callback) => {
	uni.showLoading({
		title: '加载中'
	});
	uni.request({
		url: url,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
		},
		method: 'GET',
		success: (response) => {
			uni.hideLoading();
			callback(response.data);
		},
		fail: (error) => {
			uni.hideLoading();
			if (error && error.response) {
				showError(error.response);
			}
		},
		complete: () => {
			setTimeout(function() {
				uni.hideLoading();
			}, 250);
		}
	});
}

const showError = error => {
	let errorMsg = ''
	switch (error.status) {
		case 400:
			errorMsg = '请求参数错误'
			break
		case 401:
			errorMsg = '未授权，请登录'
			break
		case 403:
			errorMsg = '跨域拒绝访问'
			break
		case 404:
			errorMsg = `请求地址出错: ${error.config.url}`
			break
		case 408:
			errorMsg = '请求超时'
			break
		case 500:
			errorMsg = '服务器内部错误'
			break
		case 501:
			errorMsg = '服务未实现'
			break
		case 502:
			errorMsg = '网关错误'
			break
		case 503:
			errorMsg = '服务不可用'
			break
		case 504:
			errorMsg = '网关超时'
			break
		case 505:
			errorMsg = 'HTTP版本不受支持'
			break
		default:
			errorMsg = error.msg
			break
	}

	uni.showToast({
		title: errorMsg,
		icon: 'none',
		duration: 1000,
		complete: function() {
			setTimeout(function() {
				uni.hideToast();
			}, 1000);
		}
	});
}

// 文件上传
export const uploadFiles = (callback,num,total) => {
	let allNum=6
	if(total){
		allNum=total
	}
	uni.chooseImage({
			count: allNum-num, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album','camera'], //从相册选择
			success: (chooseImageRes) => {
			uni.showLoading({
				title: '上传中...'
			});
			const tempFilePaths = chooseImageRes.tempFilePaths;
			console.log(tempFilePaths)
			uploadTask1(tempFilePaths,0,callback)
			// for (var i = 0; i < tempFilePaths.length; i++) {
			// 	const uploadTask = uni.uploadFile({
			// 		url:  Api.BASEURI +'upload', //仅为示例，非真实的接口地址
			// 		filePath: tempFilePaths[i],
			// 		fileType: 'image',
			// 		name: 'file',
			// 		headers: {
			// 			'Accept': 'application/json',
			// 			'Content-Type': 'multipart/form-data',
			// 		},
			// 		formData: {
			// 			'method': 'images.upload',
			// 			'upfile': tempFilePaths[i]
			// 		},
			// 		success: (uploadFileRes) => {
						
			// 			uni.showToast({
			// 				title:"上传成功",
			// 				icon:'none'
			// 			})
			// 			callback(JSON.parse(uploadFileRes.data));
			// 			setTimeout(function() {
			// 				uni.hideLoading();
			// 			}, 250);
			// 		},
			// 		fail: (error) => {
			// 			if (error && error.response) {
			// 				setTimeout(function() {
			// 					uni.hideLoading();
			// 				}, 250);
			// 			}
			// 			// uni.showToast({
			// 			// 	title:"上传失败",
			// 			// 	icon:'none'
			// 			// })
			// 		},
			// 		complete: () => {
			// 			uni.showToast({
			// 				title:"上传完成",
			// 				icon:'none'
			// 			})
			// 			setTimeout(function() {
			// 				uni.hideLoading();
			// 			}, 250);
			// 		}
			// 	});
			// 	}
		}
	});
}

const uploadTask1 = (filePaths,index,callback) => {
	console.log(Api.BASEURI +'upload')
	 uni.uploadFile({
		url:  Api.BASEURI +'upload', //仅为示例，非真实的接口地址
		filePath: filePaths[index],
		fileType: 'image',
		name: 'file',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'multipart/form-data',
		},
		formData: {
			'method': 'images.upload',
			'upfile': filePaths[index]
		},
		success: (uploadFileRes) => {
			
			// uni.showToast({
			// 	title:"上传成功",
			// 	icon:'none'
			// })
			console.log('上传成功')
			callback(JSON.parse(uploadFileRes.data));
			// setTimeout(function() {
			// 	uni.hideLoading();
			// }, 250);
		},
		fail: (error) => {
			if (error && error.response) {
				setTimeout(function() {
					uni.hideLoading();
				}, 250);
			}
			uni.showToast({
				title:"上传失败",
				icon:'none'
			})
		},
		complete: () => {
			if(index==(filePaths.length-1)){
				uni.showToast({
					title:"上传完成",
					icon:'none',
					duration:3000
				})
				setTimeout(function() {
					uni.hideLoading();
				}, 250);
			}else{
				uploadTask1(filePaths,index+1,callback)
			}
			
		}
	});
}

// 上传图片
export const uploadImage = (num, callback) => {
	uni.chooseImage({
		count: num,
		success: (res) => {
			uni.showLoading({
				title: '上传中...'
			});
			let tempFilePaths = res.tempFilePaths
			for (var i = 0; i < tempFilePaths.length; i++) {
				uni.uploadFile({
					url: apiBaseUrl + 'api.html',
					filePath: tempFilePaths[i],
					fileType: 'image',
					name: 'file',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'multipart/form-data',
					},
					formData: {
						'method': 'images.upload',
						'upfile': tempFilePaths[i]
					},
					success: (uploadFileRes) => {
						callback(JSON.parse(uploadFileRes.data));
					},
					fail: (error) => {
						if (error && error.response) {
							showError(error.response);
						}
					},
					complete: () => {
						setTimeout(function() {
							uni.hideLoading();
						}, 250);
					},
				});
			}
		}
	});
}

