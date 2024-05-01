

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
  </view>
</template>

<script>
export default {
  data() {
    return {
      bannerList: [
        { url: "/static/swiper/schoolmark.jpg" },
        { url: "/static/swiper/schoolmark.jpg" },
        { url: "/static/swiper/schoolmark.jpg" },
        { url: "/static/swiper/schoolmark.jpg" }
      ],
      func_list: [] // 初始化 func_list 为一个空数组
    }
  },
  onLoad() {
    this.func_list = [ 
      { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself" },
			 { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself" },
			  { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself" }
      // 其他功能项...
    ];
  },
  methods: {
    func1Click(item) {
      // 处理点击事件
    }
  }
}
</script>

<style>
.banner {
  /* 添加一些边距 */
  margin: 20rpx;
}

.swiper-image {
  /* 让图片占满整个swiper区域 */
  width: 100%;
  height: 100%;
}

.func1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20rpx;
  border-radius: 20rpx;
  background-color: #ffffff;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

.func1_item {
  width: calc(25% - 20rpx); /* 减去边距 */
  margin-bottom: 20rpx; /* 添加底部边距 */
  border-radius: 16rpx; /* 添加圆角 */
  background-color: #f5f5f5;
  padding: 20rpx;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1); /* 添加内部阴影 */
}

.func1_img {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 10rpx;
}

.func1_text {
  font-size: 28rpx;
  color: #333333;
  text-align: center;
}

.spacing {
  height: 20rpx; 
  background-color: transparent; 
</style>
