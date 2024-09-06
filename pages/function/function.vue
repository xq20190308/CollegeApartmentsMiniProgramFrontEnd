<template>
	<view class="banner">
		<view v-for="(item,index) in fun_type" :key="index" >
			<text class="nav-title">{{item.label}}</text>
			<view class="bar,func">
				<view class="nav-item" v-for="(funitem, i) in data.navList[item.value]" :key="i" @click="FunctionClick(funitem)">
					<image :src="funitem.imgPath" class="nav-img"></image>
					 <text class="nav-text">{{ funitem.name }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive} from "vue";
import { http } from "../../utils/http.js";
import { useUserStore } from "../../store/User.js"
import { handleMessageBar } from "../../utils/api/common.js"
import { useDict } from '../../utils/dict';
const fun_type = useDict('fun_type');
const store=useUserStore()
const data = reactive({
	navList: []
})
onShow(()=>{
	handleMessageBar(store.totalUnreceived)
})
onLoad(()=>{
	http("/menus","GET",{}).then((res)=>{
		res.data.forEach(item => {
			data.navList[item.typeId] = data.navList[item.typeId] || [];
			data.navList[item.typeId].push(item);
		});
	})
}) 
const FunctionClick=(item)=> {
	uni.navigateTo({
		url: item.pagePath
	})
}
</script>

<style>
</style>