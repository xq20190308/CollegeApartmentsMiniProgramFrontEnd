import { getCurrentDate, getCurrentTime, getTimeStamp } from "../../../utils/time.js";
import {http} from '@/utils/http';
import { useLoginStore } from "../../../store/login.js";
import { useCourseStore } from "../../../store/study/course.js";
import { useDateStore } from "../../../store/date.js";
const termInfo=useDateStore()
const CourseStore = useCourseStore()
const loginInof = useLoginStore()
export const ComplaintDrafts = (index,refresh) => {
	// console.log("CourseStore.classDayData",CourseStore.classDayData)
	// console.log(refresh,CourseStore.classDayData[index].courses.length)
	if(CourseStore.classDayData[index].courses.length!=0&&!refresh){
		console.log("√index")
	}else{
		console.log("×index")
		// CourseStore.classTableData[index]={
		// 	curWeek: index,
		// 	weeks: termInfo.termData.timeTable[index],
		// 	courses: []
		// }
		if(loginInof.loginInfos.qz.login){
			http('/api/SelectCourse/'+index,'Post',{
				username: loginInof.qz.username,
				password: loginInof.qz.password
				// username:'202211070621',
				// password:'wyc.1024'
			},).then((res)=>{
				CourseStore.classDayData[index].courses = res.data?.map((day,index)=>{return day.map((course,i) => {return {
					info: course,
					code: course.kcmc.split('').reduce((sum,cur)=>sum+cur.charCodeAt(0)-'0',0)
				}})})
				CourseStore.updataCalssTableData(index,CourseStore.classDayData[index].courses)
				// console.log(CourseStore.classDayData[index])
			})
		}
	}
}
export const getCurWeek=()=>{
	let curT=getTimeStamp(getCurrentDate())
	let sarT=getTimeStamp(termInfo.termData.curTermStart)
	let DT=(curT-sarT)/1000/60/60/24+1
	console.log(Math.floor(DT))
	return Math.floor(DT/7)+1
}