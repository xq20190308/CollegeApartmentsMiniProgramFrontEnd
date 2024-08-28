<template>
  <div>
    <ClassTable :classTableData="data.classTableData" />
  </div>
</template>


<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive} from "vue";
import {http} from '@/utils/http';
import { tologin } from "../../utils/login.js";
import { useLoginStore } from "../../store/login.js";
const loginInof = useLoginStore()
uni.$on("qzup",(newInfo)=>{
	console.log("on")
	ComplaintDrafts()
})
const data=reactive(
{
	 classTableData:{
		 weeks: ["一", "二", "三", "四", "五","六","日"],
		 courses: [[]]
	 },
})
onShow(()=>{
})
onLoad(()=>{
	if(loginInof.qz.username!=null&&loginInof.qz.password!=null){
		console.log(loginInof.qz)
		ComplaintDrafts();
	}
	else{
		tologin()
	}
})
const ComplaintDrafts = async () => {
	const res = await http('/api/obtainCourse','Post',{
		username: loginInof.qz.username,
		password: loginInof.qz.password
		// username:'202211070621',
		// password:'wyc.1024'
	},)
	data.classTableData.courses=res.data
	console.log(data.classTableData.courses)
}
</script>
<style>
    
</style>