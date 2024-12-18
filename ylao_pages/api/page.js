import request from '@/ylao_pages/utils/request'
// import exp from 'constants'
// import { encode } from 'punycode'

// api地址
const apiUri = {
	getOpenId: '/public-service/portal/wechat/decrypt',
	orderList: '/public-service/seviceOrder/smalllist',
	orderInfo: '/public-service/seviceOrder/',
	orderDetail: '/public-service/seviceOrder/detail/',
	evalOrder: '/public-service/serviceOrderEvaluation',
	cancelOrder: '/public-service/seviceOrder/cancelOrder',
	getRepairOrder: '/public-service/serviceProjectType/listTree',
	uploadPic: '/file/upload',
	userInfo: '/civil-affairs/elderly/queryServiceObject',
	organziation: '/organization/organ/logOrgInfo',
	ServicesAvailable: '/public-service/serviceProject/list/',
	subDemand: '/public-service/seviceOrder',
	serviceLog: '/public-service/seviceOrder/getServiceRecord/',
	// getUserId:'/system/user/getInfo',
	institutionalSta: '/organization/organ/selectCountOrg',
	areaCodeList: '/system/dict/data/type/',
	getConfigKey: '/system/config/configKey/',
	strativeDivisionList: '/organization/organ/list',
	getOrgDetailById: '/organization/organ/detail/',
	getOrgDetailInfo: '/organization/organ/',
	mapSwiperList: '/civil-affairs/banner/list',
	getOrgActivitiList: '/organization/OrganActivity/smallList',
	zhucanSubmit: '/organization/appointment',
	deptTreeList: '/system/dept/treeselect',
	addDept: '/system/dept',
	subsidyTimeMeal: '/system/dict/data/type/subsidy_time_meals',
	paymethods: '/system/dict/data/type/payment_method',
	servicerList: '/organization/staff/list?pageNum=1&pageSize=1000',
	getNoticeById: '/civil-affairs/notice/',
	bindOlder: '/civil-affairs/elderly',
	updateBindOlder: '/civil-affairs/elderly',
	// 识别老人
	elderBaseInfo: '/civil-affairs/elderly/detail/',
	// 收藏机构列表
	focusJgList: '/organization/extra/collectors',
	addFocusJg: '/organization/extra/collectors/add',
	delFocusJg: '/organization/extra/collectors/delete',
	identityJudge: '/civil-affairs/serviceSubsidyApply/verifyElder',

	// 优惠券相关
	getAllCoupon: '/mall/coupon/mina/getAllCoupon',
	getCouponDetail: '/mall/coupon/',
	receiveCoupon: '/mall/coupon/mina/receiveCoupon',
	getCouponLogList: '/mall/coupon/mina/getCouponLogList',
	getAvailableCoupons: '/mall/orderApi/getAvailableCoupons',
	getOrderDetailsByCoupon: '/mall/orderApi/getOrderDetailsByCoupon',
	orderApi: '/mall/orderApi',

	callWechatPay: '/mall/orderApi/callWechatPay',
	activityRewards: '/mall/xzhMarketingActivitiesApi/mina/activityRewards',
	relationalBinding: '/mall/xzhMarketingActivitiesApi/mina/relationalBinding',

	//  用户基础数据收集（每次登录）
	collectUserInformation: '/mall/integralStatisticsApi/mina/collectUserInformation',
	// 获取 新人福利活动（开屏弹窗）
	getNewUserActivities: '/mall/xzhMarketingActivitiesApi/mina/getNewUserActivities',

	// 入住
	getOrgList: '/organization/apply/list',
	volunteerList: '/organization/organ/volunteerList',
	dictType: '/system/dict/data/type/',
	apply: '/organization/staff',
	getdeptInfo: '/mall/mina/getdeptInfo',
	getUserInformation: '/mall/integralStatisticsApi/mina/getUserInformation',
	getWxUserOpenId: '/public-service/portal/wechat/getWxUserOpenId',

	// 签到
	userRegister: '/mall/integralStatisticsApi/mina/userRegister',
	getUserRegisterlLog: '/mall/integralStatisticsApi/mina/getUserRegisterlLog',
	getUserIntegralLog: '/mall//integralStatisticsApi/mina/getUserIntegralLog',
	sharedIntegral: '/mall/integralStatisticsApi/mina/sharedIntegral',

	//是否实名认证
	realName: '/civil-affairs/elderly/verifyIdentity',
	//获取用户认证信息
	realInfo: '/civil-affairs/elderly/getElderlyBaseCertification',
	//提交实名认证信息
	postRealInfo: '/civil-affairs/elderly/certificateUser',
	//获取老人信息
	getOldInfo: '/civil-affairs/elderly/queryServiceObject',
	integralRewardprocessing: '/mall/integralStatisticsApi/mina/integralRewardprocessing',


	xzhPopularizeCode: '/mall/xzhMarketingActivitiesApi/mina/xzhPopularizeCodeLog',
	xzhActionLog: '/mall/xzhActionLog/',
	selectOrderList: '/mall/orderApi/selectOrderList',
	confirmReceipt: '/mall/order/confirmReceipt',
	addRentRate: '/mall/rentRate',

	cancelWechatPay: '/mall/orderApi/cancelWechatPay',
	updateAppointment: '/mall/elderlyDeliveryAddressLog/updateAppointment',
	orderApiDetail: '/mall/orderApi/',
	getOrderManageLog: '/mall/orderApi/getOrderManageLog',
	verifyPhoneNoIsExists: '/civil-affairs/elderly/verifyPhoneNoIsExists',
	elderlyList: '/civil-affairs/elderly/list',
	addElderly: '/civil-affairs/elderly',
	orderBuyAgain: '/mall/orderApi/orderBuyAgain',
	confirmOrderReceipt: '/mall/orderApi/confirmReceipt',
	cancellationOrder: '/mall/orderApi/cancellationOrder',
	orderAftersaleList: '/mall/orderAftersaleApi/list',
	applyAfterSales: '/mall/orderAftersaleApi/applyAfterSales',
	cancelAfterSales: '/mall/orderAftersaleApi/cancelAfterSales',
	sendOutGoods: '/mall/orderAftersaleApi/sendOutGoods',
	confirmApiReceipt: '/mall/orderAftersaleApi/confirmReceipt',

	selectGroupPurchasingGoods: '/mall/groupActivity/selectGroupPurchasingGoods',
	getGroupCommodityInfo: '/mall/groupActivity/getGroupCommodityInfo',
	getOpeningGroupsList: '/mall/groupActivity/getOpeningGroupsList',
	openingGroup: '/mall/groupActivity/openingGroup',
	applyAfterServiceSales: '/mall/orderAftersaleApi/service/cancelOrder/applyAfterSales',
	handleDefaultCallWechatPay: '/mall/orderAftersaleApi/service/cancelOrder/handleDefaultCallWechatPay',
	joingroup: '/mall/groupActivity/joinOpeningGroup',
	editAvatar: '/system/user/profile/avatar',
	cenerateTheQrCode: '/public-service/portal/wechat/cenerateTheQrCode',
	deteleOrderAftersale: '/mall/orderAftersaleApi/deteleOrderAftersale',
	afterCancelWechatPay: '/mall/orderAftersaleApi/handleDefault/cancelWechatPay',
	// https://www.ylaow.cn//org/Ccarebank/mininews/list?orgId=8984&pageIndex=1&pageSize=10&newsType=76
	mininews: '/org/Ccarebank/mininews/list',
	pensionPolicy: '/civil-affairs/notice/list',
	pensionPolicyDetail: '/system/notice/',
	getPostageByOrderInfo: '/mall/orderApi/getPostageByOrderInfo',
	selectRentOrderAftersaleCountByOrderFormId: '/mall/orderAftersaleApi//selectRentOrderAftersaleCountByOrderFormId',
	//  /mall/xzhApplicationLog
	xzhApplicationLog: '/mall/xzhApplicationLog',
	commitRecord: '/organization/organ/commitRecord',
	organDetail: '/organization/organ/',
	updateUser: '/system/user',
	getInfo: '/system/user/getInfo',
	addOrgan: '/organization/organ',
	extra: '/organization/extra',
	checkEdit: '/organization/organ/checkEdit',
	getTurntableActivities: '/mall/xzhTurntableActivityactivityApi/getTurntableActivities',
	getTurntableActivityUser: '/mall/xzhTurntableActivityactivityApi/getTurntableActivityUser',
	lotteryDraw: '/mall/xzhTurntableActivityactivityApi/lotteryDraw',
	extraDetail: '/organization/extra/',
	//获取全部关注
	friendship: '/mall/xzhUserPost/friendship',
	getGroupLogByUser: '/mall/groupActivity/getGroupLogByUser',
}
// 拼团记录
export function getGroupLogByUser(data) {
	return request.get(apiUri.getGroupLogByUser, data)
}
// getCouponDetail
export function getCouponDetail(id, data) {
	return request.get(apiUri.getCouponDetail + id, data)
}
export function extraDetail(id, data) {
	return request.get(apiUri.extraDetail + id, data)
}
export function lotteryDraw(data) {
	return request.post(apiUri.lotteryDraw, data)
}
export function getTurntableActivityUser(data) {
	return request.get(apiUri.getTurntableActivityUser, data)
}
export function getTurntableActivities(data) {
	return request.get(apiUri.getTurntableActivities, data)
}
export function checkEdit(data) {
	return request.post(apiUri.checkEdit, data)
}
export function extra(data) {
	return request.put(apiUri.extra, data)
}
export function extraPost(data) {
	return request.post(apiUri.extra, data)
}
export function addOrgan(data) {
	return request.post(apiUri.addOrgan, data)
}
export function updateOrgan(data) {
	return request.put(apiUri.addOrgan, data)
}
export function getInfo(data) {
	return request.get(apiUri.getInfo, data)
}
export function updateUser(data) {
	return request.put(apiUri.updateUser, data)
}
export function organDetail(id, data) {
	return request.get(apiUri.organDetail + id, data)
}
export function addDept(data) {
	return request.post(apiUri.addDept, data)
}
export function commitRecord(data) {
	return request.post(apiUri.commitRecord, data)
}
export function xzhApplicationLog(data) {
	return request.post(apiUri.xzhApplicationLog, data)
}
export function selectRentOrderAftersaleCountByOrderFormId(data) {
	return request.get(apiUri.selectRentOrderAftersaleCountByOrderFormId, data)
}
export function getPostageByOrderInfo(data) {
	return request.post(apiUri.getPostageByOrderInfo, data)
}
// 养老政策和资讯 system/notice/list?pageNum=1&pageSize=10?noticeType=1
export function getPensionPolicy(data) {
	return request.get(apiUri.pensionPolicy, data)
}
// 详情
export function getPensionPolicyDetail(id) {
	return request.get(`${apiUri.pensionPolicyDetail}${id}`)
}
export function mininews(data) {
	return request.get(apiUri.mininews, data)
}
export function afterCancelWechatPay(data) {
	return request.post(apiUri.afterCancelWechatPay, data)
}
export function deteleOrderAftersale(data) {
	return request.post(apiUri.deteleOrderAftersale, data)
}
export function cenerateTheQrCode(data) {
	return request.post(apiUri.cenerateTheQrCode, data)
}
export function editAvatar(data) {
	return request.post(apiUri.editAvatar, data)
}
export function joingroup(data) {
	return request.post(apiUri.joingroup, data)
}
export function handleDefaultCallWechatPay(data) {
	return request.post(apiUri.handleDefaultCallWechatPay, data)
}
export function applyAfterServiceSales(data) {
	return request.post(apiUri.applyAfterServiceSales, data)
}
export function openingGroup(data) {
	return request.post(apiUri.openingGroup, data)
}
export function getOpeningGroupsList(data) {
	return request.get(apiUri.getOpeningGroupsList, data)
}
export function getGroupCommodityInfo(data) {
	return request.post(apiUri.getGroupCommodityInfo, data)
}
export function selectGroupPurchasingGoods(data) {
	return request.get(apiUri.selectGroupPurchasingGoods, data)
}
export function confirmApiReceipt(data) {
	return request.post(apiUri.confirmApiReceipt, data)
}
export function sendOutGoods(data) {
	return request.post(apiUri.sendOutGoods, data)
}
export function cancelAfterSales(data) {
	return request.post(apiUri.cancelAfterSales, data)
}
export function applyAfterSales(data) {
	return request.post(apiUri.applyAfterSales, data)
}
export function orderAftersaleList(data) {
	return request.get(apiUri.orderAftersaleList, data)
}
export function cancellationOrder(data) {
	return request.post(apiUri.cancellationOrder, data)
}
export function confirmOrderReceipt(data) {
	return request.post(apiUri.confirmOrderReceipt, data)
}
export function orderBuyAgain(data) {
	return request.post(apiUri.orderBuyAgain, data)
}
export function addElderly(data) {
	return request.post(apiUri.addElderly, data)
}
export function elderlyList(data) {
	return request.get(apiUri.elderlyList, data)
}
export function verifyPhoneNoIsExists(data) {
	return request.post(apiUri.verifyPhoneNoIsExists, data)
}
export function getOrderManageLog(data) {
	return request.get(apiUri.getOrderManageLog, data)
}
export function orderApiDetail(id, data) {
	return request.get(apiUri.orderApiDetail + id, data)
}
export function updateAppointment(data) {
	return request.post(apiUri.updateAppointment, data)
}
export function cancelWechatPay(data) {
	return request.post(apiUri.cancelWechatPay, data)
}
export function addRentRate(data) {
	return request.post(apiUri.addRentRate, data)
}
export function confirmReceipt(data) {
	return request.post(apiUri.confirmReceipt, data)
}
export function selectOrderList(data) {
	return request.get(apiUri.selectOrderList, data)
}
export function xzhActionLog(data) {
	return request.post(apiUri.xzhActionLog, data)
}
export function sharedIntegral(data) {
	return request.post(apiUri.sharedIntegral, data)
}
export function xzhPopularizeCode(data) {
	return request.post(apiUri.xzhPopularizeCode, data)
}
export function integralRewardprocessing(data) {
	return request.post(apiUri.integralRewardprocessing, data)
}
export function getOldInfo(data) {
	return request.get(apiUri.getOldInfo, data)
}
export function realName(data) {
	return request.post(apiUri.realName, data)
}
export function realInfo(data) {
	return request.post(apiUri.realInfo, data)
}
export function postRealInfo(data) {
	return request.post(apiUri.postRealInfo, data)
}
export function getUserIntegralLog(data) {
	return request.get(apiUri.getUserIntegralLog, data)
}
export function getUserRegisterlLog(data) {
	return request.get(apiUri.getUserRegisterlLog, data)
}
export function userRegister(data) {
	return request.post(apiUri.userRegister, data)
}
export function getWxUserOpenId(data) {
	return request.post(apiUri.getWxUserOpenId, data)
}
export function getUserInformation(data) {
	return request.get(apiUri.getUserInformation, data)
}
export function getOpenId(data) {
	return request.post(apiUri.getOpenId, data)
}
export function callWechatPay(data) {
	return request.post(apiUri.callWechatPay, data)
}
export function getdeptInfo(data) {
	return request.post(apiUri.getdeptInfo, data)
}
export function apply(data) {
	return request.post(apiUri.apply, data)
}
export function relationalBinding(data) {
	return request.post(apiUri.relationalBinding, data)
}
export function activityRewards(data) {
	return request.post(apiUri.activityRewards, data)
}
export function orderApi(data) {
	return request.post(apiUri.orderApi, data)
}
export function getOrderDetailsByCoupon(data) {
	return request.post(apiUri.getOrderDetailsByCoupon, data)
}
export function getAvailableCoupons(pageNum, pageSize, data) {
	return request.post(`${apiUri.getAvailableCoupons}?pageNum=${pageNum}&pageSize=${pageSize}`, data)
}
export function dictType(type) {
	return request.get(apiUri.dictType + type)
}
export function getVolunteerList(data) {
	return request.get(apiUri.volunteerList, data)
}
export function getOrgList(data) {
	return request.get(apiUri.getOrgList, data)
}
export function getNewUserActivities(data) {
	return request.get(apiUri.getNewUserActivities, data)
}
export function collectUserInformation(data) {
	return request.post(apiUri.collectUserInformation, data)
}
// 优惠券
export function getAllCoupon(data) {
	return request.get(apiUri.getAllCoupon, data)
}
export function receiveCoupon(data) {
	return request.post(apiUri.receiveCoupon, data)
}

