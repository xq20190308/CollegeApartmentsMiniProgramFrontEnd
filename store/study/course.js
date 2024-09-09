//存课程信息
import { defineStore } from 'pinia'
import { reactive,ref,computed } from "vue";
import { useDateStore } from "@/store/date.js";
const termInfo=useDateStore()
export const useCourseStore = defineStore('Course', ()=>{
	const classTableData = ref([])
	const initCalssTableData = ()=>{
		for (var i = 1; i <= termInfo.WeekNum; i++) {
			// console.log("++",classTableData.value)
			classTableData.value[i]={
				curWeek: i,
				weeks: termInfo.termData.timeTable[i],
				courses: []
			}
		}
		console.log("++",classTableData.value)
	}
	initCalssTableData()
	const clear = ()=>{
		initCalssTableData()
		console.log("退出强智后的课表",classTableData.value)
	}
	return {classTableData,clear,initCalssTableData}
})