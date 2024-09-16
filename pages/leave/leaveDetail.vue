<template>
	<view class="banner">
	<text class="underline-text" @click="handleSendTeachers">{{details?"假条推送详情":"假条"}}</text>
	<view class="bar,barb" v-if="details" >
		<uni-section :title="data.info.reason?data.info.reason:'请假条'" :sub-title="data.info.updatedAt" type="line">
			<template v-slot:right>
				<uni-tag :inverted="true" :text="status[data.info.status]?.label" :type="status[data.info.status]?.class" />
			</template>
			<view class="naireInfo">
				<view>开始时间：{{data.info.startTime}}</view>
				<view>结束时间：{{data.info.endTime}}</view>
				<view>离校：{{isOut}}</view>
				<view>原因：{{data.info.reason}}</view>
				<view>审核人：{{data.info.reviewerName}}</view>
				<view>最后处理时间：{{data.info.updatedAt}}</view>
				<view>附件：</view>
			</view>
			<view class="file">
				<image v-if="filetype==='Image'" :src="data.info.file" mode="widthFix"></image>
				<video v-else-if="filetype==='Video'" :src="data.info.file"></video>
				<text v-else user-select style="text-decoration: underline; color:cornflowerblue" @click="lookfile(data.info.file)">{{data.info.file}}</text>
			</view>
		</uni-section>
	</view>
	<view v-else class="bar,barb">
		<uni-collapse accordion>
			<uni-collapse-item title="老师回复结果">
				<uni-section v-for="(post,index) in posteds" :key="index" :title="post.courseName" :sub-title="post.courseSTime+'\n'+post.courseETime" type="line">
					<template v-slot:right>
						<uni-tag :inverted="true" :text="status[post.status].label" :type="status[post.status].class" />
					</template>
					<view class="naireInfo">
						<view>任课老师：{{post.mentorName}}</view>
						<view>发送时间：{{post.createdAt}}</view>
						<view>审核更新时间：{{post.updatedAt}}</view>
					</view>
				</uni-section>
			</uni-collapse-item>
			<uni-collapse-item title="所有任课老师">
				<button class="submitBnt,smallBnt,text-common" @click="sendPostsToTeacher">给老师发请假条</button>
				<view v-for="(course,cindex) in Courses" :key="cindex">
					<uni-data-checkbox :disabled="!mentorInfos[cindex].length>0||isPosted[cindex]" @change="(e)=>{postCourseChange(cindex,e)}" :multiple="true" mode="button" :wrap="true" v-model="courses[cindex]" :localdata="Courses[cindex]" :map="data.mapCourse"></uni-data-checkbox>
					<uni-data-checkbox v-if="mentorInfos[cindex].length>0" :disabled="isPosted[cindex]" mode="button" :wrap="true" v-model="mentors[cindex]" :localdata="mentorInfos[cindex]" :map="data.mapMentor" @change="(e)=>{postMentorChange(cindex,e)}">
					</uni-data-checkbox>
					<view class="notation" v-else>！无法找到该任课老师的信息</view>
					<view class="notation" v-if="isPosted[cindex]" @click="handleGotoInfo(cindex)" >已发送过，点击查看详情</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
	</view>
</template>