export function getCouponLogList(data) {
	return request.get(apiUri.getCouponLogList, data)
}

// 判断老人信息
export function judgeOlderIsBA(data) {
	return request.get(apiUri.identityJudge, data)
}

// 判断机构是否备案
export function judgeOrgIsBA(id) {
	return request.get(apiUri.getOrgDetailInfo + id)
}

// 收藏的机构列表
export function getFocusJgList(id) {
	return request.get(apiUri.focusJgList, id)
}

// 新增收藏的机构列表
export function getAddFocusJg(id) {
	return request.post(apiUri.addFocusJg, id)
}

// 删除收藏的机构列表
export function getDelFocusJg(id) {
	return request.post(apiUri.delFocusJg, id)
}

// 识别老人的接口
export function getElderBaseInfo(id) {
	return request.get(apiUri.elderBaseInfo + id)
}

// 识别老人的接口
export function getUpdateBindOlder(data) {
	return request.put(apiUri.updateBindOlder, data)
}

// 绑定老人的接口
export function addBindOlder(data) {
	return request.post(apiUri.bindOlder, data)
}

// 获取服务人员的list
export function getServicerList(data) {
	return request.get(apiUri.servicerList, data)
}

// 获取支付方式
export function getPaymethods() {
	return request.get(apiUri.paymethods)
}

