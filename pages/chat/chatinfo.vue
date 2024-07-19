<template>
	<!--信息区域 -->
	<view style="padding-left: 10px;padding-right: 10px;">
		<!-- 头像昵称区域 -->
		<view style="display:flex;flex-direction:row;flex-wrap:nowrap;" >
			<image @click="getimage" :src="data.info.avatarUrl" class="avatar" />
			<text style="margin:50rpx;align-self:center;">{{data.info.trueName}}</text>
		</view>
		<view style="display:flex;flex-direction:row;flex-wrap:nowrap;" >
			<image @click="getimage" :src="savedFilePath" class="avatar" />
			<text style="margin:50rpx;align-self:center;">{{data.info.trueName}}</text>
		</view>
		<!-- 功能区 -->
		<uni-section title="个人信息" type="line">
		<view style="border-radius: 20px;overflow: hidden;">
				<uni-list border-full>
					<uni-list-item showArrow title="姓名" :rightText="data.info.trueName" />
					<uni-list-item showArrow title="联系电话" :rightText="data.info.phone" />
					<uni-list-item showArrow title="邮箱" :rightText="data.info.email" />
				</uni-list>
		</view>
		</uni-section>
		<button class="btn" style="text-align:center" @click="()=>{gotochat()}">
			<text>发消息</text>
		</button>
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
	info:{},
	back:false,
})
const savedFilePath=ref("")
const getimage=(e)=>{
	console.log("data.info.avatarUrl:",data.info.avatarUrl)
	uni.getImageInfo({
		src:data.info.avatarUrl,
		complete(res){
			console.log(res)
		}
	})
	uni.downloadFile({
		url:data.info.avatarUrl,
		success: (res) => {
			console.log("res:",res)
			let FileSystemManager=wx.getFileSystemManager()
			FileSystemManager.saveFile({
				tempFilePath:res.tempFilePath,
				success: (success) => {
					console.log("success",success)
					savedFilePath.value=success.savedFilePath
					// uni.getSavedFileList({
					//   success: function (s) {
					//     console.log("s",s);
					//   }
					// });
				},
				fail: (e) => {
					console.log("e",e)
				}
			})
		},
		fail: (err) => {
			console.log("err",err)
		}
	})
}
const gotochat=()=>{
	console.log("back:",data.back)
	if(data.back){uni.navigateBack()}else{
		let info={
			trueName:data.info.trueName,
			userid:data.info.userid,
			avatarUrl:data.info.avatarUrl,
			unreceivedNum:0
		}
		uni.navigateTo({
			url:'/pages/chat/chat?info='+JSON.stringify(info)
		})
	}
}
onShow(()=>{
})
onLoad(async(options)=>{
	console.log(options);
	let userid=JSON.parse(options.info).userid
	const res = await http('/user/findByUserid?userid='+userid,'GET',{},)
	data.info=res.data
	data.back=options.back=="true"?true:false
	uni.setNavigationBarTitle({
	  title: data.info.trueName
	});
	console.log("发来消息的人的信息",data.info,"back:",data.back);
})

</script>

<style>
	.avatar {
		background-color: #ad7d7d;
		border-radius: 50%;
		width: 150rpx;
		height: 150rpx;
		top: 9px;
		left: 5px;
		margin: 10rpx;
	}
	.btn {
		background-color: #2196f3ad;
		color: white;
		width: 300px;
		height: 47px;
		border: 0;
		font-size: 16px;
		border-radius: 30px;
		top: 150rpx;
	}
</style>