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
	const origin = ref([])
	const getclasses = async()=>{//http请求在初始化登录时调用
		const res = await http('/school-info/infos','GET',{},)
		origin.value=res.data.campusInfoVOList
	}
	return {classes,getclasses,origin}
})