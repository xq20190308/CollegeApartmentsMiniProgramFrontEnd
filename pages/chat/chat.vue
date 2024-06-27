<template>
	<view style="display: flex;flex-direction: column;justify-content: space-between;">
		
		<scroll-view :scroll-into-view="bottom" class="uni-indexed-list__scroll" :show-scrollbar="true" :scroll-with-animation="true" :scroll-y="true">
			
			<view v-for="(msg,index) in data.messages" :key="index" :id="'msg'+index" style="margin-bottom: 8px;">
				<view style="margin-right: 4px;margin-left: 4px;text-align: center;"><text class="time">{{msg.sendTime}}</text></view>
				
				<view v-if="data.info.userid==msg.senderUserId" :class="'left'">
					<view>
						<image :src="'https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg'" class="avatar" />
					</view>
					<view class="textbox">
						<text class="textcontent">{{data.info.name}}{{msg.data}}</text>
					</view>
				</view>
				<view v-else :class="'right'">
					<view class="textbox">
						<text class="textcontent">{{data.myname}}{{msg.data}}</text>
					</view>
					<view>
						<image :src="'https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg'" class="avatar" />
					</view>
				</view>
				
			</view>
			<view :id="'bottom'" style=""></view>
		</scroll-view>
		
		<view class="inputstyle">
			<uni-easyinput v-model="data.message" type="line" placeholder=""></uni-easyinput>
			<button style="color:#ffffff;backgroundColor:#008fff;" type="primary" size="mini" @click="mywssent">发射爱心</button>
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
import { storeToRefs } from 'pinia'
const position = 'bottom'
const data = reactive({
	info:{},
	message:'',
	messages:[],
	currentmsg:'',
	myid:"",
})
const bottom=ref("")
onMounted(()=>{
	console.log("onMounted");
	bottom.value="bottom"
})
// watch(socketMsgQueue,async(newvalue,oldvalue)=>{
// 	console.log("监听事件newvalue:",newvalue);
// 	let message=JSON.parse(newvalue.content);
// 	console.log(message);
// 	if(message.senderUserId==data.info.userid){
// 		console.log(message.senderUserId+"=="+data.info.userid)
// 		message.sendTime=message.sendTime.slice(0,10) +" "+ message.sendTime.slice(11,19);
// 		data.messages.push(message)
// 	}
// }, { deep: true })

const mywssent = async () => {
	//对话添加到列表中
	console.log('mywssent ',data.message)
	let receiver=[];
	receiver.push(data.info.userid)
	//console.log("receiver",receiver)
	const res1 = await wssend("0",data.message===''?"发射爱心":data.message,data.info.userid)
	//console.log("发送消息的res",res1);
	data.messages.push({
		type:"0",
		data:data.message===''?"发射爱心":data.message,
		senderUserId:data.myid,
		sendTime:getCurrentTime(),
	})
	data.message='';
	console.log("data.messages.length",data.messages.length)
	bottom.value="msg"+String(data.messages.length-1)
	console.log("bottom.value",bottom.value)
}
const handlemsg=(msg)=>{
	//对话添加到列表中
	console.log("uni.$on('onMessage')",msg)
	let message=JSON.parse(msg);
	if(message.senderUserId==data.info.userid){
		console.log(message.senderUserId+"=="+data.info.userid)
		message.sendTime=message.sendTime.slice(0,10) +" "+ message.sendTime.slice(11,19);
		data.messages.push(message)
		console.log("data.messages.length",data.messages.length)
		bottom.value="msg"+String(data.messages.length-1)
		console.log("bottom.value",bottom.value)
	}else{//存本地
		console.log(message.senderUserId+"!="+data.info.userid)
		message.sendTime=message.sendTime.slice(0,10) +" "+ message.sendTime.slice(11,19);
		let prelog=getLocalData('single'+ data.myid +'_with_'+message.senderUserId)
		if(prelog!=""){
			prelog=JSON.parse(prelog)
		}else{
			prelog=[]
		}
		prelog.push(message)
		console.log('--2single'+ data.myid +'_with_'+message.senderUserId)
		console.log(prelog)
		setLocalData('single'+ data.myid +'_with_'+message.senderUserId,JSON.stringify(prelog))
		console.log("没存上吗？",uni.getStorageSync('single'+ data.myid +'_with_'+message.senderUserId))
	}
}
onUnload(()=>{
	console.log("onUnload")
	console.log("存储聊天记录到本地")
	setLocalData('single'+ data.myid +'_with_'+data.info.userid,JSON.stringify(data.messages))
	uni.$off('onMessage',handlemsg)
	console.log("after uni.$off('onMessage',handlemsg)")
	//最后一条存到最新消息列表
	let index = store.chatList.findIndex(item => item.userid === data.info.userid);
	store.lastList[index]=data.messages[data.messages.length-1]
	uni.$emit('upgradeLastList',store.lastList)
	
})
const store = useUserStore();
onLoad((options)=>{
	console.log("chatonLoad")
	console.log("useUserStore",store.user.trueName)
	data.myid=store.user.userid
	data.myname=store.user.trueName
	console.log(data.myid)
	console.log("options",options)
	data.info=JSON.parse(options.info)
	uni.setNavigationBarTitle({
	  title: data.info.name
	});
	console.log('--1single'+ data.myid +'_with_'+data.info.userid)
	data.messages=getLocalData('single'+ data.myid +'_with_'+data.info.userid)?JSON.parse(getLocalData('single'+ data.myid +'_with_'+data.info.userid)):[]
	console.log("调出本地聊天记录",data.messages)
	uni.$on('onMessage',handlemsg)//只移除这一个回调的监听事件
})
onShow(()=>{
	console.log("onShow")
})
	
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
//}, 100);
</script>

