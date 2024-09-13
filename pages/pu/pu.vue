<template>
	<view class="banner">
		<view class="bar,barb" v-for="(item,key) in puInfo.myPuInfo" :key="key">
		<uni-section type="line" :title="key">
			<text class="text-common">{{item}}</text>
		</uni-section>
		</view>
	</view>
</template>

<script setup>
import { onLoad, onShow} from "@dcloudio/uni-app";
import { useLoginStore } from "@/store/login.js";
import { getPuInfo } from "./api/pu.js"
import { usePuStore } from "@/store/pu/pu.js";
const puInfo = usePuStore()
const loginInof = useLoginStore()
uni.$on("puUp",()=>{
	console.log(loginInof.pu)
	getPuInfo()
})
onShow(() => {
})
onLoad(()=>{
	if(loginInof.loginInfos.pu.login){
		console.log(loginInof.pu)
		getPuInfo()
	}
	else{
		loginInof.tologin("pu口袋校园")
	}
}) 
</script>

<style>
</style>