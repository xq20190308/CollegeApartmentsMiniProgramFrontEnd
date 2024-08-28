<template>
	<Login ></Login>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import { login } from "../../utils/login.js";
const title=ref('');
const url=ref('');
onLoad((options)=>{
	console.log(options)
	title.value=options.title
	url.value-options.url
	uni.setNavigationBarTitle({
	  title: options.title===null?"强智系统":options.title
	});
})
</script>

<style>
	       
</style>
