<template>
	<uni-list>
		<uni-list :border="true">
			<!-- 右侧带角标 -->
			<uni-list-chat title="uni-app" avatar="https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg" note="您收到一条新的消息" time="2020-02-02 20:20" badge-text="12"></uni-list-chat>
			<!-- 显示多头像 -->
			<uni-list-chat title="uni-app" :avatar-list="data.avatarList" note="您收到一条新的消息" time="2020-02-02 20:20" badge-text="12"></uni-list-chat>
		</uni-list>
	</uni-list>
</template>

<script setup>
import '@/utils/http'
import {computed, reactive, ref} from "vue"; 
import {onLoad,onReady} from "@dcloudio/uni-app";
import {http} from '@/utils/http'
const data = reactive({
		avatarList: [{
			url: 'https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg'
		}, {
			url: 'https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg'
		}, {
			url: 'https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg'
		}]
})
</script>

<style>
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