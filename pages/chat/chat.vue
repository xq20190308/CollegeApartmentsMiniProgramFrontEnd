<template>
	<view style="height: 100vh; background: linear-gradient(to bottom, #577dba, #ffffff80);">
		
		<scroll-view class="scroll-view" :style="'height: '+originalHeight" :scroll-into-view="bottom" :show-scrollbar="true" :scroll-with-animation="true" :scroll-y="true">
			
			<view v-for="(msg,index) in data.messages" :key="index" :id="'msg'+index" style="padding-bottom: 16rpx;">
				<view class="chat-time-view"><text class="chat-time">{{msg.sendTime}}</text></view>
				
				<view v-if="data.myid==msg.senderUserId" :class="'chat-right'">
					<view class="chat-textbox">
						<text class="chat-textcontent">{{msg.data}}</text>
					</view>
					<view>
						<image :src="store.avatarUrl" @click="goto('/pages/chat/chatinfo?info='+JSON.stringify({userid:data.myid})+'&back='+true)" class="chat-avatar" />
					</view>
				</view>
				<view v-else :class="'chat-left'">
					<view>
						<image :src="data.info.avatarUrl" @click="goto('/pages/chat/chatinfo?info='+JSON.stringify(data.info)+'&back='+true)" class="chat-avatar" />
					</view>
					<view class="chat-textbox">
						<text class="chat-textcontent">{{msg.data}}</text>
					</view>
				</view>
				
			</view>
			<view :id="'bottom'"></view>
		</scroll-view>
		
		<view class="inputstyle" style="display: flex;left: 10rpx;width: 98%;border-radius: 5px;margin: -1rpx;padding: 5rpx;">
			<!-- <uni-easyinput :adjustPosition="false" v-model="data.message" :bntIcon="true" type="line" placeholder="" @btnClick="mywssent" @blur="handleBlur"> -->
				<!-- <template v-slot:right>
					<button class="inputBnt" type="primary" size="mini" @click="mywssent"><text>发送</text></button>
				</template> -->
			<!-- </uni-easyinput> -->
			<input :hold-keyboard="true" class="input-chat" :adjustPosition="false" :value="data.message" @input="(event)=>{console.log(event);data.message=event.detail.value}" placeholder="" @blur="handleBlur">
				<!-- <template v-slot:right>
				</template> -->
			</input>
			<button class="inputBnt" type="primary" size="mini" @touchend.stop.prevent="mywssent"><text>发送</text></button>
		</view>
	</view>
</template>

<script setup>
import { onLoad, onShow, onUnload } from "@dcloudio/uni-app";
import { reactive, ref,computed,watch,onMounted, onUnmounted,nextTick } from "vue";
import { getCurrentTime } from '@/utils/time'
import { http, load } from '@/utils/http'
import { wsclose,wsopen,wssend,socketTask } from "@/utils/socket.js";
import { getLocalData, setLocalData } from "@/utils/cache.js"
import { useUserStore } from "@/store/User.js"
import { goto } from "@/utils/access.js"
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
const handleBlur = (event)=>{
	console.log("失去焦点")
    //阻止失去焦点
    // event.preventDefault();
}
onMounted(()=>{
})
const mywssent = async (event) => {
	
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
const originalHeight=ref('95%')

// const keyboardheightchange=(e)=>{
// 	console.log("键盘高度变化",e)
// 	if (e.detail.height > 0) { // 键盘弹起
// 		console.log(e.detail.height)
// 		originalHeight.value = 'calc(95% - ' + e.detail.height + 'px)';
// 		bottom.value=data.messages.length>0?"msg"+String(data.messages.length-1):"bottom"
// 	} else { // 键盘收起
// 		originalHeight.value = '95%';
// 	}
// }
onUnload(()=>{
	uni.offKeyboardHeightChange()
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
	uni.onKeyboardHeightChange(res => {
	  console.log("uni.键盘高度变化",res.height)
	  if (res.height > 0) { // 键盘弹起
	  	console.log(res.height)
	  	originalHeight.value = 'calc(95% - ' + res.height + 'px)';
	  	bottom.value=bottom.value==="msg"+String(data.messages.length-1)?"bottom":"msg"+String(data.messages.length-1)
	  } else { // 键盘收起
	  	originalHeight.value = '95%';
	  }
	})
	
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
	.chat-avatar {
		background-color: #ad7d7d;
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		top: 18rpx;
		left: 10rpx;
	}
	.chat-textbox{
		/* height: 40rpx; */
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
		overflow-wrap: anywhere;
	}
	.input-chat{
		width: auto;
		position: relative;
		overflow: hidden;
		flex: 1;
		line-height: 1;
		font-size: 14px;
		height: 100%;
		border-radius: 5px;
		background: white;
		margin-right: 10rpx;
		margin-left: 10rpx;
	}
</style>
