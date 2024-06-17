<template>
  <view class="container">
    <view class="tabs">
      <view class="tab" :class="{'active': status === 'completed'}" @click="switchStatus('completed')">已完成</view>
      <view class="tab" :class="{'active': status === 'uncompleted'}" @click="switchStatus('uncompleted')">未完成</view>
    </view>
    <swiper class="swiper" :current="status === 'completed' ? 0 : 1" @change="onSwiperChange">
      <swiper-item class="swiper-item">
        <view>内容1 - 已完成</view>
      </swiper-item>
      <swiper-item class="swiper-item">
        <view>内容2 - 未完成</view>
      </swiper-item>
    </swiper>
  </view>
</template>
 
<script>
export default {
  data() {
    return {
      status: 'completed' // 默认为已完成状态
    };
  },
  methods: {
    switchStatus(newStatus) {
      this.status = newStatus;
    },
    onSwiperChange(e) {
      this.status = e.detail.current === 0 ? 'completed' : 'uncompleted';
    }
  }
};
</script>
 
<style>
.container {
  padding: 10px;
}
.tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.tab {
  padding: 5px;
  border: 1px solid #ccc;
  text-align: center;
  cursor: pointer;
}
.tab.active {
  background-color: #007aff;
  color: #fff;
}
.swiper {
  height: 100px;
}
.swiper-item {
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>