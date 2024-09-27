<template>
	<view style="width: 95%; margin-left: 20rpx; margin-top: 20rpx;">
		<img src="https://william.fit:8082/static/default/schoolmark.jpg" style="width: 100%;height: 360rpx;">

		<view style="width:90%;margin-left: 38rpx;">
			<!-- 表单校验 -->
			<uni-forms ref="req" :rules="rules" :modelValue="reqdata" label-position="top">
				<uni-forms-item class="form-item" label="学号" required name="username">
					<!-- <uni-easyinput v-model="reqdata.username" placeholder="请输入学号" @input="debounceUsernameInput" /> -->
					<uni-easyinput v-model="reqdata.username" placeholder="请输入学号" />
				</uni-forms-item>
				<uni-forms-item class="form-item" label="密码" required name="password">
					<!-- <input placeholder="请输入密码" :value="reqdata.password"  @input="debouncePasswordInput" /> -->
					<!-- <uni-easyinput v-model="reqdata.password" placeholder="请输入密码" @input="debouncePasswordInput" /> -->
					<uni-easyinput v-model="reqdata.password" placeholder="请输入密码" />
				</uni-forms-item>
			</uni-forms>
		</view>
		<view style="font-size: 24rpx;top: 480rpx;width: 100%;margin-top: 120rpx;">
			<view style="display: flex;justify-content: center">
				<view style="margin-bottom: 10rpx;">
					<checkbox :value="licenseDisagree" @click="changeConfirm" />
				</view>
				<view style="padding-top: 10rpx;">
					<text style="f">我已阅读并同意</text>
					<text @click="showDeal1 = true" style="color: aqua; white-space: nowrap; ">《用户服务协议》</text>
					<text style="white-space: nowrap;">及</text>
					<text @click="showDeal2 = true" style="color: aqua; white-space: nowrap;">《隐私政策》</text>
				</view>
			</view>
			<view>
				<button type="primary"
					style="backgroundColor:#008cff; width:90%; margin-left: 38rpx; border-radius: 60rpx;"
					@click="loginConfirm('req')">点击登录</button>
			</view>
			<view>
				<button type="primary"
					style="backgroundColor:#008cff; width:90%; margin-left: 38rpx; border-radius: 60rpx;"
					@click="quicklogin()">快速登录</button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onLoad} from "@dcloudio/uni-app";
import { reactive, ref, computed, onMounted } from "vue";
import { login } from "/utils/login.js"
import {load,http} from "/utils/http.js"
import { wsclose,wsopen,wssend } from "/utils/socket.js";
import { useUserStore } from "/store/User.js"
// import { debounce } from 'lodash-es';//防抖
// 防抖函数
// const debounceUsernameInput = (value) => {
// 	reqdata.username=value
//   console.log('Username input:', reqdata.username);
// };

// const debouncePasswordInput = (value) => {
// 	reqdata.password=value;
//   console.log('Password input:', reqdata.password);
// };
const store = useUserStore()
// 校验规则
const rules = reactive({
		username: {
			rules: [{
				required: true,
				errorMessage: '请输入学号'
			}, //{
			// 	minLength: 12,
			// 	maxLength: 12,
			// 	errorMessage: '请输入12位学号'
			// }
			]
		},
		password: {
			rules: [{
				required: true,
				errorMessage: '请输入密码'
			}]
		}})
const reqdata = reactive({
		code: "",
		username: "",
		password: "",
	})
let licenseDisagree = ref(false)
let show = ref(false);
const neighborhoodName = ref('')
const logCode = ref('');
const phone = ref('');
const isauthentic = ref('');
const community_name = ref('');
const islogin = ref('');
onLoad(() => {
})
const getCode = () => {
	return new Promise((resolve, reject) => {
		uni.login({
			provider: 'weixin',
			success(res) {
				console.log("获得code",res)
				logCode.value = res.code;
				resolve(logCode.value); //表示异步操作成功
			},
			fail(err) {
				console.log("获得code失败",err)
				reject(err); // 表示异步操作失败
			},
		});
	});
};
const changeConfirm = (e) => {
	licenseDisagree.value = !licenseDisagree.value
}
//弹窗显示用户登录失败的信息提示
const returnerr = (msg) => {
	console.log(msg);
	uni.showModal({
		title: msg,
		showCancel: false,
	})
}
const quicklogin = async()=>{
		reqdata.code="",
		reqdata.username=uni.getStorageSync('lastusername'),
		reqdata.password=uni.getStorageSync('lastpassword'),
	licenseDisagree.value=true;
	//发送请求
	loginConfirm('req')
}
const req = ref()
const loginConfirm = async (ref) => {
	//获取code
	reqdata.code = await getCode();
	await req.value?.validate().then(async res1 => {
		//检查是否勾选 阅读同意所有要求
		if (!licenseDisagree.value) {
			uni.showToast({
				title: "请先阅读并同意协议",
				icon: "error"
			})
			return false;
		}
		//发送请求
		await login(reqdata).then(async (res) => {
			if (res.statusCode == 200) {
				if(res.data.msg!='success'){
					returnerr(res.data.msg);
					return ;
				}else{
					//用户登录请求成功后的数据存储
					await store.login(res.data.data)
					//保存用户账号密码用于下次登录
					uni.setStorageSync('lastusername',reqdata.username)
					uni.setStorageSync('lastpassword',reqdata.password)
					//登录后http请求聊天记录
					const history = await http('/message/history','GET',{})
					console.log("登录后http请求聊天记录",history)
					for (var i = 0; i < history.data.length; i++) {
						await store.handlemessage(history.data[i],1)
					}
					//把重登陆标记清除
					store.isRelogin=true;
					show.value = false
					uni.showToast({
						title: "登录成功"
					})
				}
			} else {
				console.log("登陆失败，请求状态码非200")
				uni.showToast({
					title: "登陆失败",
					icon: "error"
				})
			}
		})
	}).catch(err => {
		console.log('error', err);
	})
	console.log("结束")
}
</script>

<style lang="scss">

</style>