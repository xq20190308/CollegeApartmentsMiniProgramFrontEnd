<template>
	<view v-if="data.detail.id!=null" style="display: flex; flex-direction: column; height: auto;">
		<view style="width: 82.9%;height: auto; margin: auto;">
			<view class="title">
				<text> {{data.detail.id}}.{{data.detail.title}}</text>
				<text class="underline-text" @click="goto('addnotice?id='+data.detail.id,'noticeManage')"> 修改</text> 
			</view>
			<view class="message" >
				<view>{{data.detail.typeName}}</view>
				<view>{{data.detail.content}}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import {goto} from "../../utils/access.js"
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive} from "vue";
import {http} from '@/utils/http'
import {getarticles} from "../notice/api/getnotices.js"
const data = reactive({
	detail:{
		id: null,
	},
	types:[
	  { value: 0, text: '篮球' },
	  { value: 1, text: '足球' },
	  { value: 2, text: '游泳' },
	],
	option: null,
})
onShow(()=>{
	getarticles({id:data.option}).then(response => {
    // 在这里处理数据
    data.detail = response[0];
	})
})
onLoad((options) => {
	console.log(options.id);
	data.option=options.id;
	console.log('data.option',data.option);
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
