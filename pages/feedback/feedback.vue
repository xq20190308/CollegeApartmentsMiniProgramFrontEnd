<template>
	<view class="banner">
		<text class="underline-text" @click="goto('manageFeed',{fun_advise_status: fun_advise_status})">已提交投诉</text>
		<view class="notice-list">
		<view class="bar,barb" v-for="(item,index) in data.complaintDrafts" :key="index" >
		<uni-section title="草稿" type="line" >
			<template v-slot:right>
				<button @click="delet(item,index)" class="deletbutton">删除</button>
			</template>
			<view class="naireInfo" @click="goto('../feedback/feedbackSubmit',{baseFormData:item,index:index})">
				<view>时间：{{item.pushtime}}</view>
				<view>类别：{{item.category}}</view>
				<view>内容：{{item.describes}}</view>
				<view>联系电话：{{item.contactobject}}</view>
			</view>
		</uni-section>
		</view>
		</view>
	</view>
	<image class = "addnaireicon" src="/static/feedback/plus.png" @click="goto('../feedback/feedbackSubmit')"></image>
</template>

<script setup>
import {onLoad,onShow,onPullDownRefresh} from "@dcloudio/uni-app";
import {reactive,computed} from "vue";
import {http} from '@/utils/http'
import {goto} from "../../utils/access.js"
import {getLocalData,setLocalData} from "../../utils/cache.js"
import {getCurrentTime} from '@/utils/time'
import { useUserStore } from "../../store/User.js";
import { useDict } from '../../utils/dict';
useDict('fun_advise_type');
const fun_advise_status = useDict('fun_advise_status')
const data = reactive({
	complaintDrafts: [], // 初始为空数组
})
const store = useUserStore()
const fetchComplaintDrafts = () => {
	data.complaintDrafts=getLocalData('feedDraft')?JSON.parse(getLocalData('feedDraft')):'';
	console.log('草稿箱:',data.complaintDrafts)
}
onPullDownRefresh(()=>{
	console.log("下拉刷新")
	fetchComplaintDrafts()
	setTimeout(()=>{
		uni.stopPullDownRefresh()
	},500)
})
onLoad(()=> {
	uni.startPullDownRefresh();
})
onShow(()=>{
})
const delet=(item,index)=> {
	console.log("要删除index为",index,"的草稿")
	uni.showModal({
		title: '提示',
		content: '确认删除该草稿吗',
		success: async (r) => {
			if (r.confirm) {
				data.complaintDrafts.splice(index,1);
				setLocalData('feedDraft',data.complaintDrafts)
				fetchComplaintDrafts();
			} else if (r.cancel) {
				console.log('用户点击取消');
			}
		}
	});
}
</script>

<style> 
</style>


