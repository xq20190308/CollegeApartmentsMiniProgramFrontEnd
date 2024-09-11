//存课程信息
import { defineStore } from 'pinia'
import { reactive,ref,computed } from "vue";
export const useCourseStore = defineStore('Course', ()=>{
	const classTableData = ref([])
	return {classTableData}
})