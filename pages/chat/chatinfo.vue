<template>
	<!--信息区域 -->
	<view class="banner">
		<!-- 头像昵称区域 -->
		<view class="User,bar">
			<image class="avatar" :src="data.info.avatarUrl" />
			<text style="margin:50rpx;align-self:center;">{{data.info.trueName}}</text>
		</view>
		<!-- 功能区 -->
		<uni-section title="个人信息" type="line">
			<uni-list class="bar">
				<uni-list-item title="姓名" :rightText="data.info.trueName" />
				<uni-list-item title="联系电话" :rightText="data.info.phone" />
				<uni-list-item title="邮箱" :rightText="data.info.email" />
			</uni-list>
		</uni-section>

		<view class="btnview" style="width: 96%;">
			<button type="primary" class="btn" style="backgroundColor:#008cff;" @click="()=>{gotochat()}">
				<text>发消息</text>
			</button>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		reactive
	} from "vue";
	import {
		http
	} from '@/utils/http'
	const data = reactive({
		info: {},
		back: false,
	})
	const gotochat = () => {
		if (data.back) {
			uni.navigateBack()
		} else {
			let info = {
				trueName: data.info.trueName,
				userid: data.info.userid,
				avatarUrl: data.info.avatarUrl,
				unreceivedNum: 0
			}
			uni.navigateTo({
				url: '/pages/chat/chat?info=' + JSON.stringify(info)
			})
		}
	}
	onLoad(async (options) => {
		let userid = JSON.parse(options.info).userid
		const res = await http('/user/findByUserid?userid=' + userid, 'GET', {}, )
		data.info = res.data
		data.back = options.back == "true" ? true : false
		uni.setNavigationBarTitle({
			title: data.info.trueName
		});
		console.log("发来消息的人的信息", data.info, "back:", data.back);
	})
</script>

<style lang="scss" scoped>
	::v-deep .uni-list {
		width: 100%;
	}

	.avatar {
		background-color: #ad7d7d;
		border-radius: 50%;
		width: 150rpx;
		height: 150rpx;
		top: 18rpx;
		left: 10rpx;
		margin: 10rpx;
	}
</style>