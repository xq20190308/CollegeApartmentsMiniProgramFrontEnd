<template>
	<bannerVue>
		<uni-section type="line" title="查成绩" class="bar,barb">
			<view class="pick-view">
				<picker-view class="picker-con" indicator-style="height: 40px;" @change="bindPickerChange">
					<picker-view-column>
						<view v-for="(item, index) in term" :key="index" class="picker-item">
							{{ term[index].label }}
						</view>
					</picker-view-column>
				</picker-view>
				<button class="search-btn" @click="search">搜索</button>
			</view>
		</uni-section>
		<uni-section type="line" :title="queryedTerm" class="bar,barb">
			<template v-slot:right>
				总学分:{{scoreSum}}
				绩点:{{pointScore}}
				加权:{{pointAdd}}
			</template>
			{{grades.length>0?'':'暂无数据'}}
		</uni-section>
		<uni-section v-for="(item,index) in grades" :key="index"  type="circle" :title="item.kcmc" class="bar,barb">
			<view class="grade-view">
			类型：{{item.kcxzmc}}
			<br/>
			成绩：{{item.zcj}}&nbsp;&nbsp;&nbsp;&nbsp;学分：{{item.xf}}&nbsp;&nbsp;&nbsp;&nbsp;绩点：{{item.jd}}
			</view>
		</uni-section>
	</bannerVue>
</template>

<script setup>
import bannerVue from '../../../components/banner/banner.vue';
import { ref } from 'vue';
import { useLoginStore } from "/store/login.js";
import {http} from '@/utils/http';
import {onLoad,onShow} from "@dcloudio/uni-app";
import { useDateStore } from '../../store/date';
const loginInof = useLoginStore()
const dateInof = useDateStore()
onLoad(()=>{
	if(loginInof.loginInfos.qz.login){
		console.log(loginInof.qz)
		queryTerm.value = dateInof.termData.curTerm
		queryedTerm.value = dateInof.termData.curTerm
		getTerm(dateInof.termData.curTerm)
	}
	else{
		loginInof.tologin("强智系统")
	}
})
const queryTerm = ref()
const queryedTerm = ref()
const grades = ref([])
const term = ref([{ label: '全部学期', value: '' }]);
const getTerm = (curTerm) => {
	// 处理学期逻辑
	const syear = parseInt(curTerm.split('-')[0]);
	const eyear = parseInt(curTerm.split('-')[1]);
	for (let i = 0; i < 4; i++) { // 循环生成学期选项
		const firstTerm = (syear - i) + '-' + (eyear - i) + '-2'; // 生成第一个学期的日期
		const secondTerm = (syear - i) + '-' + (eyear - i) + '-1'; // 生成第二个学期的日期
		if (firstTerm <= curTerm) { // 如果第一个学期日期小于等于当前学期，则添加到数组中
		  term.value.push({ label: firstTerm, value: firstTerm });
		}
		if (secondTerm <= curTerm) { // 如果第二个学期日期小于等于当前学期，则添加到数组中
		  term.value.push({ label: secondTerm, value: secondTerm });
		}
	}
	console.log(term.value)
	initGrade(); // 调用初始化成绩的方法
};
const index = ref(0)
// 学期选择器改变时执行的方法
const bindPickerChange = (e) => {
	index.value = e.target.value
	queryTerm.value = term.value[index.value].value; // 调用获取成绩的远程方法
};
const search = ()=>{
	getGradeRemote()
}
// 初始化成绩的方法
const initGrade = () => {
  getGradeRemote(); // 调用获取成绩的远程方法
};
const scoreSum = ref(0)
const pointScore = ref(0)
const pointAdd = ref(0)
// 获取成绩的异步方法
const getGradeRemote = (query) => {
	console.log(queryTerm.value)
	grades.value = []
	scoreSum.value = 0
	pointAdd.value = 0
	pointScore.value = 0
    http(
      '/api/getGrade/' + queryTerm.value,
      'POST',
	  loginInof.qz
    ).then((res)=>{
		queryedTerm.value = term.value[index.value].label;
		grades.value = res[0]?res:[]
		console.log(grades.value)
		let point = 0;
		let pointN = 0;
		let pointW = 0;
		let n = 0;
		grades.value.forEach((value) => {
			// console.log(value.kclbmc)
			if (value.zcj === '优') {
				value.jd = 4.5
			} else if (value.zcj === '良') {
				value.jd = 3.5;
			} else if (value.zcj === '中') {
				value.jd = 2.5;
			} else if (value.zcj === '及格') {
				value.jd = 1.5;
			} else if (value.zcj === '不及格') {
				value.jd = 0;
			} else {
				const s = parseInt(value.zcj);
				if (s >= 60) {
					value.jd = ((s - 50) / 10);
				}else{
					value.jd = 0;
				}
			}
			if (value.kclbmc !== '公选') {
				n++; //总门数
				point += value.xf;
				if (value.jd) {
					pointN += value.jd;
					pointW += (value.jd * value.xf);
				}
			}
		});
		scoreSum.value = point; // 更新总分数
		pointAdd.value = n?(pointN / n).toFixed(2):0; // 加权
		pointScore.value = point?(pointW / point).toFixed(2):0; // 绩点
		console.log(scoreSum.value)
		console.log(pointAdd.value)
		console.log(pointScore.value)
	})
};
</script>

<style>
.grade-view{
	line-height: 1.8;
}
</style>
