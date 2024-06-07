<template>
	<view style="display: flex;flex-direction: column;">
		<view style="width: 100%; height: auto;">
			<d-search-log color_border="#666666" color_text="#666666"
			:search_list_hot="data.search_list" :store_key="data.store_key" :input_text="data.input_text"
			@onClickDelAllApi="onClickDelAll" @onSearchNameApi="onSearchName"></d-search-log>
		</view>
		<view style="position: relative;top: auto;">
			<uni-section title="个人通知" sub-title="" type="line" style="width: 98%;margin: auto;font-weight: 550;">
				<view class="notice-list">
					<view class="notice-item" v-for="(item,index) in data.individualarticles" :key="index" @click="todetail(index)">
						<text style="text-aign: center;">{{item.id}}.{{item.title}}</text>
						<text>{{item.content}}</text>
						<text style="text-align: right;">结束时间：{{item.publishTime}}</text>
						<text style="text-align: right;">类型：{{item.typeName}}</text>
					</view>
				</view>
			</uni-section>
			<uni-section title="学校通知" sub-title="" type="line" style="width: 98%;margin: auto;font-weight: 550;">
				<view class="notice-list">
					<view class="notice-item" v-for="(item,index) in data.articles" :key="index">
						<view style="display: flex;flex-wrap: nowrap;">
							<text style="font-size: 16px; text-aign: center;width: 85%;display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;"  @click="todetail(index)">{{item.id}}.{{item.title}}</text>
							<button @click="deletenotice(index)" class="deletbutton">删除</button>
						</view>
						<text style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">{{item.content}}</text>
						<text style="text-align: right;">结束时间：{{item.publishTime}}</text>
						<text style="text-align: right;">类型：{{item.typeName}}</text>
					</view>
				</view>
			</uni-section>
		</view>
		<view>
			<image class = "addnaireicon" src="../../static/feedback/plus.png" @click="goto('addnotice','noticeManage')"></image>
		</view>
	</view>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {getLocalData,delLocalData, setLocalData} from "../../utils/cache.js"
import {reactive} from "vue";
import {http} from '@/utils/http'
import {goto} from "../../utils/access.js"
import {getarticles} from "../notice/api/getnotices.js"
const data = reactive({
	articles:[],
	individualarticles:[],
	catenotice:["个人通知","学校通知"],
	search_list:[],
	store_key:'notice_keywordlist',
	input_text:''
})
const onClickDelAll = (e)=>{
	//console.log(e)
}
const onSearchName = (e)=>{
	//在此添加关键词参数请求通知列表
	console.log(e)
	getarticles({keyword:e}).then(response => {
	  // 在这里处理数据
	  data.articles = response.sort((a, b) => a.id - b.id);
		console.log('response',response); // 输出: 这是返回的数据
	})
}
const todetail = (index) =>{
	console.log('index',index);
	uni.navigateTo({
		url:"../notice/noticedetail?id="+data.articles[index].id
	})
}
const deletenotice = async (index) =>{
	if(getLocalData('noticeManage')==true){
		//获取通知数据
		uni.showModal({
			title: '提示',
			content: '确认删除该通知吗',
			success: async (r) => {
				if (r.confirm) {
					const res = await http('/notifications/modify','POST',{
						id : data.articles[index].id,
						isActive: 0,
					},)
					getarticles({}).then(response => {
					  // 在这里处理数据
					  data.articles = response.sort((a, b) => a.id - b.id);;
						console.log('response',response); // 输出: 这是返回的数据
					})
					console.log("删除的res",res)
					console.log('用户点击确定');
				} else if (r.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}else{
		uni.showToast({
			title: "你没有权限",
			icon: "error"
		})
	}
}
onShow(()=>{
	getarticles({}).then(response => {
    // 在这里处理数据
    data.articles = response.sort((a, b) => a.id - b.id);
	console.log('response',response); // 输出: 这是返回的数据
  })
})
onLoad((options) => {
	console.log("通知列表",data.articles);
})
</script>


<style>
	.cates{
		display: flex;
		flex-direction: row;
		background-color: #fff;
		height: 40px;
		justify-content: space-between;
	}
	.cateitem{
		text-align: center;
		width: 50%;
		padding-top: 9px;
		padding-bottom: 9px;
		background-color: #008cff;
	}
	.cateactive{
		background-color: #fff;
	}
	.notice-list {
	}
	.notice-item {
		width: 89%;
		height: auto;
		border: 1px solid #e2e2e2;
		border-radius: calc(18rpx * 2);
		box-sizing: border-box;
		padding: 10rpx 30rpx;
		padding-top: 30rpx;
		flex-shrink: 0;
		margin-top: 24rpx!important;
		margin-button: 28rpx;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 500;
		font-size: calc(18rpx * 2);
		line-height: calc(17rpx * 2);
		color: #444444;
		margin: auto;
		z-index: 99;
	}
	.deletbutton {
		width: 15%;
		font-size: 12px;
		padding: 0px;
		margin: 0px;
		bottom: 8px;
		z-index: 999;
	}
	.notice-item>text {
		display: block;
	}
	
	.notice-item text:nth-child(2) {
		text-indent: 1em;
		display: flex;
		padding-top: 10rpx;
	}

	.notice-item text:nth-child(3) {
		padding-top: 24rpx;
		font-size: 24rpx !important;
	}
	.notice-item text:nth-child(4) {
		font-size: 24rpx !important;
	}
	
	.notice-item text:nth-child(2),
	.notice-item text:nth-child(3),
	.notice-item text:nth-child(4) {
		color: #444444;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 500;
		font-size: calc(14rpx * 2);
		line-height: calc(15rpx * 2);
	}
	.addnaireicon {
		position: fixed;
		bottom:60rpx; 
		right: 50rpx; 
		width: 80rpx; 
		height: 80rpx; 
	}
</style>