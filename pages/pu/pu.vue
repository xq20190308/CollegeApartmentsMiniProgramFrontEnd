<template>
	<image src="../../static/pu/pu.jpg" mode="widthFix"></image>
</template>

<script setup>
import { onLoad, onShow} from "@dcloudio/uni-app";
import { wsclose,wsopen,wssend,socketMsgQueue } from "../../utils/socket.js";
onShow(() => {
	socketMsgQueue.length=0;
	uni.removeTabBarBadge({
		index: 2 // tabIndex，tabbar的哪一项，从0开始
	});
})
onLoad(()=>{
}) 
</script>

<style>
</style>