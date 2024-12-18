import store from '@/store'
import * as util from '@/utils/util'
import Config from '../config'


/*
	 * 当type=1时获取出生日期,type=2时获取性别,type=3时获取年龄
	 * */
export const IdCard = (IdCard, type) => {
	if (!IdCard) return
	if (type === 1) {
		//获取出生日期
		let birthday = IdCard.substring(6, 10) + "-" + IdCard.substring(10, 12) + "-" + IdCard.substring(12, 14)
		return birthday
	}
	if (type === 2) {
		//获取性别
		if (parseInt(IdCard.substr(16, 1)) % 2 === 1) {
			return "男"
		} else {
			return "女"
		}
	}
	if (type === 3) {
		//获取年龄
		var ageDate = new Date()
		var month = ageDate.getMonth() + 1
		var day = ageDate.getDate()
		var age = ageDate.getFullYear() - IdCard.substring(6, 10) - 1
		if (IdCard.substring(10, 12) < month || IdCard.substring(10, 12) === month && IdCard.substring(12, 14) <= day) {
			age++
		}
		if (age <= 0) {
			age = 1
		}
		return age
	}
}


export const showToats = (type, startTime, endTime) => {
	if (type == 1) {
		uni.showToast({
			title: "答题未开始",
			icon: "error",
		});
		setTimeout(() => {
			uni.navigateBack({
				delta: 2,
			});
		}, 2000);
	} else if (type == 2) {
		uni.showToast({
			title: "答题已结束",
			icon: "error",
		});
		setTimeout(() => {
			uni.navigateBack({
				delta: 2,
			});
		}, 2000);
	} else if (type == 3) {
		if (startTime && endTime) {
			uni.showModal({
				title: "提示",
				content: "答题结束时间：" + endTime,
				success: function (res) {
					if (res.confirm) {
						console.log("用户点击确定");
					} else if (res.cancel) {
						console.log("用户点击取消");
					}
				},
			});
		}
	}
};


// 判断题目是否可以答题
export const isAnswer = (startTime, endTime) => {
	// 时间判断
	let flag = true;
	const now = new Date().getTime();
	if (startTime && endTime) {
		const startTimes = new Date(startTime).getTime();
		const endTimes = new Date(endTime).getTime();
		if (now < startTimes) {
			showToats(1);
			flag = false;
		} else if (now > endTimes) {
			showToats(2);
			flag = false;
		}
	} else if (startTime && !endTime) {
		const startTimes = new Date(startTime).getTime();
		if (now < startTimes) {
			showToats(1);
			flag = false;
		}
	} else if (endTime && !startTime) {
		const endTimes = new Date(endTime).getTime();
		if (now > endTimes) {
			showToats(2);
			flag = false;
		}
	} else {
		showToats(3, startTime, endTime);
	}
	return flag;
};

export const dateFormat = (fmt, date) => {
	const opt = {
		"Y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"S+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	let ret
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt)
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt
}
// 存储开始时间和结束时间
export const evaluationDate = (type) => {
	if (type == 'evaluationStartTime') {
		uni.setStorageSync('evaluationStartTime', dateFormat('YYYY-mm-dd HH:MM:SS', new Date()))
	} else if (type == 'evaluationTime') {
		uni.setStorageSync('evaluationTime', dateFormat('YYYY-mm-dd HH:MM:SS', new Date()))
	} else {
		uni.removeStorageSync('evaluationStartTime');
		uni.removeStorageSync('evaluationTime');
	}
}
/** 数字超过一万转换为万
 * @param { Number } value 数值
 * @param { Number } decimal 保留几位小数
 * @returns { String }
 */
export const transNumberToShort = (value, decimal = 1) => {
	if (!value) return
	const k = 10000
	const sizes = ['', '万', '亿', '万亿']
	let i = undefined
	let str = ''
	if (value < k) {
		str = value
	} else {
		i = Math.floor(Math.log(value) / Math.log(k))
		str = ((value / Math.pow(k, i))).toFixed(decimal) + sizes[i]
	}
	return str
}

