<template>
	<!--地址picker-->
	<view :status="checkStatus" v-if="lotusAddressData.visible" class="lotus-address-mask" @touchmove.stop.prevent="stopPrevent">
		<view class="lotus-address-box">
			<view class="lotus-address-action">
				<text @tap="cancelPicker" class="lotus-address-action-cancel">取消</text>
				<text @tap="chosedVal" class="lotus-address-action-affirm">确认</text>
			</view>
			<view class="lotus-address-picker-box">
				<!--省-->
				<scroll-view scroll-y :scroll-into-view="'pid'+pChoseIndex" class="lotus-address-picker-box-item">
					<view @tap="clickPicker(0,pIndex,pItem);" :id="'pid'+pIndex" :class="pIndex === pChoseIndex?'lotus-address-picker lotus-address-picker2':'lotus-address-picker'"  v-for="(pItem,pIndex) in province" :key="pIndex">{{pItem}}</view>
				</scroll-view>
				<!--市-->
				<scroll-view scroll-y :scroll-into-view="'cid'+cChoseIndex" class="lotus-address-picker-box-item">
					<view @tap="clickPicker(1,cIndex,cItem);" :id="'cid'+cIndex" :class="cIndex === cChoseIndex?'lotus-address-picker lotus-address-picker2':'lotus-address-picker'" v-for="(cItem,cIndex) in city" :key="cIndex">{{cItem}}</view>
				</scroll-view>
				<!--区-->
				<scroll-view scroll-y :scroll-into-view="'tid'+tChoseIndex" class="lotus-address-picker-box-item">
					<view @tap="clickPicker(2,tIndex,tItem);" :id="'tid'+tIndex" :class="tIndex === tChoseIndex?'lotus-address-picker lotus-address-picker2':'lotus-address-picker'" v-for="(tItem,tIndex) in town" :key="tIndex">{{tItem}}</view>
				</scroll-view>
				<!--区END-->
			</view>
		</view>
	</view>
	<!--地址picker END-->
</template>

<script>
	import {lotusAddressJson} from  "./Winglau14-lotusAddress.js";
	export default {
		props:['lotusAddressData'],
		data() {
			return {
				visible: false,
				province:[],
				city:[],
				town:[],
				provinceName:'',
				cityName:'',
				townName:'',
				type:0,//0新增1编辑
				pChoseIndex:-1,
				cChoseIndex:-1,
				tChoseIndex:-1,
			};
		},
		methods:{
			stopPrevent(){
				return
			},
			//取消
			cancelPicker(){
				const provinceCode = this.getTarId(this.provinceName);
				const cityCode = this.getTarId(this.cityName);
				const townCode = this.getTarId(this.townName);
				this.$emit("candVal",{
					provice:this.provinceName,
					provinceCode,
					city:this.cityName,
					cityCode,
					town:this.townName,
					townCode,
					isChose:0,
					visible:false
				});
			},
			//获取最后选择的省市区的值
			chosedVal() {
				this.type = 1;
				const provinceCode = this.getTarId(this.provinceName);
				const cityCode = this.getTarId(this.cityName);
				const townCode = this.getTarId(this.townName);
				this.$emit("choseVal",{
					provice:this.provinceName,
					provinceCode,
					city:this.cityName,
					cityCode,
					town:this.townName,
					townCode,
					isChose:1,
					visible:false
				});
			},
			//获取省市区value
			getTarId(name,type){
			    let id = 0;
				const _this = this;
			    lotusAddressJson.map((item,index)=>{
			        if(item.label === name){
			            id = item.value;
			        }
			    });
			    return id;
			},
			//获取市数据
			getCityArr(parentId){
			    let city = [];
				
			    lotusAddressJson.map((item,index)=>{
			        if(item.parent === parentId){
			            city.push(item.label);
			        }
			    });
			    return city;
			},
			//获取区数据
			getTownArr(parentId){
			    let town = [];
			    lotusAddressJson.map((item,index)=>{
			        if(index>34&&item.parent === parentId){
			            town.push(item.label);
			        }
			    });
			    return town;
			},
			//初始化数据
			initFn(){
				console.log(1);
			    lotusAddressJson.map((item,index)=>{
			        if(index<=34){
			            this.province.push(item.label);
			        }
			    });
				//已选择省市区，高亮显示对应选择省市区
				const p = this._props.lotusAddressData.provinceName;
				const c = this._props.lotusAddressData.cityName;
				const t = this._props.lotusAddressData.townName;
				if(p){
					this.pChoseIndex = this.getTarIndex(this.province,p);
				}
				if(p&&c){
					const pid = this.getTarId(p);
					this.city = this.getCityArr(pid);
					this.cChoseIndex = this.getTarIndex(this.city,c);
				}
				if(p&&c&&t){
					const cid= this.getTarId(c);
					this.town = this.getTownArr(cid);
					this.tChoseIndex = this.getTarIndex(this.town,t);
				}
			},
			//获取已选省市区
			getChosedData(){
				const pid = this.getTarId(this.provinceName,'provice');
				this.city = this.getCityArr(pid);
				const cid= this.getTarId(this.cityName,'city');
				this.town = this.getTownArr(cid);
				//已选省市区获取对应index
				if(this.provinceName){
					this.pChoseIndex = this.getTarIndex(this.province,this.provinceName);
				}
				if(this.cityName){
					this.cChoseIndex = this.getTarIndex(this.city,this.cityName);
				}
				if(this.townName){
					this.tChoseIndex = this.getTarIndex(this.town,this.townName);
				}
			},
			//选择省市区交互
			clickPicker(type,index,name){
				//省
				if(type === 0){
					this.pChoseIndex = index;
					this.provinceName = name;
					this.cChoseIndex = -1;
					this.tChoseIndex = -1;
					this.cityName = '';
					this.townName = '';
				}
				//市
				if(type ===1){
					this.cChoseIndex = index;
					this.cityName = name;
					this.tChoseIndex = -1;
					this.townName = '';
				}
				//区
				if(type === 2){
					this.tChoseIndex = index;
					this.townName = name;
				}
				//获取省市区数据
				this.getChosedData();
			},
			//获取已选省市区index
			getTarIndex(arr,tarName){
			    let cIndex = 0;
			    arr.map((item,index)=>{
			        if(item === tarName){
			            cIndex = index;
			        }
			    });
			    return cIndex;
			}
		},
		created() {
			this.provinceName = this._props.lotusAddressData.provinceName;
			this.cityName = this._props.lotusAddressData.cityName;
			this.townName = this._props.lotusAddressData.townName;
		},
		computed:{
			checkStatus(){
				let t = null;
				const _this = this;
				if(!_this.visible){
					_this.initFn();
					_this.visible = _this._props.lotusAddressData.visible;
					t = _this.visible;
				}
				return t;
			}
		}
	}
</script>

<style lang="less">
@import "./Winglau14-lotusAddress.css";
</style>
