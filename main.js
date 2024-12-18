import Vue from 'vue'
import App from './App'
import Api from 'common/api.js'
import uView from "uview-ui";

Vue.prototype.hostUrl=  Api.BASEURLJoRu;
Vue.prototype.resUrl=  Api.BASEURLJoRu;
Vue.prototype.img_url = Api.BASEURLJoRu;
Vue.prototype.imgUrl = Api.BASEURLJoRuImgUrl;
Vue.prototype.baseJoruUrl  = Api.BASEURL+'/';


import commen from './common/expression.js'
Vue.prototype.$commen = commen

import navbar from '@/components/z-nav-bar/z-nav-bar.vue';
Vue.component('z-nav-bar', navbar)

import navbara from '@/components/z-nav-bar/z-nav-bara.vue';
Vue.component('z-nav-bara', navbara)

import navbarb from '@/components/z-nav-bar/z-nav-barb.vue';
Vue.component('z-nav-barb', navbarb)

import loading from '@/components/z-loading/z-loading.vue';
Vue.component('z-loading', loading)

import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh';
Vue.component('mixPulldownRefresh', mixPulldownRefresh)

import zConfirm from '@/components/z-confirm-dialog/z-confirm-dialog.vue';
Vue.component('zConfirm', zConfirm)

import nulla from '@/components/nulla/nulla';
Vue.component('nulla', nulla)

import uParse from '@/components/u-parse/u-parse.vue'
Vue.component('uParse', uParse)
import {emojiList} from '@/utils/emoji.js'
Vue.prototype.emojiList = emojiList

import * as otherApi from './config/api.js'
import * as Common from './config/common.js'
import * as Db from './config/db.js'
import * as Config from './config/config.js'
Vue.prototype.$otherApi = otherApi;
Vue.prototype.$common = Common;
Vue.prototype.$db = Db;
Vue.prototype.$config = Config;
//时间戳转化日期格式
Vue.filter('formatDate', function (value) {
    if (!value) return '';
    const date = new Date(value);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
});
//时间戳转化日期格式
Vue.filter('formatTime', function (value) {
    if (!value) return '';
    const date = new Date(value);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
});

const msg = (title, duration=3000, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
Vue.prototype.$api = {msg};

import store from './store'
Vue.prototype.$store = store

import util from '@/utils/util.js'
Vue.prototype.$util = util

Vue.filter('priceDecimal',(val)=>{
	if(!Number(val)){
		return '0.00'
	}
	var f = Math.round(val * 100) / 100;
	var s = f.toString();
	var rs = s.indexOf('.');
	if (rs < 0) {
		rs = s.length;
		s += '.';
	}
	while (s.length <= rs + 2) {
		s += '0';
	}
	return s;
})
Vue.prototype.bMapToQQMap = function (lng, lat) {

	if (lng == null || lng == '' || lat == null || lat == '')
		return [lng, lat];

	var x_pi = 3.14159265358979324;
	var x = parseFloat(lng) - 0.0065;
	var y = parseFloat(lat) - 0.006;
	var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
	var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
	var lng = (z * Math.cos(theta)).toFixed(7);
	var lat = (z * Math.sin(theta)).toFixed(7);

	return [lng, lat];

}
Vue.use(uView);
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
