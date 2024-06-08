<template>
	<view style="display: flex;flex-direction: column;justify-content: space-between;">
		<scroll-view scroll-y="true" style="height: 514px;" scroll-into-view="bottom">
			 <view style="text-align: center;" id="content"><rich-text :nodes="data.messages"></rich-text></view>
			 <view style="text-align: center;" id="bottom">这是底部</view>
		</scroll-view>
		<view class="inputstyle">
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
const data = reactive({
	message:'',
	messages:'',
	locate:'bottom'
})
const mywssent = async () => {
	wssend(data.message)
}
onShow(()=>{
})
setInterval(() => {
	data.messages=ref(socketMsgQueue.content); // 这会实时打印出变化的值
}, 1000);
</script>

<style>
	.inputstyle{
		background-color: #008fff;
		display: flex;
		flex-direction: row;
		padding-top: 2px;
		padding-bottom: 2px;
		padding-left: 5px;
	}
</style>