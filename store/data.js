import { defineStore } from 'pinia'
import {http} from '../utils/http.js'
import { reactive,ref,computed } from "vue";
export const useDataStore = defineStore('Data', ()=>{
	const classes = ref([])
	//campus grade college major class 校区 年级 学院 专业 班级
	const httpdata={
		campusId:1,
		gradeId:1,
		collegeId:1,
		majorId:1,
		classId:1,
	}
	const origin = ref([{
		campusId:1,//1校区
		campusName:"青岛校区",//1校区
		grades:[{
			gradeId:1,//1年级
			gradeName:"2022级",//1年级
			colleges:[{
				collegeId:1,//1学院
				collegeName:"计算机科学与工程学院",//1学院
				majors:[{//三个专业
					majorId:1,
					majorName:"计算机科学与技术",
					classes:[{
						classId:1,
						className:"1班"
					},{
						classId:2,
						className:"2班"
					},{
						classId:3,
						className:"3班"
					}],
				},{
					majorId:2,
					majorName:"软件工程",
					classes:[{
						classId:4,
						className:"1班"
					},{
						classId:5,
						className:"2班"
					},{
						classId:6,
						className:"3班"
					}],
				},{
					majorId:3,
					majorName:"物联网",
					classes:[{
						classId:7,
						className:"1班"
					},{
						classId:8,
						className:"2班"
					},{
						classId:9,
						className:"3班"
					}],
				}]
			},{
				collegeId:2,//2学院
				collegeNmae:"能源与矿业工程学院",//2学院
				majors:[{//三个专业
					majorId:4,
					majorId:"采矿工程",
					classes:[{
						classId:10,
						className:"1班"
					},{
						classId:11,
						className:"2班"
					}],
				},{
					majorId:5,
					majorName:"工业工程",
					classes:[{
						classId:12,
						className:"1班"
					}],
				},{
					majorId:6,
					majorName:"工程力学",
					classes:[{
						classId:13,
						className:"1班"
					},{
						classId:14,
						className:"2班"
					},{
						classId:15,
						className:"3班"
					}],
				}]
			}]},{
			gradeId:2,//2年级
			gradeName:"2023级",//2年级
			colleges:[{
				collegeId:3,//3学院
				collegeName:"计算机科学与工程学院",//3学院
				majors:[{//两个专业
					majorId:7,
					majorName:"计算机科学与技术",
					classes:[{
						classId:16,
						className:"1班"
					},{
						classId:17,
						className:"2班"
					},{
						classId:18,
						className:"3班"
					}]
				},{
					majorId:8,
					majorName:"软件工程",
					classes:[{
						classId:19,
						className:"1班"
					},{
						classId:20,
						className:"2班"
					},{
						classId:21,
						className:"3班"
					}]
				}]
			},{
				collegeId:4,//2学院
				collegeNmae:"能源与矿业工程学院",//2学院
				majors:[{//三个专业
					majorId:9,
					majorId:"采矿工程",
					classes:[{
						classId:22,
						className:"1班"
					},{
						classId:23,
						className:"2班"
					}],
				},{
					majorId:10,
					majorName:"工业工程",
					classes:[{
						classId:24,
						className:"1班"
					}],
				},{
					majorId:11,
					majorName:"工程力学",
					classes:[{
						classId:25,
						className:"1班"
					},{
						classId:26,
						className:"2班"
					},{
						classId:27,
						className:"3班"
					}],
				}]
			}]}]},{
		campusId:2,//2校区
		campusName:"泰安校区",//2校区
		grades:[{
			gradeId:3,//3年级
			gradeName:"2022级",//3年级
			colleges:[{
				collegeId:5,//1学院
				collegeName:"计算机科学与工程学院",//1学院
				majors:[{//三个专业
					majorId:12,
					majorName:"计算机科学与技术",
					classes:[{
						classId:28,
						className:"1班"
					},{
						classId:29,
						className:"2班"
					},{
						classId:30,
						className:"3班"
					}],
				},{
					majorId:13,
					majorName:"软件工程",
					classes:[{
						classId:31,
						className:"1班"
					},{
						classId:32,
						className:"2班"
					},{
						classId:33,
						className:"3班"
					}],
				},{
					majorId:14,
					majorName:"物联网",
					classes:[{
						classId:34,
						className:"1班"
					},{
						classId:35,
						className:"2班"
					},{
						classId:36,
						className:"3班"
					}],
				}]
			},{
				collegeId:6,//2学院
				collegeName:"经济管理学院",//2学院
				majors:[{//三个专业
					majorId:15,
					majorId:"会计学专业",
					classes:[{
						classId:37,
						className:"1班"
					},{
						classId:38,
						className:"2班"
					}],
				},{
					majorId:16,
					majorName:"工商管理专业",
					classes:[{
						classId:39,
						className:"1班"
					}],
				},{
					majorId:17,
					majorName:"投资学",
					classes:[{
						classId:40,
						className:"1班"
					},{
						classId:41,
						className:"2班"
					},{
						classId:42,
						className:"3班"
					}],
				}]
			}]},{
			gradeId:4,//4年级
			gradeName:"2023级",//4年级
			colleges:[{
				collegeId:7,//1学院
				collegeName:"计算机科学与工程学院",//1学院
				majors:[{//三个专业
					majorId:18,
					majorName:"计算机科学与技术",
					classes:[{
						classId:43,
						className:"1班"
					},{
						classId:44,
						className:"2班"
					},{
						classId:45,
						className:"3班"
					}],
				},{
					majorId:19,
					majorName:"软件工程",
					classes:[{
						classId:46,
						className:"1班"
					},{
						classId:47,
						className:"2班"
					},{
						classId:48,
						className:"3班"
					}],
				},{
					majorId:20,
					majorName:"物联网",
					classes:[{
						classId:49,
						className:"1班"
					},{
						classId:50,
						className:"2班"
					},{
						classId:51,
						className:"3班"
					}],
				}]
			},{
				collegeId:8,//2学院
				collegeName:"经济管理学院",//2学院
				majors:[{//三个专业
					majorId:21,
					majorId:"会计学专业",
					classes:[{
						classId:52,
						className:"1班"
					},{
						classId:53,
						className:"2班"
					}],
				},{
					majorId:22,
					majorName:"工商管理专业",
					classes:[{
						classId:54,
						className:"1班"
					}],
				},{
					majorId:23,
					majorName:"投资学",
					classes:[{
						classId:55,
						className:"1班"
					},{
						classId:56,
						className:"2班"
					},{
						classId:57,
						className:"3班"
					}]
			}]}]}]
	}])
	
	const getclasses = async()=>{//http请求在初始化登录时调用
		console.log(origin.value)
		console.log(httpdata)
		
		const res = await http('/school-info/infos','GET',{},)
		origin.value=res.data.campusInfoVOList
		console.log("getclasses res",origin.value)
	// 	classes.value=[];
	// 	for (var i = 0; i < res.data.length; i++) {
	// 		classes.value.push({
	// 			text: res.data[i].campusName+res.data[i].collegeName+res.data[i].grade+res.data[i].major+res.data[i].className,
	// 			value: String(res.data[i].classId),
	// 		})
	// 	}
	// 	let final = []
	// 	for (var i = 0; i < origin.length; i++) {//校区
	// 		//年级
			
	// 	}
	// 	classes.value=[{
	// 	text: "专业一",
	// 	value: 1,
	// 	children: [{
	// 		text: "一年级",
	// 		value: 2,
	// 		children: [{
	// 			text: "1.1.1班",
	// 			value: 3
	// 		},
	// 		{
	// 			text: "1.1.2班",
	// 			value: 4
	// 		}]
	// 	},{
	// 		text: "二年级",
	// 		value: 5,
	// 		children: [{
	// 			text: "1.2.1班",
	// 			value: 6
	// 		},
	// 		{
	// 			text: "1.2.1班",
	// 			value: 7
	// 		}]
	// 	}]
	// },{
	// 	text: "专业二",
	// 	value: 8,
	// 	children: [{
	// 		text: "一年级",
	// 		value: 9,
	// 		children: [{
	// 			text: "2.1.1班",
	// 			value: 10
	// 		},
	// 		{
	// 			text: "2.1.2班",
	// 			value: 11
	// 		}]
	// 	},{
	// 		text: "二年级",
	// 		value: 12,
	// 		children: [{
	// 			text: "2.2.1班",
	// 			value: 13
	// 		},
	// 		{
	// 			text: "2.2.2班",
	// 			value: 14
	// 		}]
	// 	}]
	// },{
	// 	text: "专业三",
	// 	value: 15,
	// 	children: [{
	// 		text: "一年级",
	// 		value: 16,
	// 		children: [{
	// 			text: "3.1.1班",
	// 			value: 17
	// 		},
	// 		{
	// 			text: "3.1.2班",
	// 			value: 18
	// 		}]
	// 	},{
	// 		text: "二年级",
	// 		value: 19,
	// 		children: [{
	// 			text: "3.2.1班",
	// 			value: 20
	// 		},
	// 		{
	// 			text: "3.2.2班",
	// 			value: 21
	// 		}]
	// 	}]
	// },]
	}
	return {classes,getclasses,origin}
})