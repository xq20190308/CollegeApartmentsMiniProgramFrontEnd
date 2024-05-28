<template>
	<view style="display: flex; flex-direction: column; height: auto;">
		<view style="width: 82.9%;height: auto; margin: auto;">
			<view class="title">
				<text> {{data.detail.id}}.{{data.detail.title}}</text>
				<text class="underline-text" @click="modify"> 修改</text> 
			</view>
			<view class="message" >
				<uni-data-select :localdata="data.types" @change="(e) => {data.newNotice.typeName = data.types[e].text; console.log(data.newNotice.typeName)}"></uni-data-select>
				
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
		color: #333333;
		padding-top: 40rpx;
		text-align: center;
		border-width: 3rpx;
		border-bottom-style: solid;
		border-color: cornflowerblue;
		padding-bottom: 20px;
	}
	.title text:nth-child(1) {
		display: block;
	}
	.title text:nth-child(2){
		padding-left: 5px;
		float: right;
		font-weight: 300;
		font-size: 12px;
	}
	.underline-text {
	    text-decoration: underline;
	    color: #000000; /* 正常颜色 */
	  }
	  .underline-text:active {
	    color: #0000ff; /* 点击时的蓝色 */
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
