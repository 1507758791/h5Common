const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//校验手机格式
function checkMobile(mobile){
	return RegExp(/^1[34578]\d{9}$/).test(mobile);
}
//校验6-16位密码
function checkPassword(pwd){
	return RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/).test(pwd);
}
//校验姓名
function checkName(name){
	return RegExp( /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/).test(name);
}
//校验数量
function checkNumber(nub){
	return RegExp(/^[1-9]+\d*$/).test(nub);
}
//校验非空
function checkNull(all){
	return RegExp(/^[\s\S]*.*[^\s][\s\S]*$/).test(all);
}
//校验身份证18
function checkIdCard(all){
	return RegExp(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/).test(all);
}
//校验身份证15
function checkIdCard_15(all){
	return RegExp(/^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/).test(all);
}
//email验证
function checkEmail(all){
	return RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/).test(all);
}
//qq验证
function checkQQ(all){
	return RegExp(/^[1-9]\d{4,9}$/).test(all);
}
//保留一位小数
function checkPointOne(all){
	return RegExp(/^\d*\.{0,1}\d{0,1}$/).test(all);
}
//百度转gcj02
function bd09togcj02(bd_lon, bd_lat) {
    var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    var x = bd_lon - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat]
}
//gcj02转百度
function gcj02tobd09(lng, lat) {
	var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
	var PI = 3.1415926535897932384626;
	var a = 6378245.0;
	var ee = 0.00669342162296594323;
    var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat]
}
module.exports = {
  formatTime: formatTime,
	checkMobile:checkMobile,
	checkName:checkName,
	checkNumber:checkNumber,
	checkNull:checkNull,
	checkIdCard:checkIdCard,
	checkPassword:checkPassword,
	checkEmail:checkEmail,
	checkQQ:checkQQ,
	checkIdCard_15:checkIdCard_15,
	bd09togcj02:bd09togcj02,
	gcj02tobd09:gcj02tobd09,
	checkPointOne:checkPointOne
	
}
