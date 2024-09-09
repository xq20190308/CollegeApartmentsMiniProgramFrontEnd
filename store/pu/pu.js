//存pu信息
import { defineStore } from 'pinia'
import { reactive,ref,computed } from "vue";
export const usePuStore = defineStore('Pu', ()=>{
	const myPuInfo = ref({})
	return {myPuInfo}
})