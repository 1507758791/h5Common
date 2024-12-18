import request from '@/ylao_pages/utils/request'

// 查询老人入住预约列表
export function listCheckInAppointment(query) {
  return request.get('/organization/CheckInAppointment/list', query)
}

// 查询老人入住预约详细
export function getCheckInAppointment(id) {
  return request({
    url: '/organization/CheckInAppointment/' + id,
    method: 'get'
  })
}

// 新增老人入住预约
export function addCheckInAppointment(data) {  
  return request.post('/organization/CheckInAppointment', data)
}

// 修改老人入住预约
export function updateCheckInAppointment(data) {
  return request({
    url: '/organization/CheckInAppointment',
    method: 'put',
    data: data
  })
}

// 删除老人入住预约
export function delCheckInAppointment(id) {
  return request({
    url: '/organization/CheckInAppointment/' + id,
    method: 'delete'
  })
}
