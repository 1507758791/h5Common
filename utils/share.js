import Api from '@/common/api.js'


// 4大商品分享
export function shareGoods(info) {
	console.log(info)
	// serviceGroup
	let shareList = [ 'sojurn', 'class', 'store','trends']
	let pic = ''
	if(info.pic){
		if(uni.getSystemInfoSync().platform == 'android' ){
			
			if(info.scene == '0'){
				pic = info.pic+'?x-oss-process=image/resize,m_lfit,h_450,w_450'
			}else{
				pic = info.pic+ '?x-oss-process=image/resize,w_100,h_100'
			}
		}else{
			if(info.scene == '0'){
				pic = info.pic+ '?x-oss-process=image/resize,w_150,h_150'
			}else{
				pic = info.pic+ '?x-oss-process=image/resize,w_100,h_100'
			}
		}
	} else {
		pic = 'http://dataky.oss-cn-shanghai.aliyuncs.com/web-20201230-ccbc176f11854a83b82c774d3d760361.png?x-oss-process=image/resize,m_lfit,h_150,w_150'
	}
	console.log(pic)
	if(shareList.indexOf(info.goodsType) !== -1){
		console.log(777)
		if(info.scene == '0'){
			let path = ''
			if(info.goodsType == 'goods'){
				path = '/pages/goods/goodsDetail/goodsDetail?id=' + info.id
			} else if(info.goodsType == 'service'){
				path = '/pages/provideAged/serviceDetail/serviceDetail?id=' + info.id
			} else if(info.goodsType == 'goodsGroup'){
				path = '/pages/operate/ground/ground?id=' + info.id
			} else if(info.goodsType == 'serviceGroup'){
				path = '/pages/operate/ground/groundService?id=' + info.id
			} else if(info.goodsType == 'goodsTeam'){
				path = '/pages/operate/team/team?id=' + info.id
			} else if(info.goodsType == 'serviceTeam'){
				path = '/pages/operate/team/teamService?id=' + info.id
			} else if(info.goodsType == 'sojurn'){
				path = '/pages/sojourn/sojournDetail/sojournDetail?id=' + info.id
			} else if(info.goodsType == 'class'){
				path = '/pagesA/education/classDetail/classDetail?id=' + info.id
			} else if(info.goodsType == 'store'){
				path = '/pagesA/merchant/merchant?id=' + info.id
			}else if(info.goodsType == 'trends'){
				path = '/pagesA/merchant/trends?id=' + info.id+'&isShare='+info.isShare+'&shareId='+info.shareId
			}
			uni.share({
				provider: "weixin",
				scene: info.scene == '0'?'WXSceneSession':'WXSenceTimeline',
				type: 5,
				imageUrl: pic,
				title: '九如-' + info.summary,
				miniProgram: {
					id: 'gh_7169a45bb9e7',
					path: path + '&isShare=1',
					type: Api.BASEURI == 'http://www.99kangyang.com/api/' ? 0:2,
					webUrl: 'http://el.dataky.cn/'
				},
				success: function(res) {
					console.log("success:" + JSON.stringify(res));
				},
				fail: function(err) {
					console.log("fail:" + JSON.stringify(err));
				}
			})
		} else {
			uni.share({
				provider: "weixin",
				scene: info.scene == '0'?'WXSceneSession':'WXSenceTimeline',
				type: 0,
				href: info.href,
				title: '九如' + info.title,
				summary: info.summary,
				imageUrl: pic,
				success: function(res) {
					console.log("success:" + JSON.stringify(res));
				},
				fail: function(err) {
					console.log("fail:" + JSON.stringify(err));
				}
			});
		}
	}
}
