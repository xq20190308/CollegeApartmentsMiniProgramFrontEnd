<template>
	<view style="margin-left: 2%; white-space: nowrap; font-size: 12px;">
		<text>
			我已阅读并同意
		</text>
		<text @click="showDeal1 = true" style="color: aqua; white-space: nowrap; font-size: 12px;">《用户服务协议》</text>
		<text style="white-space: nowrap; font-size: 12px;">及</text>
		<text @click="showDeal2 = true" style="color: aqua; white-space: nowrap; font-size: 12px;">《隐私政策》</text>
	</view>
	<button @loginConfirm>
		点击登录
	</button>
</template>

<script setup>
	import {
		ref,
		computed,
		onMounted
	} from 'vue';
	import {
		login
	} from "./api/login.js"
	import {
		setLocalData
	} from "../../utils/cache.js"


	const loginConfirm = async (userInfo, verify = false) => {
		if (licenseDisagree.value) {
			uni.showToast({
				title: "请先阅读并同意协议",
				icon: "error"
			})
			return false;
		}
		const code = await getCode();
		let userName = null;
		let neighborhoodName = null;
		if (userInfo) {
			userName = userInfo.name
			neighborhoodName = userInfo.neighborhoodName
		}
		const req = {
			code,
			name: userName,
			neighborhoodName,
			verify
		}
		login(req).then(res => {
			if (res.msg == "success") {
				setLocalData("token", res.data.token)
				show.value = false
				uni.switchTab({
					url: "/pages/mine/mine"
				})
				uni.showToast({
					title: "登录成功"
				})
			} else {
				if (verify) {
					show.value = true
					return
				}
				reject("error")
			}
		}).catch(err => {

			uni.showToast({
				title: "" + err,
				icon: "error"
			})
		})
	}
</script>

<style lang="scss">

</style>