// 获取服务内容
export function getSubsidyTimeMeal() {
	return request.get(apiUri.subsidyTimeMeal)
}

// 获取服务商的树形数据
export function getDeptTreeList(data) {
	return request.get(apiUri.deptTreeList, data)
}

// 获取暖城颐养首页轮播图片
export function getMapSwiperList(data) {
	return request.get(apiUri.mapSwiperList, data)
}

//提交用户评价
export function postEvalution(data) {
	return request.post(apiUri.evalOrder, data)
}

// 获取用户id
export function getUserId() {
	return request.get(apiUri.getUserId)
}
// 获取服务订单记录
export function gerservicLog(data) {
	return request.post(apiUri.serviceLog, data)
}
// 服务订单列表
export function getOrderList(data) {
	return request.get(apiUri.orderList, data)
}

// 获取机构信息
export function getOrganziationInfo(data) {
	return request.get(apiUri.organziation, data)
}
// 发布需求服务类别
export function getRepairOrder(id) {
	return new Promise(resolve => {
		uni.request({
			url: uni.getStorageSync('ylMapUrl') + `/${apiUri.getRepairOrder}/${id}`,
			method: 'get',
			header: {
				// 'Authorization': `Bearer ${uni.getStorageSync('AccessToken')}`
			},
			success: async (res) => {
				resolve(res.data)
			},
			fail: async (res) => {
			}
		})
	})
}

