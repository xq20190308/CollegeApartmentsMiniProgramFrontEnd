<template>
	<bannerVue :showLoading="showLoading" :showType="showType" :loadingMsg="loadingMsg">
	<!-- 轮播图区域 -->
	<view>
	<swiper class="swiper" :autoplay="true" :interval="4000" :duration="1000">
		<swiper-item class="swiper-item" v-for="(item, index) in data.articles" :key="index">
			<view>
				<img class="swiper-image" :src="'https://william.fit:8082/static/scroll/'+index%11+'.jpg'">			
			</view>
		</swiper-item> 
	</swiper>
	</view>
	<view class="scroll-fun">
		<view class="scroll-fun-item" v-for="(funitem, i) in data.navList" :key="i" @click="FunctionClick(funitem)">
			<image :src="funitem.imgPath" class="scroll-fun-img"></image>
			 <text class="scroll-fun-text">{{ funitem.name }}</text>
		</view>
	</view>
	<view class="card-bar">
	<!-- <uni-notice-bar class="notice-bar" show-icon scrollable background-color="#f7c7c7" color="#000" :speed="50"
	:single="false" :text="store.noticeList.length?store.noticeList[store.noticeList.length-1].data:'欢迎光临'" /> -->
	<view class="notice-bar">
	<u-notice-bar @click="bannerclick" bgColor="#f7c7c7" :text="titles" direction="column" color="#000" ></u-notice-bar>
	</view>
	<!-- 未来倒计时 -->
	<uni-card title="未来倒计时" :sub-title="getCurrentDate()" background="#c7e8fb" thumbnail="https://william.fit:8082/static/default/future_icon.png">
		<uni-calendar :selected="test" />
		<!-- <text v-for="(item,index) in data.plan" :key="index"> {{ data.plan[index] }}</text> -->
	</uni-card>
	<!-- <view class="card-single-bar" style="flex-direction: column;">
		<view class="single" v-for="(funitem, i) in data.navList" :key="i" @click="FunctionClick(funitem)">
			<image :src="funitem.imgPath" class="scroll-fun-img"></image>
			 <text class="single-fun-text">{{ funitem.name }}</text>
		</view> -->
	</view>
	</bannerVue>
</template>

<script setup>
import { onLoad,onShow,onPullDownRefresh } from "@dcloudio/uni-app";
import { computed, ref, reactive } from "vue";
import { getarticles } from "../notice/api/getnotices.js"
import { getCurrentDate } from '@/utils/time'
import { useUserStore } from "../../store/User.js"
import { handleMessageBar } from "../../utils/api/common.js"
import { http } from "../../utils/http.js";
import bannerVue from '../../components/banner/banner.vue';
import { showLoading, showType, loadingMsg,resetRefresh,startRefresh } from "../../main.js";
const test = ref([{date: '2024-10-27', info: '签到', data: { custom: '自定义信息', name: '自定义消息头'}}])
onPullDownRefresh(()=>{
	startRefresh()
	getarticles({ typeName : '主页'}).then(res => {
		data.articles = res.data.sort((a, b) => a.id - b.id);
		for (let i = 0; i < data.articles.length; i++) {
			data.articles[i].url = "/static/home/swiper/schoolmark.jpg";
		}
		resetRefresh()
	})
	http("/menus","GET",{}).then((res)=>{
		data.navList=res.data.filter((item)=>{return item.typeId==='1'})
	})
})
const store=useUserStore()
const data = reactive({
	articles:[],
	navList:[],
	plan:["距打工结束还有9999天\n","早上好\n","中午好\n","晚上好\n",],
})
const bannerclick=(index)=>{
	console.log(data.articles[index])
	uni.navigateTo({
		url:'../notice/noticedetail?id=' + data.articles[index].id
	})
}
const titles=computed(()=>{
	return data.articles.map((item)=>{
		return item.title
	})
})
onLoad(()=>{ 
	uni.startPullDownRefresh()
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
		padding: 10rpx;
		display: flex;
		flex-direction: row;
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
	.single-fun-text{
		font-size: 28rpx;
		color: #736969;
		text-align: center;
		align-items: center;
	}
	.card-bar{
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: stretch;
		position: relative;
		gap: 20rpx;
	}
	.card-single-bar{
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin: 10rpx;
		align-items: stretch;
		gap: 10rpx;
	}
	.single{
		flex-direction: row;
		gap: 30rpx;
		background: #c7e8fb;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		padding: 15rpx;
		box-shadow: 0 1px 5px rgba(0, 0, 0, 0.12);
	}
</style>