/**
 * 时间规则
 */
export const getTs = (time) => {
	var arr = time.split(/[- :]/),
		_date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]),
		timeStr = Date.parse(_date)
	return timeStr
}
export const timeFormat = (dateTime = null, fmt = 'yyyy-mm-dd') => {
	// 如果为null,则格式化当前时间
	if (!dateTime) dateTime = Number(new Date());
	// 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
	if (dateTime.toString().length == 10) dateTime *= 1000;
	let date = new Date(dateTime);
	let ret;
	let opt = {
		"y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"h+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"s+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}
export const timeRules = (time = null) => {
	if (!time) return
	let dateTime = new Date(time.replace(/-/g, '/'))
	// 如果为null,则格式化当前时间
	if (!time) dateTime = Number(new Date());
	// 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
	if (dateTime.toString().length == 10) dateTime *= 1000;
	let timestamp = + new Date(Number(dateTime));

	let timer = (Number(new Date()) - timestamp) / 1000;
	// 如果小于5分钟,则返回"刚刚",其他以此类推
	let tips = '';
	switch (true) {
		case timer < 300:
			tips = '刚刚';
			break;
		case timer >= 300 && timer < 3600:
			tips = parseInt(timer / 60) + '分钟前';
			break;
		case timer >= 3600 && timer < 86400:
			tips = parseInt(timer / 3600) + '小时前';
			break;
		case timer >= 86400 && timer < 2592000:
			tips = parseInt(timer / 86400) + '天前';
			break;
		default:
			if (timer >= 2592000 && timer < 365 * 86400) {
				tips = parseInt(timer / (86400 * 30)) + '个月前';
			} else {
				tips = parseInt(timer / (86400 * 365)) + '年前';
			}
	}
	return tips;
}
/**
 * 显示成功提示框
 */
export const showSuccess = (msg, callback) => {
	uni.showToast({
		title: msg,
		icon: 'none',
		mask: true,
		duration: 1500,
		success() {
			callback && callback()
		}
	})
}

/**
 * 显示失败提示框
 */
export const showError = (msg, callback) => {
	uni.showModal({
		title: '友情提示',
		content: msg,
		showCancel: false,
		success(res) {
			callback && callback()
		}
	})
}

/**
 * 显示纯文字提示框
 */
export const showToast = (msg, duration = 1500) => {
	uni.showToast({
		title: msg, // 提示的内容
		icon: 'none',
		mask: true, // 是否显示透明蒙层，防止触摸穿透
		duration // 提示的延迟时间，单位毫秒，默认：1500	
	})
}

/**
 * tabBar页面路径列表 (用于链接跳转时判断)
 * tabBarLinks为常量, 无需修改
 */
export const getTabBarLinks = () => {
	const tabBarLinks = [
		'pages/index/index',
		'pages/category/index',
		'pages/cart/index',
		'pages/user/index'
	]
	return tabBarLinks
}

/**
 * 生成完整的H5地址 [带参数]
 * @param {string} h5Url H5访问地址
 * @param {string} path 页面路径
 * @param {object} params 页面参数
 * @return {string}
 */
export const buildUrL = (h5Url, path, params) => {
	let complete = h5Url
	if (!util.isEmpty(path)) {
		complete += '#/' + path
		const shareParamsStr = getShareUrlParams(params)
		if (!util.isEmpty(shareParamsStr)) {
			complete += '?' + shareParamsStr
		}
	}
	return complete
}

/**
 * 生成转发的url参数(string格式)
 */
export const getShareUrlParams = (params) => {
	return util.urlEncode({
		refereeId: store.getters.userId, // 推荐人ID
		...params
	})
}

/**
 * 跳转到指定页面url
 * 支持tabBar页面
 * @param {string}  url   页面路径
 * @param {object}  query 页面参数
 * @param {string}  modo  跳转类型(默认navigateTo)
 */
export const navTo = (url, query = {}, modo = 'navigateTo') => {
	if (!url || url.length == 0) {
		return false
	}
	// tabBar页面, 使用switchTab
	if (util.inArray(url, getTabBarLinks())) {
		uni.switchTab({
			url: `/${url}`
		})
		return true
	}
	// 生成query参数
	const queryStr = !util.isEmpty(query) ? '?' + util.urlEncode(query) : ''
	// 普通页面, 使用navigateTo
	modo === 'navigateTo' && uni.navigateTo({
		url: `/${url}${queryStr}`
	})
	// 特殊指定, 使用redirectTo
	modo === 'redirectTo' && uni.redirectTo({
		url: `/${url}${queryStr}`
	})
	return true
}

/**
 * 获取购物车商品总数量
 * @param {*} value 
 */
export const getCartTotalNum = (value) => {
	const cartTotal = uni.getStorageSync('cartTotalNum') || 0
	return checkLogin() ? cartTotal : 0
}

/**
 * 记录购物车商品总数量
 * @param {*} value 
 */
export const setCartTotalNum = (value) => {
	uni.setStorageSync('cartTotalNum', Number(value))
}

/**
 * 设置购物车tabbar的角标
 * 该方法只能在tabbar页面中调用, 其他页面调用会报错
 */
export const setCartTabBadge = () => {
	const cartTabbarIndex = 2
	const cartTotal = getCartTotalNum()
	if (cartTotal > 0) {
		uni.setTabBarBadge({
			index: cartTabbarIndex,
			text: `${cartTotal}`
		})
	} else {
		uni.removeTabBarBadge({
			index: cartTabbarIndex
		})
	}
	return
}

/**
 * 验证是否已登录
 */
export const checkLogin = () => {
	return !!store.getters.userId
}

/**
 * 发起支付请求
 * @param {Object} 参数
 */
export const wxPayment = (option) => {
	const options = {
		timeStamp: '',
		nonceStr: '',
		prepay_id: '',
		paySign: '',
		...option
	}
	return new Promise((resolve, reject) => {
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: options.timeStamp,
			nonceStr: options.nonceStr,
			'package': `prepay_id=${options.prepay_id}`,
			signType: 'MD5',
			paySign: options.paySign,
			success: res => resolve(res),
			fail: res => reject(res)
		})
	})
}


