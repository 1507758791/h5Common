//将时间戳格式化 
export function getMyDate(time) {
	if (typeof(time) == "undefined") {
		return "";
	}
	var oDate = new Date(time),
		oYear = oDate.getFullYear(),
		oMonth = oDate.getMonth() + 1,
		oDay = oDate.getDate(),
		oHour = oDate.getHours(),
		oMin = oDate.getMinutes(),
		oSen = oDate.getSeconds(),
		oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(
			oSen); //最后拼接时间  

	return oTime;
};
export function formatTime(time) {
	var t = new Date(time)
	var isTodays = isToday(t)
	if (isTodays) {
		// console.log(t.getHours())
		// console.log(t.getMinutes())
		let min = t.getMinutes()
		let hour = t.getHours()
		if (min < 10) {
			min = '0' + min;
		}
		if (hour < 10) {
			hour = '0' + hour;
		}
		return '今天' + ' ' + hour + ':' + min

	} else {
		return getMyDate(time).substr(5, 11)
	}
}
export function isToday(date) {
	return new Date().toString().substr(0, 15) === date.toString().substr(0, 15);
}
//将时间戳格式化 
export function getMyTime(time) {
	if (typeof(time) == "undefined") {
		return "";
	}
	var oDate = new Date(time),
		oYear = oDate.getFullYear(),
		oMonth = oDate.getMonth() + 1,
		oDay = oDate.getDate(),
		oHour = oDate.getHours(),
		oMin = oDate.getMinutes(),
		oSen = oDate.getSeconds(),
		oTime = getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(
		oSen); //最后拼接时间  

	return oTime;
};

//补0操作,当时间数据小于10的时候，给该数据前面加一个0  
export function getzf(num) {
	if (parseInt(num) < 10) {
		num = '0' + num;
	}
	return num;
}

export function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

export function formatDate(date, fmt) {
	console.log(date)
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
}

function padLeftZero (str) {
    return ('00' + str).substr(str.length)
}

export function dateForm(val) {
	var time = new Date(val);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();

	return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}

export function dateForms(val) {
	var time = new Date(val);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();

	return y + '-' + add0(m) + '-' + add0(d);
}

function add0(m) {

	return m < 10 ? '0' + m : m;

}
export function weekDay(date) {
	var dt = new Date(date.split("-")[0], date.split("-")[1] - 1, date = date.split("-")[2]);
	var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
	return weekDay[dt.getDay()];
}
export function countdownTime(end, isShowMin) {
	var nowtime = new Date(), //获取当前时间
		endtime = new Date(end); //定义结束时间
	var lefttime = endtime.getTime() - nowtime.getTime(), //距离结束时间的毫秒数

		leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
		lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24), //计算小时数
		leftm = Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数
		lefts = Math.floor(lefttime / 1000 % 60); //计算秒数
	if (lefttime > 0) {
		if (isShowMin) {
			return leftd + "天" + add0(lefth) + "小时"
		} else {
			if (leftd > 0) {
				return leftd + "天" + add0(lefth) + ":" + add0(leftm) + ":" + add0(lefts); //返回倒计时的字符串
			} else {
				return add0(lefth) + ":" + add0(leftm) + ":" + add0(lefts); //返回倒计时的字符串
			}

		}
	} else {
		return '已截止'
	}

}
