// 逻辑层的数据
const logicLayer = {
	touchstartY: 0,
	isTouchMoved: false,
	scrollTop: 0,
	triggerRefreshDis: 160,
	refreshMaxHigh: 200,
	distance: 0
}

if (window && !window.$isBindTouch) {
	window.$isBindTouch = true
	
	let touchStartY = 0
	
	window.addEventListener('touchstart', ev => {
		touchStartY = ev.touches[0].clientY
	}, {passive: true})
	
	// passive: true 永远不会调用ev.preventDefault()，减少浏览器的停顿时间
	
	window.addEventListener('touchmove', ev => {
		const curY = ev.touches[0].clientY
		if (curY - touchStartY > 0) {
			ev.preventDefault()
		}
	}, {passive: false})
}

export default {
	methods: {
		// 计算视图的元素高度
		async calcViewportItemsHeight(event, ownerInstance) {
			await this.nextTick()
			const nodes = document.getElementsByClassName('item-wrap')
			const viewportNodes = [...nodes].map((node, index) => {
				const {
					height
				} = node.getBoundingClientRect()

				const nodeIndex = +node.getAttribute('data-id')
				return {
					nodeIndex,
					height
				}
			})
			ownerInstance.callMethod('calcHeight', {
				viewportNodes
			})
		},
		nextTick() {
			return new Promise(resolve => {
				this.$nextTick(resolve)
			})
		},
		callLogicLayerMethod(ins, text, distance) {
			const com = ins.selectComponent('.refresh-pull-down')
			const comList = ins.selectComponent('.list')
			const refreshIcon = ins.selectComponent('.refresh-icon')
			com.setStyle({
				height: `${distance}px`
			})
			comList.setStyle({
				position: 'absolute',
				top: `${distance}px`
			})
			ins.callMethod('changeText', {
				text
			})
			if (refreshIcon) {
				refreshIcon.setStyle({
					transform: `rotate(${360 * distance / logicLayer.refreshMaxHigh}deg)`
				})
				if (distance === logicLayer.refreshMaxHigh) {
					refreshIcon.addClass('rotate-start-animation')
				}
			}
		},
		removeIconClass(ins) {
			const refreshIcon = ins.selectComponent('.refresh-icon')
			if (refreshIcon) {
				refreshIcon.setStyle({
					transform: `rotate(0deg)`
				})
				refreshIcon.removeClass('rotate-start-animation')
			}
		},
		touchstartEvent(ev, ins) {
			logicLayer.distance = 0
			logicLayer.touchstartY = ev.touches[0].clientY
			this.removeIconClass(ins)
		},
		touchmoveEvent(ev, ins) {
			let distance = ev.touches[0].clientY - logicLayer.touchstartY
			if (logicLayer.scrollTop === 0) {
				let text = '下拉刷新'
				if (distance > 0) {
					if (distance >= logicLayer.triggerRefreshDis) {
						logicLayer.isTouchMoved = true
						text = '松手刷新'
					}
					if (distance > logicLayer.refreshMaxHigh) {
						distance = logicLayer.refreshMaxHigh
					}
					this.callLogicLayerMethod(ins, text, distance)
				}
			}
			logicLayer.distance = distance
		},
		touchendEvent(ev, ins) {
			if (logicLayer.isTouchMoved) {
				logicLayer.isTouchMoved = false
				logicLayer.touchstartY = 0
				this.callLogicLayerMethod(ins, '正在刷新', logicLayer.refreshMaxHigh)
				ins.callMethod('refresh')
			} else {
				if (logicLayer.distance) {
					this.callLogicLayerMethod(ins, '下拉刷新', 0)
				}
			}
		},
		touchcancelEvent(ev, ins) {
			if (logicLayer.distance > 0) {
				this.callLogicLayerMethod(ins, '下拉刷新', 0)
				this.removeIconClass(ins)
			}
		},
		propObserver({scrollTop, triggerRefreshDis, refreshMaxHigh, refreshComplete}, ov, ins) {
			if (refreshComplete) {
				this.callLogicLayerMethod(ins, '刷新完成', logicLayer.refreshMaxHigh)
				setTimeout(() => {
					this.callLogicLayerMethod(ins, '刷新完成', 0)
					this.removeIconClass(ins)
				}, 500)
			}
			Object.assign(logicLayer, {
				scrollTop,
				triggerRefreshDis,
				refreshMaxHigh
			})
		}
	}
}
