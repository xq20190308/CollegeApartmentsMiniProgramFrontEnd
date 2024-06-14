<template>
	<uni-section class="mb-10" :title="data.name" type="line" ></uni-section>
		<uni-section class="mb-10" title="地点" :sub-title="data.pickLocation" type="circle"></uni-section>
	<uni-section class="mb-10" title="时间" :sub-title="data.pickTime" type="circle"></uni-section>
	<uni-section class="mb-10" title="描述" :sub-title="data.describes" type="circle"></uni-section>
	<uni-section class="mb-10" title="联系方式" :sub-title="data.contactobject" type="circle"></uni-section>
	<view v-for="(item, i) in data.filepath" :key="i" >
		<!-- <image src="item"></image> -->
		<!-- 这里路径没写对，所以他会报错? -->
		{{i}}是{{item}}
	</view>
	<view class="button-row">
		<button @click="submit('baseForm')" class="button">通过</button>
		<button @click="retreat" class="button" style="background-color:green; color: #ffffff;">驳回</button>
	</view>
</template>

<script setup>
	import {goto} from "../../utils/access.js"
	import {onLoad,onShow} from "@dcloudio/uni-app";
	import {reactive} from "vue";
	import {http} from '@/utils/http'
	
	const data = reactive({
		describes:'' ,
		contactobject:'',
		img:[],
		pickLocation:'',
		name:'',
		pickTime:'',
		filepath:["@/static/feedback/plus.png"],
	})
	
	onLoad((options) =>{
		console.log('所有信息', options);
		//检查filepath是否为数组，结果不是
		console.log(Array.isArray(options.filepath))
		data.describes=options.describes;
		data.contactobject=options.contactobject;
		data.pickLocation=options.pickLocation;
		data.pickTime=options.pickTime;
		data.name=options.name;
		//给他转换成数组
		data.filepath = options.filepath.split(',');
	})
	const submitreason =()=>{
		
	}
	const submit=() =>{
		
	}
	
	const retreat=() =>{
		onShow(()=>{
			
		})
	}
</script>

<style lang="scss">
  $uni-success: #18bc37 !default;

	.uni-wrap {
		flex-direction: column;
		/* #ifdef H5 */
		height: calc(100vh - 44px);
		/* #endif */
		/* #ifndef H5 */
		height: 100vh;
		/* #endif */
		flex: 1;
	}

	.mb-10 {
		margin-bottom: 10px;
	}

  .decoration{
    width: 6px;
    height: 6px;
		margin-right: 4px;
    border-radius: 50%;
		background-color: $uni-success;
  }
	
	.button-row {
		//margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
		/* 用于在按钮之间添加等间距 */
	
	}
	.button {
		background-color: dodgerblue;
		color: white;
		width: 300px;
		height: 47px;
		border: 0;
		font-size: 16px;
		border-radius: 30px;
		margin: 10px;
	}
</style>