<style>
	.time{
		font-size: small;
		color: #c1c1c1;
	}
	.right{
		justify-content: flex-end;
		display: flex;
		flex-direction: row;
		margin-right: 4px;
		margin-left: 4px;
	}
	.left{
		justify-content: flex-start;
		display: flex;
		flex-direction: row;
		margin-right: 4px;
		margin-left: 4px;
	}
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
	.uni-indexed-list__scroll {
		height: 540px;
	}
	.avatar {
		background-color: #ad7d7d;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		top: 9px;
		left: 5px;
	}
	.textbox{
		height: 20px;
		padding: 10px;
		background-color: #008cffdb;
		border-radius: 20px;
		margin: 2px;
	}
	.textcontent{
		font-size: 14px;
		font-weight: 200;
		font-family: monospace;
		color: aliceblue;
	}
</style>



<!-- <template>
	<button @click="get">获取头像</button>
	<button @click="compress">压缩</button>
	<button @click="mywssent">发射爱心</button>
	<image :src="data.url"></image>
	<uni-file-picker limit="1" @select="selectUpload" file-mediatype="image" disable-preview>
		<image :src="data.url" class="avatar" />
	</uni-file-picker>
</template>

<script setup>
import { onLoad, onShow } from "@dcloudio/uni-app";
import { reactive, ref, watch } from "vue";
import { http, load } from '@/utils/http'
import { wsclose,wsopen,wssend } from "../../utils/socket.js";
const data = reactive({
	url: '',
	file: null,
})
const mywssent = async () => {
	wssend('发射爱心')
}
const compress = () => {
	uni.getImageInfo({
		src: data.url,
		success: function(res) {
			console.log(res);
			uni.compressImage({
				src: res.path,
				quality: 10,
				success: res1 => {
					console.log(res1)
					data.url = res1.tempFilePath
					load('/user/uploadavatar', data.url, "avatar").then(
						(res1) => {
							console.log("res1", res1);
						}
					)
				},
				fail: err => {
					console.log(err)
				}
			})
		},
		fail: function(error) {
			console.error(error);
		}
	});
}
const selectUpload = (e) => {
	console.log(e);
	data.file = e.tempFilePaths[0];
}
const get = async () => {
	const res = await http('/user/getavatar', 'GET', {})
	data.url = res.data
	console.log(data.url);
}

</script>

<style>
</style> -->