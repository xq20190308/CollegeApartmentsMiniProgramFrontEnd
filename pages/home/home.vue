

<template>
  <view class="banner">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="4000" :duration="1000">
      <swiper-item v-for="(item, index) in bannerList" :key="index">
        <img :src="item.url" alt="" class="swiper-image">
      </swiper-item>
    </swiper>
		<view class="spacing"></view>
		
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
export default {
  data() {
    return {
      bannerList: [
        { url: "/static/home/swiper/schoolmark.jpg" },
        { url: "/static/home/swiper/schoolmark.jpg" },
        { url: "/static/home/swiper/schoolmark.jpg" },
        { url: "/static/home/swiper/schoolmark.jpg" }
      ],
      func_list: [
				{ name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" },
				{ name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" },
				{ name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" },
				{ name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" },
				{ name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" },
				{ name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" }
			] 
			
    }
  },
	methods: {
		func1Click(item) {
			uni.reLaunch({
				url: item.pagePath
			})
		}
	},
  onLoad() {
    this.func_list = [ 
      { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" },
      { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" },
      { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" },
      { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" },
      { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" },
      { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" }
    ]
  }
}
</script>

<style>
.banner {
  margin: 20rpx;
}

.swiper-image {
  width: 100%;
  height: 100%;
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
