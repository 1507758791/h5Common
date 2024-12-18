<template>
	<view class="calendar-content" >
		<view @click="close" style="height: 100%;"></view>
		<view class="calendar-body">
			<view class="calendar-header">
				当前月份：
				<view class="monthAndyear" @click="chooseMonth">{{showDate}} <image src="/static/img/icon/icon_down.png" mode=""></image></view>
			</view>
			<view class="calendar-picker">
				<view class="calendar-week">
					<view v-for="(v, i) in weekArray" :key="i" class="week">
						{{v}}
					</view>
				</view>

				<scroll-view class="calendar-scroll">
					<!-- :scroll-y="true" -->
					<block v-for="(v, i) in calendarEmptyTempArray" :key="i">

						<view class="calendar-days-content" v-if='dateIndex==i'>
							<view class="calendar-empty-day" v-for="(e) of v[0]" :key="e.id"></view>
							<view class="calendar-day-content" v-for="(d, i) of v[4]" :key="i" @click="picker([v[3], v[2], i+1])">
								<view :class="{
									'calendar-day': true,
									'calendar-disable-day': `${v[3]}/${prefixZero(v[2])}/${prefixZero(i+1)}`< today,
									'calendar-today': `${v[3]}/${prefixZero(v[2])}/${prefixZero(i+1)}` == today,
									'calendar-sel': dateListc.indexOf(`${v[3]}-${prefixZero(v[2])}-${prefixZero(i+1)}`)!=-1,
									'calnedar-picker-single':pickerArray.indexOf(`${v[3]}/${prefixZero(v[2])}/${prefixZero(i+1)}`)!=-1
								}">

									{{i+1}}									

								</view>
							</view>

						</view>
					</block>
				</scroll-view>

			</view>
		</view>
		<u-picker   @confirm="bindPickerChange" mode="selector" v-model="pickShow"  :default-selector="[0]" :range="monthArr" ></u-picker>
	</view>
</template>

