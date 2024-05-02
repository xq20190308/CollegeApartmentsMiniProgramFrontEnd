<template>
	<!-- 头像昵称区域 -->
	<view class="User">
		<image :src="userInfo.avatarUrl" class="avatar" />
		<text class="avatarName">昵称</text>
	</view>

	<!-- 功能区 -->
	<view class="func1">
		<view class="func1_list">
			<navigator class="func1_item" v-for="(item,i) in func1_List" :key="i" :url="item.navigator_url">
				<image :src="item.imgPath" class="func1_img"></image>
				<text class="func1_text">{{item.name}}</text>
			</navigator>
		</view>
	</view>

	<!-- 退出登录 -->
	<view>
		<button @click="">
			<text>退出登录</text>
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: { //默认头像
					avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
					nickName: '',
				},
				useravatarImg: "",
				func1_List: []
			}
		},
		methods: {

		}
		// onLoad() {
		// 	this.func1_List = [{
		// 			name: "个人信息",
		// 			imgPath: "../../static/self_func1_img/MyInformation.png",
		// 			navigator_url: "../../pagesOfMyself/self_information/self_information"
		// 		},
		// 		{
		// 			name: "业主认证",
		// 			imgPath: "../../static/self_func1_img/Owner.png",
		// 			navigator_url: "../../pagesOfMyself/Owner_Certified/Owner_Certified"
		// 		},
		// 		{
		// 			name: "我的通知",
		// 			imgPath: "../../static/self_func1_img/Information.png",
		// 			navigator_url: "../../pagesOfMyself/My_notification/My_notification"
		// 		},
		// 		{
		// 			name: "维修记录",
		// 			imgPath: "../../static/self_func1_img/Maintenance.png",
		// 			navigator_url: "../../pagesOfMyself/Repair_records/Repair_records"
		// 		},
		// 		{
		// 			name: "服务政策",
		// 			imgPath: "../../static/self_func1_img/Policy.png",
		// 			navigator_url: "../../pagesOfMyself/Service_Policy/Service_Policy"
		// 		}
		// 	]
		// }
	}
</script>

<style lang="scss">
	.User {
		display: flex;
		margin-top: 25rpx;
		margin-left: 3%;
		height: 200rpx;
		width: 94%;
		background-color: #e4e2e2;
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

	.SignOut {
		width: 90%;
		margin-top: 20rpx;
		margin-left: 5%;
		height: 100rpx;
	}
</style>