<template>
	<view class="banner">
	<view class="itemrow">
		<text style="margin-left: 5px;">匿名</text>
		<switch color="#008fff" style="margin-right: 5px;" :checked="data.info.anonymous" @change="(e)=>{data.info.anonymous=e.detail.value}" />
	</view>
	<uni-section class="bar,barb" title="问卷类型（选择）：" type="line">
		<uni-data-checkbox v-model='data.info.type' :localdata="data.fun_questionnare_type" :map="data.map" />
	</uni-section>
	<uni-section class="bar,barb" title="问卷名称（填写）：" type="line">
		<input v-model="data.info.name"  placeholder="请输入问卷名称"/>
	</uni-section>
	<uni-section class="bar,barb" title="问卷描述（填写）：" type="line" >
		<input v-model="data.info.description" placeholder="请输入问卷描述" />
	</uni-section>
	<uni-section class="bar,barb" title="选择日期及时间：" type="line">
		<uni-datetime-picker v-model="data.range" type="datetimerange" rangeSeparator="至" @change="(e) => {data.info.startTime = e[0];data.info.endTime = e[1];}" />
	</uni-section>
	<view class="bar,barb">
	<uni-section v-for="(que,qindex) in questionList" :key="qindex" :title="qindex + 1 + '.' + questype(que.type)" type="line" >
		<template v-slot:right>
			<uni-icons @click="()=>{
				console.log(qindex);
				questionList = questionList.filter((item, index) => index !== qindex)
			}" type="closeempty" size="20"></uni-icons>
		</template>
				<input v-model="questionList[qindex].name"  placeholder="请输入题目名称"  />
				<input v-model="questionList[qindex].description" placeholder="请输入题目描述"  />
				<view v-if="typeof questionList[qindex].content === 'object'">
					<view class="itemrow" v-for="(item, index) in questionList[qindex].content" :key="index">
						<view style="display: flex;">
						<text class="text-common">{{String.fromCharCode('A'.charCodeAt(0)+ index)}}</text>
						<input v-model="questionList[qindex].content[index]" placeholder="请输入选项"  />
						</view>
						<uni-icons @click="deletechoiceitem(qindex,index)" type="closeempty" size="20"></uni-icons>
					</view>
					<uni-icons @click="()=>{
						console.log(qindex);
						questionList[qindex].content.push(' ');
					}" type="plusempty" size="20"></uni-icons>
				</view>
	</uni-section>
	</view>
	<view class="itemrow">
		<button class="bntrow" v-for="(dict,index) in data.fun_question_type" :key="index" @click="(e)=>addquestion(index)">创建{{dict.label}}</button>
	</view>
	</view>
	<view id="submit" class="itemrow">
		<button class="submitBnt" @click="submit">创建</button>
	</view>
</template>
<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive,ref,watch} from "vue";
import {http} from '@/utils/http'
import { useDict } from '../../../utils/dict';
const data = reactive({
	fun_questionnare_type: [],
	map: {text:'label',value:'value'},
	timer:null,//延时器，用于防抖处理
	//传到后端的数据
	info:{},
})
const questionList=ref([])
const deletechoiceitem = (qindex,index)=>{
	console.log(index);
	console.log(questionList.value[qindex].content)
	questionList.value[qindex].content = questionList.value[qindex].content.filter((item, eindex) => eindex !== index)
	console.log(questionList.value[qindex].content)
}
const addquestion=(index)=>{
	console.log(index);
	let content = data.fun_question_type[index].label.includes("选")?["","",""]:""
	questionList.value.push({
		type: index,
		name: "",
		description: "",
		content: content,
	});
	console.log(questionList.value)
	uni.pageScrollTo({
		selector: '#submit',
		duration: 50,
		complete: (res)=> {
			console.log(res)
		}
	});
}  
const submit = async ()=> {
	console.log("修改后的问卷",data.info)
	console.log("修改后的问卷的问题",questionList.value)
	//校验
	for (const key in data.info) {
		console.log(key,data.info[key])
		if((key!="type"&&key!="isBegin"&&key!="isEnd"&&key!="anonymous")&&data.info[key]==""){//问卷信息有空项
		console.log("data.info[key]==''",key)
			uni.showToast({
				title:"请填写完整",
				icon:"error"
			})
			return ;
		}
	}
	for (const question in questionList.value) {
		if(questionList.value[question].name==""||questionList.value[question].description==""){//问卷信息有空项
			uni.showToast({
				title:"请填写完整",
				icon:"error"
			})
			return ;
		}
		if(typeof questionList.value[question].content == "String" && questionList.value[question].content == ""){//问卷信息有空项
			uni.showToast({
				title:"请填写完整",
				icon:"error"
			})
			return ;
		}else{
			for (var i = 0; i < questionList.value[question].content.length; i++) {
				if(questionList.value[question].content[i]==""){
					uni.showToast({
						title:"请填写完整",
						icon:"error"
					})
					return ;
				}
			}
		}
		console.log("已填写完整")
	}
	
	//提交到后端
	let list=[];
	for(let i=0;i<questionList.value.length;i++){
		list[i]={...questionList.value[i]};
		list[i].content=JSON.stringify(list[i].content);//好像会把原数据修改，导致渲染错误，并且问题列表为啥提交上之后是空的
	}
	console.log('data.questionList',questionList.value)

	uni.showToast({
		title: "创建成功"
	});
	setTimeout(() => {
		uni.navigateBack({
			url: '../questionnaire_list/questionnaire_list'
		});
	}, 2000); 
}
</script>

<style lang="scss" scoped>
.submit{
	margin-top: 20px;
	background-color:#008cff;
	width: 80%;
}
.handlequestion{
	margin-top: 20px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.questionsform{
	margin-left: 10px;
	margin-right: 10px;
	display: flex;
	flex-wrap: wrap;
}
.questionitem{
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
}
</style>
