<template>
	<view style="display: flex;flex-direction: column;justify-content: space-between;">
		<view style="text-align: center;margin-bottom: 41px;" id="content"><rich-text :nodes="data.messages"></rich-text></view>
		<view id="input" class="inputstyle">
			<uni-easyinput v-model="data.message" type="line" placeholder=""></uni-easyinput>
			<button style="color:#ffffff;backgroundColor:#008fff;" type="primary" size="mini" @click="mywssent">发射爱心</button>
		</view>
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
})
const mywssent = async () => {
	console.log('data.message',data.message)
	wssend(data.message===''?"发射爱心":data.message)
	data.message='';
}
onShow(()=>{
	// uni.removeTabBarBadge({
	//   index: 2,
	// })
})
setInterval(() => {
	data.messages=ref(socketMsgQueue.content); // 这会实时打印出变化的值
	uni.pageScrollTo({
		selector: '#input',
		duration: 50
	});
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
</style>