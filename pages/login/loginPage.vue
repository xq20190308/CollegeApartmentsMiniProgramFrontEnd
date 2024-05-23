<template>
	<view style="margin-left: 2%; white-space: nowrap; font-size: 12px;">
		<!-- <u-checkbox-group><u-checkbox @change="licenseDisagree = !licenseDisagree"></u-checkbox></u-checkbox-group> -->
		<checkbox-group @change="licenseDisagree = !licenseDisagree">
			<label>
				<checkbox :value="licenseDisagree" />
				<text>
					同意
				</text>
			</label>
		</checkbox-group>
		<text>
			我已阅读并同意
		</text>
		<text @click="showDeal1 = true" style="color: aqua; white-space: nowrap; font-size: 12px;">《用户服务协议》</text>
		<text style="white-space: nowrap; font-size: 12px;">及</text>
		<text @click="showDeal2 = true" style="color: aqua; white-space: nowrap; font-size: 12px;">《隐私政策》</text>
	</view>
	<button @click="loginConfirm(null,true)">
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



	let licenseDisagree = ref(true)
	let show = ref(false);
	// const showDeal1 = ref(false);
	// const showDeal2 = ref(false);
	// const title = ref("标题")
	// const avatarUrl = ref('');
	const userInfo = ref({})
	const neighborhoodName = ref('')
	const logCode = ref('');
	const phone = ref('');
	const isauthentic = ref('');
	const community_name = ref('');
	const islogin = ref('');
	const getUserInfo = (e) => {
		userInfo.value = e
	}

	const getCode = () => {
		return new Promise((resolve, reject) => {
			uni.login({
				provider: 'weixin',
				success(res) {
					logCode.value = res.code;
					resolve(logCode.value); // 表示异步操作成功
				},
				fail(err) {
					reject(err); // 表示异步操作失败
				},
			});
		});
	};



	const loginConfirm = async (userInfo, verify = false) => {
		//检查是否勾选 阅读同意所有要求
		if (licenseDisagree.value) {
			uni.showToast({
				title: "请先阅读并同意协议",
				icon: "error"
			})
			return false;
		}

		//获取code
		const code = await getCode();
		let userName = null;
		console.log("userInfo:", userInfo)
		if (userInfo) {
			userName = userInfo.name
			// neighborhoodName = userInfo.neighborhoodName
		}
		const req = {
			code,
			name: userName,
			// neighborhoodName,
			verify
		}
		console.log("req: ", req)
		//发送请求
		login(req).then(res => {
			if (res.msg == "success") {
				console.log("登陆成功")
				setLocalData("token", res.data.token)
				console.log("res", res.data.token)
				show.value = false
				uni.switchTab({
					url: "/pages/myself/myself"
				})
				uni.showToast({
					title: "登录成功"
				})
			} else {
				console.log("登陆失败msg!=success")
				if (verify) {
					show.value = true
					return
				}
				reject("error")
			}
		}).catch(err => {
			console.log("登陆失败")
			uni.showToast({
				title: "" + err,
				icon: "error"
			})
		})
		console.log("结束")
	}
</script>

<style lang="scss">

</style>