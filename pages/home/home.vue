<template>
	import { swiper, swiperItem } from 'uni-simple-router';

  <view class="banner">
    <!-- 是否轮播:indicator-dots  自动播放:autoplay  间隔周期:interval  动画执行周期:duration -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="8000" :duration="1000">
      <swiper-item v-for="(item, index) in bannerList" :key="index">
        <img :src="item.url" alt="">
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      bannerList: [
        { url: "static/swiper/swiper_school.jpg" },
        { url: "static/swiper/swiper_school.jpg" },
        { url: "static/swiper/swiper_school.jpg" },
        { url: "static/swiper/swiper_school.jpg" }
      ]
    };
  }
};
</script>

<style>
/* 在这里可以添加一些自定义样式 */
</style>
