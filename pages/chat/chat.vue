<template>
	<button @click="get">获取头像</button>
	<button @click="compress">压缩</button>
	<image :src="data.url"></image>
	<uni-file-picker limit="1" @select="selectUpload" file-mediatype="image" disable-preview >
		<image :src="data.url" class="avatar" />
	</uni-file-picker>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive,ref,watch} from "vue";
import {http,load} from '@/utils/http'
const data = reactive({
	url:'',
	file:null,
})
const compress = ()=>{
	uni.getImageInfo({
	  src: data.url, 
	  success: function (res) {
		console.log(res); 
		uni.compressImage({
		  src: res.path,
		  quality: 10,
		  success: res1 => {
			console.log(res1)
			data.url=res1.tempFilePath
			load('/user/uploadavatar',data.url,"avatar").then(
				(res1)=>{
					console.log("res1",res1);
				}
			)
		  },
		  fail: err => {
			  console.log(err)
		  }
		})
	  },
	  fail: function (error) {
	    console.error(error);
	  }
	});
}
const selectUpload = (e)=>{
	console.log(e);
	data.file=e.tempFilePaths[0];
}
const get =async ()=>{
	const res=await http('/user/getavatar','GET',{})
	data.url=res.data
	console.log(data.url);
}
</script>

<style>
</style>