// 提交发布需求
export function postSubDemand(data) {
	// return request.post(apiUri.subDemand, data)
	return new Promise(resolve => {
		uni.request({
			url: uni.getStorageSync('ylMapUrl') + `/${apiUri.subDemand}`,
			method: 'post',
			header: {
				'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				// 'Authorization': `Bearer ${uni.getStorageSync('AccessToken')}`
			},
			data: data,
			success: async (res) => {
				resolve(res.data)
			},
			fail: async (res) => {
			}
		})
	})
}
// 新增老人入住预约
export function addCheckInAppointment(data) {
	// return request.post('/organization/CheckInAppointment', data)
	return new Promise(resolve => {
		uni.request({
			url: uni.getStorageSync('ylMapUrl') + `/organization/CheckInAppointment`,
			method: 'post',
			header: {
				// 'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				// 'Authorization': `Bearer ${uni.getStorageSync('AccessToken')}`
			},
			data: data,
			success: async (res) => {
				resolve(res.data)
			},
			fail: async (res) => {
			}
		})
	})
}

// 获取用户信息
export function getUserInfo(data) {
	return request.get(apiUri.userInfo, data)
}
// 服务项目信息

export function getServicesAvailable(id) {
	return new Promise(resolve => {
		uni.request({
			url: uni.getStorageSync('ylMapUrl') + `/${apiUri.ServicesAvailable}/${id}`,
			method: 'get',
			header: {
				// 'Authorization': `Bearer ${uni.getStorageSync('AccessToken')}`
			},
			success: async (res) => {
				let { data } = res.data
				resolve(res.data)
			},
			fail: async (res) => {
			}
		})
	})
}
// 服务订单信息
export function serviceOrderInfo(id) {
	return request.get(apiUri.orderInfo + id)
	// return request.get(orderDetail.replace('-ur4wamh', '').replace('-401rnaa', '').replace('-um8rnaa', '').replace('-k74snaa',''))
}

