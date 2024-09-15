<template>
	<view class="banner">
		<text class="underline-text" @click="HandlegetMyPostList">{{showMyPosts?"返回":"我的假条"}}</text>
		<view class="bar,barb" v-if="!showMyPosts">
			<uni-section title="请假条" type="line">
			<!-- 表单校验 -->
			<uni-forms ref="valiForm" :rules="rules" :modelValue="newNaire" label-position="top">
				<uni-forms-item label="开始时间" name="startTime" required>
					<uni-datetime-picker v-model="newNaire.startTime" :clearIcon="false" />
				</uni-forms-item>
				<uni-forms-item label="结束时间" name="endTime" required>
					<uni-datetime-picker v-model="newNaire.endTime" :clearIcon="false" />
				</uni-forms-item>
				<uni-forms-item label="类型" name="isOut" required>
					<uni-data-checkbox v-model="newNaire.isOut" :localdata="fun_leave_type" :map="data.map1"/>
				</uni-forms-item>
				<uni-forms-item label="原因" name="reason">
					<uni-easyinput type="textarea" autoHeight v-model="newNaire.reason" placeholder="请输入原因" />
				</uni-forms-item>
				<uni-forms-item label="审核人" name="reviewerId" required>
					<uni-data-select
						  v-model="newNaire.reviewerId"
						  :localdata="reviewers"
						></uni-data-select>
					<!-- <uni-easyinput autoHeight v-model="newNaire.reviewerId" placeholder="" /> -->
				</uni-forms-item>
				<uni-forms-item label="附件上传" name="file">
					<uni-file-picker :modelValue="file" limit="1" @select="selectUpload"
						file-mediatype="all" title="">
						<button type="primary" size="mini">选择文件</button>
					</uni-file-picker>
				</uni-forms-item>
			</uni-forms>
			</uni-section>
			<button class="submitBnt,smallBnt" @click="submit">提交请假条</button>
		</view>
		<view v-else class="notice-list">
			<uni-card v-for="(item,index) in postList" :key="index" @click="goto('./leaveDetail','',{info:item})"
				 :title="item.reason?item.reason:'请假条'" :sub-title="item.updatedAt">
				 <template v-slot:extra>
					<uni-tag :inverted="true" :text="status[item.status].label" :type="status[item.status].class" />
				 </template>
				<view class="naireInfo">
					<view>开始时间：{{item.startTime}}</view>
					<view>结束时间：{{item.endTime}}</view>
					<view>审核人：{{item.reviewerName}}</view>
					<view>最后一次处理时间：{{item.createdAt}}</view>
				</view>
			</uni-card>
		</view>
	</view>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import { reactive,ref,computed } from "vue";
import { useDict } from "../../utils/dict.js";
import { getReviewers } from "../mentor/api/mentor.js";
import { http, load } from "../../utils/http.js";
import { useUserStore } from "../../store/User.js";
import { getMyPostList } from "./api/leave.js"
import { goto } from "../../utils/access.js";
const store = useUserStore()
const fun_leave_type=useDict('fun_leave_type')
useDict('fun_leave_post_status')
const showMyPosts = ref(false)
const data = reactive({
	map1: {text:'label',value:'value'},
	fun_leave_post_status:[]
})
const newNaire=ref({
	startTime:'',
	endTime:'',
	reason:'',
	isOut: '',
	reviewerId:'',
})
const status=ref({})
const file = ref([])
const reviewers = ref([])
const postList=ref([])
const valiForm=ref()
const HandlegetMyPostList=()=>{
	data.fun_leave_post_status = useDict('fun_leave_post_status')
	console.log(data.fun_leave_post_status)
	status.value = data.fun_leave_post_status.reduce((acc, item) => {
	  acc[item.value] = { ...item };
	  delete acc[item.value].value;
	  return acc;
	}, {});
	console.log("status.value",status.value)
	if(!showMyPosts.value){
		getMyPostList(store.user.userid).then((res)=>{
			showMyPosts.value=true;
			postList.value=res.data.map((post,index)=>{
				post.createdAt=post.createdAt?.replace("T"," ")
				post.updatedAt=post.updatedAt?.replace("T"," ")
				return {
					...post,
					reviewerName:reviewers.value.find((item,index)=>{return item.value===post.reviewerId})?.text
				}
			})
			console.log(postList.value)
		})		
	}else{
		showMyPosts.value=false
	}
}
const selectUpload = (e)=>{
	console.log("e",e)
	file.value.push(e.tempFilePaths[0])
	console.log(file.value)
}

const reset=()=>{
	newNaire.value={
		startTime:'',
		endTime:'',
		reason:'',
		isOut: '',
		reviewerId:'',
	}
	file.value=[]
}
const submit = async()=>{
	console.log(newNaire.value)
	valiForm.value?.validate(['']).then(async r=>{
		console.log("校验通过",r)
		let files = ''
		for(let i=0;i<file.value.length;i++){
			const res = await load('/leavePosts/uploadFiles',file.value[i],'files',{})
			console.log("上传文件",res.data)
			files=files+files?',':''+res.data
		}
		
		http('/leavePosts/addLeavePost','POST',{...newNaire.value,
			userId:store.user.userid,
			trueName:store.user.trueName,
			file:files
		}).then((res)=>{
			console.log(res)
			reset()
		})
	}).catch((err)=>{
		console.log("校验不通过",err)
	})
	
}
const rules=ref({
	startTime: {
		rules: [{
			required: true,
			errorMessage: '请选择'
		}]
	},
	endTime: {
		rules: [{
			required: true,
			errorMessage: '请选择'
		}]
	},
	isOut: {
		rules: [{
			required: true,
			errorMessage: '类型不能为空'
		}]
	},
	reviewerId:{
		rules: [{
			required: true,
			errorMessage: '请选择'
		}]
	},
})
onLoad(()=>{
	getReviewers(2).then((res)=>{
		console.log("导员：",res)
		reviewers.value=res.data.map((item,index)=>{
			return {text:item.trueName,value:item.userId}
		})
	})
})
</script>

<style>

</style>
