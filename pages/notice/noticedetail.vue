<template>
	<view style="display: flex; flex-direction: column; height: auto;">
		<view style="width: 82.9%;height: auto; margin: auto;">
			<view class="title">
				<text> {{data.detail.id}}.{{data.detail.title}}</text>
				<text> {{data.detail.title}}</text>
			</view>
			<view class="message" >
				<view>{{data.detail.typeName}}</view>
				<view>{{data.detail.content}}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import {onLoad} from "@dcloudio/uni-app";
import {reactive} from "vue";
import {http} from '@/utils/http'
const data = reactive({
	detail:{
		content: "",
		id: null,
		isActive: null,
		publishTime: "",
		title: "静态数据",
		typeName: "",
	}
})
onLoad((options) => {
	console.log('--',options.detail);
	data.detail=JSON.parse(options.detail);
	console.log('data.detail',data.detail);
})


</script>
<style>
	.content :text {
		text-align: center;
	}
	
	.title {
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 19px;
		color: #333333;
		padding-top: 40rpx;
		text-align: center;
		padding-bottom: 20rpx;
		border-width: 3rpx;
		border-bottom-style: solid;
		border-color: cornflowerblue;
		
	}
	
	.title text:nth-child(1) {
		display: block;
	}
	.title text:nth-child(2) {
		float: right;
	}
	
	.message {
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 12px;
		line-height: 15px;
		color: #999999;
		margin-bottom: 70rpx;
		margin-top: 6rpx;
	}
	.message text:nth-child(1) {
		float: left;
	}
	.message text:nth-child(2) {
		float: right;
	}
</style>
