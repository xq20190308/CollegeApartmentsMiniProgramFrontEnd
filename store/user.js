import { defineStore } from 'pinia'
import { reactive,ref,computed } from "vue";
import {wsopen,socketTask} from '../utils/socket.js'
import {http} from '../utils/http.js'
import { getLocalData, setLocalData, setUserInfo,getLocalAll } from "../utils/cache.js"

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
// 本地信息要修改时，需要把相应的store中的信息也修改
//要点：存
export const useUserStore = defineStore('User', ()=>{
    //测试数据
	const count = ref(202211070501)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
      count.value++
    }
    //用户信息...
	const user = ref({})
	const token = ref(false)
	const avatar = ref("")
	// 通讯录列表，目前不需要
	//const mailList = ref([])
	// websocket对象
	const chat = ref(null)
	// 会话列表
	const chatList = ref([])
	//方法
	const getChatList = ()=>{//和初始化登录一起调用
		// chatList.value = [
		// 	{name:"晨冉",userid:"202211070625",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg",unreceivedNum:""},
		// 	{name:"晓玉",userid:"202211070501",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg",unreceivedNum:""},
		// 	{name:"喜珍",userid:"202311071133",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg",unreceivedNum:""},
		// 	{name:"义仓",userid:"202211070621",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg",unreceivedNum:""},
		// 	{name:"克帅",userid:"202211070617",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg",unreceivedNum:""},
		// 	{name:"敏清",userid:"202311071222",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg",unreceivedNum:""},
			
		// ]
		console.log("getChatList in store")
		let localChatList = uni.getStorageSync('chatList')
		chatList.value=localChatList!=''?JSON.parse(localChatList):[]
		//监听会话列表变化
		uni.$on('upgradeChatList',(newlist)=>{
			console.log("uni.$on('upgradeChatList',(newlist)")
			//存到本地
			uni.setStorageSync('chatList',JSON.stringify(newlist))
		})
	}
	const login = async(info)=>{//用户登录，登录后不会执行initLogin
		//所以要和login函数统一
		console.log("login in User.js")
		//本地用户信息存到store中
		token.value=info.token
		user.value=info
		console.log("save token in store",token.value)
		console.log("save user in store",user.value)
		uni.setStorageSync('token', info.token)
		uni.setStorageSync('userInfo', JSON.stringify(info))
		console.log("save token in Storage",uni.getStorageSync('token'))
		console.log("save user in Storage",uni.getStorageSync('userInfo'))
		//获取头像
		const ava = await http('/user/getavatar','GET',{});
		uni.setStorageSync('avatarUrl',ava.data);
		console.log("save avatar in Storage",uni.getStorageSync('avatarUrl'))
		avatar.value=ava.data
		console.log("save avatar in store",avatar.value)
		console.log("getLocalAll");
		getLocalAll()
		//建立socket连接
		await wsopen('/websocket1')
		console.log("socketTask",socketTask)
		chat.value=socketTask;
		console.log("save socket in store chat",chat.value);
		getChatList();
	}
	
	const initLogin = ()=>{
		console.log("initLogin in store")
		//本地用户信息存到store中	
		token.value=uni.getStorageSync('token')
		console.log("get token in Storage",token.value)
		if(token.value!=""){
			console.log("用户在线")
			//用户信息
			user.value=JSON.parse(uni.getStorageSync('userInfo'))
			console.log("get userInfo in Storage",user.value)
			avatar.value=uni.getStorageSync('avatarUrl')
			console.log("get avatar in Storage",avatar.value)
			//建立socket连接
			wsopen('/websocket1');
			getChatList()
		}else{
			console.log("用户不在线")
		}
	}
	//第一行测试数据
	//第二行用户数据
	//第三行方法
    return { count, doubleCount, increment,
		//用户信息对象，token(用的比较多单独取出来)，头像，socket对象，会话列表
		user, token, avatar, chat,chatList,
		//用户登录，程序启动时的登录初始化
		login,initLogin, }
})