// 订单详情
export function serviceOrderDetail(id) {
	return request.get(apiUri.orderDetail + id)
	// return request.get(orderDetail.replace('-ur4wamh', '').replace('-401rnaa', '').replace('-k74snaa',''))
}

// 评价订单
export function serviceEvalOrder(data) {
	return request.post(apiUri.evalOrder, data)
}

// 取消订单
export function serviceCancelOrder(data) {
	return request.put(apiUri.cancelOrder, data)
}

// 图片上传
export function evalPicUpload() {
	return request.post(apiUri.uploadPic)
}


// 养老政策和资讯 system/notice/list?pageNum=1&pageSize=10?noticeType=1
// export function getPensionPolicy(data) {
// 	return request.get(apiUri.pensionPolicy, data)
// }

// // 详情
// export function getPensionPolicyDetail(id) {
// 	return request.get(`${apiUri.pensionPolicyDetail}${id}`)
// }

// 养老机构统计
export function getInstitutionalSta(data) {
	return request.post(apiUri.institutionalSta, data)
}
export function getAreaCodeList(type) {
	return request.get(`${apiUri.areaCodeList}${type}`,)
}
// 根据code获取地区
export function getAreaCodeLists() {
	return new Promise(resolve => {
		uni.request({
			url: uni.getStorageSync('ylMapUrl') + `/${apiUri.areaCodeList}${uni.getStorageSync('regionCode')}`,
			method: 'get',
			header: {
				// 'Authorization': `Bearer ${uni.getStorageSync('AccessToken')}`
			},
			success: async (res) => {
				resolve(res.data)
			},
			fail: async (res) => {
			}
		})
	})
}
export function getConfigKey(type) {
	return request.get(`${apiUri.getConfigKey}${type}`)
}

