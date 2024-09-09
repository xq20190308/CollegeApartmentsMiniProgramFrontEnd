<template>
	<view class="mask" v-if="store.token==''">
		<my-login></my-login>
	</view>
	<!--信息区域 -->
	<view v-else class="banner">
		<!-- 头像昵称区域 -->
		<view class="User,bar">
			<uni-file-picker limit="1" @select="selectUpload" file-mediatype="image" title="" disable-preview
			ref="uniFilePicker" return-type="object" :modelValue="filelist" :imageStyles="imageStyles" :del-icon='false' required>
			</uni-file-picker>
			<text class="avatarName" >{{store.user.trueName}}</text>
		</view>
		<!-- 功能区 -->
		<uni-section title="个人信息" type="line">
			<uni-list class="bar">
				<uni-list-item title="姓名" :rightText="store.user.trueName" />
				<uni-list-item title="学号" :rightText="store.user.username" />
				<uni-list-item title="校区" :rightText="store.user.classInfo.campusName" />
				<uni-list-item title="学院" :rightText="store.user.classInfo.collegeName" />
				<uni-list-item title="班级" :rightText="store.user.classInfo.majorName+store.user.classInfo.gradeName+store.user.classInfo.className" />
				<uni-list-item title="宿舍" :rightText="store.user.dormitory" />
				<uni-list-item :showArrow="true" title="建言献策" />
				<uni-list-item :showArrow="true" title="关于" />
			</uni-list>
		</uni-section>
		
		<button class="btn"  @click="()=>{store.delogin();}">
			<text>退出登录</text>
		</button>
	</view>
</template>

<script setup>
import { onLoad, onShow} from "@dcloudio/uni-app";
import { setLocalData } from "../../utils/cache.js"
import { computed, ref } from "vue";
import { load, http } from "../../utils/http.js"
import { handleMessageBar } from "../../utils/api/common.js"
import { useUserStore } from "../../store/User.js"
const store = useUserStore()
const filelist=computed(()=>([{
	url: store.avatarUrl,
	extname: 'png',
	name: 'avatarUrl.png'
}]))
filelist.value.push()
const imageStyles = ref({
	width: 100,
	height: 100,
	border: {
		radius: '50%'
	}
})

const selectUpload = (e)=>{
	load('/user/uploadavatar',e.tempFilePaths[0],"avatar").then(
		(res)=>{
			console.log("res",res);
			store.avatarUrl = res.data;
		}
	)
	setLocalData('avatarUrl',store.avatarUrl);
}
onShow( async () => {
	if(store.token!=""){
		if(store.isRelogin){
			let total = store.totalUnreceived
			uni.$emit('upgradeUnreceivedNum',total)
			store.isRelogin=false;
		}
	}else{
	}
	handleMessageBar(store.totalUnreceived)
})
onLoad(()=>{
	
}) 
</script>

<style lang="scss" scoped>
	::v-deep .uni-file-picker {
		width: 200rpx!important;
	}
	::v-deep .uni-section{
		width: 100%;
	}
	::v-deep .uni-list{
		width: 100%;
	}
	.User {
		height: 200rpx;
	}
	.avatarName {
		margin-left: 45rpx;
		margin-top: 35rpx;
	}


</style>