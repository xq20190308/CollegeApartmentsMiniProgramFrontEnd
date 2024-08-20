<template>
	<view>
		<uni-section title="已提交投诉" sub-title="" type="line" style="width: 98%;margin: auto;">
			<view class="notice-list">
				<view class="notice-item" v-for="(item,index) in data.complaintDrafts" :key="index" >
					<view style=" width: 100%; display: flex; flex-direction: row;justify-content: center;">
						<view style="display: flex;width: 100%; flex-direction: column;justify-content: center; align-items: right;" @click="look(item)">
							<view></view>
							<view>学号：{{item.stu_id}}</view>
							<view>时间：{{item.pushtime}}</view>
							<view>类别：{{item.category}}</view>
							<view>内容：{{item.describes}}</view>
							<view>联系电话：{{item.contactobject}}</view>
						</view>
						<view class="tag-view">
							<uni-tag :text="map[item.status].label" :type="map[item.status].class" />
						</view>
					</view>
				</view>
			</view>
		</uni-section>
	</view>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive,computed, ref} from "vue";
import {http} from '@/utils/http'
import {goto} from "../../utils/access.js"
import { useDict } from "../../utils/dict.js";
const data = reactive({
	complaintDrafts: [], // 初始为空数组
})
const map =ref([])
onLoad((options)=> {
	// 页面加载时获取数据
	var option=JSON.parse(options.options)
	map.value = option.fun_advise_status.reduce((acc, item) => {
	  acc[item.value] = { ...item };
	  console.log("before",acc)
	  delete acc[item.value].value;
	  console.log("after",acc)
	  return acc;
	}, {});
	
	console.log("map",map.vlaue)
})
onShow(()=>{
	fetchComplaintDrafts();
})
const fetchComplaintDrafts = async () => {
	const res = await http('/api/manageSuggestions','GET',{},)
	data.complaintDrafts=res//与问卷的返回不同
	//console.log("data.complaintDrafts",data.complaintDrafts)
}
const look=(item)=> {
	//console.log(item.id)
	uni.navigateTo({
		url: '../feedback/showFeed?info='+JSON.stringify(item),
	})
}
</script>




<style>
	.tag-view{
		opacity: 0.5;
		padding-right: 10rpx;
		width: 32%;
		display: flex;
		justify-content: flex-end;
	}
	.notice-list {
		width: 95%;
		margin-left: 8px;
	}
	.notice-item {
		margin-top: 24rpx!important;
		margin-left: 20rpx;
		width: 90%;
		height: auto;
		border: 1px solid #e2e2e2;
		border-radius: 25px;
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		padding-left: 30rpx;
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
		background-color:indianred;
		color:white;
		width: 50px;
		height:40x;
		font-size: 10px;
		text-align: center;
	} 
</style>


