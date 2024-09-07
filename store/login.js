//缓存各平台账号密码
import { defineStore } from 'pinia'
import { http } from '../utils/http.js'
import { reactive,ref,computed } from "vue";

export const useLoginStore = defineStore('Login', ()=>{
	const InitLoginInfo = ()=>{
		qz.value=uni.getStorageSync("qzInfo")
		console.log('监听其他平台登录信息')
		uni.$on("loginInfoUp",(Info)=>{
			if(Info.title==="强智系统"){
				console.log("强智系统登录更新")
				qz.value=Info.reqdata
				uni.$emit("qzUp",qz.value)
			}
		})
	}
	const qz=ref({
		username: null,
		password: null
	})
	return {InitLoginInfo,qz}
})