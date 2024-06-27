<template>
	<uni-list>
		<uni-list :border="true">
			<!-- 右侧带角标 -->
			<uni-list-chat :clickable="true" @click="()=>{}" title="学校通知" avatar="https://bkimg.cdn.bcebos.com/pic/79f0f736afc379310a552fdfaf8ea04543a98326bbb9?x-bce-process=image/format,f_auto/watermark,image_d2F0ZXIvYmFpa2UyNzI,g_7,xp_5,yp_5,P_20/resize,m_lfit,limit_1,h_1080" note="" to="../chat/noticechat" time="2020-02-02 20:20" :badge-text="store.unreceivedNoticeNum"></uni-list-chat>
			<uni-list-chat :clickable="true" v-for="(item,index) in contacts" :key="index" @click="clickChatItem(index)" :title="item.name" :avatar="item.avatar" :note="lastList[index].data" :time="lastList[index].sendTime" :badge-text="item.unreceivedNum?String(item.unreceivedNum):''"></uni-list-chat>
			<!-- 显示多头像 -->
			<!--uni-list-chat title="uni-app" :avatar-list="data.avatarList" note="您收到一条新的消息" time="2020-02-02 20:20" badge-text="12"></uni-list-chat-->
		</uni-list>
	</uni-list>
	<button style="color:#ffffff;backgroundColor:#008fff;" type="primary" size="mini" @click="wssend('1','群发的消息','1')">群发消息测试</button>
</template>

<script setup>
import '@/utils/http'
import {computed, reactive, ref, watch,onMounted} from "vue"; 
import {onLoad,onReady,onShow,onUnload} from "@dcloudio/uni-app";
import { http, load } from '@/utils/http'
import { wsclose,wsopen,wssend,socketTask } from "../../utils/socket.js";
import { getTimeStamp } from "../../utils/time.js";
import { useUserStore } from "../../store/User.js"
import { storeToRefs } from 'pinia'
const store=useUserStore()
const data = reactive({
	unreceivedNum:0,
	message:'',
	lastList:[],
	noticeList:[],
	currentmsg:'',
	avatarList: []
})
//添加一个watch更新最新一条消息和未读消息数(charList)
const clickChatItem = (index)=>{
	console.log("--");
	store.chatList[index].unreceivedNum=0
	uni.$emit('upgradeChatList',store.chatList)
	
	console.log("store.totalUnreceived",store.totalUnreceived)
	
	setTimeout(()=>{
		uni.navigateTo({
			url:'../chat/chat?info='+JSON.stringify(contacts.value[index]) 
		})
	},60)
}
const contacts = computed(() => {
	console.log("contacts = computed(()------------",store.lastList)
	return [...store.chatList].sort((a,b)=>{
		let indexa = store.lastList.findIndex(item => item.senderUserId === a.userid);
		let indexb = store.lastList.findIndex(item => item.senderUserId === b.userid);
		return getTimeStamp(store.lastList[indexb].sendTime)-getTimeStamp(store.lastList[indexa].sendTime)
	});
});
const lastList = computed(() => {
	console.log("lastList = computed(()------------",store.lastList)
	return [...store.lastList].sort((a,b)=>{
		return getTimeStamp(b.sendTime)-getTimeStamp(a.sendTime)
	});
});
onMounted(()=>{
	let total=store.totalUnreceived
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
	console.log("onShow")
	console.log("contacts",contacts.value)
	console.log("lastList",lastList.value)
	data.noticeList=store.noticeList
	console.log("store.noticeList",data.noticeList)
})
onLoad(()=>{
	//手动触发计算
	console.log("contacts",contacts.value)
	console.log("messageonLoad")
	for (var i = 0; i < 3; i++) {
		data.avatarList.push({
			url: 'https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg'
		})
	}
})
onUnload(()=>{
	console.log("onUnLoad")
})
</script>

<style>
	.inputstyle{
		position: fixed;
		width: 100%;
		bottom: 0px;
		background-color: #008fff;
		display: flex;
		flex-direction: row;
		padding-top: 2px;
		padding-bottom: 4px;
		padding-left: 5px;
	}
	.chat-custom-right {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}
	
	.chat-custom-text {
		font-size: 12px;
		color: #999;
	}

</style>

