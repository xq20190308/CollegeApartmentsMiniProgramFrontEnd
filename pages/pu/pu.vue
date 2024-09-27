<template>
	<view class="banner">
		<auiLoadingVue 
		  :SHOW="showLoading" 
		  :msg="'加载中'"
		  :styles="{background:'transparent',color:'#000'}"
		  :type="3"
		  image="../../static/success.png"
		></auiLoadingVue>
		<view v-if="myinfo" class="bar,barb" v-for="(item,key) in puInfo.myPuInfo" :key="key">
		<uni-section type="line" :title="key">
			<text class="text-common">{{item}}</text>
		</uni-section>
		</view>
		<uni-card v-else v-for="(item,index) in pulist" :key="index" 
		 :title="title(item.name)" :sub-title="collegeName(item.name)" :extra="item.startTimeValue+'\n'+item.joinUserCount+'/'+item.allowUserCount" :thumbnail="item.logo">
		<!-- allowJoinCount: 0
		allowUserCount: 200
		credit: 1
		endTime: "2024-09-12 17:00:00"
		id: 244500929118210
		joinStartTime: "2024-09-11 17:00:00"
		joinType: 1
		joinUserCount: 136
		logo: "https://img.pocketuni.net//lzlg/sys_pic/activity_ddxy.png"
		name: "【测绘学院】《时代文学》校园行·走进山东科技大学"
		puAmount: 0
		puType: 0
		signType: 1
		startTime: "2024-09-12 15:00:00"
		startTimeValue: "报名已结束"
		statusName: "已结束"
		work_upload: 0 -->
			<!-- <text class="text-common">报名状态：{{item.startTimeValue}}</text> -->
			<!-- <text class="text-common">活动状态：{{item.statusName}}</text> -->
			<text class="text-bottom-left,text-bottom">报名开始时间：{{item.joinStartTime}}</text>
			<text class="text-bottom-left,text-bottom">活动时间：{{item.startTime}}至{{item.endTime}}</text>
			<!-- <uni-list-item title="查看详情" showArrow></uni-list-item> -->
			<view slot="actions" class="card-actions">
				<view class="card-actions-item" @click="toJoinActivity(item.id)">
					<uni-icons type="fire" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">报名</text>
				</view>
				<!-- <view class="card-actions-item">
					<uni-icons type="heart" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">点赞</text>
				</view>
				<view class="card-actions-item">
					<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">评论</text>
				</view> -->
			</view>
		</uni-card>
	</view>
</template>

<script setup>
import { onLoad, onShow, onPullDownRefresh,onReachBottom} from "@dcloudio/uni-app";
import { useLoginStore } from "@/store/login.js";
import { getPuInfo,getPuActivities,joinActivity } from "./api/pu.js"
import { usePuStore } from "@/store/pu/pu.js";
import { ref } from "vue";
import auiLoadingVue from "../../components/aui-loading/aui-loading.vue";
const puInfo = usePuStore()
const loginInof = useLoginStore()
const myinfo=ref(false)
const pulist=ref([])
const requestPage=ref(1)
// 计算属性用于提取学院名称
const collegeName = (name) => {
  const pattern = /【(.*?)\】/;
  const match = name.match(pattern);
  // console.log("1",match)
  return match ? match[1] : '';
};

// 计算属性用于提取标题信息
const title = (name) => {
  const pattern = /【(.*?)】(.*)/;
  const match = name.match(pattern);
  // console.log("2",match)
  return match ? match[2].trim() : name;
};
uni.$on("puUp",()=>{
	console.log(loginInof.pu)
	getPuInfo()
})
onShow(() => {
})
onLoad(()=>{
	if(loginInof.loginInfos.pu.login){
		console.log(loginInof.pu)
		getPuInfo()
		uni.startPullDownRefresh()
	}
	else{
		loginInof.tologin("pu口袋校园")
	}
}) 
const showLoading=ref(false)
const toJoinActivity = (id)=>{
	showLoading.value=true
	joinActivity(id).then((res)=>{
		showLoading.value=false
		uni.showToast({
			title:res.message,
			icon:res.code?'error':'success',
			// image:"../../../static/tabBar/home_icon.png"
		})
	}).catch((err)=>{
		showLoading.value=false
		uni.showToast({
			title:"错误",
			icon:'error'
		})
	})
}
onPullDownRefresh(()=>{
	console.log("下拉刷新")
	requestPage.value=1
	getPuActivities(requestPage.value).then((res)=>{
		pulist.value=res
		requestPage.value++
		setTimeout(()=>{
			uni.stopPullDownRefresh()
		},500)
	})
})
onReachBottom(()=>{
    console.log("上拉加载")
	getPuActivities(requestPage.value).then((res)=>{
		setTimeout(()=>{
			pulist.value=pulist.value.concat(res)
			requestPage.value++
		},500)
	})
})
</script>

<style>
</style>