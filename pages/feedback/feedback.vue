<template>
	<view>
		<uni-section title="我的草稿" sub-title="" type="line" style="width: 98%;margin: auto;">
			<view class="notice-list">
				<view class="notice-item" v-for="(item,index) in data.complaintDrafts" :key="index" >
					<view style="display: flex;width: 80%; flex-direction: column;justify-content: center; align-items: left;" @click="change(item)">
						<view>id：{{item.id}}</view>
						<view>describes：{{item.describes}}</view>
						<view>category：{{item.category}}</view>
						<view>contactobject：{{item.contactobject}}</view>
					</view>
					<button @click="delet(item,index)" class="deletbutton">删除</button>
				</view>
			</view>
		</uni-section>
	</view>
	<view class="container">
		
	<image class = "floating-button" src="../../static/feedback/plus.png" @click="onpress"></image>
	
	</view>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive} from "vue";
import {http} from '@/utils/http'
const data = reactive({
	complaintDrafts: [] // 初始为空数组
})
onLoad(()=> {
	// 页面加载时获取数据
})
onShow(()=>{
	fetchComplaintDrafts();
})
const fetchComplaintDrafts = async () => {
	const res = await http('/api/selectDraft','GET',{},)
	
	console.log("封装后请求的结果",res);
	data.complaintDrafts=res.data//与问卷的返回不同
	console.log("data.complaintDrafts",data.complaintDrafts)
}
const onpress=()=> {
	console.log("跳转到添加草稿，不需要携带id")
	uni.navigateTo({
		url: '../feedback/feedbackSubmit'
	});
}
const change=(item)=> {
	console.log("要修改id为",item.id,"的草稿")
	uni.navigateTo({
		url: '../feedback/DraftFeedback?id='+item.id,
	})
}
const delet=(item,index)=> {
	console.log("要删除id为",item.id,"的草稿")
	data.complaintDrafts.splice(index, 1);
	console.log(data.complaintDrafts)
	//提交到后端
	/*uni.request({
		url:'',
		method:"",
		data:{
			id:thisid
		}
	})*/
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


