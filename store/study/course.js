//存课程信息
import { defineStore } from 'pinia'
import { reactive,ref,computed } from "vue";
import { useDateStore } from "@/store/date.js";
const termInfo=useDateStore()
export const useCourseStore = defineStore('Course', ()=>{
	const classDayData = ref([])
	const classTableData = ref([]);
	const initCalssDayData = ()=>{
		for (var i = 1; i <= termInfo.WeekNum; i++) {
			// console.log("++",classTableData.value)
			classDayData.value[i]={
				curWeek: i,
				weeks: termInfo.termData.timeTable[i],
				courses: []
			}
		}
		console.log("初始化TableData",classDayData.value)
		classTableData.value=JSON.parse(JSON.stringify(classDayData.value))
		console.log("初始化DayData",classTableData.value)
	}
	initCalssDayData()
	const updataCalssTableData = (index,courses)=>{
		// 转置 courses
		const transposed = []
		for (let k = 0; k < 5; k++) {
			transposed[k]=[]
			for (let j = 0; j < 7; j++) {
				transposed[k][j]=courses[j][k]
			}
		}
		classTableData.value[index].courses=transposed;
	}
	const clear = ()=>{
		initCalssTableData()
		console.log("退出强智后的TableData",classTableData.value)
		console.log("退出强智后的课表classDayData",classDayData.value)
	}
	return {classTableData,clear,initCalssDayData,classDayData,updataCalssTableData}
})