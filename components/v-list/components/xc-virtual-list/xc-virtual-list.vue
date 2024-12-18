<template>
	<view class="virtual-list">
		<scroll-view scroll-y="true" 
					 :style="{
						 'height': scrollHeight + 'px',
						 'position': 'relative'
					 }"
					 :prop="option"
					 :change:prop="thread.propObserver"
					 @scroll="handleScroll"
					 @scrolltolower="scrollLower"
					 >
			<!-- 下拉刷新区域 -->
			<view class="refresh-pull-down">
				<slot name="pullDownRefresh">
					<view class="refresh-main">
						<image class="refresh-icon" src="./pull-down-refresh.png"></image>
						<text class="refresh-text">{{text}}</text>
					</view>
				</slot>
			</view>
			<!-- 滚动条 -->
			<view class="scroll-bar"
					v-if="!HiddenScrollBar"
				  :style="{
					'height': localHeight + 'px'
				  }"></view>
			<!-- 可视区域 -->
			<!-- #ifdef APP -->
			<view class="list"
				  :style="{
					  'transform': `translateY(${offset}px)`
				  }"
				  @touchstart="thread.calcViewportItemsHeight">
				<view class="item-wrap" 
					  v-for="item in visibleData" 
					  :key="item.id"
					  :data-id="item.id">
					<slot :item="item"></slot>
				</view>
				<slot name="loading">
					<view class="loading" v-show="loading">
						加载中...
					</view>
				</slot>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="list"
				  :style="{
					  'transform': `translateY(${offset}px)`
				  }">
				<view class="item-wrap" 
					  v-for="item in visibleData" 
					  :key="item.id"
					  :data-id="item.id">
					<slot :item="item"></slot>
				</view>
				<slot name="loading">
					<view class="loading" v-show="loading">
						加载中...
					</view>
				</slot>
			</view>
			<!-- #endif -->
		</scroll-view>
	</view>
</template>

<!-- #ifdef APP || H5 -->
<script lang="renderjs" module="thread">
	import renderMixin from './render.js'
	export default {
		mixins: [renderMixin]
	}
</script>
<!-- #endif -->

