<template>
	<Login :title="title" :url="url"></Login>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";;
const title=ref('');
const url=ref('');
onLoad((options)=>{
	console.log(options)
	title.value=options.title
	url.value=options.url
	uni.setNavigationBarTitle({
	  title: options.title
	});
})
</script>

<style>
	       
</style>
