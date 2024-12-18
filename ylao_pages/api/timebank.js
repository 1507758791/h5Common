import request from '@/ylao_pages/utils/request/index.js'

// api地址
const apiUri = {

	authentication: '/civil-affairs/elderly/authentication',
	volunteerAuthentication: '/organization/staff/volunteerAuthentication',
	getRepairOrder: '/public-service/serviceProjectType/listTreeFirstId', //获取机构的服务项目类别
	getServiceProject: '/public-service/serviceProject/timeBankList', // 服务列表
	getElderInfo: '/civil-affairs/elderly/list/',
	getArea: '/system/area/list',
	// /elderly   民政  参数除了页面上数据,还有  type = 7,status =7
	addElderly: '/civil-affairs/elderly',
	dictType: "/system/dict/data/type/",
	getCommodityList: '/mall/commodity/list',
	commodityList: '/mall/commodity/list',
	checkHasCoinsForPay: "/mall/timebankAccount/checkHasCoinsForPay",
	subOrder: "/mall/orderApi",
	orderList: "/mall/orderApi/selectOrderListTimeBank",
	receiveTimeBankOrder: '/mall/orderApi/receiveTimeBankOrder',
	// http://192.168.1.216/test-api/mall/orderApi/cancelTimeBankOrder
	cancelTimeBankOrder: '/mall/orderApi/cancelTimeBankOrder',
	beginTimeBankOrder: "/mall/orderApi/beginTimeBankOrder",
	finishTimeBankOrder: "/mall/orderApi/finishTimeBankOrder",
	// http://192.168.1.216/test-api/mall/timebankAccount/getInfoByPhoneNo/{phoneNo}
	getInfoByPhoneNo: "/mall/timebankAccount/getInfoByPhoneNo/",
	donate: "/mall/timebankAccount/donate",
	timeBankElderly: 'civil-affairs/elderly/timeBankElderly',

	listActivityRegister: '/public-service/activityManager/listActivityRegister',
	getActivityInfo: '/public-service/activityManager/getActivityInfo',
	activityPerson: '/public-service/activityPerson',
	getParticipantsList: '/public-service/activityPerson/getParticipantsList',
}
export function getParticipantsList(data) {
	return request.get(apiUri.getParticipantsList, data)
}
export function outActivityPerson(data) {
	return request.put(apiUri.activityPerson, data)
}
export function activityPerson(data) {
	return request.post(apiUri.activityPerson, data)
}
export function getActivityInfo(data) {
	return request.get(apiUri.getActivityInfo, data)
}
export function listActivityRegister(data) {
	return request.get(apiUri.listActivityRegister, data)
}
export function timeBankElderly(data) {
	return request.get(apiUri.timeBankElderly, data)
}
export function donate(data) {
	return request.post(apiUri.donate, data)
}
export function cancelTimeBankOrder(data) {
	return request.post(apiUri.cancelTimeBankOrder, data)
}
export function receiveTimeBankOrder(data) {
	return request.post(apiUri.receiveTimeBankOrder, data)
}
export function addElderly(data) {
	return request.post(apiUri.addElderly, data)
}
export function commodityList(data) {
	return request.get(apiUri.commodityList, data)
}
export function getArea(data) {
	return request.get(apiUri.getArea, data)
}
export function volunteerAuthentication(data) {
	return request.get(apiUri.volunteerAuthentication, data)
}
export function authentication(data) {
	return request.get(apiUri.authentication, data)
}
export function getInfoByPhoneNo(phoneNo) {
	return request.get(apiUri.getInfoByPhoneNo + phoneNo)
}
// 获取机构服务类刑
export function getRepairOrder(id) {
	return request.get(apiUri.getRepairOrder)
}
// 选择服务项目
export function getServiceProject(data) {
	return request.get(apiUri.getServiceProject, data)
}

// 获取认证老人信息
export function getElderInfo(data) {
	return request.get(apiUri.getElderInfo, data)
}
// 获取字典
export function getDict(type) {
	return request.get(apiUri.dictType + type)
}

// 获取服务内容
export function getCommodityList(data) {
	return request.get(apiUri.getCommodityList, data)
}

// 验证时间币
export function checkHasCoinsForPay(data) {
	return request.post(apiUri.checkHasCoinsForPay, data)
}

// 提交需求
export function subOrder(data) {
	return request.post(apiUri.subOrder, data)
}

// 订单列表
export function orderList(data) {
	return request.get(apiUri.orderList, data)
}

// 开始服务
export function beginTimeBankOrder(data) {
	return request.post(apiUri.beginTimeBankOrder, data)
}

// 完成服务
export function finishTimeBankOrder(data) {
	return request.post(apiUri.finishTimeBankOrder, data)
}
