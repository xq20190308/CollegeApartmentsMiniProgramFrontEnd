<template>
    <view style="padding: 10px ;margin-top: 5px;">
       <uni-segmented-control :current="data.current" :values="data.items" :style-type="data.styleType"
           :active-color="data.activeColor" @clickItem="onClickItem" />
        <view class="content">
            <view v-show="data.current === 0">
                选项卡1的内容
            </view>
            <view v-show="data.current === 1">
                选项卡2的内容
            </view>
            <view v-show="data.current === 2">
                选项卡3的内容
            </view>
        </view>
    </view>
</template>
<script setup>
	import {
	  onLoad,
	  onShow
	} from "@dcloudio/uni-app";
	import {
	  reactive
	} from "vue";
	import {
	  http
	} from '@/utils/http'
	const data = reactive({
	  items: ['待审核', '已通过', '已驳回'],
	  colors: ['#007aff', '#4cd964', '#dd524d'],
	  current: 0,
	  colorIndex: 0,
	  activeColor: '#007aff',
	  styleType: 'button',
	  AllItems: [],
	})
  const  onClickItem = (e)=> {
      if (data.current != e.currentIndex) {
        data.current = e.currentIndex;
      }
    }
</script>


<style>
	
</style>