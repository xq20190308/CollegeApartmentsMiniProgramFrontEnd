<template>
	<bannerVue :showLoading="showLoading" :showType="showType" :loadingMsg="loadingMsg">
		<view v-for="(item,index) in fun_type" :key="index" >
			<text class="nav-title">{{item.label}}</text>
			<view class="bar,func">
				<view class="nav-item" v-for="(funitem, i) in data.navList[item.value]" :key="i" @click="FunctionClick(funitem)">
					<image :src="funitem.imgPath" class="nav-img"></image>
					 <text class="nav-text">{{ funitem.name }}</text>
				</view>
			</view>
		</view>
	</bannerVue>
</template>

<script setup>
import {onLoad,onShow,onPullDownRefresh} from "@dcloudio/uni-app";
import {reactive,ref} from "vue";
import { http } from "../../utils/http.js";
import { useUserStore } from "../../store/User.js"
import { handleMessageBar } from "../../utils/api/common.js"
import { useDict } from '../../utils/dict';
import bannerVue from '../../components/banner/banner.vue';
import { showLoading, showType, loadingMsg,resetRefresh,startRefresh } from "../../main.js";
const fun_type = useDict('fun_type');
useDict('fun_questionnare_type')
const store=useUserStore()
const data = reactive({
	navList: []
})
onShow(()=>{
	handleMessageBar(store.totalUnreceived)
})
onPullDownRefresh(()=>{
	startRefresh()
	http("/menus","GET",{}).then((res)=>{
		resetRefresh()
		data.navList=[]
		res.data.forEach(item => {
			data.navList[item.typeId] = data.navList[item.typeId] || [];
			data.navList[item.typeId].push(item);
		});
	})
})
onLoad(()=>{
	uni.startPullDownRefresh();
}) 
const FunctionClick=(item)=> {
	uni.navigateTo({
		url: item.pagePath
	})
}
</script>

<style>
</style>