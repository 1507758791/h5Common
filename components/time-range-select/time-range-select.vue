<template>
	<view class="cu-modal" @touchmove.stop.prevent :class="modelName=='timeshow'?'show':''">
		<view class="cu-dialog">
			<view class="z-model-content">
				<view class="topNav">
					<view :class="tabIndex == 0? 'active-0': ''">开始时间</view>
					<view :class="tabIndex == 1? 'active-1': ''">结束时间</view>
				</view>
				<view class="selectTime">
					<view class="uni-padding-wrap">
						<view class="uni-title" v-if="tabIndex == 0">
							已选：{{timeList[0] || '请选择开始时间'}}
						</view>
						<view class="uni-title" v-if="tabIndex == 1">
							已选：{{timeList[1] || '请选择结束时间'}}
						</view>
					</view>
					<picker-view :indicator-style="indicatorStyle" :value="valueArr" @change="bindChange">
					    <picker-view-column v-if="!reset">
					        <view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
					    </picker-view-column>
					    <picker-view-column v-if="!reset">
					        <view class="item" v-for="(item,index) in months" :key="index">{{ formatNumber(item)}}月</view>
					    </picker-view-column>
					    <picker-view-column v-if="!reset">
					        <view class="item" v-for="(item,index) in days" :key="index">{{ formatNumber(item)}}日</view>
					    </picker-view-column>
						<picker-view-column v-if="!reset">
						    <view class="item" v-for="(item,index) in hours" :key="index">{{ formatNumber(item)}}时</view>
						</picker-view-column>
						<picker-view-column v-if="!reset">
						    <view class="item" v-for="(item,index) in minutes" :key="index">{{ formatNumber(item)}}分</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
			<view class="z-model-foot">
				<view class="z-model-btn" @tap="saveStart" v-if="tabIndex == 0">下一步</view>
				<view class="z-model-btn" @tap="saveShang" v-if="tabIndex == 1">上一步</view>
				<view class="z-model-btn" @tap="saveEnd" v-if="tabIndex == 1">提交</view>
				<view class="z-model-btn" @tap="hideModal">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			modelName: '',
			defaultTime: {
				type: Array,
				default: ()=>{
					return []
				}
			},
			startYear: {
				type: [String, Number],
				default: 2020
			},
			// 年份结束时间
			endYear: {
				type: [String, Number],
				default: 2023
			},
			mode: {
				type: String,
				default: 'time'
			},
		},
		data(){
			return{
				tabIndex: 0,
				years: [],
				months: [],
				days: [],
				hours: [],
				minutes: [],
				year: 0,
				month: 0,
				day: 0,
				hour: 0,
				minute: 0,
				startDate: "",
				endDate: "",
				valueArr: [],
				reset: false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true
				},
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				value: [],
				startTime: '',
				endTime: '',
				timeList: [],
				jup: true,
			}
		},
		mounted() {
			this.init();
		},
		computed: {
			propsChange() {
				// 引用这几个变量，是为了监听其变化
				return `${this.mode}-${this.defaultTime}-${this.startYear}-${this.endYear}-${this.defaultRegion}-${this.areaCode}`;
			},
			yearAndMonth() {
				return `${this.year}-${this.month}`;
			}
		},
		watch:{
			propsChange() {
				console.log(1111)
				this.reset = true;
				setTimeout(() => this.init(), 10);
			},
			yearAndMonth(val) {
				if (this.params.year) this.setDays();
			},
			tabIndex(val){
				this.init()
			},
			modelName(){
				if(this.defaultTime.length>0){
					this.timeList = this.defaultTime
				}
				this.init();
			}
		},
		methods:{
			hideModal(){
				this.tabIndex = 0
				this.timeList = []
				this.$emit('update:modelName','')
			},
			saveStart(){
				if (!this.jup) return false;
				this.jup = false;
				setTimeout(() => {
					this.jup = true;
				}, 800);
				setTimeout(() => {
					if(!this.timeList[0]){
						this.$api.msg('开始时间不能小于或等于当前时间')
					} else {
						let fdate = this.timeList[0].replace(/\-/g, '/');
						if(new Date().getTime() > new Date(fdate).getTime()){
							this.$api.msg('请选择正确的开始时间')
						} else {
							this.tabIndex = 1
						}
					}
				}, 500);
				
				
			},
			saveShang(){
				this.tabIndex = 0
			},
			saveEnd(){
				if(!this.timeList[1]){
					this.$api.msg('结束时间不能与开始时间相同')
					return
				}
				let fdate1 = this.timeList[0].replace(/\-/g, '/');
				let fdate2 = this.timeList[1].replace(/\-/g, '/');
				if(new Date(fdate1).getTime() > new Date(fdate2).getTime()){
					this.$api.msg('开始时间不能超过结束时间')
				} else {
					let list = this.timeList
					this.$emit('Input',list)
					this.hideModal()
				}
			},
			selectChange(){
				let result = {};
				if (this.params.year) result.year = this.formatNumber(this.year || 0);;
				if (this.params.month) result.month = this.formatNumber(this.month || 0);
				if (this.params.day) result.day = this.formatNumber(this.day || 0);
				if (this.params.hour) result.hour = this.formatNumber(this.hour || 0);
				if (this.params.minute) result.minute = this.formatNumber(this.minute || 0);
				console.log(result)
				let time = result.year + '-' + result.month + '-' + result.day + ' ' + result.hour + ':' + result.minute
				if(this.tabIndex == 0){
					this.timeList[0] = time
					// this.startTime = time
				} else {
					this.timeList[1] = time
					// this.endTime = time
				}
				return time
			},
			// saveEnd(){
			// 	this.tabIndex = 0
			// },
			bindChange: function (e) {
				this.valueArr = e.detail.value;
				let i = 0;
				if (this.mode == 'time') {
					if (this.params.year) this.year = this.years[this.valueArr[i++]];
					if (this.params.month) this.month = this.months[this.valueArr[i++]];
					if (this.params.day) this.day = this.days[this.valueArr[i++]];
					if (this.params.hour) this.hour = this.hours[this.valueArr[i++]];
					if (this.params.minute) this.minute = this.minutes[this.valueArr[i++]];
					this.selectChange()
				}			
			},
			formatNumber(num) {
				return +num < 10 ? '0' + num : String(num);
			},
			generateArray: function(start, end) {
				end = end > start ? end : start;
				// 生成数组，获取其中的索引，并剪出来
				return [...Array(end + 1).keys()].slice(start);
			},
			getIndex: function(arr, val) {
				let index = arr.indexOf(val);
				// 如果index为-1(即找不到index值)，~(-1)=-(-1)-1=0，导致条件不成立
				return ~index ? index : 0;
			},
			//日期时间处理
			initTimeValue() {
				// console.log(this.defaultTime)
				// 格式化时间，在IE浏览器(uni不存在此情况)，无法识别日期间的"-"间隔符号
				let fdate = ''
				if(this.defaultTime.length>0){
					fdate = this.defaultTime[this.tabIndex].replace(/\-/g, '/');
					console.log(this.defaultTime[this.tabIndex])
				} else {
					if(this.timeList[0] && !this.timeList[1]){
						fdate = this.timeList[0].replace(/\-/g, '/');
					} else if(this.timeList[0] && this.timeList[1]){
						fdate = this.timeList[this.tabIndex].replace(/\-/g, '/');
					}
				}
				fdate = fdate && fdate.indexOf("/") == -1 ? `2020/01/01 ${fdate}` : fdate
				let time = null;
				if (fdate)
					time = new Date(fdate);
				else
					time = new Date();
				// 获取年日月时分秒
				this.year = time.getFullYear()
				this.month = Number(time.getMonth()) + 1;
				this.day = time.getDate();
				this.hour = time.getHours();
				this.minute = time.getMinutes();
				// console.log(fdate)
			},
			init() {
				this.valueArr = [];
				this.reset = false;
				if (this.mode == 'time') {
					this.initTimeValue();
					if (this.params.year) {
						this.valueArr.push(0);
						this.setYears();
					}
					if (this.params.month) {
						this.valueArr.push(0);
						this.setMonths();
					}
					if (this.params.day) {
						this.valueArr.push(0);
						this.setDays();
					}
					if (this.params.hour) {
						this.valueArr.push(0);
						this.setHours();
					}
					if (this.params.minute) {
						this.valueArr.push(0);
						this.setMinutes();
					}
				}
				this.$forceUpdate();
			},
			// 设置picker的某一列值
			setYears() {
				// 获取年份集合
				this.years = this.generateArray(this.startYear, this.endYear);
				// 设置this.valueArr某一项的值，是为了让picker预选中某一个值
				this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.years, this.year));
			},
			setMonths() {
				this.months = this.generateArray(1, 12);
				this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.months, this.month));
			},
			setDays() {
				// console.log(this.year, this.month)
				let totalDays = new Date(this.year, this.month, 0).getDate();
				this.days = this.generateArray(1, totalDays);
				let index = 0;
				if (this.params.year && this.params.month) index = 2;
				else if (this.params.month) index = 1;
				else if (this.params.year) index = 1;
				else index = 0;
				this.valueArr.splice(index, 1, this.getIndex(this.days, this.day));
			},
			setHours() {
				this.hours = this.generateArray(0, 23);
				this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.hours, this.hour));
			},
			setMinutes() {
				this.minutes = this.generateArray(0, 59);
				this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.minutes, this.minute));
			},
		}
	}
