import { getCurrentDate, getCurrentTime, getTimeStamp } from "/utils/time.js";
import {http} from '/utils/http';
import { useLoginStore } from "/store/login.js";
import { useCourseStore } from "/subPackage1/store/study/course.js";
import { useDateStore } from "/subPackage1/store/date.js";
const termInfo=useDateStore()
const CourseStore = useCourseStore()
const loginInof = useLoginStore()
export const ComplaintDrafts = async(index,refresh) => {
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
			//保证res对应正确
			const res = await http('/api/SelectCourse/'+index,'Post',{
				username: loginInof.qz.username,
				password: loginInof.qz.password
				// username:'202211070621',
				// password:'wyc.1024'
			},)
			/* const res = {
				"code": 1,
				"msg": "success",
				"data": [
					[
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						},
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						},
						{
							"jsxm": "张晓庆",
							"jsmc": "J7-418室",
							"jssj": "15:50",
							"kssj": "14:00",
							"kkzc": "9-15",
							"kcsj": "10506",
							"kcmc": "计算机图形学",
							"sjbz": "0"
						},
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						},
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						}
					],
					[
						{
							"jsxm": "倪丽娜",
							"jsmc": "J7-104室",
							"jssj": "09:50",
							"kssj": "08:00",
							"kkzc": "12-19",
							"kcsj": "20102",
							"kcmc": "软件项目管理",
							"sjbz": "0"
						},
						{
							"jsxm": "倪维健",
							"jsmc": "J7-418室",
							"jssj": "12:00",
							"kssj": "10:10",
							"kkzc": "9-17",
							"kcsj": "20304",
							"kcmc": "软件设计与体系结构",
							"sjbz": "0"
						},
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						},
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						},
						{
							"jsxm": "倪维健",
							"jsmc": "J13-132室",
							"jssj": "20:50",
							"kssj": "19:00",
							"kkzc": "14-19",
							"kcsj": "20910",
							"kcmc": "软件设计与体系结构实验",
							"sjbz": "0"
						}
					],
					[
						{
							"jsxm": "李旭健",
							"jsmc": "J7-513室",
							"jssj": "09:50",
							"kssj": "08:00",
							"kkzc": "9-14",
							"kcsj": "30102",
							"kcmc": "操作系统",
							"sjbz": "0"
						},
						{
							"jsxm": "张晓庆",
							"jsmc": "J7-418室",
							"jssj": "12:00",
							"kssj": "10:10",
							"kkzc": "9-15",
							"kcsj": "30304",
							"kcmc": "计算机图形学",
							"sjbz": "0"
						},
						{
							"jsxm": "倪维健",
							"jsmc": "J13-132室",
							"jssj": "15:50",
							"kssj": "14:00",
							"kkzc": "14-18",
							"kcsj": "30506",
							"kcmc": "软件设计与体系结构实验",
							"sjbz": "0"
						},
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						},
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						}
					],
					[
						{
							"jsxm": "倪丽娜",
							"jsmc": "J7-513室",
							"jssj": "09:50",
							"kssj": "08:00",
							"kkzc": "12-19",
							"kcsj": "40102",
							"kcmc": "软件项目管理",
							"sjbz": "0"
						},
						{
							"jsxm": "倪维健",
							"jsmc": "J7-418室",
							"jssj": "12:00",
							"kssj": "10:10",
							"kkzc": "9-17",
							"kcsj": "40304",
							"kcmc": "软件设计与体系结构",
							"sjbz": "0"
						},
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						},
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						},
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						}
					],
					[
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						},
						{
							"jsxm": "李旭健",
							"jsmc": "J7-513室",
							"jssj": "12:00",
							"kssj": "10:10",
							"kkzc": "9-14",
							"kcsj": "50304",
							"kcmc": "操作系统",
							"sjbz": "0"
						},
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						},
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						},
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						}
					],
					[
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						},
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						},
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						},
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						},
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						}
					],
					[
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						},
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						},
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						},
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						},
						{
							"jsxm": "0",
							"jsmc": "0",
							"jssj": "0",
							"kssj": "0",
							"kkzc": "0",
							"kcsj": "0",
							"kcmc": "0",
							"sjbz": "0"
						}
					]
				]
			}*/
			CourseStore.classDayData[index].courses = res.data?res.data.map((day,index)=>{
				return day.map((course,i) => {
					return {
						info: course,
						code: course.kcmc.split('').reduce((sum,cur)=>sum+cur.charCodeAt(0)-'0',0)
					}
				})
			}):[]
			CourseStore.updataCalssTableData(index,CourseStore.classDayData[index].courses)
			// console.log(CourseStore.classDayData[index])
		}else{
			console.log("未登录")
		}
	}
}
export const getCurWeek=()=>{
	let currentDate = getCurrentDate();
	console.log("currentDate:", currentDate);
	let curT = getTimeStamp(currentDate);
	console.log("curT:", curT);
	
	let termStartDate = termInfo.termData.curTermStart;
	console.log("termStartDate:", termStartDate);
	let sarT = getTimeStamp(termStartDate);
	console.log("sarT:", sarT);
	
	let DT = (curT - sarT) / 1000 / 60 / 60 / 24 + 1;
	console.log("DT:", Math.floor(DT));

	// let curT=getTimeStamp(getCurrentDate())
	// let sarT=getTimeStamp(termInfo.termData.curTermStart)
	// let DT=(curT-sarT)/1000/60/60/24+1
	// console.log(Math.floor(DT))
	return Math.floor(DT/7)+1
}