<script setup>
import {onLoad,onShow,onPullDownRefresh} from "@dcloudio/uni-app";
import {reactive,ref} from "vue";
import { useDict } from "../../utils/dict.js";
import { http } from "../../utils/http.js";
import { compareTime, getCourseDate,beforeTime,afterTime } from "@/utils/time.js"
import { ComplaintDrafts } from "../course_show/api/course.js";
import { useMentorStore } from "../../store/study/mentor.js";
import { useCourseStore } from "../../store/study/course.js";
import { useDateStore } from "../../store/date.js";
import { getReviewers } from "../mentor/api/mentor.js";
import { gotoInfo } from "./api/leave.js";
const CourseStore=useCourseStore()
const DateStore=useDateStore()
const MentorStore=useMentorStore()
const fun_leave_type=useDict('fun_leave_type')
const status = ref([])
const details=ref(true)
const filetype=ref('')
const isOut=ref('')
const data = reactive({
	info:{},
	fun_leave_post_status: [],
	mapMentor: {text:'trueName',value:'userId'},
	mapCourse: {text:'course',value:'course'},
})
const Courses=ref([])
const mentorInfos=ref([])
const courses=ref([])
const mentors=ref([])
const posts = ref([])
const posteds = ref([])
const isPosted = ref([])
const postCourseChange=(cindex,e)=>{
	mentors.value[cindex]=mentors.value[cindex]?e.detail.value.length?mentors.value[cindex]:null:mentorInfos.value[cindex][0].userId;
	console.log(courses.value)
	console.log(mentors.value);
}
const postMentorChange = (cindex,e)=>{
	courses.value[cindex]=[Courses.value[cindex][0].course]
	console.log(mentors.value)
}
const handleGotoInfo=(cindex)=>{
	// console.log(courses.value)
	// console.log(mentors.value)
	// console.log(MentorStore.mentor_list)
	// console.log(mentorInfos.value)
	// let info = MentorStore.mentor_list.filter((mentor,index)=>{
	// 	return mentor.userId===mentors.value[cindex]
	// })[0]
	// console.log("老师详情",info)
	gotoInfo(mentors.value[cindex])
	// uni.navigateTo({
	// 	url:"../chat/chatinfo?info="+JSON.stringify(info)+"&back="+false
	// })
}
const getMentorInfo = (name)=>{
	return MentorStore.mentor_list.filter((mentor,index)=>{
		return mentor.trueName===name
	}).map((item,index)=>{
		return{
			trueName:item.trueName+'  '+item.dormitory,
			userId:item.userId
		}
	})
}
const handleSendTeachers=async()=>{
	getReviewers(1).then((res)=>{
		console.log(res)
		MentorStore.mentor_list=res.data
		getVaildCourse()
		details.value=!details.value
	})
}
const getVaildCourse = async()=>{//async,await必须加
	Courses.value=[]
	mentorInfos.value=[]
	courses.value=[]
	mentors.value=[]
	posts.value=[]
	isPosted.value=[]
	//找到在请假时间段内的所有周次
	let sweek = DateStore.getSweekFromTime(data.info.startTime)
	let eweek = DateStore.getEweekFromTime(data.info.endTime)
	for (let i = sweek; i <= eweek; i++) {
		await ComplaintDrafts(i)
		let weeks=CourseStore.classDayData[i].weeks
		for (let j = 0; j < CourseStore.classDayData[i].courses.length; j++) {
			if(beforeTime(data.info.startTime,getCourseDate(weeks[j].date,1))&&afterTime(data.info.endTime,weeks[j].date)){
				console.log(CourseStore.classDayData[i].courses)
				for(let k = 0; k < CourseStore.classDayData[i].courses[j].length; k++){
					let course = CourseStore.classDayData[i].courses[j][k].info
					
					if(course.kcmc!="0"&&beforeTime(data.info.startTime,weeks[j].date+' '+course.jssj)&&afterTime(data.info.endTime,weeks[j].date+' '+course.kssj)){
						console.log("添加",course)
						Courses.value.push([{course:course.kcmc+"\n"+weeks[j].date+" "+course.kssj+"\n"+weeks[j].date+" "+course.jssj}])
						let infos=getMentorInfo(course.jsxm)
						console.log(course.jsxm,",",infos)
						mentorInfos.value.push(infos.length?infos:[])
						courses.value.push(infos.length?[course.kcmc+"\n"+weeks[j].date+" "+course.kssj+"\n"+weeks[j].date+" "+course.jssj]:[])
						mentors.value.push(infos.length?infos[0].userId:null)
						isPosted.value.push(false)
						console.log("mentorInfos.value",mentorInfos.value)
					}
				}
			}
		}
	}
	getPostsToTeacher()
}
const getPostsToTeacher=()=>{
	posteds.value=[]
	http('/leaveMentors/getByPostId?postId='+data.info.id,'POST',{}).then((res)=>{
		console.log(res.data)
		for (var j = 0; j < res.data.length; j++) {
			for (var i = 0; i < mentors.value.length; i++) {
				if(res.data[j].mentorId===mentors.value[i]&&
					res.data[j].courseName===courses.value[i][0].split('\n')[0]&&
					res.data[j].courseSTime===courses.value[i][0].split('\n')[1]&&
					res.data[j].courseETime===courses.value[i][0].split('\n')[2]){
						console.log(res.data[j].courseName,'  ','已经发过')
						isPosted.value[i]=true
						posteds.value.push({...res.data[j],mentorName:mentorInfos.value[i].filter((item)=>{return item.userId===res.data[j].mentorId})[0]?.trueName?.split(' ')[0]})
				}
			}
		}
	})
}
const sendPostsToTeacher=async()=>{
	posts.value=[]
	for (var i = 0; i < mentors.value.length; i++) {
		if(mentors.value[i]&&!isPosted.value[i]){
			posts.value.push({
				mentorId: mentors.value[i],
				courseName: courses.value[i][0].split('\n')[0],
				courseSTime: courses.value[i][0].split('\n')[1],
				courseETime: courses.value[i][0].split('\n')[2]
			})
		}
	}
	if(posts.value.length>0){
		await http('/leaveMentors/addLeaveMentors?postId='+data.info.id,'POST',posts.value)
		getPostsToTeacher()	
	}
}
const lookfile = (src)=>{
	console.log(src)
	uni.downloadFile({
	  url: src,
	  success: function (res) {
	    var filePath = res.tempFilePath;
	    uni.openDocument({
	      filePath: filePath,
	      showMenu: true,
	      success: function (res) {
	        console.log('打开文档成功',res);
	      },
		  fail: function (res) {
	        console.log('打开文档失败',res);
	      },
	    });
	  }
	});
}
onLoad(async(options)=> {
	// data.info=JSON.parse(options.info);
	options=JSON.parse(options.options);
	data.info=options.info
	console.log('info',data.info)
	
	data.fun_leave_post_status = useDict('fun_leave_post_status')
	console.log(data.fun_leave_post_status)
	status.value = data.fun_leave_post_status.reduce((acc, item) => {
	  acc[item.value] = { ...item };
	  delete acc[item.value].value;
	  return acc;
	}, {});
	console.log("status.value",status.value)
	
	isOut.value = data.info.isOut==='0'?'离校':'不离校'
	
	// data.update=data.info.status
	// data.info.path=data.info.path?JSON.parse(data.info.path):[];
	
	// for (let i = 0; i < data.info.path.length; i++) {
		if (/\.(jpg|jpeg|png|gif)$/.test(data.info.file)) {
			filetype.value='Image';
		  } else if (/\.(mp4|webm|mov|avi|mpg)$/.test(data.info.file)) {
			filetype.value='Video';
		  } else {
			filetype.value='Other';
		  }
	// }
	
	await getReviewers(1)
})
onPullDownRefresh(()=>{
	console.log("下拉刷新")
	// requestPage.value=1
	getPostsToTeacher().then(()=>{
		setTimeout(()=>{
			uni.stopPullDownRefresh()
		},500)
	})
})
onShow(()=>{
	
})
</script>

<style>
	.file{
		padding-top: 20rpx;
	}
</style>


