<script>
	import { useUserStore } from "./store/User.js"
	import { http } from "./utils/http.js"
	export default {
		onLaunch: async function() {
			console.log('App Launch')
			const store=useUserStore();
			await store.initLogin()
			uni.$on('onMessage',async(msg)=>{
				let pages = await getCurrentPages();
				let message=JSON.parse(msg);
				if(pages[pages.length - 1]!=undefined&&pages[pages.length - 1].$vm.__route__ != 'pages/chat/chat'){
					console.log('!!!!!pages/chat/chat',"+++",pages[pages.length - 1].$vm.__route__)
					//不能是chat页面，否则会重复监听
					console.log("APP.vue uni.$on('onMessage')",msg)
					//存本地
					message.sendTime=message.sendTime.slice(0,10) +" "+ message.sendTime.slice(11,19);
					
					if(store.chatList.findIndex(item => item.userid === message.senderUserId)==-1){
						//需要向后端请求用户信息
						const res = await http('/user/findByUserid?userid='+message.senderUserId,'GET',{},)
						console.log("发来消息的人的信息",res);
						
						let info={
							name:res.data.name,
							userid:message.senderUserId,
							avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg",
							unreceivedNum:0
						}
						store.chatList.push(info)
						uni.$emit('upgradeChatList',store.chatList)
						console.log("uni.$emit('upgradeChatList',store.chatList) in APP.vue")
					}
					let prelog=uni.getStorageSync('single'+ store.user.userid +'_with_'+message.senderUserId)
					prelog=prelog!=""?JSON.parse(prelog):[]
					prelog.push(message)
					console.log(prelog)
					uni.setStorageSync('single'+ store.user.userid +'_with_'+message.senderUserId,JSON.stringify(prelog))
					//需要更新store.chatList中的未读消息数
					let index = store.chatList.findIndex(item => item.userid === message.senderUserId);
					console.log("++store.chatList[index].unreceivedNum",store.chatList[index].unreceivedNum)
					store.chatList[index].unreceivedNum++;
					console.log("--store.chatList[index].unreceivedNum",store.chatList[index].unreceivedNum)
					console.log('index_of_sender in chatList',index)
					//用于触发
					console.log("store.totalUnreceived",store.totalUnreceived)
					
					
				}else{
					console.log('pages/chat/caht',"---",pages[pages.length - 1].$vm.__route__)
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
