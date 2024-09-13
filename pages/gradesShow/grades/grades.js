import { getCurrentDate, getCurrentTime, getTimeStamp } from "../../../utils/time.js";
import {http} from '@/utils/http';
import { useDateStore } from "../../../store/date.js";
import { useLoginStore } from "../../../store/login.js";
import { useGradesStore } from "../../../store/study/grades.js";

const GradesStore = useGradesStore()
const loginInof = useLoginStore()

// export const gradesDrafts = (index,refresh) => {
// 	console.log("grades",CourseStore.classTableData)
// 	console.log(refresh)
// 	// if(CourseStore.classTableData[index]&&!refresh){  //没有储存信息就新存
// 	// 	console.log("√index")
// 	// }else{
// 	// 	console.log("×index")
// 	// 	CourseStore.classTableData[index]={
// 	// 		curWeek: index,
// 	// 		weeks: termInfo.termData.timeTable[index],
// 	// 		courses: []
// 	// 	}
// 		http('/api/SelectCourse/'+index,'Post',{
// 			username: loginInof.qz.username,
// 			password: loginInof.qz.password
// 			// username:'202211070621',
// 			// password:'wyc.1024'
// 		},).then((res)=>{
// 			CourseStore.classTableData[index].courses = res.data
// 			console.log(CourseStore.classTableData[index])
// 		})
// 	}
// }