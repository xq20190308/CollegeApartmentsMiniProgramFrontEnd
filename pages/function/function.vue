<template>
	<view class="container">
		<view >
		<text class="nav-t">学习</text>
		</view>
		<view class="nav-list">
			<view class="nav-item" v-for="(item, i) in data.navList1" :key="i" @click="Function1Click(item)">
				<image :src="item.imgPath" class="nav-img"></image>
				 <text class="func1_text">{{ item.name }}</text>
			</view>
		</view>
	<view >
	<text class="nav-t">事务</text>
	</view>
	<view class="container">
		<view class="nav-list">
			<view class="nav-item" v-for="(item, i) in data.navList2" :key="i" @click="Function2Click(item)">
				<image :src="item.imgPath" class="nav-img"></image>
				 <text class="func1_text">{{ item.name }}</text>
			</view>
		</view>
	</view>
	<view >
	<text class="nav-t">拓展</text>
	</view>
	<view class="container" v-if="data.islogined">
		<view class="nav-list">
			<view class="nav-item" v-for="(item, i) in data.navList3" :key="i" @click="Function3Click(item)">
				<image :src="item.imgPath" class="nav-img"></image>
				 <text class="func1_text">{{ item.name }}</text>
			</view>
		</view>
	</view>
	<view style="width: 100%;text-align: center;padding-top: 30px;" v-else>
		登录方可使用。。。
	</view>
	</view>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {getLocalData,delLocalData} from "../../utils/cache.js"
import {reactive} from "vue";
import { } from "../../utils/socket.js";
import { useUserStore } from "../../store/User.js"
import { storeToRefs } from 'pinia'
const store=useUserStore()
const data = reactive({
	islogined:false,
	navList1: [] ,
	navList2: [],
	navList3:[],
})
onShow(()=>{
	data.islogined=getLocalData('token')!="";
	console.log(data.islogined);
	// if(socketMsgQueue.length>0){
	// 	uni.setTabBarBadge({
	// 		index: 2,
	// 		// tabIndex，tabbar的哪一项，从0开始
	// 		text: String(socketMsgQueue.length).length > 2 ? "99+" : String(socketMsgQueue.length)
	// 		// 显示的文本，超过99显示成99+
	// 	});
	// }
	let total=store.totalUnreceived
	if(total){
		uni.setTabBarBadge({
			index: 2,
			// tabIndex，tabbar的哪一项，从0开始
			text: String(total).length > 2 ? "99+" : String(total)
			// 显示的文本，超过99显示成99+
		});					
	}else{
		uni.removeTabBarBadge({
			index:2
		})
	}
})
onLoad(()=>{
    data.navList1 = [
		{ name: "课程表", imgPath: "../../static/function/class.png", pagePath:"../questionnaire/questionnaire_list/questionnaire_list"},
		{ name: "教室预约", imgPath: "../../static/function/classes.png", pagePath:"../questionnaire/questionnaire_list/questionnaire_list"},
		{ name: "导师互动", imgPath: "../../static/function/mentor.png", pagePath:"../mentor/mentor" },
		{ name: "更多", imgPath: "../../static/function/more.png", pagePath:"../questionnaire/questionnaire_list/questionnaire_list"}
    ] ,
	data.navList2 = [
		{ name: "问卷调查", imgPath: "../../static/function/questionnaire.png", pagePath:"../questionnaire/questionnaire_list/questionnaire_list"},
		{ name: "卫检成绩", imgPath: "../../static/function/score.png", pagePath:"../hygiene/showhygiene"},
		{ name: "接诉即办", imgPath: "../../static/function/complaint.png" , pagePath:"../feedback/feedback"},
		{ name: "热水系统", imgPath: "../../static/function/water.png", pagePath:"../questionnaire/questionnaire_list/questionnaire_list"},
		{ name: "公寓用电", imgPath: "../../static/function/electricity.png", pagePath:"../lostAndFound/lostAndFound"},
		{ name: "失物招领", imgPath: "../../static/function/find.png" , pagePath:"../lostAndFound/lostAndFound"},
		{ name: "更多", imgPath: "../../static/function/more.png", pagePath:"../questionnaire/questionnaire_list/questionnaire_list"}
	],
	data.navList3 = [
		{ name: "账号管理", imgPath: "../../static/function/userManage.png", pagePath:"../userManage/userManage"},
		{ name:"失物招领管理", imgPath:'../../static/function/lostandfound.png', pagePath:"../lostAndFoundManage/lostandfoundManagelist"},
		{ name:"通告发布", imgPath:'../../static/function/questionnaire.png', pagePath:"../chat/postnotice"}
	]
}) 
const Function1Click=(item)=> {
	uni.reLaunch({
		url: item.pagePath
	})
}
const Function2Click=(item)=> {
	uni.reLaunch({
		url: item.pagePath
	})
}
const Function3Click=(item)=> {
	uni.reLaunch({
		url: item.pagePath
	})
}
</script>

<style>
	.nav-list {
	    display: flex;
	    flex-wrap: wrap;
	    justify-content: flex-start;
	    margin: 10rpx;
	    border-radius: 20rpx;
	    box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);
	  }
	  .nav-item {
	    border-radius: 16rpx;
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    border: 0;
	    width: 25%;
	    padding-bottom: 10px;
	  }
	  .nav-img {
	    width: 80rpx;
	    height: 80rpx;
		margin-bottom: 30rpx;
		margin-top: 30rpx;
		border-radius: 50%
	  }
	  .func1_text {
	    font-size: 28rpx;
	    color: #333333;
	    text-align: center;
		align-items: center;
		
	  }
	  .nav-t {
	      display: flex;
	      flex-wrap: wrap;
	      justify-content: space-around;
	      margin: 10rpx;
	      border-radius: 20rpx;
		  font-size: 20px;
	    }

</style>