// strativeDivisionList
export function getStrativeDivisionList(data) {
	return new Promise(resolve => {
		uni.request({
			url: uni.getStorageSync('ylMapUrl') + `/organization/extra/orgList`,
			method: 'get',
			header: {
				// 'Authorization': `Bearer ${uni.getStorageSync('AccessToken')}`
			},
			data: data,
			success: async (res) => {
				resolve(res.data)
			},
			fail: async (res) => {
			}
		})
	})
}

export function getOrgDetailById(id) {
	return new Promise(resolve => {
		uni.request({
			url: uni.getStorageSync('ylMapUrl') + `/${apiUri.getOrgDetailById}${id}`,
			method: 'get',
			header: {
				// 'Authorization': `Bearer ${uni.getStorageSync('AccessToken')}`
			},
			success: async (res) => {
				let { data } = res.data
				resolve(res.data)
			},
			fail: async (res) => {
			}
		})
	})
}

// 机构下的活动信息
export function getOrgActivitiList(data) {
	return new Promise(resolve => {
		uni.request({
			url: uni.getStorageSync('ylMapUrl') + `/${apiUri.getOrgActivitiList}`,
			method: 'get',
			data: data,
			header: {
				// 'Authorization': `Bearer ${uni.getStorageSync('AccessToken')}`
			},
			success: async (res) => {
				let { rows } = res.data
				resolve(rows)
			},
			fail: async (res) => {
			}
		})
	})
}

// 助餐工单新增
export function zhucanSubmit(data) {
	// return request.post(apiUri.zhucanSubmit, data)
	return new Promise(resolve => {
		uni.request({
			url: uni.getStorageSync('ylMapUrl') + `/${apiUri.zhucanSubmit}`,
			method: 'post',
			data: data,
			header: {
				// 'Authorization': `Bearer ${uni.getStorageSync('AccessToken')}`,
				'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
			},
			success: async (res) => {
				let { data } = res.data
				resolve(data)
			},
			fail: async (res) => {
			}
		})
	})
}

// 资讯详情
export function getNoticeById(id) {
	return request.get(`${apiUri.getNoticeById}${id}`)
}

// 新增资讯
export function addNoticeById(data) {
	return request.post(apiUri.getNoticeById, data)
}

export function xzhUserPost(data) {
	return request.post('/mall/xzhUserPost', data)
}
//修改 公开 隐藏 修改帖子
export function xzhPostRelease(data) {
	return request.put('/mall/xzhUserPost/', data)
}
//删除帖子
export function xzhPostDelete(data) {
	return request.delete('/mall/xzhUserPost/' + data)
}
//获取帖子详情
export function xzhPostGet(data) {
	return request.get('/mall/xzhUserPost/' + data)
}

export function friendshipList(data) {
	return request.post('/mall/xzhUserFollow/friendshipList', data)
}
export function friendship(data) {
	return request.post('/mall/xzhUserPost/friendship', data)
}



export function xzhUserPostList(data) {
	return request.get('/mall/xzhUserPost/list', data)
}
export function xzhUserPostDetail(id, data) {
	return request.get('/mall/xzhUserPost/' + id, data)
}
export function xzhUserFollow(data) {
	return request.post('/mall/xzhUserFollow/', data)
}
export function cancelFollow(data) {
	return request.post('/mall/xzhUserFollow/cancelFollow', data)
}

export function xzhPostComment(data) {
	return request.post('/mall/xzhPostComment/', data)
}
export function findCommentsByPost(data) {
	return request.post('/mall/xzhPostComment/findCommentsByPost', data)
}

export function draftPost(data) {
	return request.post('/mall/xzhUserPost/draftPost', data)
}
export function xzhUserFollowList(data) {
	return request.get('/mall/xzhUserFollow/list', data)
}

