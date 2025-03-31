import store from '../store';
var that = this
export default {
	appVersion: '1.1',
	PGINSID: 1005,
	PGJGINSID: 1841,




	// TencentAppId: 1400415289, //正式环境
	// BASEURL: 'https://oa.joru.cn/scadmin/house',
	// BASEURLt: 'https://oa.joru.cn/scadmin',
	// BASEURI: 'https://oa.joru.cn/api/',
	// PGURL: 'https://oa.joru.cn',
	// UPURL: 'https://oa.joru.cn/xbx-upload/',
	// BASEURLJoRu: 'https://oa.joru.cn/org/joru/',
	// BASEURLJoRuImgUrl: 'https://oa.joru.cn/',
	// baseJoruUrl: 'https://oa.joru.cn/scadmin/house/',

	// BASEURL: 'http://223.112.44.146:8196/api/',
	// shareUrl: 'http://223.112.44.146:8196',
	// BASEURI: 'http://223.112.44.146:8196/api/',
	// ESURI: 'http://223.112.44.146:8196/',
	// FamilyUrl: 'http://223.112.44.146:8196/',
	// erdsUrl: 'https://eldszhyl.ylaow.cn/',
	
	
	// BASEURL: '/api',
	// shareUrl: '/',
	// BASEURI: '/',
	// ESURI: '/',
	// FamilyUrl: 'http://192.168.1.212:8089/',
	// appId:'wx8ec95e2b2902127e',
	// appId:'wx4589c30e9c4c3126',//生产
	
	BASEURL: 'https://oa.joru.cn/',
	shareUrl: 'https://oa.joru.cn/',
	BASEURI: 'https://oa.joru.cn/',
	ESURI: 'https://oa.joru.cn/',
	FamilyUrl: 'https://oa.joru.cn/',
	appId:'wx4589c30e9c4c3126',//生产
	
	// BASEURL: 'http://oa.joru.cn:8019/',
	// shareUrl: 'http://oa.joru.cn:8019/',
	// BASEURI: 'http://oa.joru.cn:8019/',
	// ESURI: 'http://oa.joru.cn:8019/',
	// FamilyUrl: 'http://oa.joru.cn:8019/',
	// appId:'wx4589c30e9c4c3126',//生产
	
	// BASEURL: 'http://192.168.1.212:8089/',
	// shareUrl: 'http://192.168.1.212:8089/',
	// BASEURI: 'http://192.168.1.212:8089/',
	// ESURI: 'http://192.168.1.212:8089/',
	// FamilyUrl: 'http://192.168.1.212:8089/',
	// appId:'wx8ec95e2b2902127e',

	isChat: true,
	Im: uni.requireNativePlugin("RY-TencentIM"),
	// 接口
	api: {
		saveCreateForPad:'org/orgAppointInfo/createForPad',//保存机构预约
		getIndexVideo:'single/store/detailForBigPad',//首页宣传视频
		getInsMapList:'single/store/dis/insMapList',//地图列表查询
		getBannerfindByType:"banner/findByType",//首页轮播图
		getAppLastVersion: 'single/bsapp/getAppLastVersion?type=1', //更新app
		getGoodsList:'product/getScreenProductList',//获取商品与服务
		getServerList:'product/getServicePageList',//获取商品与服务
		getQrcodeForpms:'single/bsapp/getQrcodeForpms',//根据选择的服务生成小程序码
		
		// passwordLogin: '/login', //密码登入
		smsCodeLogin: '/login', //验证码登入
		sendSms: '/nurseUser/sendSms', //发送验证码
		updatePassword: '/nurseUser/updatePassword', //修改密码
		getDataOverview: '/businessData/getDataOverview', //近日业绩
		getNeed: '/businessData/getNeed', //待办任务
		listOffGoods: '/businessData/listOffGoods', //下架商品列表
		listStock: '/businessData/listStock', //告急售空商品
		pmsSojourn: '/sojourn/list', //库存告急旅居商品
		
		getWxOpenId:'/org/getWxOpenId',//获取微信公众号openid
		getPersonListByOpenId:'/org/wxBindPerson/getPersonListByOpenId',//获取老人列表
		wxSaveBindPerson:'/org/wxBindPerson/save',//绑定老人
		getPersonInfoByNameAndIdentity:'/org/wxBindPerson/getPersonInfoByNameAndIdentity',//名字和身份证获取老人信息
		getBillYuGuDetailByPersonId:'/org/wxBindPerson/getBillYuGuDetailByPersonId',//根据personId获取预估账单
		addTracelessOrderForH5:'/org/wxBindPerson/addTracelessOrderForH5',//H5扣费
		getWxICBCOrderByPersonId:'/org/wxBindPerson/getWxICBCOrderByPersonId',//H5扣费记录
		getWxTicket:'org/wxBindPerson/getWxTicket',//H5支付签名
		getInfoForOrder:'org/getWxICBCOrderByOrderNo',//订单信息
		getBillDetailByPersonId:'/org/wxBindPerson/getBillDetailByPersonId',//订单信息
	
	},
	debounce(method, delay, duration) {
		var that = this;
		var timer = this.timer;
		var begin = new Date().getTime();
		return function() {
			var context = that;
			var args = arguments;
			var current = new Date().getTime();
			clearTimeout(timer);
			if (current - begin >= duration) {
				method.apply(context, args);
				begin = current;
			} else {
				that.timer = setTimeout(function() {
					method.apply(context, args);
				}, delay);
			}
		}
	},
	async apiCall(method, endpoint, data, load, urla) {
		//debugger
		let s = true
		uni.getNetworkType({
			success: function(res) {
				if (res.networkType == 'none') {
					uni.showToast({
						title: '网络中断，请检查网络',
						icon: 'none'
					});
					s = false
				}else{
					s = true
				}
			}
		});
		if (!s) return false
		if (load) {
			uni.showLoading({
				title: '请稍候',
				mask: true
			});
		}
		let token = uni.getStorageSync('token') || '';
		let openId = uni.getStorageSync('openid') || '';
		let fullurl = '';
		if(!Array.isArray(data)){
			data.baseUrlt == 1 ? (fullurl = this.BASEURLt + endpoint) : (fullurl = this.BASEURL + endpoint)
		}else{
			fullurl = this.BASEURL + endpoint
		}
		if (urla) {
			fullurl = this.BASEURLt + endpoint
		}
		// var contentType = 'application/x-www-form-urlencoded';
		// console.log(data,data.baseUrlt,124545)
		console.log(fullurl);
		let [error, res] = await uni.request({
			url: fullurl,
			data: data,
			method: method,
			header: {
				// contentType: "application/json",
				'version': this.appVersion,
				'content-type': !Array.isArray(data)?(data.contentType ? data.contentType : 'application/x-www-form-urlencoded'):"application/json",
				'openId': openId,
				storeId:uni.getStorageSync('storeId') || '',
				// 'Authorization': 'Bearer ' + token
				// 'Authorization': 'Bearer ' +
				// 	'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNTU1MTI5MTE4NiIsImNyZWF0ZWQiOjE3MTI3MTMxNzc0NTQsImV4cCI6MTgzMjcxMzE3N30.iDNHXcHOQgj2atbjXGmRJbxG-pTouBLbuT7onXy0zS-pdu6EGqGYiKHjHrnjQ-PTw_GWfK3_nGkewseLD7ScWA'
			},
		});
		if (load) {
			uni.hideLoading();
		}
		console.log(res, fullurl)
		if (undefined == res || 'undefined' == res) {
			console.log('index');
			// uni.navigateTo({
			// 	url: '/pages/login/login'
			// })
		}
		if (res.data.msg == 'User token expired!') {
			console.log('User token expired');
			uni.showToast({
				title: '请先登录',
				icon: 'none'
			});
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}
		if (res.data.msg == '请先登录' || res.data.code == 100 || res.data.code == 208) {
			console.log("100=" + res.data);
			uni.showToast({
				title: '请先登录',
				icon: 'none'
			});
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}
		if (res.data.code == 204) {
			uni.showToast({
				title: '您的账号已被封禁，无法使用',
				icon: 'none'
			});
			store.commit('logout')
			// setTimeout(()=>{
			// 	uni.navigateTo({
			// 		url: '/pages/login/login'
			// 	})
			// },1000)
			return
		}

		if (res.data.code == 200) {
			// console.log(res.data)
			return res.data.data;
		} else if (res.data.code == 401) {
			uni.showToast({
				title: '未登录或登录过期',
				icon: 'none'
			});
			this.debounce(() => {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}, 200)()
		} else if(res.data.isSuc == 1){
			return res.data||res.isSuc;
		}else{
			uni.hideLoading()
			if (res.data) {
				if (!res.data.msg) {
					res.data.msg = '请检查当前网络是否正常，稍后重试';
				}
				if (res.data.data) {
					uni.showToast({
						title: res.data.data,
						icon: 'none'
					});
					return
				}
				uni.showToast({
					title: res.data.msg,
					icon: 'none',
					duration: 3000
				});
				// this.$api.msg(res.data.msg);
			}

		}
	
	},
	async apiCallJoRu(method, endpoint, data, load, urla) {
		let s = true
		uni.getNetworkType({
			success: function(res) {
				if (res.networkType == 'none') {
					uni.showToast({
						title: '网络中断，请检查网络',
						icon: 'none'
					});
					s = false
				}else{
					s = true
				}
			}
		});
		if (!s) return false
		if (load) {
			uni.showLoading({
				title: '请稍候',
				mask: true
			});
		}
		// let token = uni.getStorageSync('token') || '';
		let fullurl = '';
		data.baseUrlt == 1 ? (fullurl = this.BASEURLt + endpoint) : (fullurl = this.BASEURLJoRu + endpoint)
		if (urla) {
			fullurl = this.BASEURLt + endpoint
		}
		// var contentType = 'application/x-www-form-urlencoded';
		// console.log(data,data.baseUrlt,124545)
		console.log(fullurl);
		let [error, res] = await uni.request({
			url: fullurl,
			data: data,
			method: method,
			header: {
				// contentType: "application/json",
				'version': this.appVersion,
				'content-type': data.contentType ? data.contentType : 'application/x-www-form-urlencoded',
				// 'Authorization': 'Bearer ' + token
				// application/json
			},
		});
		if (load) {
			uni.hideLoading();
		}
		console.log(res, fullurl)
		if (undefined == res || 'undefined' == res) {
			console.log('index');
			// uni.navigateTo({
			// 	url: '/pages/login/login'
			// })
		}
		if (res.data.msg == 'User token expired!') {
			console.log('User token expired');
			uni.showToast({
				title: '请先登录',
				icon: 'none'
			});
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}
		if (res.data.msg == '请先登录' || res.data.code == 100 || res.data.code == 208) {
			console.log("100=" + res.data);
			uni.showToast({
				title: '请先登录',
				icon: 'none'
			});
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}
		if (res.data.code == 204) {
			uni.showToast({
				title: '您的账号已被封禁，无法使用',
				icon: 'none'
			});
			store.commit('logout')
			// setTimeout(()=>{
			// 	uni.navigateTo({
			// 		url: '/pages/login/login'
			// 	})
			// },1000)
			return
		}
		// console.log(res.data,'大舅我的卡忘记打卡了')
		if (res.data.code == 200 || res.data.isSuc == 1) {
			return res.data.data;
		} else if (res.data.code == 401) {
			uni.showToast({
				title: '未登录或登录过期',
				icon: 'none'
			});
			this.debounce(() => {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}, 200)()
		} else {
			uni.hideLoading()
			if (res.data) {
				if (!res.data.msg) {
					res.data.msg = '请检查当前网络是否正常，稍后重试';
				}
				if (res.data.data) {
					uni.showToast({
						title: res.data.data,
						icon: 'none'
					});
					return
				}
				uni.showToast({
					title: res.data.msg,
					icon: 'none',
					duration: 3000
				});
				// this.$api.msg(res.data.msg);
			}

		}
	},

	async apiCallPG(method, endpoint, data, load, urla) {
		let s = true
		uni.getNetworkType({
			success: function(res) {
				if (res.networkType == 'none') {
					uni.showToast({
						title: '网络中断，请检查网络',
						icon: 'none'
					});
					s = false
				}else{
					s = true
				}
			}
		});
		if (!s) return false
		if (load) {
			uni.showLoading({
				title: '请稍候',
				mask: true
			});
		}
		let token = uni.getStorageSync('token') || '';
		let openId = uni.getStorageSync('openid') || '';
		let fullurl = '';
		data.baseUrlt == 1 ? (fullurl = this.PGURL + endpoint) : (fullurl = this.PGURL + endpoint)
		if (urla) {
			fullurl = this.PGURL + endpoint
		}
		// var contentType = 'application/x-www-form-urlencoded';
		// console.log(data,data.baseUrlt,124545)
		console.log(fullurl);
		let [error, res] = await uni.request({
			url: fullurl,
			data: data,
			method: method,
			header: {
				// contentType: "application/json",
				'version': this.appVersion,
				'content-type': data.contentType ? data.contentType : 'application/json',
				'Authorization': 'Bearer ' +
					'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ4YnN0YXJUZXN0IiwiY3JlYXRlZCI6MTY4NjgyMDg2MzcyOCwiZXhwIjoxNjg3NDI1NjYzfQ.vqyeyWCjmNccs2O_tspREi-hcBej--TJLXrwJSaKVB1BtSPtLxWHN1Y7v-XWQ5OHmcLiYK4Bxt3Xda5FCUd9Bg',
				'openId': openId
			},
		});
		if (load) {
			uni.hideLoading();
		}
		console.log(res, fullurl)
		if (undefined == res || 'undefined' == res) {
			console.log('index');
			// uni.navigateTo({
			// 	url: '/pages/login/login'
			// })
		}
		if (res.data.isSuc == 1) {
			res.data.code = 200
		}
		if (res.data.msg == 'User token expired!') {
			console.log('User token expired');
			uni.showToast({
				title: '请先登录',
				icon: 'none'
			});
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}
		if (res.data.msg == '请先登录' || res.data.code == 100 || res.data.code == 208) {
			console.log("100=" + res.data);
			uni.showToast({
				title: '请先登录',
				icon: 'none'
			});
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}
		if (res.data.code == 204) {
			uni.showToast({
				title: '您的账号已被封禁，无法使用',
				icon: 'none'
			});
			store.commit('logout')
			// setTimeout(()=>{
			// 	uni.navigateTo({
			// 		url: '/pages/login/login'
			// 	})
			// },1000)
			return
		}

		if (res.data.code == 200) {
			// console.log(res.data)
			return res.data.data;
		} else if (res.data.code == 401) {
			uni.showToast({
				title: '未登录或登录过期',
				icon: 'none'
			});
			this.debounce(() => {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}, 200)()
		} else {
			uni.hideLoading()
			if (res.data) {
				if (!res.data.msg) {
					res.data.msg = '请检查当前网络是否正常，稍后重试';
				}
				if (res.data.data) {
					uni.showToast({
						title: res.data.data,
						icon: 'none'
					});
					return
				}
				uni.showToast({
					title: res.data.msg,
					icon: 'none',
					duration: 3000
				});
				// this.$api.msg(res.data.msg);
			}

		}
	},

	async apiColleCall(method, endpoint, data, load) {
		let s = true
		uni.getNetworkType({
			success: function(res) {
				// console.log(res.networkType)
				if (res.networkType == 'none') {

					uni.showToast({
						title: '网络中断，请检查网络',
						icon: 'none'
					});
					s = false
				}else{
					s = true
				}
			}
		});
		if (!s) return false
		if (load) {
			uni.showLoading({
				title: '请稍候',
				mask: true
			});
		}

		let token = uni.getStorageSync('token') || '';
		let fullurl = endpoint;
		var contentType = 'application/x-www-form-urlencoded';

		data.authorization = token;
		//console.log(endpoint);
		let [error, res] = await uni.request({
			url: fullurl,
			data: data,
			method: method,
			header: {
				//'Content-Type': 'application/x-www-form-urlencoded',
				'content-type': contentType,
				'api-version': this.appVersion,
				'version': this.appVersion,
				'appId': 'e10adc3949ba59abbe56e057f20f883e'
				// 'authorization1': Authorization || ''
			},
		});
		if (load) {
			uni.hideLoading();
		}

		if (undefined == res || 'undefined' == res) {
			console.log('index');
		}
		console.log(res.data);
		console.log(fullurl);

		if (res.data.code == 200) {

			if (res.data.data) {
				// console.log(res.data.data);
				return res.data.data;
			} else {
				return res.data;
			}
		} else if (res.data.code == 402 || res.data.code == 403) {
			return res.data
		} else if (res.data.code == 501) {
			return res.data
		} else {
			if (res.data) {
				if (!res.data.msg) {
					res.data.msg = '请检查当前网络是否正常，稍后重试';
				}
				if (res.data.data) {
					uni.showToast({
						title: res.data.data,
						icon: 'none'
					});
					return
				}
				uni.showToast({
					title: res.data.msg,
					icon: 'none'
				});
			}

		}
	},
	uploadImage(num) {
		return new Promise((resolve, reject) => {
			uni.chooseImage({
				count: num,
				success: (res) => {
					uni.showLoading({
						title: '上传中...',
						mask: true
					});
					let tempFilePaths = res.tempFilePaths
					for (var i = 0; i < tempFilePaths.length; i++) {
						uni.uploadFile({
							url: this.UPURL + 'img/appletUpload',
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
								resolve(JSON.parse(uploadFileRes.data))
							},
							fail: (error) => {
								reject(error)
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
		})
	},
	uploadFilesa(callback, num, total) {
		let allNum = 9
		if (total) {
			allNum = total
		}
		uni.chooseImage({
			count: allNum - num, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], //从相册选择
			success: (chooseImageRes) => {
				uni.showLoading({
					title: '上传中...'
				});
				const tempFilePaths = chooseImageRes.tempFilePaths;
				for (var i = 0; i < tempFilePaths.length; i++) {
					const uploadTask = uni.uploadFile({
						url: this.UPURL + '/upload',
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
							uni.showToast({
								title: "上传成功",
								icon: 'none'
							})
							setTimeout(function() {
								uni.hideLoading();
							}, 250);
						},
						fail: (error) => {
							if (error && error.response) {
								setTimeout(function() {
									uni.hideLoading();
								}, 250);
							}
							// uni.showToast({
							// 	title:"上传失败",
							// 	icon:'none'
							// })
						},
						complete: () => {
							uni.showToast({
								title: "上传完成",
								icon: 'none'
							})
							setTimeout(function() {
								uni.hideLoading();
							}, 250);
						}
					});
				}
			}
		});
	}
}