</script>

<style lang="scss" scoped>
	.topNav{
		display: flex;
		view{
			flex: 1;
			text-align: center;
			height: 80rpx;
			line-height: 80rpx;
			background: #fff;
		}
		.active-0{
			background: #ff7700 !important;
			color: #fff;
			border-radius:0 0 14rpx 0;
		}
		.active-1{
			background: #ff7700 !important;
			color: #fff;
			border-radius:0 0 0 14rpx;
		}
	}
	.selectTime{
		.uni-title{
			font-size: 30rpx;
			margin-top: 20rpx;
			background: #ebebeb;
			display: inline-block;
			color: #999;
			padding: 10rpx 40rpx;
			border-radius: 10rpx;
		}
		picker-view {
		    width: 100%;
		    height: 400upx;
		    margin:20upx 0;
		}
		.item {
		    line-height: 100upx;
		    text-align: center;
		}
	}
	.cu-modal{
		z-index: 8888;
		.content{
			font-weight: bold;
		}
	}
	.cu-bar{
		border-bottom: 4rpx solid #EDEDED;
	}
	.z-model-content{
		background: #fff;
		// padding: 20rpx 50rpx;
		color: #0E1019;
	}
	.z-model-foot{
		padding: 30rpx 0;
		background: #fff;
		display: flex;
		justify-content: center;
		.z-model-btn:not(:last-child){
			margin-right: 20rpx;
		}
		.z-model-btn{
			color: #fff;
			background: #ff7700;
			font-size: 30rpx;
			border-radius: 14rpx;
			padding: 6rpx 34rpx;
		}
	}
	
</style>
