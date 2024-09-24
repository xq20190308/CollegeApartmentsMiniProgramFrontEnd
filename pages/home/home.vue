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
	
	<!-- 未来倒计时 -->
	<uni-card title="未来倒计时" :sub-title="getCurrentDate()" margin="40rpx" width="50%" background="#c7e8fb" thumbnail="https://william.fit:8082/static/default/future_icon.png">
		<text v-for="(item,index) in data.plan" :key="index"> {{ data.plan[index] }}</text>
	</uni-card>
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
	staticpictures:[
		"https://img1.baidu.com/it/u=2786021056,112418886&fm=253&fmt=auto&app=120&f=JPEG?w=735&h=500",
		"https://img0.baidu.com/it/u=3286729325,3246720713&fm=253&fmt=auto&app=138&f=PNG?w=686&h=448",
		"https://img1.baidu.com/it/u=2043767765,404385374&fm=253&fmt=auto&app=138&f=JPEG?w=888&h=500",
		"https://img1.baidu.com/it/u=1163428398,2582932958&fm=253&fmt=auto&app=120&f=JPEG?w=779&h=500",
		"https://img0.baidu.com/it/u=3652594722,3615488402&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500",
		"https://img2.baidu.com/it/u=3568434744,2179779602&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500",
	],
	articles:[],
	navList:[],
	plan:["距离打工结束还有9999天\n","早上好\n","中午好\n","晚上好\n",],
})
// const func1Click=(item)=> {
// 	uni.navigateTo({
// 		url: item.pagePath
// 	})
// }
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
</style>
