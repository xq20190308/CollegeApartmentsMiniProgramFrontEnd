<template>
	<view style="width: 95%; margin-left: 10px; margin-top: 10px;">
		<img src="../../static/home/swiper/schoolmark.jpg" style="width: 100%;height: 180px;">
		
		<view style="width:90%;margin-left: 19px;">
			<!-- 表单校验 -->
			<uni-forms ref="req" :rules="data.rules" :modelValue="data.reqdata" label-position="top">
				<uni-forms-item class="form-item" label="学号" required name="studentid">
					<uni-easyinput v-model="data.reqdata.studentid" placeholder="请输入学号" />
				</uni-forms-item>
				<uni-forms-item class="form-item" label="密码" required name="password">
					<uni-easyinput v-model="data.reqdata.password" placeholder="请输入密码" />
				</uni-forms-item>
			</uni-forms>
		</view>
		<view style="font-size: 12px;top: 240px;width: 100%;margin-top: 100px;">
			<view style="display: flex;justify-content: center">
				<view style="margin-bottom: 5px;">
					<checkbox :value="licenseDisagree" @click="changeConfirm"/>
				</view>
				<view style="padding-top: 5px;">
					<text style="f">我已阅读并同意</text>
					<text @click="showDeal1 = true" style="color: aqua; white-space: nowrap; ">《用户服务协议》</text>
					<text style="white-space: nowrap;">及</text>
					<text @click="showDeal2 = true" style="color: aqua; white-space: nowrap;">《隐私政策》</text>
				</view>
			</view>
			<view>
				<button type="primary" style="backgroundColor:#008cff; width:90%; margin-left: 19px; border-radius: 30px;"  @click="loginConfirm('req')">点击登录</button>
			</view>
		</view>
	</view>
</template>

<script setup>
import {onLoad} from "@dcloudio/uni-app";
import {reactive, ref,computed,onMounted} from "vue"; 
import {login} from "./api/login.js"
import {setLocalData} from "../../utils/cache.js"
// 校验规则
const data = reactive({
rules : {
	username: {
		rules: [{
			required: true,
			errorMessage: '请输入学号'
		}, {
			minLength: 12,
			maxLength: 12,
			errorMessage: '请输入12位学号'
		}]
	},
	password: {
		rules: [{
			required: true,
			errorMessage: '请输入密码'
		}]
	}
},
reqdata : {
	code:"",
	username: "",
	password: "",
},
})
let licenseDisagree = ref(false)
let show = ref(false);
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
onLoad(()=>{
	console.log("--",licenseDisagree.value);
})
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
const changeConfirm = (e)=>{
	console.log("--",licenseDisagree.value)
	licenseDisagree.value = !licenseDisagree.value
	console.log("++",licenseDisagree.value)
	}	
const req = ref()
const loginConfirm = async (ref) => {
	console.log("data.reqdata",data.reqdata)
	await req.value?.validate().then(async res1 => {
		//检查是否勾选 阅读同意所有要求
		if (!licenseDisagree.value) {
			uni.showToast({
				title: "请先阅读并同意协议",
				icon: "error"
			})
			return false;
		}
		//获取code
		data.reqdata.code = await getCode();
		console.log("req: ", req)
		/*console.log("userInfo:", userInfo)
		if (userInfo) {
			studentid = userInfo.studentid;
			password = userInfo.password;
		}*/
		//发送请求
		await login(data.reqdata).then((res) => {
			if (res.statusCode == 200) {
				console.log("登陆成功")
				console.log("res", res)
				setLocalData("token", res.data.token)
				console.log("token", res.data.token)
				show.value = false
				uni.showToast({
					title: "登录成功"
				})
				setTimeout(()=>{
				uni.switchTab({
					url: "/pages/myself/myself"
				})}, 2000)
			} else {
				console.log("登陆失败")
				reject("error")
			}
		}).catch(err => {
		console.log("登陆失败")
		uni.showToast({
			title: "" + err,
			icon: "error"
		})
	})
	}).catch(err => {
		console.log('填写错误', err);
	})
	console.log("结束")
}
</script>

<style lang="scss">

</style>