<template>
  <div>
    <ClassTableVue :index="index" />
  </div>
</template>


<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive,onMounted,ref,watch} from "vue";
import { ComplaintDrafts, getCurWeek } from "./api/course.js";
import { useLoginStore } from "/store/login.js";
import { useCourseStore } from "/subPackage1/store/study/course.js";
import ClassTableVue from "/subPackage1/components/ClassTable/ClassTable.vue";
import { setLocalData, getLocalData } from '../../../utils/cache';
const CourseStore = useCourseStore()
const loginInof = useLoginStore()
const index=ref(1)
uni.$on("courseIndexLast",()=>{
	index.value--
	ComplaintDrafts(index.value)
})
uni.$on("courseIndexNext",()=>{
	index.value++
	ComplaintDrafts(index.value)
})
uni.$on("courseRefresh",()=>{
	ComplaintDrafts(index.value,true)
})
uni.$on("courseAdd",(res)=>{
	console.log("$oncourseAdd", res)
	// CourseStore.addedCourse = getLocalData('addedCourse'+loginInof.qz.username)||[]
	CourseStore.addedCourse = CourseStore.addedCourse.filter((item) =>{
		return !(item.index === res.index && item.i === res.i && item.idx === res.idx)
	})
	CourseStore.addedCourse.push(res)
	setLocalData('addedCourse' + loginInof.qz.username, CourseStore.addedCourse)
})
onShow(()=>{
	console.log(index.value)
})
onLoad(async()=>{
	index.value=getCurWeek()
	// CourseStore.initCalssTableData()
	console.log("当前周",index.value,CourseStore.classTableData[index.value])
	//需要初始化课表（需要有周次）
	if(loginInof.loginInfos.qz.login){
		console.log(loginInof.qz)
		ComplaintDrafts(index.value);
	}
	else{
		loginInof.tologin("强智系统")
	}
})

</script>
<style>
    
</style>