<script>
	/*
	 * @description 组件可以对日期进行单选，多选，使用酒店预定、飞机票火车票预定
	 * @__author__:Sorry_hx, __email__:1317205072@qq.com
	 * @property {String} starDate 单选为选中日期，多选为选中开始日期，默认选择为今天，需要autoChoose = true, YYYY/MM/DD
	 * @property {String} endDate 单选无效，多选为选中结束日期，默认选择为明天， 需要autoChoose = true, YYYY/MM/DD
	 * @property {Boolean} multi 多选模式
	 * @property {Boolean} autoChoose 自动选择输入日期，默认为false
	 * @property {Boolean} autoClear 保存自动清除选择，默认为true
	 * @property {Number} range 日历月份数，自本月起的往后几个月的日历，默认为13个月，即明年的本月
	 * @event {Array} change 触发change时间，返回日期数组
	 */
	import Api from '@/common/api.js'
	export default {
		props: {
			startDate: {
				type: String,
				default: ''
			},
			endDate: {
				type: String,
				default: ''
			},
			multi: {
				type: Boolean,
				default: true
			},
			autoChoose: {
				type: Boolean,
				default: false
			},
			autoClear: {
				type: Boolean,
				default: true
			},
			range: {
				type: Number,
				default: 13
			}, // 默认显示至下年本月日历,
			reresh: {
				type: Boolean,
				default: false
			}
		},
		mounted() {
			
		},
		data() {
			return {
				weekArray: ['日', '一', '二', '三', '四', '五', '六'],
				monthDaysArray: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
				year: 1970,
				month: 1,
				date: 1,
				weekDay: 0,
				calendarEmptyTempArray: [], // [月份第一天索引，月份最后一天, 月份，年份,当月天数]
				pickerArray: [], // 选择日期的开始与结束
				pickerStartDate: '',
				pickerEndDate: '',
				today: '',
				rangeArray: [],
				pickerStamp: 0,
				show: false,
				showDate: '',
				dateIndex: 0,
				dateList: [],
				dateListc: [],
				monthArr:[],
				pickShow:false
			}
		},
		computed: {},
		filters: {
			isToday(val, dateIndex) {
				var that = this;
				var date = new Date().getDate();
				var str = ''
				if (date == val && dateIndex == 0) {
					str = '今日'
				}
				return str
			},
			classStyle(val, pickerArray) {
				var str = '';
			}
		},
		
		methods: {
			chooseMonth(){
				this.pickShow=true;
			},
			bindPickerChange(e){
				console.log(e,888)
				this.showDate=this.monthArr[e[0]];
				this.dateIndex=e[0];
			},
			delMonth() {
				this.dateIndex = this.dateIndex - 1;
				this.showDate = this.calendarEmptyTempArray[this.dateIndex][3] + '年' + this.calendarEmptyTempArray[this.dateIndex][
					2
				] + '月'
			},
			addMonth() {
				this.dateIndex = this.dateIndex + 1;
				this.showDate = this.calendarEmptyTempArray[this.dateIndex][3] + '年' + this.calendarEmptyTempArray[this.dateIndex][
					2
				] + '月'
			},
			getCalendar() {
				const date = new Date()
				this.year = date.getFullYear()
				this.updateFebruarydays(this.year)
				this.month = date.getMonth() + 1
				this.date = date.getDate()
				this.weekDay = date.getDay()
				this.today = this.getDate(date)
				const tomorrowDate = this.getDate(new Date(date.getTime() + 24 * 60 * 60 * 1000))
				if (this.multi && this.autoChoose) {
					if (this.startDate != '' && this.endDate != '' && this.startDate < this.endDate && this.startDate.replace(/-/g,
							'/') >= this.today) {
						this.pickerArray = [this.startDate.replace(/-/g, '/'), this.endDate.replace(/-/g, '/')]
					} else {
						this.pickerArray = [this.today, tomorrowDate]
					}
				} else if (!this.multi && this.autoChoose) {
					if (this.startDate != '' && this.startDate.replace(/-/g, '/') >= this.today) {
						this.pickerArray = [this.startDate.replace(/-/g, '/')]
					} else {
						this.pickerArray = [this.today]
					}
				}
				const firstDay = new Date(`${this.year}/${this.month}/01`).getDay() //获取本月第一天
				// 获取接下来月份的数组，用于渲染日历 [月份第一天索引，月份最后一天, 月份，年份,当月天数]
				let month // 临时月份
				let year = this.year
				for (let i = 0; i < this.range; i++) {
					if (i > 0) {
						let preDay = (this.calendarEmptyTempArray[i - 1][1] + 1) % 7
						month = month + 1
						if (month > 12) {
							year++
							month = month - 12
							this.updateFebruarydays(year)
						}
						let monthDays = this.monthDaysArray[month - 1]
						let laterDay = (preDay + monthDays) % 7 - 1
						this.calendarEmptyTempArray[i] = [preDay, laterDay, month, year, monthDays]
					} else {
						month = this.month
						let monthDays = this.monthDaysArray[month - 1]
						let laterDay = (firstDay + monthDays) % 7 - 1
						this.calendarEmptyTempArray[0] = [firstDay, laterDay, month, year, monthDays]

					}
				}
				for(var c=0;c<this.calendarEmptyTempArray.length;c++){
					var str=this.calendarEmptyTempArray[c][3]+'年'+this.calendarEmptyTempArray[c][2]+'月'
					this.monthArr.push(str)
					console.log(this.calendarEmptyTempArray[c][3]+'年'+this.calendarEmptyTempArray[c][2]+'月')
				}
				this.showDate = this.calendarEmptyTempArray[0][3] + '年' + this.calendarEmptyTempArray[0][2] + '月'
			},
			getDate(date) {
				return `${date.getFullYear()}/${this.prefixZero(date.getMonth() + 1)}/${this.prefixZero(date.getDate())}`
			},
			updateFebruarydays(year) {
				// 手动更新2月日期
				if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
					this.monthDaysArray[1] = 29
				} else {
					this.monthDaysArray[1] = 28
				}
			},
			getDayClass(date, month, year) {
				// 计算样式
				if (date < this.date && month == this.month && year == this.year) {
					return 'calendar-disable-day'
				} else if (date == this.date && month == this.month && year == this.year) {
					return 'calendar-today'
				}
				return 'calendar-day'
			},
			prefixZero(num) {
				// 补零,标准化
				if (num > 10) {
					return num
				} else {
					return (Array(2).join(0) + num).slice(-2)
				}
			},
			getTomorrowDate(todayDate, month) {
				const d = todayDate + 1
			},
			dateScope(startDateStr, endDateStr) {
				const startTime = new Date(startDateStr).getTime()
				const endTime = new Date(endDateStr).getTime()
				const oneDay = 24 * 60 * 60 * 1000
				let l = []
				let i
				for (i = startTime; i <= endTime;) {
					l.push(this.getDate(new Date(i)).replace(/\//g, '-'))
					i += oneDay
				}
				return l
			},
			picker(dateArray) {
				let [year, month, day] = dateArray
				let date = `${year}/${this.prefixZero(month)}/${this.prefixZero(day)}`
				if (date < this.today) {
					// 禁止前面日期点击
					return null
				}

				if (this.multi == true) {

					if (this.pickerStamp == 0) {
						this.pickerArray = [date]
						this.pickerStamp = 1
					} else {
						var result = this.dateFilter(date)
						if (result) {
							this.pickerArray.push(date)
						} else {
							this.dateDel(date)
							if (this.pickerArray.length == 0) {
								this.pickerStamp = 0;

							}
						}

					}
				} else {
					this.pickerArray = [date]
				}
				this.$emit('change', this.pickerArray)
			},
	
			dateFilter(date) {
				var bollen = true;
				for (var i = 0; i < this.pickerArray.length; i++) {
					if (this.pickerArray[i] == date) {
						bollen = false
					}
				}
				return bollen;

			},
			dateDel(date) {
				for (var i = 0; i < this.pickerArray.length; i++) {
					if (this.pickerArray[i] == date) {
						this.pickerArray.splice(i, 1);
						break
					}
				}
			},
			clear() {
				// 清除日期选择
				this.pickerArray = []
			},
			save(e) {
				if (this.multi == true) {
					if (this.pickerArray.length == 2) {
						this.$emit('change', this.dateScope(this.pickerArray[0], this.pickerArray[1]))
						this.show = false
						if (this.autoClear) {
							this.clear()
						}
					}
				} else {
					this.$emit('change', [this.pickerArray[0].replace(/\//g, '-')])
					this.show = false
					if (this.autoClear) {
						this.clear()
					}
				}

			},
			close() {
				this.show = false
			},
			open() {
				this.show = true
			}
		},
		created() {
			this.getCalendar()
		},
		watch: {
			reresh(newValue, oldValue) {
				if (newValue==true) {
                     this.getQsList()				 
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@mixin border-bottom {
		border-bottom-color: #d4d4d4;
		border-bottom-style: solid;
		border-bottom-width: thin;
	}

	.calendar-content {
		// position: fixed;
		// top: 0;
		width: 100%;
		// height: 100%;
		background-color: rgba($color: #000000, $alpha: 0.5);
		left: 0;
		z-index: 99;

		.calendar-body {
			min-height: 800rpx;
			width: 100%;
			background-color: #FFFFFF;

			// position: fixed;
			// bottom: 0;
			.calendar-header {
				// @include border-bottom;
				height: 120rpx;
				display: flex;
				justify-content: space-between;
				padding: 0 40rpx;
				align-items: center;
				z-index: 222;
				font-size: 36rpx;
				font-weight: 500;
				color: #636363;

				.left {
					width: 24rpx;
					height: 24rpx;
					margin-right: 30rpx;
				}

				.right {
					width: 24rpx;
					height: 24rpx;
					margin-left: 30rpx;
				}

				.clear {
					color: $uni-color-primary;
				}

				.not-clear {
					color: rgba($color: $uni-color-primary, $alpha: 0.5);
				}

				.confirm {
					color: $uni-color-primary !important;
				}

				.not-confirm {
					color: rgba($color: $uni-color-primary, $alpha: 0.5);
				}

				.title {
					font-size: 32rpx;

					.date-range {
						display: flex;
						width: 310rpx;
						justify-content: space-between;
					}
				}
			}

			.calendar-picker {
				display: flex;
				flex-direction: column;
				align-items: center;

				.calendar-week {
					display: flex;
					justify-content: flex-start;
					height: 100rpx;
					align-items: center;
					width: 700rpx;

					// @include border-bottom;
					.week {
						width: 100rpx;
						text-align: center;
						font-size: 28rpx;
						color: #2A2A2A;
						font-weight: bold;
					}

				}

				.calendar-scroll {
					width: 700rpx;
					min-height: 580rpx;

					.calendar-days-content {
						display: flex;
						justify-content: flex-start;
						flex-wrap: wrap;
						-webkit-flex-wrap: flex-start;
						-webkit-box-lines: multiple;
						/* Safari */
						// -webkit-box-orient: horizontal;
						display: -webkit-flex;
						/* Safari */

						width: 700rpx;

						// @include border-bottom;
						.calendar-empty-day {
							width: 100rpx;
							height: 100rpx;
						}

						.calendar-day-content {
							height: 110rpx;
							width: 100rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							position: relative;

							.today_now {
								position: absolute;
								color: #E88023;
								font-size: 22rpx;
								bottom: 20rpx;
								left: 28rpx;
							}

							.calendar-day {
								width: 100rpx;
								height: 100rpx;
								text-align: center;
								line-height: 60rpx;
								font-size: 30rpx;
							}

							.calendar-today {
								// @extend .calendar-day;
								// border-radius: 50%;
								border-radius: 5rpx;
								// border-style: solid;
								border-width: thin;
								// border-color: #FE8427;
								box-sizing: border-box;
								color: #FE8427;
							}

							.calendar-disable-day {
								// @extend .calendar-day;
								color: #d4d4d4;
							}

							.calendar-picker-start {
								// border-top-left-radius: 50%;
								// border-bottom-left-radius: 50%;
								// border-radius: 5rpx;
								border-top-right-radius: 0;
								border-bottom-right-radius: 0;
								background-color: #FE8427;
								border-color: #FE8427;
								color: #FFFFFF;
								// box-sizing: inherit !important;
							}

							.calendar-picker-day {
								background-color: #FE8427;
								border-color: #FE8427;
								color: #FFFFFF;
							}

							.calendar-picker-end {
								// border-top-left-radius: 0;
								// border-bottom-left-radius: 0;
								// border-top-right-radius: 50%;
								// border-bottom-right-radius: 50%;
								// border-radius: 5rpx;
								color: #FFFFFF;
								background-color: #FE8427;
								border-color: #FE8427;
							}

							.calnedar-picker-single {
								border-radius: 5rpx;
								background-color: #FE8427;
								border-color: #FE8427;
								color: #FFFFFF;
							}
						}

					}
				}
			}
		}
	}

	.monthAndyear {
        display:flex;
		align-items: center;
		font-size: 36rpx;
		font-weight: 500;
		color: #272637;
		image{
			width: 20rpx;
			height: 20rpx;
			margin-left: 20rpx;
		}
	}

	.date_list_pri {
		color: red;
		font-size: 18rpx;
		line-height: 20rpx;
		margin-top: -7rpx;
		color: #FE8427;
	}

	.calendar-sel {
		color: #FE8427;
	}

	.date_pick {
		color: white;
	}
</style>
