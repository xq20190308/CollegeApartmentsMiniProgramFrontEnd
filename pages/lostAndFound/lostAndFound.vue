<template>
	<view>
		<uni-section title="失物招领" sub-title="" type="line" style="width: 98%;margin: auto;">
			<view class="notice-list">
				<view class="notice-item" v-for="(item,index) in AllItems" :key="index" >
					<view style="display: flex;width: 80%; flex-direction: column;justify-content: center; align-items: left;" @click="onpress(item)">
						<view>捡到的时间：{{item.id}}</view>
						<view>捡到的地点：{{item.describes}}</view>
						<view>描述：{{item.category}}</view>
						<view>联系方式：{{item.contactobject}}</view>
					</view>
				</view>
			</view>
		</uni-section>
		<image class = "floating-button" src="../../static/feedback/plus.png" @click="add"></image>
	</view>
</template>

<script setup>
	//vue3导入
	import {onLoad,onShow} from "@dcloudio/uni-app";
	import {reactive} from "vue";
	import {http} from '@/utils/http'
	
	const data = reactive({
		AllItems:[]
	})
	onLoad(()=>{
		
	})
	//用户从其他页面返回到当前页面，或者从后台切前台时，onShow会被触发
	onShow(()=>{
		fetchallItems();
	})
	const fetchallItems = async()=>{
		const res = await http()
		console.log("封装后请求的结果",res);
		data.AllItems=res.data//与问卷的返回不同
		console.log("data.allItems",data.AllItmes)
	}
	const onpress=(options)=>{
		console.log("跳转到每条失物招领的详细信息,要携带id"),
		uni.navigateTo({
			url:'../',
		});
	}
	const add=()=>{
		console.log("跳转到发布页面"),
		uni.navigateTo({
			url:'../lostAndFound/lostAndFoundDraft',
		});
	}
</script>

<style>
	.notice-list {
		width: 95%;
		margin-left: 8px;
	}
	.notice-item {
		margin-top: 24rpx!important;
		width: 90%;
		height: auto;
		border: 1px solid #e2e2e2;
		border-radius: 25px;
		padding: 10rpx 30rpx;
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		background-color: azure;
		box-shadow: #999999 2px 2px 2px 2px;
		place-items: flex-start;
	}
	.notice-item>text {
		display: block;
	}
	
	
	.notice-item text:nth-child(2) {
		text-indent: 2em;
		display: flex;
		padding-top: 10rpx;
	}
	
	.notice-item text:nth-child(3) {
		padding-top: 24rpx;
		font-size: 16rpx !important;
	}
	.notice-item text:nth-child(4) {
		font-size: 16rpx !important;
	}
	
	.notice-item text:nth-child(2),
	.notice-item text:nth-child(3),
	.notice-item text:nth-child(4) {
		color: #999999;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: calc(12rpx * 2);
		line-height: calc(15rpx * 2);
	}
	.floating-button {
		position: fixed;
		bottom:60rpx; 
		right: 50rpx; 
		width: 80rpx; 
		height: 80rpx; 
	}
	.deletbutton{
		background-color:indianred;
		color:white;
		width: 50px;
		height:40x;
		font-size: 10px;
		text-align: center;
	} 
</style>