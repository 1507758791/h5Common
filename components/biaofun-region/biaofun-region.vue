<template>
	<view class="region">
		<picker style="width: 100%;" mode="multiSelector" :range="range" range-key="name" @change="change" @columnchange="columnchange" :value="value" :disabled="disabled">
			<view class="content" :class="{ placeholder: !regionStr }">
				<text class="ellipsis-1" v-if="type == 0">{{ regionStr ? regionStr : placeholder }}</text>
				<text class="ellipsis-1" v-if="type == 1">{{ add }}</text>
			</view>
		</picker>
	</view>
</template>

<script>
const regionData = require('@/static/region.json');
export default {
	/**
	 * 数据
	 */
	props: {
		// 是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		type: {
			type: Number,
			default: 0
		},
		// placeholder
		placeholder: {
			type: String,
			default: '请选择省/市/区'
		},

		// 默认值
		defaultValue: {
			type: Array,
			default() {
				return null;
			}
		}
	},

	/**
	 * 数据
	 */
	data() {
		return {
			range: [[], [], []], // 省/市/区
			value: [0, 0, 0], // value 的值表示选择了 range 中的第几个（下标从 0 开始）,默认为 [0, 0, 0]，即 range 为 ['第一个省', '第一个省的第一个市', '第一个省的第一个市的第一个区']
			regionStr: '', // 选中的省市区字符串
			add: ''
		};
	},

	/**
	 * 监听数据
	 */

	watch: {
		// 默认值
		defaultValue() {
			// 设置/更新省市区数据
			this.defaultValue ? this.setDefaultValue() : this.setRange();
		}
	},

	/**
	 * 组件初次加载完成
	 */
	mounted() {
		// 设置/更新省市区数据
		this.defaultValue ? this.setDefaultValue() : this.setRange();
	},

	/**
	 * 函数
	 */
	methods: {
		/**
		 * 设置/更新省市区数据
		 */
		setRange() {
			// 省市区数据
			let range = [[], [], []];

			// 省
			regionData.forEach(el => {
				// console.log(el)
				range[0].push({
					id: el.value,
					// level: el.level,
					name: el.label,
					// pid: el.pid
				});
			});

			// 市
			regionData[this.value[0]].children.forEach(el => {
				range[1].push({
					id: el.value,
					// level: el.level,
					name: el.label,
					// pid: el.pid
				});
			});

			// 区
			regionData[this.value[0]].children[this.value[1]].children.forEach(el => {
				range[2].push({
					id: el.value,
					// level: el.level,
					name: el.label,
					// pid: el.pid
				});
			});

			// 更新省市区数据
			this.range = range;
		},

		/**
		 * 设置默认值
		 */
		setDefaultValue() {
			// 查找省
			let provinceIndex = regionData.findIndex(el => {
				return el.label == this.defaultValue[0];
			});

			if(provinceIndex < 0) provinceIndex = 0;

			// 查找市
			let cityIndex = regionData[provinceIndex].children.findIndex(el => {
				return el.label == this.defaultValue[1];
			});
			if(cityIndex < 0) cityIndex = 0;

			// 查找区
			let areaIndex = regionData[provinceIndex].children[cityIndex].children.findIndex(el => {
				return el.label == this.defaultValue[2];
			});
			if(areaIndex < 0) areaIndex = 0;

			// 更新 value 的值
			this.value = [provinceIndex, cityIndex, areaIndex];

			// 设置/更新省市区数据
			this.setRange();

			// 更新选中的省市区字符串
			this.regionStr =
				regionData[provinceIndex].label + ' ' + regionData[provinceIndex].children[cityIndex].label + ' ' + regionData[provinceIndex].children[cityIndex].children[areaIndex].label;
			this.add = regionData[provinceIndex].children[cityIndex].children[areaIndex].label
		},

		/**
		 * 某一列的值改变时触发
		 * @param {Number} event.detail.column 表示改变了第几列（下标从0开始）
		 * @param {Number} event.detail.value 表示变更值的下标
		 */
		columnchange(event) {
			console.log(111)
			// 改变的是省
			if (event.detail.column == 0) {
				this.value = [event.detail.value, 0, 0];
			}
			// 改变的是市
			if (event.detail.column == 1) {
				this.value.splice(1, 1, event.detail.value);
				this.value.splice(2, 1, 0);
			}
			// 改变的是区
			if (event.detail.column == 2) {
				this.value.splice(2, 1, event.detail.value);
			}

			// 设置/更新省市区数据
			this.setRange();
		},

		/**
		 * 确认选择
		 */
		change(event) {
			console.log(111)
			// 更新选中的省市区字符串
			this.regionStr = this.range[0][this.value[0]].name + ' ' + this.range[1][this.value[1]].name + ' ' + this.range[2][this.value[2]].name;
			this.add = this.range[2][this.value[2]].name
			// 传递事件
			this.$emit('change', [this.range[0][this.value[0]], this.range[1][this.value[1]], this.range[2][this.value[2]]]);
		}
	}
};
</script>

<style lang="scss" scoped>
.ellipsis-1 {
	display: block;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow: hidden;
	width: 100%;
}
.cu-form-group uni-picker::after{
	display: none;
}
.content {
	text-align: right;
	// position: absolute;
	// right: 0;
}

.placeholder {
	color: #ccc;
}
.region{
	padding-right: 20rpx;
	text-align: right;
	// width: calc(100vw - 350rpx);
}
</style>