export function likedPost(data) {
	return request.post('/mall/xzhUserPost/likedPost', data)
}
export function forwardPost(data) {
	return request.post('/mall/xzhUserPost/forwardPost', data)
}

export function xzhUserLikedLogList(data) {
	return request.get('/mall/xzhUserLikedLog/list', data)
}
export function xzhUserForwardLogList(data) {
	return request.get('/mall/xzhUserForwardLog/list', data)
}


export function friendshipPostList(data) {
	return request.post('/mall/xzhUserPost/friendshipPostList', data)
}
export function likedPostComment(data) {
	return request.post('/mall/xzhPostComment/likedPostComment', data)
}

export function deleteUserComment(data) {
	return request.post('/mall/xzhPostComment/deleteUserComment', data)
}

export function getFollowUserPosts(data) {
	return request.get('/mall/xzhUserPost/getFollowUserPosts', data)
}


export function getXzhUserStatics(data) {
	return request.post('/mall/xzhUserPost/getXzhUserStatics', data)
}
export function seckillCommoditySpecStockList(data) {
	return request.get('/mall/seckillActivityApi/seckillCommoditySpecStockList', data)
}
export function seckillCommoditySpecStockId(id, data) {
	return request.get('/mall/seckillActivityApi/seckillCommoditySpecStockInfo/' + id, data)
}
export function getTopicList(data) {
	return request.get('/mall/xzhTopic/getTopicList', data)
}
export function xzhTopicDetail(id, data) {
	return request.get('/mall/xzhTopic/' + id, data)
}
//更新活动消息
export function getActivityIsStarting(data) {
	return request.post('/public-service/activityManager/getActivityIsStarting', data)
}
//获取消息接口
export function xzhUserMessageList(data) {
	return request.get('/mall/xzhUserMessage/list', data)
}

//消息已读操作
export function xzhUserMessage(data) {
	return request.put('/mall/xzhUserMessage/', data)
}

//获取粉丝接口
export function getMyFollowers(data) {
	return request.post('/mall/xzhUserPost/getMyFollowers', data)
}

//获取 评论
export function getMyPostComments(data) {
	return request.post('/mall/xzhUserPost/getMyPostComments', data)
}
export function recommendServiceList(data) {
	return request.get('/mall/goldServiceRecommend/recommendServiceList', data)
}
export function recommendServicedetail(id) {
	return request.get('/mall/goldServiceRecommend/' + id)
}

// /prod-api/public-service/portal/msgSecCheck
export function msgSecCheck(data) {
	return request.post('/public-service/portal/msgSecCheck', data)
}
export function mediaCheckAsync(data) {
	return request.post('/public-service/portal/mediaCheckAsync', data)
}

// http://192.168.1.216/test-api/organization/staff/list?pageNum=1&pageSize=10&phoneNo=
// 等级评估
export function getEvaluationRecordList(data) {
	return request.get('/mall/evaluationRecord/task/list', data)
}
export function staffList(phoneNo) {
	return request.get('/organization/staff/getStaffInfo/' + phoneNo,)
}
export function evaluationRecordId(id, data) {
	return request.get('/mall/evaluationRecord/' + id, data)
}
export function civil_elderly_type(id, data) {
	return request.get('/system/dict/data/type/civil_elderly_type', data);
}
export function listTitleAndConfig(id, data) {
	return request.get('/mall/titleTemplate/listTitleAndConfig/' + id, data);
}
export function getDicts(type, data) {
	return request.get('/system/dict/data/type/' + type, data);
}
export function evaluationSave(data) {
	return request.put('/civil-affairs/elderlyReformRecord', data);
}

export function putEvaluationRecord(data) {
	return request.put('/mall/evaluationRecord', data);
}

export function xzhServiceSign(data) {
	return request.post('/mall/xzhServiceSign', data)
}
export function xzhServiceSignPut(data) {
	return request.put('/mall/xzhServiceSign', data)
}

export function serviceProjectList(belongType, data) {
	return request.get('/public-service/serviceProject/list/' + belongType, data)
}

// 这是服务类型的接口
export function listByDeptName(data) {
	return request.get('/public-service/serviceProjectType/listByDeptName', data)
}

export function serviceProjectTypeList(data) {
	return request.get('/public-service/serviceProjectType/list', data)
}
export function serviceProjectListNew(data) {
	return request.get('/public-service/serviceProject/list', data)
}

export function serviceProjectDetail(id, data) {
	return request.get('/public-service/serviceProject/' + id, data)
}

