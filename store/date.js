import { defineStore } from 'pinia'
import { reactive,ref,computed } from "vue";
import { getCourseDate } from '../utils/time';
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
	
	console.log(termData.timeTable)
	return {termData,WeekNum}
})