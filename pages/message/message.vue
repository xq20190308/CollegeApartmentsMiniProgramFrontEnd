<template>
	<view class="banner">
	<uni-list class="bar,barb" >
		<uni-list-chat class="bar,barb,barl" :clickable="true" @click="()=>{}" title="学校通知" avatar="https://bkimg.cdn.bcebos.com/pic/79f0f736afc379310a552fdfaf8ea04543a98326bbb9?x-bce-process=image/format,f_auto/watermark,image_d2F0ZXIvYmFpa2UyNzI,g_7,xp_5,yp_5,P_20/resize,m_lfit,limit_1,h_1080" to="../chat/noticechat" :time="store.noticeList.length>0?store.noticeList[0].sendTime:''" :badge-text="store.noticeList.length>0?store.unreceivedNoticeNum:''"  :note="store.noticeList.length>0?'您有一条消息':''"></uni-list-chat>
		<uni-list-chat class="bar,barb,barl" v-for="(item,index) in contacts" :key="index" :clickable="true" @click="clickChatItem(index)" :title="item.trueName" :avatar="item.avatarUrl" :note="lastList[index].data" :time="lastList[index].sendTime" :badge-text="item.unreceivedNum?String(item.unreceivedNum):''"></uni-list-chat>
	</uni-list>
	<!-- <button class="btn" @click="wsopen('/websocket1')">开</button>
	<button class="btn" @click="wsclose">关</button> -->
	</view>
</template>

<script setup>
import { computed } from "vue"; 
import { onShow } from "@dcloudio/uni-app";
import { http } from '@/utils/http'
import { getTimeStamp } from "../../utils/time.js";
import { handleMessageBar } from "../../utils/api/common.js"
import { useUserStore } from "../../store/User.js"
import { wsopen,wsclose } from "../../utils/socket.js";
const store=useUserStore()
const clickChatItem = (index)=>{
	contacts.value[index].unreceivedNum=0
	uni.$emit('upgradeChatList',contacts.value)
	setTimeout(()=>{
		uni.navigateTo({
			url:'../chat/chat?info='+JSON.stringify(contacts.value[index]) 
		})
	},60)
}
const contacts = computed(() => {
	if(store.chatList.length>0){return [...store.chatList].sort((a,b)=>{
		let indexa = store.lastList.findIndex(item => item.contactid === a.userid);
		let indexb = store.lastList.findIndex(item => item.contactid === b.userid);
		// console.log(indexa)
		// console.log(indexb)
		return getTimeStamp(store.lastList[indexb].sendTime)-getTimeStamp(store.lastList[indexa].sendTime)
	})}else{return []}
});
const lastList = computed(() => {
	if(store.lastList.length>0){return [...store.lastList].sort((a,b)=>{
		return getTimeStamp(b.sendTime)-getTimeStamp(a.sendTime)
	});}else{return []}
});
const refreshava = async()=>{
	console.log("刷新头像")
	for (var i = 0; i < store.chatList.length; i++) {
		let ava = await http('/user/getavatar?otherUserid='+store.chatList[i].userid,'GET',{});
		store.chatList[i].avatarUrl=ava.data;
	}
	uni.$emit('upgradeChatList',store.chatList)
	}
onShow(()=>{
	handleMessageBar(store.totalUnreceived)
	refreshava()
})
</script>

<style>
</style>