export function listByUserId(data) {
	return request.get('/mall/xzhServiceSign/listByUserDept', data)
}
export function listByUserIdDetail(id, data) {
	return request.get('/mall/xzhServiceSign/' + id, data)
}
export function staffListDeptId(phoneNo) {
	return request.get('/organization/staff/getStaffInfo/' + phoneNo)
}

export function callServiceWechatPay(data) {
	return request.post('/mall/xzhServiceSign/callServiceWechatPay', data)
}
export function relativeFriendCircleUpdate(data) {
	return request.put('/mall/relativeFriendCircle', data)
}
export function relativeFriendCircleDelete(data) {
	return request.delete('/mall/relativeFriendCircle/' + data,)
}
export function relativeFriendCircle(data) {
	return request.post('/mall/relativeFriendCircle', data)
}
export function relativeFriendCircleList(data) {
	return request.get('/mall/relativeFriendCircle/list', data)
}
export function relativeFriendCircleDetail(id, data) {
	return request.get('/mall/relativeFriendCircle/' + id, data)
}
export function relativeFriendCircleRemove(data) {
	return request.post('/mall/relativeFriendCircle/remove', data)
}
export function getRelativeCircleMemberList(data) {
	return request.post('/mall/relativeFriendCircle/getRelativeCircleMemberList', data)
}
export function getNotInCircleMemberList(data) {
	return request.post('/mall/relativeFriendCircle/getNotInCircleMemberList', data)
}
export function addCircleMember(data) {
	return request.post('/mall/relativeFriendCircle/addCircleMember', data)
}


export function organList(data) {
	return request.get('/organization/organ/yldtList', data)
}
export function getOrgListNew(data) {
	return request.get('/organization/organ/getOrgList', data)
}
export function yldtOrganDetail(data) {
	return request.post('/organization/organ/yldtOrganDetail', data)
}
export function roomBuilding(data) {
	return request.get('/organization/roomBuilding/list', data)
}
export function roomFloor(data) {
	return request.get('/organization/roomFloor/list', data)
}
export function roomRoom(data) {
	return request.get('/organization/roomRoom/list', data)
}
export function roomBed(data) {
	return request.get('/organization/roomBed/list', data)
}
export function CheckInAppointment(data) {
	return request.post('/organization/CheckInAppointment', data)
}
export function seviceOrder(data) {
	return request.post('/public-service/seviceOrder', data)
}
export function civilList(data) {
	return request.get('/civil-affairs/signRecord/civilList', data)
}
export function getBedSignApplyDetail(id) {
	return request.get('/civil-affairs/sign/getBedSignApplyDetail/' + id,)
}
export function getYldtMealTime(data) {
	return request.post('/organization/consumptionRules/getYldtMealTime', data)
}
export function dailyList(data) {
	return request.get('/organization/daily/list', data)
}
export function getYldtElderAccount(data) {
	return request.post('/civil-affairs/account/getYldtElderAccount', data)
}
export function appointmentMeal(data) {
	return request.post('/organization/appointment', data)
}
export function sendOrderPaySuccessInfo(data) {
	return request.post('/mall/orderApi/sendOrderPaySuccessInfo', data)
}
export function yldtCheckInlist(data) {
	return request.get('/organization/CheckInAppointment/yldtCheckInlist', data)
}
export function yldtMealList(data) {
	return request.get('/organization/appointment/yldtMeallist', data)
}
export function seviceOrderList(data) {
	return request.get('/public-service/seviceOrder/yldtList', data)
}
export function seviceOrderDetail(id, data) {
	return request.get('/public-service/seviceOrder/' + id, data)
}
export function CheckInAppointmentDetail(id) {
	return request.get('/organization/CheckInAppointment/' + id,)
}
export function appointmentDetail(id) {
	return request.get('/organization/appointment/' + id,)
}
export function seviceCancelOrder(data) {
	return request.put('/public-service/seviceOrder/cancelOrder', data)
}
export function cancelCheckIn(data) {
	return request.put('organization/CheckInAppointment', data)
}
export function elderConsumeLog(data) {
	return request.get('/public-service/seviceOrder/elderConsumeLog', data)
}
export function checkElderlyIsCheckIn(data) {
	return request.post('/organization/checkInSign/checkElderlyIsCheckIn', data)
}
export function checkAccount(data) {
	return request.post('/civil-affairs/account/checkAccount', data)
}
export function assignOrderOrg(data) {
	return request.post('/mall/xzhOrder/assignOrderOrg', data)
}
