import App from './App'
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import * as Pinia from 'pinia';
import './global/commen/home.css'
import './global/commen/function.css'
import { useUserStore } from "@/store/User.js"
import { useLoginStore } from "@/store/Login.js"
import { http } from "./utils/http.js"
// main.js，注意要在use方法之后执行
import uviewPlus, { setConfig } from '/uni_modules/uview-plus'
export const mainFun = ()=>{
	console.log("mainFun");
	const store=useUserStore();
	store.initLogin()
	const loginInfoStore = useLoginStore()
	loginInfoStore.InitLoginInfo()
	uni.$on('onMessage',async(msg)=>{
		let pages = await getCurrentPages();
		let message=JSON.parse(msg);
		
		if(pages[pages.length - 1]!=undefined&&pages[pages.length - 1].$vm.__route__ != 'pages/chat/chat'){
			console.log('!!!!!pages/chat/chat',"+++",pages[pages.length - 1].$vm.__route__)
			//不能是chat页面，否则会重复监听
			console.log("APP.vue uni.$on('onMessage')",msg)
			//存本地
			//console.log("message",message)
			store.handlemessage(message)
			
			
		}else{
			console.log('pages/chat/chat',"---",pages[pages.length - 1].$vm.__route__)
		}
	})
}
// 定义全局数据
export const appData = {
  colorList: ['#e2ce8f', '#f6b37f', '#75ab77', '#c05da0', '#c1a8d0', '#89b5e2', '#2f78bd'],
  colorN: 6
};
const app = createSSRApp(App);
app.use(Pinia.createPinia());
app.use(uviewPlus)
export function createApp() {
	return {
		app,
		Pinia, // 此处必须将 Pinia 返回
	};
}
mainFun();
// #endif
