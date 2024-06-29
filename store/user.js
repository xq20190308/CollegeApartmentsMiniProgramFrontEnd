import { defineStore } from 'pinia'
import { reactive,ref,computed } from "vue";
import {wsopen,socketTask} from '../utils/socket.js'
import {http} from '../utils/http.js'
import {useDataStore} from '../store/data.js'
import { getLocalData, setLocalData, setUserInfo,getLocalAll } from "../utils/cache.js"

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
// 本地信息要修改时，需要把相应的store中的信息也修改
//要点：存
export const useUserStore = defineStore('User', ()=>{
    //测试数据
	const isRelogin = ref(false)
	const count= ref(5)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
      count.value++
    }
    //用户信息...
	const user = ref({})
	const token = ref("")
	const avatar = ref("")
	// 通讯录列表，目前不需要
	//const mailList = ref([])
	// websocket对象，暂时不用
	const chat = ref(null)
	//学校通知列表
	const noticeList = ref([])
	// 会话列表
	const chatList = ref([])
	// 最新消息列表
	const lastList = ref([])
	const unreceivedNoticeNum = computed(() => {//不能异步
		let total=0;
		for (var i = 0; i < noticeList.value.length; i++) {
			if(noticeList.value[i].isConfirm==false){
				total++
			}
		}
		//console.log("computed unreceivedNoticeNum----------------",total)
		return total;
	})
	//用计算属性试试能不能自动更新,响应式，不能自动初始化
    const totalUnreceived = computed(() => {//不能异步
		let total=0;
		for (var i = 0; i < chatList.value.length; i++) {
			total+=chatList.value[i].unreceivedNum
		}
		total+=unreceivedNoticeNum.value
		//console.log("computed totalUnreceived----------------")
		uni.$emit('upgradeUnreceivedNum',total)
		return total;
	})
	//方法
	const getChatList = ()=>{//和初始化登录一起调用
		console.log("getChatList in store")
		let localChatList = uni.getStorageSync('chatListOf'+user.value.userid)
		chatList.value=localChatList!=''?JSON.parse(localChatList):[]
		let localLastList = uni.getStorageSync('lastListOf'+user.value.userid)
		lastList.value=localLastList!=''?JSON.parse(localLastList):[]
		let localNoticeList = uni.getStorageSync('noticeListOf'+user.value.userid)
		noticeList.value=localNoticeList!=''?JSON.parse(localNoticeList):[]
		//监听会话列表变化
		uni.$on('upgradeChatList',(newlist)=>{
			console.log("监听会话列表变化")
			//存到本地
			uni.setStorageSync('chatListOf'+user.value.userid,JSON.stringify(newlist))
		})
		uni.$on('upgradeLastList',(newlist)=>{
			console.log("监听最新消息列表变化")
			//存到本地
			uni.setStorageSync('lastListOf'+user.value.userid,JSON.stringify(newlist))
		})
		uni.$on('upgradeNoticeList',(newlist)=>{
			console.log("监听通知列表变化")
			//存到本地
			uni.setStorageSync('noticeListOf'+user.value.userid,JSON.stringify(newlist))
		})
		uni.$on('upgradeUnreceivedNum',(total)=>{
			console.log("监听未收消息数变化")
			upgradeUnreceivedNum(total);
		})
		if(unreceivedNoticeNum.value){//触发计算
			console.log("触发计算未读通知数")
		}
		if(totalUnreceived.value){//触发计算
			console.log("触发计算未读消息总数")
		}
	}
	const handlenotice = (message,option) => {
		console.log("handlenotice in store");
		noticeList.value.push({
			...message,
			isConfirm:false,
			}
		);
		if(!option){
			uni.showModal({
				title: '通知',
				content: '你有一条新的通知',
				success: (res) => {
					if (res.confirm) { 
						uni.navigateTo({
							url: "/pages/chat/noticechat"
						})
					} else if (res.cancel) { 
					}
				}
			});
		}
		uni.$emit('upgradeNoticeList',noticeList.value)
		console.log("触发计算未读消息总数",totalUnreceived.value)
	}
	const handlemessage = async(message,option)=>{
		console.log("handlemessage in store",message)
		message.sendTime=message.sendTime.slice(0,10) +" "+ message.sendTime.slice(11,19);
		if(message.type>0){
			console.log("处理通告");
			handlenotice(message,option)
		}else{
			if(chatList.value.findIndex(item => item.userid == message.senderUserId)==-1){
				console.log("会话列表中没有该用户")
				//需要向后端请求用户信息
				const res = await http('/user/findByUserid?userid='+message.senderUserId,'GET',{},)
				//console.log("发来消息的人的信息",res);
				const ava = await http('/user/getavatar?otherUserid='+message.senderUserId,'GET',{});
				
				let info={
					name:res.data.name,
					userid:message.senderUserId,
					avatar:ava.data?ava.data:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg",
					unreceivedNum:0
				}
				chatList.value.push(info)
				lastList.value.push({...message,contactid:message.senderUserId})
			}
			let prelog=uni.getStorageSync('single'+ user.value.userid +'_with_'+message.senderUserId)
			prelog=prelog!=""?JSON.parse(prelog):[]
			prelog.push(message)
			//console.log(prelog)
			uni.setStorageSync('single'+ user.value.userid +'_with_'+message.senderUserId,JSON.stringify(prelog))
			//需要更新store.chatList中的未读消息数
			let index = chatList.value.findIndex(item => item.userid === message.senderUserId);
			//console.log("++store.chatList[index].unreceivedNum",chatList.value[index].unreceivedNum)
			chatList.value[index].unreceivedNum++;
			lastList.value[index]={...message,contactid:message.senderUserId}
			uni.$emit('upgradeChatList',chatList.value)
			uni.$emit('upgradeLastList',lastList.value)
			//console.log("uni.$emit('upgradeChatList',store.chatList) in APP.vue")
			//console.log("--store.chatList[index].unreceivedNum",chatList.value[index].unreceivedNum)
			//console.log('index_of_sender in chatList',index)
			//触发计算未读消息总数
			console.log("触发计算未读消息总数",totalUnreceived.value)
		}
	}
	const login = async(info)=>{//用户登录，登录后不会执行initLogin
		//console.log("storedata.classes",storedata.classes)
		//所以要和login函数统一
		console.log("login in User.js")
		//本地用户信息存到store中
		token.value=info.token
		user.value=info
		console.log("save token in store",token.value)
		console.log("save user in store",user.value)
		uni.setStorageSync('token', info.token)
		uni.setStorageSync('userInfo', JSON.stringify(info))
		//console.log("save token in Storage",uni.getStorageSync('token'))
		//console.log("save user in Storage",uni.getStorageSync('userInfo'))
		//获取头像
		const ava = await http('/user/getavatar','GET',{});
		avatar.value=ava.data
		uni.setStorageSync('avatarUrl',avatar.value);
		//console.log("save avatar in Storage",uni.getStorageSync('avatarUrl'))
		console.log("save avatar in store",avatar.value)
		//console.log("getLocalAll");
		//getLocalAll()
		//建立socket连接
		await wsopen('/websocket1')
		//console.log("socketTask",socketTask)
		//chat.value=socketTask;
		//console.log("save socket in store chat",chat.value);
		await getChatList();
		let storedata = useDataStore()
		storedata.getclasses()
		
	}
	const upgradeUnreceivedNum=(total)=>{
		console.log("设置TabBarBadge：",total)
		setTimeout(async() => {
			let pages = await getCurrentPages();
			//console.log("pages",pages)
			if(pages[pages.length - 1]!=undefined&&(
			pages[pages.length - 1].$vm.__route__ == 'pages/home/home'||
			pages[pages.length - 1].$vm.__route__ == 'pages/function/function'||
			pages[pages.length - 1].$vm.__route__ == 'pages/message/message'||
			pages[pages.length - 1].$vm.__route__ == 'pages/myself/myself')){
				//console.log("store.totalUnreceived",total)
				if(total){
					uni.setTabBarBadge({
						index: 2,
						// tabIndex，tabbar的哪一项，从0开始
						text: String(total).length > 2 ? "99+" : String(total)
						// 显示的文本，超过99显示成99+
					});					
				}else{
					uni.removeTabBarBadge({
						index:2
					})
				}
			}
		}, 60)
	}
	const initLogin = async ()=>{
		//console.log("storedata.classes",storedata.classes)
		console.log("initLogin in store")
		//本地用户信息存到store中	
		token.value=uni.getStorageSync('token')
		//console.log("get token in Storage",token.value)
		if(token.value!=""){
			console.log("用户在线")
			//用户信息
			user.value=JSON.parse(uni.getStorageSync('userInfo'))
			console.log("get userInfo in Storage",user.value)
			avatar.value=uni.getStorageSync('avatarUrl')
			console.log("get avatar in Storage",avatar.value)
			//建立socket连接
			wsopen('/websocket1');
			await getChatList()
			let storedata = useDataStore()
			storedata.getclasses()
		}else{
			console.log("用户不在线")
		}
	}
	//第一行测试数据
	//第二行用户数据
	//第三行方法
    return { count, doubleCount, increment,
		//用户信息对象，token(用的比较多单独取出来)，头像，socket对象，会话列表
		user, token, avatar, chat,chatList,totalUnreceived,lastList ,isRelogin,noticeList,unreceivedNoticeNum,
		//用户登录，程序启动时的登录初始化
		login,initLogin,handlemessage }
})