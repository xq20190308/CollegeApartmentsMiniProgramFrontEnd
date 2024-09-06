<template>
	<view class="banner">
		<!-- 轮播图区域 -->
		<swiper class="swiper,bar" :autoplay="true" :interval="4000" :duration="1000">
			<swiper-item class="swiper-item" v-for="(item, index) in data.articles" :key="index">
				<img :src="data.staticpictures[index%6]" alt="" class="swiper-image" @click="bannerclick(index)">
				<view class="swiper-title">{{data.articles[index].title}}</view>
			</swiper-item> 
		</swiper>
		<uni-notice-bar class="bar" show-icon scrollable background-color="#fff" color="#000" :speed="50"
		:single="true" :text="store.noticeList.length?store.noticeList[store.noticeList.length-1].data:'欢迎光临'" />
		<view class="func,bar">
			<view class="func_item" v-for="(item, i) in data.func_list" :key="i" @click="func1Click(item)">
				<image :src="item.imgPath" class="func_img"></image>
				<text class="func_text">{{ item.name }}</text>
			</view>
		</view>
		<!-- 未来倒计时 -->
		<uni-card title="未来倒计时" :sub-title="getCurrentDate()" thumbnail="../../../../static/home/future_icon.png">
			<text v-for="(item,index) in data.plan" :key="index"> {{ data.plan[index] }}</text>
		</uni-card>
	</view>
</template>

<script setup>
import { onLoad,onShow } from "@dcloudio/uni-app";
import { reactive } from "vue";
import { getarticles } from "../notice/api/getnotices.js"
import { getCurrentDate } from '@/utils/time'
import { useUserStore } from "../../store/User.js"
import { handleMessageBar } from "../../utils/api/common.js"
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
	func_list: [
		{ name: "导师互动", imgPath: "../../static/function/mentor.png", pagePath:"../mentor/mentor" },
		{ name: "通知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" },
		{ name: "接诉即办", imgPath: "../../static/function/complaint.png" , pagePath:"../feedback/feedback"},
		{ name: "字典", imgPath: "../../static/function/complaint.png" , pagePath:"../dict/dict?title=测试"},
	],
	plan:["距离打工结束还有9999天\n","早上好\n","中午好\n","晚上好\n",],	
})
const func1Click=(item)=> {
	uni.navigateTo({
		url: item.pagePath
	})
}
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
})
onShow(()=>{
	handleMessageBar(store.totalUnreceived)
})
</script>

<style>
</style>
