<template>
	<view>
		<uni-section title="类别" type="line" style="width: 98%;margin: auto;">
			<view style="padding-left: 20px;"><text>{{data.info.category}}</text></view>
		</uni-section>
		<uni-section title="内容" type="line" style="width: 98%;margin: auto;">
			<view style="padding-left: 20px;"><text>{{data.info.describes}}</text></view>
		</uni-section>
		<uni-section title="提交时间" type="line" style="width: 98%;margin: auto;">
			<view style="padding-left: 20px;"><text>{{data.info.pushtime}}</text></view>
		</uni-section>
		<uni-section title="联系方式"  type="line" style="width: 98%;margin: auto;">
			<view style="padding-left: 20px;"><text>{{data.info.contactobject}}</text></view>
		</uni-section>
		<uni-section title="附件" type="line" style="width: 98%;margin: auto;">
		<view  style="margin-left: 20px;">
			<image v-for="(item,index) in data.info.path" :src="item" mode="widthFix"></image>
		</view>
		</uni-section>
	</view>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive} from "vue";
import {http} from '@/utils/http'
import {goto} from "../../utils/access.js"
const data = reactive({
	info:{},
	// category: "课程"
	// contactobject: "11111111111"
	// describes: "测试一"
	// id: 148
	// path: "["http://localhost:8080/后端/static/3d1d6938-30c8-452e-b52c-dad682ff8189.jpg"]"
	// pushtime: "2024-06-02T15:07:47"
})
onLoad((options)=> {
	data.info=JSON.parse(options.info);
	data.info.path=JSON.parse(data.info.path)?JSON.parse(data.info.path):[];
	console.log(data.info)
})
onShow(()=>{
	
})
</script>

<style>
</style>


