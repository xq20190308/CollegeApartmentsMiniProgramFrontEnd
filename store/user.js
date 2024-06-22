import { defineStore } from 'pinia'
import { reactive,ref,computed } from "vue";
import {wsopen} from '../utils/socket.js'
import {http} from '../utils/http.js'
import { getLocalData, setLocalData, setUserInfo,getLocalAll } from "../utils/cache.js"

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserStore = defineStore('User', ()=>{
    const count = ref(202211070501)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
      count.value++
    }
    // 其他配置...
	const user = ref({})
	const token = ref(false)
	const avatar = ref("")
	// 通讯录列表
	const mailList = ref([])
	// websocket
	const chat = ref(null)
	// 会话列表
	const chatList = ref([])
	
	const nref="123"
	
	const login = async(info)=>{
		console.log("store中的登录函数")
		//本地用户信息存到store中
		token.value=info.token
		user.value=info
		console.log("初登陆后存token信息到store",token.value)
		console.log("初登陆后存user信息到store",user.value)
		uni.setStorageSync('token', info.token)
		uni.setStorageSync('userInfo', JSON.stringify(info))
		//获取头像
		const ava = await http('/user/getavatar','GET',{});
		console.log("初登陆后存avatar信息到store",avatar.value)
		uni.setStorageSync('avatarUrl',ava.data);
		console.log("get所有的本地信息");
		getLocalAll();
		//建立socket连接
		wsopen('/websocket1');
		//本地获取会话列表
		chatList.value = [
			{name:"张晨冉1",userid:"202211070625",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg"},
			{name:"曹晓玉2",userid:"202211070501",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg"},
			{name:"朱喜珍3",userid:"202311071133",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg"},
			{name:"王义仓4",userid:"202211070621",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg"},
			{name:"王克帅5",userid:"202211070617",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg"},
			{name:"徐敏清6",userid:"202311071222",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg"},
			
		]
	}
	
	const initLogin = ()=>{
		console.log("store中的初始化登录函数")
		//本地用户信息存到store中
		token.value=uni.getStorageSync('token')
		console.log(token.value)
		if(token.value!=""){
			console.log("初始化登陆时拿到token",token.value)
			console.log("用户在线")
			//用户信息
			user.value=JSON.parse(uni.getStorageSync('userInfo'))
			console.log("从本地拿到用户信息",user.value)
			avatar.value=uni.getStorageSync('avatar')
			console.log("从本地拿到用户信息",user.value)
			//建立socket连接
			wsopen('/websocket1');
			//本地获取会话列表
			chatList.value = [
				{name:"张晨冉1",userid:"202211070625",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg"},
				{name:"曹晓玉2",userid:"202211070501",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg"},
				{name:"朱喜珍3",userid:"202311071133",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg"},
				{name:"王义仓4",userid:"202211070621",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg"},
				{name:"王克帅5",userid:"202211070617",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg"},
				{name:"徐敏清6",userid:"202311071222",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg"},
				
			]
		}else{
			console.log("用户不在线")
		}
	}
	
    return { count, doubleCount, increment,user,token,
		mailList,chat,chatList,initLogin,login }
})