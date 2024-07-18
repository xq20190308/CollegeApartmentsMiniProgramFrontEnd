<template>
	<button @click="test">测试推送（给自己推送导师回复模板）</button>
	<uni-card v-for="(item,index) in data.templates" :key="index" @click="postSubscribe(item)">
		<view >{{item.title}}</view>
	</uni-card>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive,ref} from "vue";
import {http} from '@/utils/http'
import {getarticles} from "../notice/api/getnotices.js"
import {getCurrentTime} from '@/utils/time'
import {mainFun} from '../../main.js'
import {send,subscribe,check,test} from "@/utils/sengmessage.js"
import { useUserStore } from "../../store/User.js"
import { storeToRefs } from 'pinia'
const store=useUserStore()
const data = reactive({
	templates:[],
})
const postSubscribe=(item)=>{
	uni.navigateTo({
		url:"../subscribe/subscribeDetail?detail="+JSON.stringify(item)
	})
}
const getTemplates=async()=>{
	data.templates=await check();
	console.log(data.templates)
}
onLoad(()=>{
	getTemplates()
})

</script>

<style>
</style>