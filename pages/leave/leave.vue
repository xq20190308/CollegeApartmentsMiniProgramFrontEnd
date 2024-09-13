<template>
	<view class="banner">
		<view class="bar,barb">
		<uni-section title="请假条" type="line">
		<!-- 表单校验 -->
		<uni-forms ref="valiForm" :rules="rules" :modelValue="newNaire" label-position="top">
			<uni-forms-item label="开始时间" name="item" required>
				<uni-datetime-picker v-model="newNaire.startTime" :clearIcon="false" />
			</uni-forms-item>
			<uni-forms-item label="结束时间" name="item" required>
				<uni-datetime-picker v-model="newNaire.endTime" :clearIcon="false" />
			</uni-forms-item>
			<uni-forms-item label="类型" name="item" required>
				<uni-data-checkbox v-model="newNaire.type" :localdata="fun_question_type" :map="data.map1"/>
			</uni-forms-item>
			<uni-forms-item label="原因" name="item" required>
				<uni-easyinput type="textarea" autoHeight v-model="newNaire.reason" placeholder="请输入原因" />
			</uni-forms-item>
		</uni-forms>
		{{newNaire.courses}}
		{{newNaire.mentors}}
		<view v-for="(course,cindex) in Courses" :key="cindex">
		<uni-data-checkbox :disabled="!mentorInfos[cindex].length>0" @change="(e)=>{postCourseChange(cindex,e)}" :multiple="true" mode="button" :wrap="true" v-model="newNaire.courses[cindex]" :localdata="Courses[cindex]" :map="data.mapCourse"></uni-data-checkbox>
			<uni-data-checkbox v-if="mentorInfos[cindex].length>0" mode="button" v-model="newNaire.mentors[cindex]" :localdata="mentorInfos[cindex]" :map="data.mapMentor" @change="(e)=>{postMentorChange(cindex,e)}">
			</uni-data-checkbox>
			<view class="notation" v-else>！无法找到该任课老师的信息</view>
		</view>
		</uni-section>
		</view>
		<button class="submitBnt" @click="submit">点击</button>
	</view>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import { reactive,ref,computed } from "vue";
import { compareTime, getCourseDate,beforeTime,afterTime } from "@/utils/time.js"
import { useCourseStore } from "../../store/study/course.js";
import { useDateStore } from "../../store/date.js";
import { ComplaintDrafts } from "../course_show/api/course.js";
import { useDict } from "../../utils/dict.js";
import { useMentorStore } from "../../store/study/mentor.js";
import { getMentors } from "../mentor/api/mentor.js";
import { forEach } from "lodash-es";
const fun_question_type=useDict('fun_question_type')
const CourseStore=useCourseStore()
const DateStore=useDateStore()
const MentorStore=useMentorStore()
getMentors()
const Courses=ref([])
const data = reactive({
	map1: {text:'label',value:'value'},
	mapMentor: {text:'trueName',value:'userId'},
	mapCourse: {text:'course',value:'course'},
})
const newNaire=reactive({
	startTime:'2024-09-16 00:00:00',
	endTime:'2024-09-17 19:00:00',
	reason:'',
	type: '1',
	courses: [],
	mentors:[]
})
const mentorInfos=ref([])
const valiForm=ref()
const rules=ref({
	item: {
		rules: [{
			required: true,
			errorMessage: '不能为空'
		}]
	}
})
const postCourseChange=(cindex,e)=>{
	console.log();
	newNaire.mentors[cindex]=newNaire.mentors[cindex]?e.detail.value.length?newNaire.mentors[cindex]:null:mentorInfos.value[cindex][0].userId;
}
const postMentorChange = (cindex,e)=>{
	console.log([Courses.value[cindex][0].course])
	newNaire.courses[cindex]=[Courses.value[cindex][0].course]
}
const getVaildCourse = async()=>{//async,await必须加
	Courses.value=[]
	mentorInfos.value=[]
	newNaire.courses=[]
	newNaire.mentors=[]
	//找到在请假时间段内的所有周次
	let sweek = DateStore.getSweekFromTime(newNaire.startTime)
	let eweek = DateStore.getEweekFromTime(newNaire.endTime)
	for (let i = sweek; i <= eweek; i++) {
		await ComplaintDrafts(i)
		let weeks=CourseStore.classDayData[i].weeks
		for (let j = 0; j < CourseStore.classDayData[i].courses.length; j++) {
			if(beforeTime(newNaire.startTime,getCourseDate(weeks[j].date,1))&&afterTime(newNaire.endTime,weeks[j].date)){
				console.log(CourseStore.classDayData[i].courses)
				for(let k = 0; k < CourseStore.classDayData[i].courses[j].length; k++){
					let course = CourseStore.classDayData[i].courses[j][k].info
					
					if(course.kcmc!="0"&&beforeTime(newNaire.startTime,weeks[j].date+' '+course.jssj)&&afterTime(newNaire.endTime,weeks[j].date+' '+course.kssj)){
						console.log("添加",course)
						Courses.value.push([{course:course.kcmc+"\n"+weeks[j].date+" "+course.kssj+"--"+course.jssj}])
						let infos=getMentorInfo(course.jsxm)
						console.log(course.jsxm,",",infos)
						mentorInfos.value.push(infos.length?infos:[])
						newNaire.courses.push(infos.length?[course.kcmc+"\n"+weeks[j].date+" "+course.kssj+"--"+course.jssj]:[])
						newNaire.mentors.push(infos.length?infos[0].userId:null)
						// for (let info in infos) {
						// 	console.log(infos[info])
						// 	mentorInfos.value.push(infos[info])
						// }
						console.log("mentorInfos.value",mentorInfos.value)
					}
				}
			}
		}
	}
}
const getMentorInfo = (name)=>{
	return MentorStore.mentor_list.filter((mentor,index)=>{
		return mentor.trueName===name
	})
}
const getCourses=async()=>{
	for (let i = 1; i <= DateStore.WeekNum; i++) {
		await ComplaintDrafts(i)
	}
}
const submit = ()=>{
	getVaildCourse()
}
onLoad(()=>{
	// getCourses()
})
</script>

<style>

</style>
