<template>
  <div>
    <ClassTable :index="index" />
  </div>
</template>


<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive,onMounted,ref,watch} from "vue";
import { ComplaintDrafts, getCurWeek } from "./api/course.js";
import { useLoginStore } from "/store/login.js";
import { useCourseStore } from "/store/study/course.js";
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
uni.$on("courseAdd",()=>{
	console.log("$oncourseAdd")
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