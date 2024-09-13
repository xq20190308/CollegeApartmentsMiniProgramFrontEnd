<template>
	<view class="banner">
		<view class="notice-list">
			<view class="bar,barb" v-for="(item,index) in data.complaintDrafts" :key="index">
				<uni-section :title="item.category" sub-title="" type="line">
					<template v-slot:right>
						<uni-tag :inverted="true" :text="map[item.status].label" :type="map[item.status].class" />
					</template>
					<view class="naireInfo" @click="look(item)">
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
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive,computed, ref} from "vue";
import {http} from '@/utils/http'
import {goto} from "../../utils/access.js"
import { useDict } from "../../utils/dict.js";
const data = reactive({
	complaintDrafts: [], // 初始为空数组
})
const map =ref([])
onLoad((options)=> {
	// 页面加载时获取数据
	var option=JSON.parse(options.options)
	map.value = option.fun_advise_status.reduce((acc, item) => {
	  acc[item.value] = { ...item };
	  delete acc[item.value].value;
	  return acc;
	}, {});
	
})
onShow(()=>{
	fetchComplaintDrafts();
})
const fetchComplaintDrafts = async () => {
	const res = await http('/api/manageSuggestions','GET',{},)
	data.complaintDrafts=res//与问卷的返回不同
	//console.log("data.complaintDrafts",data.complaintDrafts)
}
const look=(item)=> {
	//console.log(item.id)
	uni.navigateTo({
		url: '../feedback/showFeed?info='+JSON.stringify(item),
	})
}
</script>




<style>
</style>


