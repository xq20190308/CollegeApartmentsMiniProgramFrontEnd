<template>
	<bannerVue :showLoading="showLoading" :showType="showType" :loadingMsg="loadingMsg">
		<text class="underline-text" @click="deletAll">删除全部</text>
		<uni-section class="bar,barb" v-for="(course,index) in courseStore.addedCourse" :key="index" type="line" :title="course.info.kcmc+'['+course.day.date+']'+course.day.day" :subTitle="course.info.kssj+'-'+course.info.jssj">
			<template v-slot:right>
				<button @click="delet(course,index)" class="deletbutton">删除</button>
			</template>
			<text>教室名称：{{ course.info.jsmc }}\n</text>
			<text>教师姓名：{{ course.info.jsxm }}\n</text>
			<text>备注：{{ course.info.bz }}\n</text>
		</uni-section>
	</bannerVue>
</template>

<script setup>
import { useCourseStore } from "/subPackage1/store/study/course.js";
import bannerVue from "@/components/banner/banner.vue";
import { showLoading, showType, loadingMsg,resetRefresh,startRefresh } from "@/main.js";
import { useLoginStore } from "../../../store/login";
import { setLocalData } from "../../../utils/cache";
const loginInfo = useLoginStore()
const courseStore = useCourseStore()
const deletAll = ()=>{
	uni.showModal({
		title:"确认删除全部？",
		success: (r) => {
			if (r.confirm) {
				courseStore.addedCourse = [];
				setLocalData('addedCourse' + loginInfo.qz.username,courseStore.addedCourse)
				uni.$emit('courseRefresh')
			} else if (r.cancel) {
				console.log('用户点击取消');
			}
		}
	})
}
const delet = (course,index)=>{
	uni.showModal({
		title:"确认删除",
		content:course.info.kcmc+"吗？",
		success: (r) => {
			if (r.confirm) {
				courseStore.addedCourse.splice(index,1);
				setLocalData('addedCourse' + loginInfo.qz.username,courseStore.addedCourse)
				uni.$emit('courseRefresh')
			} else if (r.cancel) {
				console.log('用户点击取消');
			}
		}
	})
}
</script>

<style>
	       
</style>
