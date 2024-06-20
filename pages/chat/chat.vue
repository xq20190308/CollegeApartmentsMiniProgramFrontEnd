<template>
	<view style="display: flex;flex-direction: column;justify-content: space-between;">
		<view v-for="(msg,index) in data.messages" :key="index" style="text-align: center;margin-bottom: 8px;" id="content"><text>{{msg}}</text></view>
		
		<view style="height: 120px;"></view>
		
		<view id="input" style="margin-top: 80px;"></view>
		
		<view class="inputstyle">
			<uni-easyinput v-model="data.message" type="line" placeholder=""></uni-easyinput>
			<button style="color:#ffffff;backgroundColor:#008fff;" type="primary" size="mini" @click="mywssent">发射爱心</button>
		</view>
	</view>
</template>

<script setup>
import { onLoad, onShow, onUnload } from "@dcloudio/uni-app";
import { reactive, ref,computed } from "vue";
import { getCurrentTime } from '@/utils/time'
import { http, load } from '@/utils/http'
import { wsclose,wsopen,wssend,socketMsgQueue,socketTask } from "../../utils/socket.js";
import { onMounted, onUnmounted } from 'vue';
import { getLocalData, setLocalData } from "../../utils/cache.js"

const position = 'bottom'
const data = reactive({
	info:{},
	message:'',
	messages:[],
	currentmsg:'',
})
socketTask.onMessage(async (res) => {
	data.messages.push(res.data)
	// 	data.messages.push(res.data)
	// 	// data.messages.push({
	// 	// 	data:"静态消息",
	// 	// 	senderUserId:"202211070625",
	// 	// 	sendTime:"2024-06-20 17:03",
	// 	// })
	console.log("data.messages",data.messages)
});
const mywssent = async () => {
	console.log('data.message',data.message)
	let recevier=[];
	recevier.push(data.info.userid)
	console.log("receiver",recevier)
	const res1 = await wssend("0",data.message===''?"发射爱心":data.message,recevier)
	console.log("发送消息的res",res1);
	data.messages.push({
		data:data.message===''?"发射爱心":data.message,
		senderUserId:getLocalData('userid'),
		sendTime:getCurrentTime(),
	})
	data.message='';
	// uni.pageScrollTo({
	// 	selector: '#input',
	// 	duration: 50
	// });
	uni.pageScrollTo({
		selector: '#input',
		duration: 400
	});
}
onLoad((options)=>{
	console.log("onLoad")
	console.log(options)
	data.info=JSON.parse(options.info)
	uni.setNavigationBarTitle({
	  title: data.info.name,
	  success: () => {
	    console.log('标题设置成功');
	  },
	  fail: (err) => {
	    console.error('标题设置失败', err);
	  }
	});
	data.messages=getLocalData('single'+ getLocalData('userid') +'_with_'+data.info.userid)?JSON.parse(getLocalData('single'+ getLocalData('userid') +'_with_'+data.info.userid)):[]
	console.log("调出本地聊天记录",data.messages)
})
onUnload(()=>{
	console.log("onUnload")
	console.log("存储聊天记录到本地")
	setLocalData('single'+ getLocalData('userid') +'_with_'+data.info.userid,JSON.stringify(data.messages))
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