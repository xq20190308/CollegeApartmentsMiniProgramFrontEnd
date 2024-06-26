<template>
	<view class="notice-list">
	<uni-card title="通知1" sub-title="副标题" thumbnail="../../../../static/home/future_icon.png">
		<text>通知内容</text>
	</uni-card>
	<uni-card title="通知2" sub-title="副标题" thumbnail="../../../../static/home/future_icon.png">
		<text>通知内容</text>
	</uni-card>
	<uni-card title="通知3" sub-title="副标题" thumbnail="../../../../static/home/future_icon.png">
		<text>通知内容</text>
	</uni-card>
	<uni-card title="通知4" sub-title="副标题" thumbnail="../../../../static/home/future_icon.png">
		<text>通知内容</text>
	</uni-card>
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

const data = reactive({
	
})

const store = useUserStore();
onLoad(()=>{
})
onUnload(()=>{
	
})
onShow(()=>{
})
</script>

<style>
	.notice-list{
		display: flex;
	    flex-direction: column-reverse;
	}
</style>
