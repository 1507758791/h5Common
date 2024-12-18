import request from '@/ylao_pages/utils/request'

// 首页轮播接口
export function getBannerImg(data,) {
  return request.post('/mall/commodity/getBannerImg', data)
}

// 商品列表
export function getAllCommodityList(params) {
  return request.get('/mall/commodity/getAllCommodity', { productTypes: '1,2,3,4', ...params })
}
//获取暖城颐养首页分类列表
export function xzhContentType() {
  return request.get('/system/dict/data/type/xzh_content_type')
}

// 字典获取商品类别
export function getGoodsTypeList(name) {
  return request.get('/system/dict/data/type/' + name)
}

// 获取产品详情
export function getMallDetail(data) {
  return request.post(`/mall/commodity/getCommodityInfo`, data)
}

// 获取售后评价
export function getRentRatelist(data) {
  return request.post('/mall/rentRate/rentRatelist', data)
}

// 获取页面查询条件接口
export function getRateSearchOption(data) {
  return request.post('/mall/rentRate/rateSearchOption', data)
}

// 新增售后评价
export function addRentRatelist(data) {
  return request.post('/mall/rentRate', data)
}

// 购物车列表
export function getShoppingCart(data) {
  return request.post('/mall/commodity/getShoppingCarts', data)
}

// 加入购物车
export function addShoppingCart(data) {
  return request.post('/mall/commodity/joinShoppingCart', data)
}

// 购物车数量的修改
export function updateShoppingCart(data) {
  return request.post('/mall/commodity/updateShoppingCart', data)
}

// 购物车删除
export function delShoppingCart(data) {
  return request.post('/mall/commodity/removeShoppingCart', data)
}

// 立即购买获取规格信息接口
export function getMallSpecsInfo(data) {
  return request.post('/mall/commodity/getConfirmShoppingCartForDirect', data)
}

// 提交订单
export function submitOrder(data) {
  return request.post('/mall/order', data)
}

// 获取用户地址列表接口
export function getUserAddressList(params) {
  return request.post('/mall/elderlyAddress/getElderlyDeliveryAddress', params)
}

// 用户地址新增
export function addUserAddress(data) {
  return request.post('/mall/elderlyAddress/insertDeliveryAddress', data)
}

// 用户地址修改
export function editUserAddress(data) {
  return request.post('/mall/elderlyAddress/updateDeliveryAddress', data)
}

// 用户地址删除
export function delUserAddress(data) {
  return request.post('/mall/elderlyAddress/deleteDeliveryAddress', data)
}

// 获取我的订单的list
export function getOrderlist(data) {
  return request.get('/mall/order/getElderlyOrder', data)
}

// 收货的确认
export function updateRentOrderStatus(data) {
  return request.post('/mall/order/updateRentOrderStatus', data)
}

// 获取亲属绑定设备
export function elderlyBindDeviceList(data) {
  return request.post('/organization/elderlyDevice/elderlyBindDeviceList', data)
}

// 获取老人的设备报警
export function getElderlyBindDeviceDetail(data) {
  return request.get('/organization/ElderlyDeviceDataInfo/list', data)
}

// 获取粉丝数 是关注
export function getOrganFollowInfo(data) {
  return request.get('/mall/commodity/getOrganFollowInfo', data)
}
// 关注 特别关注 取消关注
export function saveOrUpdateFollow(data) {
  return request.post('/mall/commodity/saveOrUpdateFollow', data)
}
// 关注列表
export function getFollowList(data) {
  return request.get('/mall/commodity/getFollowList', data)
}

