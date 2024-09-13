import { defineStore } from 'pinia'
import { reactive,ref,computed } from "vue";
import { getCourseDate } from '../utils/time';
import { beforeTime,afterTime } from '../utils/time';
export const useDateStore = defineStore('Date', ()=>{
	const termData = reactive({
	  curTermStart: '2024-08-26',
	  timeTable: [[]],
	  weeks: ['Mon','Tue','Wed','Thur','Fri','Sat','Sun']
	})
	const WeekNum = ref(19)
	for (var i = 1; i <= WeekNum.value; i++) {
		termData.timeTable.push([])
		for (var j = 0; j < 7; j++) {
			let date = getCourseDate(termData.curTermStart,(i-1)*7+j)
			termData.timeTable[i].push({
				date: date,
				day: termData.weeks[j]
			})
		}
	}
	const getSweekFromTime = (time)=>{
		console.log("time",time)
		for(let i=0;i<termData.timeTable.length;i++){
			console.log("第",i,"周开始：",termData.timeTable[i][0]?.date)
			if(beforeTime(time,termData.timeTable[i][6]?.date)){
				console.log("从第",i,"周开始")
				return i
			}
		}
	}
	const getEweekFromTime = (time)=>{
		console.log("time",time)
		for(let i=0;i<termData.timeTable.length;i++){
			console.log("第",i,"周结束：",termData.timeTable[i][6]?.date)
			if(afterTime(termData.timeTable[i][6]?.date,time)){
				console.log("到第",i,"周结束")
				return i
			}
		}
	}
	
	console.log(termData.timeTable)
	return {termData,WeekNum,getSweekFromTime,getEweekFromTime}
})