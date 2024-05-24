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
	<text class="nav-t">生活</text>
	</view>
	<view class="container">
		<view class="nav-list">
			<view class="nav-item" v-for="(item, i) in data.navList3" :key="i" @click="Function3Click(item)">
				<image :src="item.imgPath" class="nav-img"></image>
				 <text class="func1_text">{{ item.name }}</text>
			</view>
		</view>
	</view>
	</view>
</template>

<script setup>
import {onLoad} from "@dcloudio/uni-app";
import {reactive} from "vue";
import sysurl from '../../system.config.js';
const data = reactive({
	navList1: [
		{ name: "课程表", imgPath: "../../static/function/class.png", pagePath:"../questionnaire/questionnaire_home"},
		{ name: "教室预约", imgPath: "../../static/function/classes.png", pagePath:"../questionnaire/questionnaire_home"},
		{ name: "导师互动", imgPath: "../../static/function/mentor.png", pagePath:"../questionnaire/questionnaire_home" },
		{ name: "更多", imgPath: "../../static/function/more.png", pagePath:"../questionnaire/questionnaire_home"}
	] ,
	navList2: [
		{ name: "问卷投票", imgPath: "../../static/function/questionnaire.png", pagePath:"../questionnaire/questionnaire_home"},
	    { name: "卫检成绩", imgPath: "../../static/function/score.png", pagePath:"../questionnaire/questionnaire_home"},
	    { name: "接诉即办", imgPath: "../../static/function/complaint.png" , pagePath:"../feedback/feedback"},
	    { name: "更多", imgPath: "../../static/function/more.png", pagePath:"../questionnaire/questionnaire_home"}
	 ],
	navList3:[
		{ name: "热水系统", imgPath: "../../static/function/water.png", pagePath:"../questionnaire/questionnaire_home"},
		{ name: "公寓用电", imgPath: "../../static/function/electricity.png", pagePath:"../questionnaire/questionnaire_home"},
		{ name: "失物招领", imgPath: "../../static/function/find.png" , pagePath:"../questionnaire/questionnaire_home"},
		{ name: "更多", imgPath: "../../static/function/more.png", pagePath:"../questionnaire/questionnaire_home"}
	],
})
onLoad(()=>{
    data.navList1 = [
		{ name: "课程表", imgPath: "../../static/function/class.png", pagePath:"../questionnaire/questionnaire_list/questionnaire_list"},
		{ name: "教室预约", imgPath: "../../static/function/classes.png", pagePath:"../questionnaire/questionnaire_list/questionnaire_list"},
		{ name: "导师互动", imgPath: "../../static/function/mentor.png", pagePath:"../questionnaire/questionnaire_list/questionnaire_list" },
		{ name: "更多", imgPath: "../../static/function/more.png", pagePath:"../questionnaire/questionnaire_list/questionnaire_list"}
    ] ,
	data.navList2 = [
		{ name: "问卷调查", imgPath: "../../static/function/questionnaire.png", pagePath:"../questionnaire/questionnaire_list/questionnaire_list"},
		{ name: "卫检成绩", imgPath: "../../static/function/score.png", pagePath:"../questionnaire/questionnaire_list/questionnaire_list"},
		{ name: "接诉即办", imgPath: "../../static/function/complaint.png" , pagePath:"../feedback/feedback"},
		{ name: "更多", imgPath: "../../static/function/more.png", pagePath:"../questionnaire/questionnaire_list/questionnaire_list"}
	],
	data.navList3 = [
		{ name: "热水系统", imgPath: "../../static/function/water.png", pagePath:"../questionnaire/questionnaire_list/questionnaire_list"},
		{ name: "公寓用电", imgPath: "../../static/function/electricity.png", pagePath:"../questionnaire/questionnaire_list/questionnaire_list"},
		{ name: "失物招领", imgPath: "../../static/function/find.png" , pagePath:"../questionnaire/questionnaire_list/questionnaire_list"},
		{ name: "更多", imgPath: "../../static/function/more.png", pagePath:"../questionnaire/questionnaire_list/questionnaire_list"}
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
	    justify-content: space-around;
	    margin: 10rpx;
	    border-radius: 20rpx;
	    /* background-color: #ffffff; */
	    box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1); /* 添加阴影 */
	  }
	  .nav-item {
	    border-radius: 16rpx; 
	    padding: 20rpx;
	    display: flex;
	    flex-direction: column;
	    align-items: center; 
	  	border: 0;
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
	      /* background-color: #ffffff; */
	      box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1); /* 添加阴影 */
		  font-size: 20px;
	    }

</style>