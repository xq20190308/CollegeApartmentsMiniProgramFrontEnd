<template>
	<view class="mask" v-if="userInfo.token===''">
		
	</view>
	
	<!-- 头像昵称区域 -->
	<view class="User">
		<image :src="userInfo.avatarUrl" class="avatar" />
		<text class="avatarName">昵称</text>
	</view>

	<!-- 功能区 -->
	<uni-section title="个人信息" type="line">
		<uni-list border-full>
			<uni-list-item showArrow title="姓名" rightText="小萪" />
			<uni-list-item showArrow title="学号" rightText="202311071111" />
			<uni-list-item showArrow title="学院" rightText="莱文克劳学院" />
			<uni-list-item showArrow title="专业" rightText="黑魔法" />
			<uni-list-item showArrow title="建言献策" />
			<uni-list-item showArrow title="关于" />
		</uni-list>
	</uni-section>

	<!-- 退出登录 -->
	<view class="spacing"></view>
	<view style="margin-top: 40px;">
		<button class="btn" style="text-align:center" @click="delogin('正在退出')">
			<text>退出登录</text>
		</button>
	</view>
</template>

<script>
	import {
		getLocalData,
		delLocalData
	} from "../../utils/cache.js"
	export default {
		data() {
			return {
				userInfo: { //默认头像
					avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
					nickName: '',
					token:null,
				},
				useravatarImg: "",
				func1_List: []
			}
		},
		methods: {
			delogin(meg) {
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
		},
		onShow() {
			if(this.userInfo.token===""){
				uni.showModal({
					title: '提示',
					content: '未登录影响功能的使用',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.delogin("正在跳转")
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		},
		onLoad() {
			this.userInfo.token=getLocalData("token")
			console.log("this.userInfo.token",this.userInfo.token);
		}
	}
</script>

<style lang="scss">
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
		height: 150rpx;
		width: 150rpx;
		background-color: #ad7d7d;
		margin-left: 25rpx;
		margin-top: 25rpx;
		border-radius: 50%;
		/*圆形裁剪*/
	}

	.avatarName {
		margin-left: 45rpx;
		margin-top: 35rpx;
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