/**
 * 加载更多列表数据
 * @param {Object} resList 新列表数据
 * @param {Object} oldList 旧列表数据
 * @param {int} pageNo 当前页码
 */
export const getMoreListData = (resList, oldList, pageNo) => {
	// 如果是第一页需手动制空列表
	if (pageNo == 1) oldList.data = []
	// 合并新数据
	return oldList.data.concat(resList.data)
}

export const getPicUrl = (url) => {
	return Config.picUrl + url
}

// export const getPicUrl = (url) => {
// 	return uni.getStorageSync('ylMapUrl') + url
// }


export const action = () => {
	return Config.apiUrl + '/file/upload'
}

export const picHeader = () => {
	return {
		'Authorization': `Bearer ${uni.getStorageSync('AccessToken')}`
	}
}

/**
 * 输出快递名称
 */
export const getExpressName = (express) => {
	if (!express) return ''
	const list = [{
		label: "顺丰",
		value: "1"
	},
	{
		label: "邮政",
		value: "2"
	},
	{
		label: "中通",
		value: "3"
	},
	{
		label: "圆通",
		value: "4"
	},
	{
		label: "申通",
		value: "5"
	},
	{
		label: "韵达",
		value: "6"
	},
	{
		label: "德邦",
		value: "7"
	},
	{
		label: "京东",
		value: "8"
	},
	{
		label: "天天",
		value: "9"
	},
	{
		label: "极兔",
		value: "10"
	}, {
		label: "自提",
		value: "11"
	},
	]
	return list.filter(ele => ele.value == express)[0].label
}