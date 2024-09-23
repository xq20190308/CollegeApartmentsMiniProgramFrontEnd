<template>
	<view>
		<uni-section title="状态" type="line" style="width: 98%;margin: auto;">
			<view style="padding-left: 20px;">
				<uni-data-checkbox v-model='data.info.status' :localdata="fun_advise_status" :map="data.map" />
			</view>
			<template v-slot:right>
				<uni-tag @click="updateStatus" style="width: 175rpx;" type="success" text="确认修改"></uni-tag>
			</template>
		</uni-section>
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
		<uni-section v-if="data.info.stu_id" title="学号"  type="line" style="width: 98%;margin: auto;">
			<view style="padding-left: 20px;"><text>{{data.info.stu_id}}</text></view>
		</uni-section>
		<uni-section title="附件" type="line" style="width: 98%;margin: auto;">
		<view>
			<view class="file" v-for="(item,index) in data.info.path" :key="index">
				<image v-if="item.type==='Image'" :src="item.src" mode="widthFix"></image>
				<video v-else-if="item.type==='Video'" :src="item.src"></video>
				<text v-else user-select style="text-decoration: underline; color:cornflowerblue" @click="lookfile(item.src)">{{item.src}}</text>
			</view>
		</view>
		</uni-section>
	</view>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive} from "vue";
import {http} from '@/utils/http'
import {goto} from "../../utils/access.js"
import { useDict } from "../../utils/dict.js";
import {update} from "./api/feedback"
const fun_advise_status = useDict('fun_advise_status')
const data = reactive({
	info:{},
	map: {text:'label',value:'value'},
	update: '',
})
const updateStatus=()=>{
	console.log(data.update)
	console.log(data.info.status)
	data.update=data.info.status
	update(data.info.id,data.info.status)
}
const lookfile = (src)=>{
	console.log(src)
	uni.downloadFile({
	  url: src,
	  success: function (res) {
	    var filePath = res.tempFilePath;
	    uni.openDocument({
	      filePath: filePath,
	      showMenu: true,
	      success: function (res) {
	        console.log('打开文档成功',res);
	      },
		  fail: function (res) {
	        console.log('打开文档失败',res);
	      },
	    });
	  }
	});
}
onLoad((options)=> {
	data.info=JSON.parse(options.info);
	console.log('info',data.info)
	data.update=data.info.status
	data.info.path=data.info.path?JSON.parse(data.info.path):[];
	for (let i = 0; i < data.info.path.length; i++) {
		if (/\.(jpg|jpeg|png|gif)$/.test(data.info.path[i])) {
			data.info.path[i]={src: data.info.path[i], type: 'Image'};
		  } else if (/\.(mp4|webm|mov|avi|mpg)$/.test(data.info.path[i])) {
			data.info.path[i]={src: data.info.path[i], type: 'Video'};
		  } else {
			  data.info.path[i]={src: data.info.path[i], type: 'Other'};
			  // .slice(data.info.path[i].lastIndexOf('/')+1)
		  }
	}
	console.log(fun_advise_status)
})
onShow(()=>{
	
})
</script>

<style>
	.file{
		justify-content: center;
		display: flex;
	}
</style>


