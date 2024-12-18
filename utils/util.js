let jup = true;
let s = 1
export default {
	// 页面跳转
	navigateToPage(url) {
		if (!jup) {
			return
		}
		jup = false
		uni.navigateTo({
			url: url,
			success() {
				jup = true
			},
			fail() {
				jup = true
				uni.showToast({
					title: '您的操作太过频繁~',
					icon: 'none',
					duration: 2000
				})
			}
		})
	},
	paste(value) {
		uni.setClipboardData({
			data: value,
			success: function() {
				uni.showToast({
					title: "复制成功",
					icon: "none"
				})
			},
			fail: function() {
				uni.showToast({
					title: "复制失败",
					icon: "none"
				})
			}

		});

	},
	phoneCall(value) {
		uni.makePhoneCall({
			// 手机号
			phoneNumber: value,
			// 成功回调
			success: (res) => {
				console.log('调用成功!')
			},
			// 失败回调
			fail: (res) => {
				uni.showToast({
					title: "拨打电话失败失败",
					icon: "none"
				})
			}

		});
	},
	previewImg(list, idx) {
		// let _this = this;
		// let imgsArray = [];
		// imgsArray[0] = logourl
		// uni.previewImage({
		// 	current: 0,
		// 	urls: imgsArray
		// });
	    // list：图片 url 数组
	     if(list && list.length > 0){        
	         uni.previewImage({
	             current:list[idx],    //  传 Number H5端出现不兼容 
	             urls: list
	         });
	     }
	},
	isNull(array) {
		if (array == undefined || array == null) {
			return true;
		}
		if (typeof array == 'string') {
			return Object.keys(array.trim()).length === 0
		}
		return Object.keys(array).length === 0

	}
}
