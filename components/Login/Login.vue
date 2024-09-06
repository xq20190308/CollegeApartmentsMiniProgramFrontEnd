<template>
	<view style="width: 95%; margin-left: 20rpx; margin-top: 20rpx;">
		<img src="../../static/home/swiper/schoolmark.jpg" style="width: 100%;height: 360rpx;">
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
			<view>
				<button type="primary"
					style="backgroundColor:#008cff; width:90%; margin-left: 38rpx; border-radius: 60rpx;"
					@click="loginConfirm('req')">点击登录{{props.title}}</button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { reactive, ref } from "vue";
import { http } from "../../utils/http.js"
import { useLoginStore } from "../../store/login.js";
const loginInof = useLoginStore()
const props = defineProps({
  url: {
    type: String,
	default: "/api/obtainCourse"
    // required: true
  },
  title: {
	  type: String,
	  default: "强智系统"
  }
});
// 校验规则
const rules = reactive({
	username: {
		rules: [{
			required: true,
			errorMessage: '请输入学号'
		}]
	},
	password: {
		rules: [{
			required: true,
			errorMessage: '请输入密码'
		}]}
})
const reqdata = reactive({
	username: "",
	password: "",
})
const req = ref()
const loginConfirm = async (ref) => {
	await req.value?.validate().then(async valid => {
		await http(props.url,'POST',{
			username:reqdata.username,
			password:reqdata.password
		},).then((res) => {
				console.log(res)
				uni.$emit("loginInfoUp",{
					title: props.title,
					reqdata: reqdata
				})
				uni.navigateBack()
			}).catch(err => {
				console.log('error', err);
			})
	}).catch(err => {console.log("填写不正确")})
}
</script>

<style lang="scss">

</style>