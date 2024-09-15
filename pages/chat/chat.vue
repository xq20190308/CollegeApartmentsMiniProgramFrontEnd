<template>
	<view >
		
		<scroll-view class="scroll-view,uni-indexed-list__scroll" :scroll-into-view="bottom" :show-scrollbar="true" :scroll-with-animation="true" :scroll-y="true">
			
			<view v-for="(msg,index) in data.messages" :key="index" :id="'msg'+index" style="margin-bottom: 8px;">
				<view class="chat-time-view"><text class="chat-time">{{msg.sendTime}}</text></view>
				
				<view v-if="data.myid==msg.senderUserId" :class="'chat-right'">
					<view class="chat-textbox">
						<text class="chat-textcontent">{{msg.data}}</text>
					</view>
					<view>
						<image :src="store.avatarUrl" @click="gotoinfo" class="chat-avatar" />
					</view>
				</view>
				<view v-else :class="'chat-left'">
					<view>
						<image :src="data.info.avatarUrl" @click="gotoinfo" class="chat-avatar" />
					</view>
					<view class="chat-textbox">
						<text class="chat-textcontent">{{msg.data}}</text>
					</view>
				</view>
				
			</view>
			<view :id="'bottom'"></view>
		</scroll-view>
		
		<view class="inputstyle">
			<uni-easyinput v-model="data.message" type="line" placeholder=""></uni-easyinput>
			<button class="inputBnt" type="primary" size="mini" @click="mywssent"><text>发送</text></button>
		</view>
	</view>
</template>

<script setup>
import { onLoad, onShow, onUnload } from "@dcloudio/uni-app";
import { reactive, ref,computed,watch,onMounted, onUnmounted } from "vue";
import { getCurrentTime } from '@/utils/time'
import { http, load } from '@/utils/http'
import { wsclose,wsopen,wssend,socketTask } from "../../utils/socket.js";
import { getLocalData, setLocalData } from "../../utils/cache.js"
import { useUserStore } from "../../store/User.js"
const data = reactive({
	info:{},
	message:'',
	messages:[],
	currentmsg:'',
	myid:"",
})
const bottom=ref("")
onMounted(()=>{//确保进入后滑到底端
	bottom.value="bottom"
})
const gotoinfo=()=>{
	uni.navigateTo({
		url:"../chat/chatinfo?info="+JSON.stringify(data.info)+"&back="+true
	})
}

const mywssent = async () => {
	let receiver=[];
	receiver.push(data.info.userid)
	const res1 = await wssend("0",data.message===''?"发射爱心":data.message,data.info.userid)
	if(data.info.userid==data.myid){
		console.log("自己发的消息不用多存一下，只需要接收")
	}else{
		data.messages.push({
			type:"0",
			data:data.message===''?"发射爱心":data.message,
			senderUserId:data.myid,
			sendTime:getCurrentTime(),
		})
	}
	data.message='';
	bottom.value="msg"+String(data.messages.length-1)
}
const handlemsg=(msg)=>{
	let message=JSON.parse(msg);
	if(message.type=="0"&&message.senderUserId==data.info.userid){
		message.sendTime=message.sendTime.slice(0,10) +" "+ message.sendTime.slice(11,19);
		data.messages.push(message)
		bottom.value="msg"+String(data.messages.length-1)
	}else{//存本地
		store.handlemessage(message)
	}
}
onUnload(()=>{
	console.log("onUnload")
	if(data.messages.length>0){
	console.log("存储聊天记录到本地")
	setLocalData('single'+ data.myid +'_with_'+data.info.userid,JSON.stringify(data.messages))
	uni.$off('onMessage',handlemsg)
	if(store.chatList.findIndex(item => item.userid === data.info.userid)==-1){
		store.chatList.push(data.info)
		uni.$emit('upgradeChatList',store.chatList)
	}
	//最后一条存到最新消息列表
	let index = store.chatList.findIndex(item => item.userid === data.info.userid);
	store.lastList[index]={...data.messages[data.messages.length-1],contactid:data.info.userid}
	uni.$emit('upgradeLastList',store.lastList)}
	
})
const store = useUserStore();
onLoad((options)=>{
	data.myid=store.user.userid
	data.myname=store.user.trueName
	data.info=JSON.parse(options.info)
	uni.setNavigationBarTitle({
	  title: data.info.trueName
	});
	data.messages=getLocalData('single'+ data.myid +'_with_'+data.info.userid)?JSON.parse(getLocalData('single'+ data.myid +'_with_'+data.info.userid)):[]
	console.log("调出本地聊天记录",data.messages)
	uni.$on('onMessage',handlemsg)//只移除这一个回调的监听事件
})
</script>

<style>
	.chat-right{
		justify-content: flex-end;
		display: flex;
		flex-direction: row;
		margin-right: 8rpx;
		margin-left: 8rpx;
	}
	.chat-left{
		justify-content: flex-start;
		display: flex;
		flex-direction: row;
		margin-right: 8rpx;
		margin-left: 8rpx;
	}
	.uni-indexed-list__scroll {
		height: 1100rpx;
	}
	.chat-avatar {
		background-color: #ad7d7d;
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		top: 18rpx;
		left: 10rpx;
	}
	.chat-textbox{
		height: 40rpx;
		padding: 20rpx;
		background-color: #008cffdb;
		border-radius: 40rpx;
		margin: 4rpx;
	}
	.chat-textcontent{
		font-size: 28rpx;
		font-weight: 200;
		font-family: monospace;
		color: aliceblue;
	}
</style>
