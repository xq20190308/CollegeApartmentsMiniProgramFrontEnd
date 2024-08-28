//缓存各平台账号密码
import { defineStore } from 'pinia'
import {http} from '../utils/http.js'
import { reactive,ref,computed } from "vue";
export const useLoginStore = defineStore('Login', ()=>{
	const qz=reactive({
		username: null,
		password: null
	})
	return {qz}
})