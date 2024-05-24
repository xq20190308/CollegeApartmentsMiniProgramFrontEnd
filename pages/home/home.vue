<template>
    <view class="banner">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="4000" :duration="1000">
			<swiper-item v-for="(item, index) in bannerList" :key="index">
				<img :src="item.url" alt="" class="swiper-image" @click="bannerclick(index)">
				<view class="describe">{{this.articles[index].title}}</view>
			</swiper-item>
		</swiper>
		
		<!-- 主要功能区域 -->
		<view class="func1">
			<view class="func1_item" v-for="(item, i) in func_list" :key="i" @click="func1Click(item)">
				<image :src="item.imgPath" class="func1_img"></image>
				<text class="func1_text">{{ item.name }}</text>
			</view>
		</view>
		<!-- 未来倒计时 -->
		<view class="spacing"></view>
		<uni-card title="未来倒计时" sub-title="unique_words" thumbnail="../../../../static/home/future_icon.png">
			<text>这是分栏内容 {{ plan }}</text>
		</uni-card>
	</view>
</template>

<script>
	import sysurl from '../../system.config.js';
export default {
	data() {
		return {
			articles:[],
			bannerList: [],
			func_list: [
						{ name: "通知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" },
						{ name: "未知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" },
						{ name: "未知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" },
						{ name: "未知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" },
						{ name: "未知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" },
						{ name: "未知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" }
				],
			plan:["planA","planB"],	
		}
	},
	methods: {
		func1Click(item) {
			uni.reLaunch({
				url: item.pagePath
			})
		},
		getonearticle(){
			//获取通知数据
		   uni.request({
			    url: sysurl.developUrl +'/notifications',
			    method: 'GET',
			    success: (res) => {
					console.log("获得轮播图的数据",res);
					this.articles = res.data.data;
				   for (let i = this.articles.length; i < 2; i++) {
						this.articles.push({
							content: "Lorem",
							id: 87,
							isActive: true,
							publishTime: "1976-01-02 07:27:42",
							title: "学府属习",
							typeName: "律况平将体集题",
						   });
				   }//静态示例用于展示
					console.log("轮播图数据",this.articles);
					for (let i = 0; i < this.articles.length; i++) {
						this.bannerList.push({ url: "/static/home/swiper/schoolmark.jpg" });
					}
			    },
			    fail: (err) => {
			    	 console.error('Fetch error:', err);
			    }
		   });
		},
		bannerclick(index){
			console.log(this.articles);
			uni.navigateTo({
				url:'../notice/noticedetail?detail='+JSON.stringify(this.articles[index])
			})
		},
	},
  onLoad() {
		this.getonearticle();
  }
}
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
