<template>
  <div>
    <ClassTable :classTableData="CourseStore.classTableData[index]" />
  </div>
</template>


<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive,onMounted,ref,watch} from "vue";
import { tologin } from "../../utils/login.js";
import { ComplaintDrafts, getCurWeek } from "./api/course.js";
import { useLoginStore } from "../../store/login.js";
import { useCourseStore } from "../../store/study/course.js";
const CourseStore = useCourseStore()
const loginInof = useLoginStore()
const index=ref(0)
uni.$on("qzUp",async(qzInfo)=>{
	uni.setStorageSync("qzInfo",qzInfo)
	ComplaintDrafts(index.value)
})
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
onLoad(async()=>{
	index.value=getCurWeek()
	if(loginInof.qz.username!=null&&loginInof.qz.password!=null){
		console.log(loginInof.qz)
		ComplaintDrafts(index.value);
		console.log(CourseStore.classTableData)
	}
	else{
		tologin("","强智系统","/api/obtainCourse")
	}
})

</script>
<style>
    
</style>