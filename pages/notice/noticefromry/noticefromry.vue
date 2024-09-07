<template>
	<view>
		{{data.notice}}
	</view>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {http} from '@/utils/http'
import {getLocalData,delLocalData, setLocalData} from "../../../utils/cache.js"
import {reactive} from "vue";
import {goto} from "../../../utils/access.js"
import {getarticles} from "../../notice/api/getnotices.js"
const data = reactive({
	articles:[],
	individualarticles:[],
	catenotice:["个人通知","学校通知"],
	search_list:[],
	store_key:'notice_keywordlist',
	input_text:''
})
const onClickDelAll = (e)=>{
	//console.log(e)
}
const onSearchName = (e)=>{
	//在此添加关键词参数请求通知列表
	console.log(e)
	getarticles({keyword:e}).then(response => {
	  // 在这里处理数据
	  data.articles = response.sort((a, b) => a.id - b.id);
		console.log('response',response); // 输出: 这是返回的数据
	})
}
const todetail = (index) =>{
	console.log('index',index);
	uni.navigateTo({
		url:"../notice/noticedetail?id="+data.articles[index].id
	})
}
const deletenotice = async (index) =>{
	if(getLocalData('noticeManage')==true){
		//获取通知数据
		uni.showModal({
			title: '提示',
			content: '确认删除该通知吗',
			success: async (r) => {
				if (r.confirm) {
					const res = await http('/notifications/modify','POST',{
						id : data.articles[index].id,
						isActive: 0,
					},)
					getarticles({}).then(response => {
					  // 在这里处理数据
					  data.articles = response.sort((a, b) => a.id - b.id);;
						console.log('response',response); // 输出: 这是返回的数据
					})
					console.log("删除的res",res)
					console.log('用户点击确定');
				} else if (r.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}else{
		uni.showToast({
			title: "你没有权限",
			icon: "error"
		})
	}
}
onShow(()=>{
	getarticles({}).then(response => {
    // 在这里处理数据
    data.articles = response.sort((a, b) => a.id - b.id);
	})
})
onLoad((options) => {
	console.log("通知列表",data.articles);
})
</script>

<style>
	       
</style>
