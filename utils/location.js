import permision from "@/common/permission.js"
// 检查是否开启系统gps服务
export function checkPermissions() {
	let system = uni.getSystemInfoSync(); // 获取系统信息
	if (system.platform === 'android') { // 判断平台
		var context = plus.android.importClass("android.content.Context");
		var locationManager = plus.android.importClass("android.location.LocationManager");
		var main = plus.android.runtimeMainActivity();
		var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
		if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
			// uni.showModal({
			// 	title: '提示',
			// 	content: '使用该功能需要打开定位服务，请前往设置打开定位',
			// 	showCancel: false, // 不显示取消按钮
			// 	success() {
			// 		if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
			// 			var Intent = plus.android.importClass('android.content.Intent');
			// 			var Settings = plus.android.importClass('android.provider.Settings');
			// 			var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
			// 			main.startActivity(intent); // 打开系统设置GPS服务页面
			// 		} else {
			// 			console.log('GPS功能已开启');
			// 		}
			// 	}
			// });
			
			// uni.showToast({
			// 	title: '使用该功能需要使用定位服务，请前往设置打开定位服务',
			// 	icon: 'none',
			// 	duration: 3000
			// })
			return false
		} else {
			return true
		}
	} else {
		var result = 0;
		var cllocationManger = plus.ios.import("CLLocationManager");
		var enable = cllocationManger.locationServicesEnabled();
		var status = cllocationManger.authorizationStatus();
		if (!enable) {
		    result = 2;
		} else if (status === 0) {
		    result = null;
		} else if (status === 3 || status === 4) {
		    result = 1;
		} else {
		    result = 0;
		}
		plus.ios.deleteObject(cllocationManger);
		if(result = 1){
			return true
		} else {
			return false
		}
	}
}
// 定位
export function location() {
	return new Promise((resolve, reject) => {
		uni.getLocation({
			type: 'gcj02',
			geocode: true,
			success: function(res) {
				let address = {}
				address.latitude = res.latitude
				address.longitude = res.longitude
				address.address = res.address.province + res.address.city + res.address.district + res.address.street + res.address
					.streetNum + res.address.poiName
				console.log(address)
				uni.setStorage({
					key: 'addressInfo',
					data: address,
					success: function() {
						console.log('success');
					}
				});
				resolve(address);
			},
			fail: function(err) {
				// uni.showToast({
				// 	title: '检测到您未开启定位权限或服务，请前往设置开启',
				// 	icon: 'none',
				// 	duration: 3000
				// })
				console.log(err)
				reject(err)
			}
		})
	})
}
// 百度坐标转高德坐标
export function bdTogd(bd_lat, bd_lon) {
	var gd_lat_lon = [];
	var PI = 3.14159265358979324 * 3000.0 / 180.0;
	var x = bd_lon - 0.0065
	var y = bd_lat - 0.006;
	var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * PI);
	var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * PI);
	gd_lat_lon[0] = z * Math.cos(theta);
	gd_lat_lon[1] = z * Math.sin(theta);
	return gd_lat_lon;
}
// 高德坐标计算距离
export function calculateLineDistance(start, end) {
	var d1 = 0.01745329251994329;
	var d2 = start.longitude;
	var d3 = start.latitude;
	var d4 = end.longitude;
	var d5 = end.latitude;
	d2 *= d1;
	d3 *= d1;
	d4 *= d1;
	d5 *= d1;
	var d6 = Math.sin(d2);
	var d7 = Math.sin(d3);
	var d8 = Math.cos(d2);
	var d9 = Math.cos(d3);
	var d10 = Math.sin(d4);
	var d11 = Math.sin(d5);
	var d12 = Math.cos(d4);
	var d13 = Math.cos(d5);
	var arrayOfDouble1 = [];
	var arrayOfDouble2 = [];
	arrayOfDouble1.push(d9 * d8);
	arrayOfDouble1.push(d9 * d6);
	arrayOfDouble1.push(d7);
	arrayOfDouble2.push(d13 * d12);
	arrayOfDouble2.push(d13 * d10);
	arrayOfDouble2.push(d11);
	var d14 = Math.sqrt((arrayOfDouble1[0] - arrayOfDouble2[0]) * (arrayOfDouble1[0] - arrayOfDouble2[0]) +
		(arrayOfDouble1[1] - arrayOfDouble2[1]) * (arrayOfDouble1[1] - arrayOfDouble2[1]) +
		(arrayOfDouble1[2] - arrayOfDouble2[2]) * (arrayOfDouble1[2] - arrayOfDouble2[2]));

	return (Math.asin(d14 / 2.0) * 12742001.579854401);
}

export function checkOrLocal(load) {
	return new Promise((resolve, reject) => {
		if(load){
			uni.showLoading({
				title: '加载中'
			})
		}
		let status = checkPermissions()
		if(status){
			uni.getLocation({
				type: 'gcj02',
				geocode: true,
				success: function(res) {
					let address = {}
					address.latitude = res.latitude
					address.longitude = res.longitude
					address.address = res.address.province + res.address.city + res.address.district + res.address.street + res.address
						.streetNum + res.address.poiName
					console.log(address)
					uni.setStorage({
						key: 'addressInfo',
						data: address,
						success: function() {
							console.log('success');
						}
					});
					uni.hideLoading()
					resolve(address);
				},
				fail: function(err) {
					// uni.showToast({
					// 	title: '检测到您未开启定位权限或服务，请前往设置开启',
					// 	icon: 'none',
					// 	duration: 3000
					// })
					console.log(err)
					uni.hideLoading()
					reject('err-102')
				}
			})
		} else {
			uni.hideLoading()
			reject('err-101')
		}
		
	})
}