import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({  
    state: {  
        hasLogin: false,  
        token: '',  
        avatarUrl: '',  
		phoneNum: '',
        userName: '',
		storeName:'',
		storeLogo:'',
		userInfo: '',
		statusBar: 40,
		isReceive:false
    },  
    mutations: {  
        login(state, provider) {  
            console.log(state)  
            console.log(provider)
			if(provider.userInfo){
				state.storeLogo=provider.belongto;
				state.storeName=provider.storeName;
				state.userInfo = provider.userInfo; 
				state.token = provider.token;
				state.phoneNum = provider.userInfo.phone||'暂无电话';
				uni.setStorage({
					key: 'userInfo',
					data: provider.userInfo
				})
			} else {
				state.userInfo = provider;
				state.phoneNum = provider.phone;
				state.token = uni.getStorageSync('token').slice(7);
				uni.setStorage({
					key: 'userInfo',
					data: provider
				})
			}
            state.hasLogin = true;
			console.log(state)
        },  
        logout(state) {  
            state.hasLogin = false;  
            state.token = '';  
            state.userName = '';  
            state.avatarUrl = '';  
			state.userInfo = '';
        },
		setStatusBar(state, height){
			state.statusBar = height
		},
		setReceiveStatus(state,staue){
			console.log(state.isReceive,staue)
			state.isReceive=staue
		}
    }  
})
export default store