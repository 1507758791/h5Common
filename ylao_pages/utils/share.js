import {
	getAllCoupon,
	getNewUserActivities,
	activityRewards,
	relationalBinding,
	sharedIntegral,
	xzhPopularizeCode
} from '@/api/page.js'
import {
	getBannerImg,
	getAllCommodityList
} from '@/api/shop.js'
import {
	dictType,
	getActivityIsStarting,
	xzhUserMessageList
} from '@/api/page.js'
import {
	getOrderDetailsByCoupon,
	orderApi,
	callWechatPay,
	getOpenId,
	getWxUserOpenId,
	getUserInformation,
	realName
} from '@/api/page.js'

export default {
	data() {
		return {
			readNum: 0,
			//设置默认的分享参数
			share: {
				title: '暖城颐养',
				// path: '/pages/shopHome/shopHome?parentUserId=' + wx.getStorageSync('userInfo').id,
				path: '',
				imageUrl: '',
				desc: '',
				content: ''
			}
		}
	},
	onLoad(options) {

		console.log('[ options.popularizeDeptId ] >', options.popularizeDeptId)
		console.log('[ options.parentUserNub ] >', options.parentUserNub)
		console.log('[ options.sharedUserId ] >', options.sharedUserId)
		if (options.popularizeDeptId) {
			uni.setStorageSync('popularizeDeptId', options.popularizeDeptId)
			console.log('[ options.popularizeDeptId ] >', uni.getStorageSync('popularizeDeptId'))
		}
		if (options.parentUserNub) {
			uni.setStorageSync('parentUserNub', options.parentUserNub)
			console.log('[ options.parentUserNub ] >', uni.getStorageSync('parentUserNub'))
		}
		if (options.sharedUserId) {
			uni.setStorageSync('sharedUserId', options.sharedUserId)
			console.log('[ options.sharedUserId ] >', uni.getStorageSync('sharedUserId'))
		}
		if (options.parentUserId) {
			uni.setStorageSync('parentUserId', options.parentUserId)
			console.log('[ options.parentUserId ] >', uni.getStorageSync('parentUserId'))
		}
	},
	onShow() {
		console.log('[ getCurrentPages ] >', getCurrentPages())
		console.log('%c [ onShow ]-68', 'font-size:13px; background:pink; color:#bf2c9f;',)
		console.log('[onShow 1 ] >', uni.getStorageSync('userInfo'))
		console.log('[onShow 2 ] >', uni.getStorageSync('popularizeDeptId'))
		console.log('[onShow 3 ] >', uni.getStorageSync('parentUserNub'))
		console.log('[onShow 4 ] >', uni.getStorageSync('sharedUserId'))
		console.log('[onShow 5 ] >', uni.getStorageSync('parentUserId'))
		console.log('[onShow 6 ] >', uni.getStorageSync('phoneNo'))
		if (uni.getStorageSync('phoneNo') && uni.getStorageSync('popularizeDeptId')) {
			console.log('[ 1 ] >', uni.getStorageSync('popularizeDeptId'))
			xzhPopularizeCode({
				popularizeDeptId: uni.getStorageSync('popularizeDeptId')
			}).then(res => {
				uni.removeStorageSync('popularizeDeptId');
			}).catch(() => {
				uni.removeStorageSync('popularizeDeptId')
			})
		}
		// if (uni.getStorageSync('phoneNo') && uni.getStorageSync('parentUserNub')) {
		//   console.log('[ 2 ] >', uni.getStorageSync('parentUserNub'))
		//   relationalBinding({ userId: uni.getStorageSync('userInfo').userId, parentUserNub: uni.getStorageSync('parentUserNub'), deptFirstParentId: uni.getStorageSync('userInfo').deptFirstParentId, areaName: uni.getStorageSync('areaName') }).then(res => {
		//     uni.removeStorageSync('parentUserNub');
		//   }).catch(() => {
		//     uni.removeStorageSync('parentUserNub')
		//   })
		// }
		if (uni.getStorageSync('phoneNo') && uni.getStorageSync('sharedUserId')) {
			console.log('[ 3 ] >', uni.getStorageSync('sharedUserId'))
			sharedIntegral({
				"userId": uni.getStorageSync('userInfo').userId,
				"deptFirstParentId": uni.getStorageSync('userInfo').deptFirstParentId,
				"sharedUserId": uni.getStorageSync('sharedUserId'),
				"pagePath": '/' + uni.getStorageSync('pagePath'),
			}).then(shareRes => {
				if (shareRes.data) {
					uni.showModal({
						title: '福豆领取成功',
						content: `恭喜您通过分享获得${shareRes.data.number}福豆`,
						showCancel: false,
						success: (shareRes) => {
							if (shareRes.confirm) { } else if (shareRes.cancel) { }
						}
					});
				}
				uni.removeStorageSync('sharedUserId')
			}).catch(() => {
				uni.removeStorageSync('sharedUserId')
			})
		}
	},
	onShareAppMessage(res) {
		let currentRoute = this.$mp.page.route;
		// let currentRoute = "pages/login/login"; // 获取当前页面路由
		if (res.from === 'button') { // 来自页面内分享按钮
		} else {
			console.log('this.share.title', this.share.title)
			console.log('[  ] >', `${currentRoute}?sharedUserId=${uni.getStorageSync('userInfo').userId}`)
			return {
				title: this.share.title,
				path: `${currentRoute}?sharedUserId=${uni.getStorageSync('userInfo').userId}`
			}
		}
	},
	//分享到朋友圈
	// onShareTimeline(res) {
	// 	console.log('我是分享封闭性', res)
	// 	let currentRoute = "pages/login/login"; // 获取当前页面路由
	// 	if (res.from === 'button') { // 来自页面内分享按钮
	// 	} else {
	// 		console.log('我是分享封闭性', currentRoute)
	// 		return {
	// 			title: '暖城颐养',
	// 			path: `${currentRoute}?sharedUserId=${uni.getStorageSync('userInfo').userId}`
	// 		}
	// 	}
	// }

}