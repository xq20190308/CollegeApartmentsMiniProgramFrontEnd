<template>
    <view class="banner">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="4000" :duration="1000">
			<swiper-item v-for="(item, index) in data.articles" :key="index">
				<img :src="item.url" alt="" class="swiper-image" @click="bannerclick(index)">
				<view class="describe">{{data.articles[index].title}}</view>
			</swiper-item>
		</swiper>
		<!-- 主要功能区域 -->
		<view class="func1">
			<view class="func1_item" v-for="(item, i) in data.func_list" :key="i" @click="func1Click(item)">
				<image :src="item.imgPath" class="func1_img"></image>
				<text class="func1_text">{{ item.name }}</text>
			</view>
		</view>
		<!-- 未来倒计时 -->
		<view class="spacing"></view>
		<uni-card title="未来倒计时" sub-title="unique_words" thumbnail="../../../../static/home/future_icon.png">
			<text v-for="(item,index) in data.plan" :key="index"> {{ data.plan[index] }}</text>
		</uni-card>
	</view>
</template>

<script setup>
import {onLoad} from "@dcloudio/uni-app";
import {reactive} from "vue";
import {http} from '@/utils/http'
import {getarticles} from "../notice/api/getnotices.js"
import {getCurrentTime} from '@/utils/time'

const data = reactive({
	articles:[],
	func_list: [
				{ name: "通知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" },
				{ name: "未知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" },
				{ name: "未知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" },
				{ name: "未知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" },
				{ name: "未知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" },
				{ name: "未知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" }
		],
	plan:[
		"距离打工结束还有9999天\n",
		"早上好\n",
		"中午好\n",
		"晚上好\n",],	
})
const func1Click=(item)=> {
	uni.reLaunch({
		url: item.pagePath
	})
}
const bannerclick=(index)=>{
	console.log(data.articles);
	uni.navigateTo({
		url:'../notice/noticedetail?id=' + data.articles[index].id
	})
}

onLoad(()=>{ 
	// 使用函数并打印结果
	console.log(getCurrentTime());
	getarticles({ typeName : '主页'}).then(response => {
		// 在这里处理数据
		data.articles = response.sort((a, b) => a.id - b.id);
		console.log('response',response);//输出:这是返回的数据
		for (let i = 0; i < data.articles.length; i++) {
			data.articles[i].url = "/static/home/swiper/schoolmark.jpg";
		}
		console.log('data.articles',data.articles); 
})})
</script>

<style>
.banner {
  margin: 20rpx;
}

.swiper-image {
  width: 100%;
  height: 120px;
}
.describe{
	height: 20px;
}
.func1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 15rpx;
  border-radius: 20rpx;
  /* background-color: #ffffff; */
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

.func1_item {
  width: calc(25% - 20rpx);
  margin-bottom: 20rpx; 
  border-radius: 16rpx; 
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center; 
	border: 0;
}

.func1_img {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 10rpx;
  border-radius: 50%; 
	
}

.func1_text {
  font-size: 28rpx;
  color: #333333;
  text-align: center;
}
.thumbnail{
	 margin-left: 20rpx; 
}

</style>
