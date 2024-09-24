<template>
	<view class="banner">
		<view class="notice-list">
			<view class="bar,barb" v-for="(item,index) in data.feedbacks" :key="index">
				<uni-section :title="item.category" sub-title="" type="line">
					<template v-slot:right>
						<uni-tag :inverted="true" :text="map[item.status].label" :type="map[item.status].class" />
					</template>
					<view class="naireInfo" @click="goto('../feedback/showFeed?',JSON.stringify(item))">
						<!-- <view>学号：{{item.stu_id}}</view> -->
						<view>时间：{{item.pushtime.replace("T"," ")}}</view>
						<view>类别：{{item.category}}</view>
						<view>内容：{{item.describes}}</view>
						<view>联系电话：{{item.contactobject}}</view>
					</view>
				</uni-section>
			</view>
		</view>
	</view>
</template>

<script setup>
import {onLoad,onShow,onPullDownRefresh} from "@dcloudio/uni-app";
import {reactive,computed, ref} from "vue";
import {goto} from "../../utils/access.js"
import { useDict,mapDict } from "../../utils/dict.js";
import { fetchFeedbacks } from "./api/feedback.js";
const data = reactive({
	feedbacks: [], // 初始为空数组
})
const map =ref([])
onLoad((options)=> {
	options=JSON.parse(options.info)
	map.value = mapDict(options.fun_advise_status)
	uni.startPullDownRefresh();
})
onShow(()=>{
})
onPullDownRefresh(()=>{
	console.log("下拉刷新")
	fetchFeedbacks().then((res)=>{
		data.feedbacks=res
	})
	setTimeout(()=>{
		uni.stopPullDownRefresh()
	},500)
})
</script>




<style>
</style>