<script>
	let positionArr = [];
	
	/**
	 * @event{Function()} refresh 触发下拉刷新时的事件
	 * @event {Function()} lower 上拉加载更多
	 */
	export default {
		name: 'VirtualList',
		props: {
			// 所有的items
			items: {
				type: Array,
				required: true,
				default: () => []
			},
			// 预留的数量
			remain: {
				type: Number,
				required: true,
				default: 0
			},
			// item大小
			size: {
				type: Number,
				required: true,
				default: 0
			},
			// 间距
			marginY: {
				type: Number,
				required: true,
			},
			// 给列表视口的高度, 没有给高度，将按size * remain来计算, 建议size * remain 和 viewportHeight相差不大效果最好
			viewportHeight: {
				type: Number,
				default: 0
			},
			// item的高度是否可变
			variable: {
				type: Boolean,
				default: false
			},
			// 隐藏滚动条
			HiddenScrollBar: {
				type: Boolean,
				default: false
			},
			// 触发下拉刷新的距离
			triggerRefreshDis: {
			  type: Number,
			  default: 100
			},
			// 下拉刷新的最大高度
			refreshMaxHigh: {
			  type: Number,
			  default: 200
			},
			// 刷新状态
			refreshComplete: {
				type: Boolean,
				default: false
			},
			// 上拉加载和数据加载的loading
			loading: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// 起始
				start: 0,
				// 结束
				end: this.remain,
				// list 偏移量
				offset: 0,
				localHeight: 0,
				option: {
					// 滚动的距离
					scrollTop: 0,
					triggerRefreshDis: uni.upx2px(this.triggerRefreshDis),
					refreshMaxHigh: uni.upx2px(this.refreshMaxHigh),
					// 刷新是否完成
					refreshComplete: false
				},
				// 转换后的marginY
				changeMarginY: uni.upx2px(this.marginY),
				text: '下拉刷新'
			}
		},
		computed: {
			// 预留项
			preCount() {
				return Math.min(this.start, this.remain);
			},
			nextCount() {
				return Math.min(this.items.length - this.end, this.remain);
			},
			// 可视区域的item
			visibleData() {
				const start = this.start - this.preCount;
				const end = this.end + this.nextCount;
				return this.items.slice(start, end);
			},
			// 可视窗口的高度
			scrollHeight() {
				return uni.upx2px(this.viewportHeight) || this.remain * this.size
			},
		},
		watch: {
			items: {
				handler(nv = [], ov = []) {
					this.initPosition(nv, ov)
					if (!this.variable) {
						this.localHeight = this.items.length * this.size
					}
					if (nv.length && this.variable) {
						this.calcHeight()
						this.localHeight = positionArr[positionArr.length - 1].bottom
					}
				},
				immediate: true
			},
			refreshComplete(nv) {
				this.option.refreshComplete = nv
				if (nv) {
					setTimeout(() => {
						this.$emit('update:refreshComplete', false)
					})
				} 
			}
		},
		updated() {
			// #ifdef H5
			this.calcViewportItemsHeightH5(null, {
				callMethod: (eventName, data) => this[eventName](data)
			})
			// #endif
		},
		destroyed() {
			positionArr = []
		},
		methods: {
			async calcViewportItemsHeightH5(event, ownerInstance) {
				if (!this.variable) return
				await this.nextTickH5()
				const nodes = document.getElementsByClassName('item-wrap')
				const viewportNodes = [...nodes].map((node, index) => {
					const { height } = node.getBoundingClientRect()
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
			nextTickH5() {
				return new Promise(resolve => {
					this.$nextTick(resolve)
				})
			},
			scrollLower() {
				this.$emit('lower')
			},
			// 计算实际的高度
			calcHeight(data) {
				if (!data || !this.variable) return
				const { viewportNodes } = data
				const len = positionArr.length
				viewportNodes.forEach(({ nodeIndex, height }) => {
					const curItem = positionArr[nodeIndex]
					const { height: oldHeight} = curItem
					height = height + this.changeMarginY
					const val = oldHeight - height
					if (val) {
						// 高度有差别，修改位置信息
						curItem.bottom = curItem.bottom - val
						curItem.height = height
						
						for (let i = nodeIndex + 1; i < len; i ++) {
							positionArr[i].top = positionArr[i - 1].bottom
							positionArr[i].bottom = positionArr[i].bottom - val
						}
					}
				})
			},
			initPosition(nv, ov) {
				let newPositionArr
				if (nv.length <= ov.length) {
					newPositionArr = this.items.map((item, index) => ({
						index, // 序号
						height: this.size + this.changeMarginY, // 初始化的高度
						top: index * (this.size + this.changeMarginY), // 初始化的顶部距离
						bottom: (index + 1) * (this.size + this.changeMarginY) // 初始化的底部距离
					}))
				} else {
					let newLen = nv.length
					let oldLen = ov.length
					const tempArr = []
					let startTop = positionArr[oldLen - 1] ? positionArr[oldLen - 1].bottom : 0
					for (var i = oldLen; i < newLen; i++) {
						const bottom = startTop + this.size + this.changeMarginY
						const height = this.size + this.changeMarginY
						tempArr.push({
							index: i, // 序号
							height, // 初始化的高度
							top: startTop, // 初始化的顶部距离
							bottom // 初始化的底部距离
						})
						startTop += height
					}
					newPositionArr = [...positionArr, ...tempArr]
				}
				positionArr = newPositionArr
			},
			// 获取开始位置 二分法查找
			getStartIndex(target) {
				let start = 0
				let end = positionArr.length
				while (start < end) {
					const middleIndex = (start + end) >> 1
					const middleValue = positionArr[middleIndex].top
					if (target === middleValue) {
						return middleIndex + 1
					} else if (middleValue < target) {
						start = middleIndex + 1
					} else if (middleValue > target) {
						end = middleIndex - 1
					}
				}
				
				return start
			},
			handleScroll(ev) {
				const scrollTop = ev.detail.scrollTop;
				this.option.scrollTop = scrollTop
				if (this.variable) { // 高度不固定
					this.start = this.getStartIndex(scrollTop)
					this.end = this.start + this.remain
					let offset = positionArr[this.start - this.preCount].top
					this.offset = offset < 0 ? 0 : offset
				} else {
					// 高度固定时
					// 开始位置
					const start = Math.floor(scrollTop / this.size)
					this.start = start < 0 ? 0 : start;
					// 结束位置
					this.end = this.start + this.remain;
					// 计算偏移
					const offset = scrollTop - (scrollTop % this.size) - this.preCount * this.size
					this.offset = offset < 0 ? 0 : offset;
				}
			},
			changeText({text}) {
				this.text = text
			},
			refresh() {
				this.$emit('refresh')
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.refresh-pull-down {
		overflow: hidden;
		height: 0;
		transition: height 300ms;
	}
	
	.refresh-main {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-sizing: content-box;
	}
	
	.refresh-icon {
		height: 50rpx;
		width: 50rpx;
		flex-shrink: 0;
		border-radius: 100%;
	}
	
	.list {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
	
	.rotate-start-animation {
		animation: iconRotate 1.5s linear infinite;
	}
	
	.loading {
		text-align: center;
		font-size: 24rpx;
		color: #666;
	}
	
	.refresh-text {
		font-size: 26rpx;
		color: rgba(#000, 0.4);
		line-height: 1;
		margin-top: 20rpx;
	}
	
	@keyframes iconRotate {
		from {
			transform: rotate(0deg);
		}
	
		to {
			transform: rotate(360deg);
		}
	}
</style>
