//缓存各平台账号密码
import { defineStore } from 'pinia'
import { http } from '../utils/http.js'
import { reactive,ref,computed } from "vue";
export const useLoginStore = defineStore('Login', ()=>{
	const InitLoginInfo = ()=>{
		qz.value=uni.getStorageSync("qzInfo")
		pu.value=uni.getStorageSync("puInfo")
		console.log('监听其他平台登录信息')
		uni.$on("loginInfoUp",(Info)=>{
			if(Info.title==="强智系统"){
				console.log("强智系统登录更新")
				qz.value=Info.reqdata
				uni.setStorageSync("qzInfo",qz.value)
				console.log(qz.value)
				console.log(loginInfos.value.qz.login)
				uni.$emit("qzUp",loginInfos.value.qz.login)
			}
			if(Info.title==="pu口袋校园"){
				console.log("pu口袋校园登录更新")
				pu.value=Info.reqdata
				uni.setStorageSync("puInfo",pu.value)
				uni.$emit("puUp",loginInfos.value.qz.login)
			}
		})
	}
	const loginInfos = computed(() => ({
		qz: {
			title: "强智系统",
			loginurl: "/api/Login",
			login: qz.value.username!=null&&qz.value.password!=null,
			...qz.value
		  },
		pu: {
			title: "pu口袋校园",
			loginurl: "/api/login",
			login: pu.value.username!=null&&pu.value.password!=null,
			...pu.value
		  },
	}));
	const qz=ref({
		username: null,
		password: null
	})
	const pu=ref({
		username: null,
		password: null
	})
	const unbind = (key)=>{
		console.log(key)
		console.log(loginInfos.value[key].title)
		uni.showModal({
			title: "确定解绑",
			content: loginInfos.value[key].title+"账号？",
			success: (res) => {
				if(res.confirm){
					uni.$emit("loginInfoUp",{
						title:loginInfos.value[key].title,
						reqdata:{
							username:null,
							password:null
						},
					})
				}else{
					console.log("取消解绑")
				}
			}
		})
		
	}
	const modify = (key)=>{
		console.log(key)
		console.log(loginInfos.value[key].title)
		tologin(loginInfos.value[key].title)
	}
	const tologin = (title) => {
		let url = ""
		for(let info in loginInfos.value){
			if(loginInfos.value[info].title===title){
				url = loginInfos.value[info].loginurl
			}
		}
		uni.navigateTo({
			url: "/pages/dict/dict?title="+title+"&url="+url,
		})
	}
	return {InitLoginInfo,qz,pu,loginInfos,unbind,modify,tologin}
})