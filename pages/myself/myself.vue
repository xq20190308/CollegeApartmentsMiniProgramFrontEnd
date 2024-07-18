<template>
	<view class="mask" v-if="store.token==''">
		<my-login></my-login>
	</view>
	<!--信息区域 -->
	<view style="padding-left: 10px;padding-right: 10px;">
		<!-- 头像昵称区域 -->
		<view class="User">
			<view><uni-file-picker limit="1" @select="selectUpload" file-mediatype="image" title=""
				ref="uniFilePicker" disable-preview :imageStyles="data.imageStyles" :del-icon='false' required>
				<view style="background-color: transparent;border-radius: 50%; width: 100px; height: 100%;" />
			</uni-file-picker><image :src="store.avatar" class="avatar" />
			</view>
			<text class="avatarName" >{{store.user.nickName}}</text>
		</view>
		<!-- 功能区 -->
		<uni-section title="个人信息" type="line">
		<view style="border-radius: 20px;overflow: hidden;">
				<uni-list border-full>
					<uni-list-item showArrow title="姓名" :rightText="store.user.trueName" />
					<uni-list-item showArrow title="学号" :rightText="store.user.username" />
					<uni-list-item showArrow title="校区" :rightText="store.user.classInfo.campusName" />
					<uni-list-item showArrow title="学院" :rightText="store.user.classInfo.collegeName" />
					<uni-list-item showArrow title="班级" :rightText="store.user.classInfo.majorName+store.user.classInfo.gradeName+store.user.classInfo.className" />
					<uni-list-item showArrow title="宿舍" :rightText="store.user.dormitory" />
					<uni-list-item showArrow title="建言献策" />
					<uni-list-item showArrow title="关于" />
				</uni-list>
		</view>
		</uni-section>
	</view>
	
	<!-- 退出登录 -->
	<view class="spacing"></view>
	<view style="margin-top: 40rpx;">
		<button class="btn" style="text-align:center" @click="()=>{store.delogin();}">
			<text>退出登录</text>
		</button>
	</view>
</template>

<script setup>
import { onLoad, onShow} from "@dcloudio/uni-app";
import { getLocalData, setLocalData, delLocalData, clearUserInfo } from "../../utils/cache.js"
import { reactive } from "vue";
import {load,http} from "../../utils/http.js"
import { wsclose,wsopen,wssend } from "../../utils/socket.js";
import { } from "../../utils/socket.js";
import { useUserStore } from "../../store/User.js"
import { storeToRefs } from 'pinia'
const data = reactive({
	imageStyles: {
		border: {
			radius: '50%'
		}
	},
	func1_List: [],
})
const store = useUserStore()

const selectUpload = async (e)=>{
	console.log(e);
	await load('/user/uploadavatar',e.tempFilePaths[0],"avatar").then(
		(res1)=>{
			console.log("res1",res1);
			store.avatar = res1.data;
		}
	)
	await setLocalData('avatarUrl',store.avatar);
}
onShow( async () => {
	if(store.token!=""){
		if(store.isRelogin){
			let total = store.totalUnreceived
			uni.$emit('upgradeUnreceivedNum',total)
			store.isRelogin=false;
		}
	}else{
		// uni.showModal({
		// 	title: '提示',
		// 	content: '未登录影响功能的使用',
		// 	success: (res) => {
		// 		if (res.confirm) { 
		// 			tologin("正在跳转")
		// 		} else if (res.cancel) { 
		// 		}
		// 	}
		// });
	}
	let total=store.totalUnreceived
	if(total){
		uni.setTabBarBadge({
			index: 2,
			// tabIndex，tabbar的哪一项，从0开始
			text: String(total).length > 2 ? "99+" : String(total)
			// 显示的文本，超过99显示成99+
		});					
	}else{
		uni.removeTabBarBadge({
			index:2
		})
	}
	// if(socketMsgQueue.length>0){
	// 	uni.setTabBarBadge({
	// 		index: 2,
	// 		// tabIndex，tabbar的哪一项，从0开始
	// 		text: String(socketMsgQueue.length).length > 2 ? "99+" : String(socketMsgQueue.length)
	// 		// 显示的文本，超过99显示成99+
	// 	});
	// }
})
onLoad(()=>{
}) 
</script>

<style lang="scss" scoped>
	::v-deep .uni-file-picker{
		position: absolute;
		width: 100px;
		height: 100px;
		z-index: 100;
		.uni-file-picker__container {
			width: 100%;
			height: 100%;
			.file-picker__box{
				top:5px;
				left: 3px;
				width: 95%!important;
				height: 100%!important;
				.file-picker__box-content {
					.file-image{
						-webkit-mask-image: url('../../static/tabBar/home_icon.png');
						opacity: 0;
					}
					.file-picker__progress {
						display: none!important;
					}
				}
			}
		}
	}
	.User {
		display: flex;
		margin-top: 25rpx;
		margin-left: 3%;
		height: 200rpx;
		width: 94%;
		background-color: #c9e8f35e;;
		border-radius: 35rpx;
	}

	.avatar {
		position: relative;
		background-color: #ad7d7d;
		border-radius: 50%;
		width: 83px;
		height: 83px;
		top: 9px;
	    left: 5px;
		/*圆形裁剪*/
	}

	.avatarName {
		margin-left: 45rpx;
		margin-top: 35rpx;
		width: 60%;
	}

	.func1 {
		margin-top: 25rpx;
	}

	.func1_list {
		display: flexbox;
		flex-wrap: wrap;
	}

	.func1_item {
		margin-left: 5%;
		width: 90%;
		height: 120rpx;
		display: flex;
		justify-content: left;
		border-bottom: 1rpx solid #efefef;
		background-color: #cfcfcf;
		border-radius: 30rpx;
	}

	.func1_img {
		width: 70rpx;
		height: 70rpx;
		margin-top: 25rpx;
		margin-left: 20rpx;
	}

	.func1_text {
		font-size: 35rpx;
		color: white;
		margin-left: 15rpx;
		margin-top: 35rpx;
	}

	.btn {
		background-color: #e4fdff78;
		color: #000000c2;
		width: 300px;
		height: 47px;
		border: 0;
		font-size: 16px;
		border-radius: 30px;
	}

	.spacing {
		height: 20rpx;
		background-color: transparent;
	}
	.mask {
	  position: fixed;
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  background-color: #fff; // 半透明遮罩
	  z-index: 999; /* 确保遮罩在其他内容之上 */
	}
</style>