<!-- 
// socketTask.onMessage(async (res) => {
// 	console.log(res);
// 	data.messages.push(res.data)
// 	// data.messages.push({
// 	// 	data:"静态消息",
// 	// 	senderUserId:"202211070625",
// 	// 	sendTime:"2024-06-20 17:03",
// 	// })
// 	console.log("data.messages",data.messages)
// });

	// socketMsgQueue.length=0;
	// uni.removeTabBarBadge({
	// 	index:2,
	// 	complete:(res)=> {
	// 		console.log(res)
	// 	}
	// })

// setInterval(() => {
// 	data.messages=ref(socketMsgQueue.content); // 这会实时打印出变化的值
// 	if(old==data.messages){
// 		console.log('没变')
// 	}else{
// 		console.log(old)
// 		console.log(data.messages)
// 		uni.pageScrollTo({
// 			selector: '#input',
// 			duration: 50
// 		});
// 	}
// }, 100);
//setInterval(() => {
	//let old=data.messages;
	//data.messages=ref(socketMsgQueue.content); // 这会实时打印出变化的值
	//let array=data.messages.split("<br/>")
	//data.messages=array[array.length-2]
	// if(socketMsgQueue.length>0){
	// 	uni.setTabBarBadge({
	// 		index: 2,
	// 		// tabIndex，tabbar的哪一项，从0开始
	// 		text: String(socketMsgQueue.length).length > 3 ? "99+" : String(socketMsgQueue.length)
	// 		// 显示的文本，超过99显示成99+
	// 	});
	// }
//}, 100);-->




<!-- <template>
	<view style="display: flex;flex-direction: column;justify-content: space-between;">
		<view style="text-align: center;margin-bottom: 60px;" id="content"><rich-text :nodes="data.messages"></rich-text></view>
		
		<view class="inputstyle">
			<uni-easyinput v-model="data.message" type="line" placeholder=""></uni-easyinput>
			<button style="color:#ffffff;backgroundColor:#008fff;" type="primary" size="mini" @click="mywssent">发射爱心</button>
		</view>
		
		<view id="input"></view>
	</view>
</template>

<script setup>
import { onLoad, onShow } from "@dcloudio/uni-app";
import { reactive, ref,computed } from "vue";
import { http, load } from '@/utils/http'
import { wsclose,wsopen,wssend,socketMsgQueue } from "../../utils/socket.js";
const position = 'bottom'
const data = reactive({
	message:'',
	messages:'',
	currentmsg:'',
})
const mywssent = async () => {
	console.log('data.message',data.message)
	await wssend("202211070625",data.message===''?"发射爱心":data.message)
	data.message='';
	// uni.pageScrollTo({
	// 	selector: '#input',
	// 	duration: 50
	// });
	if(true){
		uni.pageScrollTo({
			selector: '#input',
			duration: 400
		});
	}
}
onShow(()=>{
	socketMsgQueue.length=0;
	uni.removeTabBarBadge({
		index:2,
		complete:(res)=> {
			console.log(res)
		}
	})
})
// setInterval(() => {
// 	data.messages=ref(socketMsgQueue.content); // 这会实时打印出变化的值
// 	if(old==data.messages){
// 		console.log('没变')
// 	}else{
// 		console.log(old)
// 		console.log(data.messages)
// 		uni.pageScrollTo({
// 			selector: '#input',
// 			duration: 50
// 		});
// 	}
// }, 100);
setInterval(() => {
	let old=data.messages;
	data.messages=ref(socketMsgQueue.content); // 这会实时打印出变化的值
	//let array=data.messages.split("<br/>")
	//data.messages=array[array.length-2]
	// if(socketMsgQueue.length>0){
	// 	uni.setTabBarBadge({
	// 		index: 2,
	// 		// tabIndex，tabbar的哪一项，从0开始
	// 		text: String(socketMsgQueue.length).length > 3 ? "99+" : String(socketMsgQueue.length)
	// 		// 显示的文本，超过99显示成99+
	// 	});
	// }
}, 100);
</script>

<style>
	.inputstyle{
		position: fixed;
		width: 100%;
		bottom: 0;
		background-color: #008fff;
		display: flex;
		flex-direction: row;
		padding-top: 2px;
		padding-bottom: 2px;
		padding-left: 5px;
	}
</style> -->