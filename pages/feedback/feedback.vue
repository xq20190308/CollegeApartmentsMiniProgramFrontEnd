<template>
	<view class="banner">
		<text class="underline-text" @click="lookFeed">已提交投诉</text><br/>
		<view class="notice-list">
		<view class="bar,barb" v-for="(item,index) in data.complaintDrafts" :key="index" >
		<uni-section title="草稿" type="line" >
			<template v-slot:right>
				<button @click="delet(item,index)" class="deletbutton">删除</button>
			</template>
			<view class="naireInfo" @click="change(item,index)">
				<view>时间：{{item.pushtime}}</view>
				<view>类别：{{item.category}}</view>
				<view>内容：{{item.describes}}</view>
				<view>联系电话：{{item.contactobject}}</view>
			</view>
		</uni-section>
		</view>
		</view>
	</view>
	<image class = "addnaireicon" src="../../static/feedback/plus.png" @click="onpress"></image>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
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
onLoad(()=> {
	store.tologin()
})
onShow(async()=>{
	await fetchComplaintDrafts();
	console.log('草稿箱:',data.complaintDrafts)
})
const lookFeed = ()=>{
	if(store.token==""){
		store.tologin()
	}else{
		goto('manageFeed','feedbackManage',{fun_advise_status: fun_advise_status.value})
	}
		
}
const fetchComplaintDrafts = async () => {
	data.complaintDrafts=getLocalData('feedDraft')?JSON.parse(getLocalData('feedDraft')):'';
}
const onpress=()=> {
	console.log("跳转到添加草稿，不需要携带id")
	uni.navigateTo({
		url: '../feedback/feedbackSubmit'
	});
}
const change=(item,index)=> {
	console.log("要修改inedx为",index,"的草稿")
	uni.navigateTo({
		url: '../feedback/feedbackSubmit?contactobject='+item.contactobject+
		'&describes='+item.describes+
		'&path0='+item.path+
		'&category='+item.category+
		'&index='+index,
	})
}
const delet=(item,index)=> {
	console.log("要删除id为",item.id,"的草稿")
	uni.showModal({
		title: '提示',
		content: '确认删除该通知吗',
		success: async (r) => {
			if (r.confirm) {
				//const res = await http('/api/deleteSuggestions/' + item.id,'DELETE',{},)
				data.complaintDrafts.splice(index,1);
				//console.log("data.complaintDrafts",data.complaintDrafts);
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


