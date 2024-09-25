//存一些数据
import { defineStore } from 'pinia'
import { reactive,ref,computed } from "vue";
export const useMentorStore = defineStore('Mentor', ()=>{
	const mentor_list=ref([])
	return {mentor_list}
})