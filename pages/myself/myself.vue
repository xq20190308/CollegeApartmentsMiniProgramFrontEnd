<template>
	<view class="mask" v-if="data.userInfo.token===''">
		<view style="top: 400px;position: fixed;margin-left: 40px;">
			<button class="btn" style="text-align:center" @click="tologin('正在跳转')">
				<text>登录</text>
			</button>
		</view>
		<view style="top: 300px;position: fixed;margin-left: 40px;">
			<button class="btn" style="text-align:center" @click="tologin('正在跳转')">
				<text>注册</text>
			</button>
		</view>
	</view>
	<!--信息区域 -->
	<view style="padding-left: 10px;padding-right: 10px;">
		<!-- 头像昵称区域 -->
		<view class="User">
			<view><uni-file-picker limit="1" @select="selectUpload" file-mediatype="image" title=""
				ref="uniFilePicker" disable-preview :imageStyles="data.imageStyles" :del-icon='false' required>
				<view style="background-color: transparent;border-radius: 50%; width: 100px; height: 100%;" />
			</uni-file-picker><image :src="data.userInfo.avatarUrl" class="avatar" />
			</view>
			<text class="avatarName" >{{data.userInfo.nickName}}</text>
		</view>
		<!-- 功能区 -->
		<uni-section title="个人信息" type="line">
			<uni-list border-full>
				<uni-list-item showArrow title="姓名" :rightText="data.userInfo.trueName" />
				<uni-list-item showArrow title="学号" :rightText="data.userInfo.username" />
				<uni-list-item showArrow title="学院" rightText="计算机科学与工程学院学院" />
				<uni-list-item showArrow title="专业" rightText="软件工程" />
				<uni-list-item showArrow title="建言献策" />
				<uni-list-item showArrow title="关于" />
			</uni-list>
		</uni-section>
	</view>
	
	<!-- 退出登录 -->
	<view class="spacing"></view>
	<view style="margin-top: 40px;">
		<button class="btn" style="text-align:center" @click="delogin('退出登录影响功能的使用')">
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
const data = reactive({
	imageStyles: {
		border: {
			radius: '50%'
		}
	},
	userInfo: { //默认头像
		avatarUrl: '',
		nickName: '默认',
		token:null,
		username: "",
		trueName: "",
	},
	useravatarImg: "",
	func1_List: [],
})
const delogin=async (meg)=> {
	 uni.showModal({
	 	title: '提示',
	 	content: meg,
	 	success: (res) => {
	 		if (res.confirm) {
	 			clearUserInfo()
				wsclose();//退出登录后关闭socket连接
	 			data.userInfo.token=getLocalData("token")
	 			tologin("正在跳转")
	 		} else if (res.cancel) {
	 		}
	 	}
	 });
} 
const tologin=async (meg)=> {
		uni.showLoading({
			title: meg,
			mask:true,
		})
		setTimeout(() => {
			uni.hideLoading();
			uni.navigateTo({
				url: "/pages/login/loginPage"
			})
		}, 1000)
	} 
	const selectUpload = async (e)=>{
		console.log(e);
		await load('/user/uploadavatar',e.tempFilePaths[0],"avatar").then(
			(res1)=>{
				console.log("res1",res1);
				data.userInfo.avatarUrl = res1.data;
			}
		)
		await setLocalData('avatarUrl',data.userInfo.avatarUrl);
	}
onShow( async () => {
	data.userInfo.avatarUrl=getLocalData("avatarUrl")
	console.log('头像',data.userInfo.avatarUrl);
	data.userInfo.username=getLocalData("username")
	data.userInfo.trueName=getLocalData("trueName")
	data.userInfo.token=getLocalData("token")
	if(data.userInfo.token===""){
		uni.showModal({
			title: '提示',
			content: '未登录影响功能的使用',
			success: (res) => {
				if (res.confirm) { 
					tologin("正在跳转")
				} else if (res.cancel) { 
				}
			}
		});
	}
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
		background-color: #F3EBC9;
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
		background-color: #dd7d7d;
		color: white;
		width: 300px;
		height: 47px;
		border: 0;
		font-size: 16px;
		border-radius: 30px;
	}

	.spacing {
		height: 40rpx;
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