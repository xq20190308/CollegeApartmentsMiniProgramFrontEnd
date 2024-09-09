import { getCurrentDate, getCurrentTime, getTimeStamp } from "../../../utils/time.js";
import {http} from '@/utils/http';
import { useLoginStore } from "../../../store/login.js";
import { useCourseStore } from "../../../store/study/course.js";
import { useDateStore } from "../../../store/date.js";
const termInfo=useDateStore()
const CourseStore = useCourseStore()
const loginInof = useLoginStore()
export const ComplaintDrafts = (index,refresh) => {
	console.log("CourseStore.classTableData",CourseStore.classTableData)
	console.log(refresh,CourseStore.classTableData[index].courses.length)
	if(CourseStore.classTableData[index].courses.length!=0&&!refresh){
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
				CourseStore.classTableData[index].courses = res.data?res.data:[]
				console.log(CourseStore.classTableData[index])
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