<template>
	<!-- 轮播图区域 -->
	<swiper class="swiper" :autoplay="true" :interval="4000" :duration="1000">
		<swiper-item class="swiper-item" v-for="(item, index) in data.articles" :key="index">
			<img :src="'https://william.fit:8082/static/scroll/'+index%11+'.jpg'" alt="" class="swiper-image" @click="bannerclick(index)">
			<!-- <view class="swiper-title">{{data.articles[index].title}}</view> -->
		</swiper-item> 
	</swiper>
	<view class="scroll-fun">
		<view class="scroll-fun-item" v-for="(funitem, i) in data.navList" :key="i" @click="FunctionClick(funitem)">
			<image :src="funitem.imgPath" class="scroll-fun-img"></image>
			 <text class="scroll-fun-text">{{ funitem.name }}</text>
		</view>
	</view>
	<uni-notice-bar class="notice-bar" show-icon scrollable background-color="#f7c7c7" color="#000" :speed="50"
	:single="true" :text="store.noticeList.length?store.noticeList[store.noticeList.length-1].data:'欢迎光临'" />
	<!-- <view class="card-bar"> -->
	<!-- 未来倒计时 -->
	<uni-card title="未来倒计时" width="50%" :sub-title="getCurrentDate()" margin="40rpx" background="#c7e8fb" thumbnail="https://william.fit:8082/static/default/future_icon.png">
		<!-- <uni-calendar /> -->
		<text v-for="(item,index) in data.plan" :key="index"> {{ data.plan[index] }}</text>
	</uni-card>
	<!-- <view class="card-bar" style="flex-direction: column;margin: 0rpx;"> -->
	<!-- <uni-card background="#c7e8fb">
	</uni-card>
	<uni-card background="#c7e8fb">
		<text v-for="(item,index) in data.plan" :key="index"> {{ data.plan[index] }}</text>
	</uni-card> -->
	<!-- </view> -->
	<!-- </view> -->
</template>

<script setup>
import { onLoad,onShow } from "@dcloudio/uni-app";
import { reactive } from "vue";
import { getarticles } from "../notice/api/getnotices.js"
import { getCurrentDate } from '@/utils/time'
import { useUserStore } from "../../store/User.js"
import { handleMessageBar } from "../../utils/api/common.js"
import { http } from "../../utils/http.js";
const store=useUserStore()
const data = reactive({
	articles:[],
	navList:[],
	plan:["距打工结束还有9999天\n","早上好\n","中午好\n","晚上好\n",],
})
const bannerclick=(index)=>{
	uni.navigateTo({
		url:'../notice/noticedetail?id=' + data.articles[index].id
	})
}

onLoad(()=>{ 
	// 使用函数并打印结果
	getarticles({ typeName : '主页'}).then(response => {
		data.articles = response.sort((a, b) => a.id - b.id);
		for (let i = 0; i < data.articles.length; i++) {
			data.articles[i].url = "/static/home/swiper/schoolmark.jpg";
		}
	})
	http("/menus","GET",{}).then((res)=>{
		data.navList=res.data.filter((item)=>{return item.typeId==='1'})
	})
})
const FunctionClick=(item)=> {
	uni.navigateTo({
		url: item.pagePath
	})
}
onShow(()=>{
	handleMessageBar(store.totalUnreceived)
})
</script>

<style>
	.scroll-fun{
		flex-wrap: wrap;
		padding: 0rpx;
		position: absolute;
		width: 80%;
		margin: 0rpx 75rpx;
		top: 330rpx;
		display: flex;
		height: 140rpx;
		background: #597fbe;
		border-radius: 20rpx;
	}
	.scroll-fun-item{
		border-radius: 16rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 0;
		width: 25%;
		padding-top: 15rpx;
	}
	.scroll-fun-img{
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}
	.scroll-fun-text{
		font-size: 28rpx;
		color: #ffffff;
		text-align: center;
		align-items: center;
	}
	.card-bar{
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 10rpx;
		margin: 20rpx;
		align-items: center;
	}
</style>
