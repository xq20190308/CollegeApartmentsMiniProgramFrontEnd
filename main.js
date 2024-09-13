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
  colorList: ['#e24b00', '#cece66', '#0078f8', '#009d00', '#ff5500', '#568181'],
  colorN: 6
};
const app = createSSRApp(App);
app.use(Pinia.createPinia());
export function createApp() {
	return {
		app,
		Pinia, // 此处必须将 Pinia 返回
	};
}
mainFun();
// #endif
