<template>
	<view>
		<uni-section title="我的草稿" sub-title="" type="line" style="width: 98%;margin: auto;">
			<text class="underline-text" @click="lookFeed">已提交投诉</text>
			<view class="notice-list">
				<view class="notice-item" v-for="(item,index) in data.complaintDrafts" :key="index" >
					<view style="display: flex;width: 80%; flex-direction: column;justify-content: center; align-items: left;" @click="change(item,index)">
						<view>时间：{{item.pushtime}}</view>
						<view>类别：{{item.category}}</view>
						<view>内容：{{item.describes}}</view>
						<view>联系电话：{{item.contactobject}}</view>
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
import {goto} from "../../utils/access.js"
import {getLocalData,setLocalData} from "../../utils/cache.js"
import {getCurrentTime} from '@/utils/time'
const data = reactive({
	complaintDrafts: [] // 初始为空数组
})
onLoad(()=> {
})
onShow(async()=>{
	await fetchComplaintDrafts();
	console.log('草稿箱:',data.complaintDrafts)
})
const lookFeed = ()=>{
	goto('manageFeed','feedbackManage')
}
const fetchComplaintDrafts = async () => {
	data.complaintDrafts=getLocalData('feedDraft')?JSON.parse(getLocalData('feedDraft')):'';
}
const onpress=()=> {
	console.log("跳转到添加草稿，不需要携带id")
	uni.navigateTo({
		url: '../feedback/feedbackSubmit'
	});
}
const change=(item,index)=> {
	console.log("要修改inedx为",index,"的草稿")
	uni.navigateTo({
		url: '../feedback/feedbackSubmit?contactobject='+item.contactobject+
		'&describes='+item.describes+
		'&path0='+item.path+
		'&category='+item.category+
		'&index='+index,
	})
}
const delet=(item,index)=> {
	console.log("要删除id为",item.id,"的草稿")
	uni.showModal({
		title: '提示',
		content: '确认删除该通知吗',
		success: async (r) => {
			if (r.confirm) {
				//const res = await http('/api/deleteSuggestions/' + item.id,'DELETE',{},)
				data.complaintDrafts.splice(index,1);
				//console.log("data.complaintDrafts",data.complaintDrafts);
				setLocalData('feedDraft',data.complaintDrafts)
				fetchComplaintDrafts();
			} else if (r.cancel) {
				console.log('用户点击取消');
			}
		}
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
		box-shadow: #999999 2px 2px 2px 2px;
		place-items: flex-start;
	}
	.notice-item>text {
		display: block;
	}
	.underline-text {
		padding-bottom: 5px;
		padding-left: 5px;
		float: right;
		font-weight: 300;
		font-size: 12px;
		text-decoration: underline;
		color: #000000;
		position: fixed;
		left: 300px;
		top: 15px;
	  }
	  .underline-text:active {
	    color: #0000ff; /* 点击时的蓝色 */
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
		background-color:#e2e2e2;
		color: #000;
		width: 50px;
		height:40x;
		font-size: 10px;
		text-align: center;
	} 
</style>


