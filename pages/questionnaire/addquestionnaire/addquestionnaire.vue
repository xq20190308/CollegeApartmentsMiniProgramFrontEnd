<template>
	<view class="banner">
	<view class="itemrow">
		<text style="margin-left: 20rpx;margin-top: 10rpx;">匿名</text>
		<switch color="#008fff" style="margin-right: 10rpx;" :checked="newNaire.anonymous" @change="(e)=>{newNaire.anonymous=e.detail.value;console.log(newNaire.anonymous)}" />
	</view>
	<uni-section class="bar,barb" title="问卷类型（选择）：" type="line">
		<uni-data-checkbox v-model='newNaire.type' :localdata="data.fun_questionnare_type" :map="data.map" />
	</uni-section>
	<uni-section class="bar,barb" title="问卷名称（填写）：" type="line">
		<input v-model="newNaire.name" placeholder="请输入问卷名称" />
	</uni-section>
	<uni-section class="bar,barb" title="问卷描述（填写）：" type="line">
		<input v-model="newNaire.description" placeholder="请输入问卷描述" />
	</uni-section>
	<uni-section class="bar,barb" title="选择日期及时间：" type="line">
		<uni-datetime-picker v-model="data.range" type="datetimerange" rangeSeparator="至" @change="(e) => {newNaire.startTime = e[0];;newNaire.endTime = e[1];}" />
	</uni-section>
	<view class="bar,barb">
	<uni-section v-for="(que,qindex) in questionList" :key="qindex" :title="qindex + 1 + '.' + data.fun_question_type[questionList[qindex].type].label" type="line" >
		<template v-slot:right>
			<uni-icons @click="()=>{
				console.log(qindex);
				questionList = questionList.filter((item, index) => index !== qindex)
			}" type="closeempty" size="20"></uni-icons>
		</template>
			<input v-model="questionList[qindex].name" placeholder="请输入题目名称"  />
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
const newNaire = reactive({//传到问卷列表页面中的数据
	description : "",
	endTime: "",
	name: "",
	startTime: "",
	type: "",
	anonymous: false,
})
const questionList=ref([])
const data = reactive({
	map: {text:'label',value:'value'},
	timer:null,//延时器，用于防抖处理
	fun_questionnare_type: [],
	fun_question_type: [],
	range:[]
})
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
	console.log("新问卷",newNaire)
	console.log("新问卷的问题",questionList.value)
	//校验
	for (const key in newNaire) {
		console.log(key,newNaire[key])
		if(newNaire[key]===""){//问卷信息有空项
		console.log("data.newNaire[key]==''",key)
			uni.showToast({
				title:"请填写完整问卷信息",
				icon:"error"
			})
			return ;
		}
	}
	for (const question in questionList.value) {
		if(questionList.value[question].name==""||questionList.value[question].description==""){//问卷信息有空项
			uni.showToast({
				title:"请填写完整问题",
				icon:"error"
			})
			return ;
		}
		if(typeof questionList.value[question].content == "object"){//问卷信息有空项
			if(questionList.value[question].content.length){
				for (var i = 0; i < questionList.value[question].content.length; i++) {
					if(questionList.value[question].content[i]==""){
						uni.showToast({
							title:"请填写完整选项",
							icon:"error"
						})
						return ;
					}
				}
			}else{
				uni.showToast({
					title:"选择题至少有一个选项请填写完整",
					icon:"error"
				})
				return ;
			}
		}
	}
	//提交到后端
	if('id' in newNaire){
		submithttp('/questionnaire/updateQuestionnaireById/'+newNaire.id,'修改成功')
	}else{
		submithttp('/questionnaire/add',"创建成功")
	}

}
const submithttp=(url,restitle)=>{
	let list=questionList.value;
	for(let i=0;i<questionList.value.length;i++){
		list[i].content=JSON.stringify(list[i].content);
		list[i].type=data.fun_question_type[list[i].type].value
	}
	console.log('data.questionList',list)
	http(url,'POST',{...newNaire,questionList:list},).then(()=>{
		uni.showToast({
			title: restitle
		}).then(()=>{
			setTimeout(() => {
				uni.navigateBack();
			}, 2000); 
		})
	})
}
onLoad((options)=>{
	data.fun_questionnare_type=useDict('fun_questionnare_type')
	data.fun_question_type=useDict('fun_question_type')
	if(options.info){
		console.log("修改")
		let info = JSON.parse(options.info)
		for(const key in info){
			newNaire[key]=info[key]
		}
		data.range=[newNaire.startTime,newNaire.endTime];
		console.log("--",data.range);
		questionList.value=[]
		http('/questionnaire/question/selectByQuestionnaireId/'+newNaire.id,'GET',{},).then((res)=>{
			console.log("getquestions().then")
			for(let i=0;i<res.data.length;i++){
				console.log(data.fun_question_type)
				console.log(res.data[i].type)
				console.log(data.fun_question_type.findIndex((dict)=>{return dict.value===res.data[i].type}))
				res.data[i].type = data.fun_question_type.findIndex((dict)=>{return dict.value===res.data[i].type})
				res.data[i].content=JSON.parse(res.data[i].content)
				questionList.value.push(res.data[i])
			}
		})
	}
})
</script>

<style lang="scss" scoped>

.add{
	font-size: small;
	background-color:#008cff;
	width: 25%;
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
