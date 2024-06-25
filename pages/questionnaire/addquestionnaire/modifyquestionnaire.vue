<template>
	<view style="margin-top: 2px; display: flex; justify-content: space-between;"><text style="margin-left: 5px;">实名</text><switch color="#008fff" style="margin-right: 5px;" :checked="data.isanonymous" @change="(e)=>{data.isanonymous=e.detail.value}" /></view>
	<uni-section title="问卷类型（下拉选择）：" type="line" padding>
		<uni-data-select v-model="data.info.type" :localdata="data.types" ></uni-data-select>
	</uni-section>
	<uni-section title="问卷名称（填写）：" type="line" padding>
		<view style="display: flex;flex-wrap: nowrap;">
			<input v-model="data.info.name"  placeholder="请输入问卷名称" placeholder-class="answerplacehoder" />
		</view>
	</uni-section>
	<uni-section title="问卷描述（填写）：" type="line" padding>
		<view style="display: flex;flex-wrap: nowrap;">
			<input v-model="data.info.description" placeholder="请输入问卷描述" placeholder-class="answerplacehoder" />
		</view>
	</uni-section>
	<uni-section title="选择日期及时间：" type="line" paddindata.rangeg>
		<view class="example-body">
			<uni-datetime-picker v-model="data.range" type="datetimerange" rangeSeparator="至" @change="(e) => {data.info.startTime = e[0];console.log(data.info.startTime);data.info.endTime = e[1];console.log(data.info.endTime);console.log(data.range)}" />
		</view>
	</uni-section>
	<view class="questionsform">
	<uni-section style="width: 100%;" v-for="(que,qindex) in data.questionList" :key="qindex" :title="qindex + 1 + '.' + questype(que.type)"type="line" >
		<template v-slot:right>
			<uni-icons @click="()=>{
				console.log(qindex);
				data.questionList = data.questionList.filter((item, index) => index !== qindex)
			}" type="closeempty" size="20"></uni-icons>
		</template>
		
		<view class="questionitem" >
			<view class="answer">
				<input v-model="data.questionList[qindex].name"  placeholder="请输入题目名称"  />
			</view>
			<view class="answer">
				<input v-model="data.questionList[qindex].description" placeholder="请输入题目描述"  />
			</view>
			<view class="choice" v-if="que.type===1">
				<view style="display: flex; flex-wrap: nowrap; margin-bottom: 2px;" v-for="(item, index) in que.content" :key="index">
					<view style="background-color: white; width: 20px;height: 20px;border-radius: 50px; border: 1px solid #7f7f7f; margin-right: 5px;"></view>
					<input v-model="data.questionList[qindex].content[index]" placeholder="请输入选项"  />
					<uni-icons style="margin-left: 140px;" @click="()=>{
						console.log(qindex,index);
						data.questionList[qindex].content = data.questionList[qindex].content.filter((item, eindex) => eindex !== index)
					}" type="closeempty" size="20"></uni-icons>
				</view>
				<uni-icons style="margin-left: 0px;" @click="()=>{
					console.log(qindex);
					data.questionList[qindex].content.push(' ');
				}" type="plusempty" size="20"></uni-icons>
			</view>
			<view class="mulchoice"  v-else-if="que.type===2">
				<view style="display: flex; flex-wrap: nowrap; margin-bottom: 2px;" v-for="(item, index) in que.content" :key="index">
					<view style="background-color: white; width: 20px;height: 20px; border: 1px solid #7f7f7f; margin-right: 5px;"></view>
					<input v-model="data.questionList[qindex].content[index]" placeholder="请输入选项"  />
					<uni-icons style="margin-left: 140px;" @click="()=>{
						console.log(qindex,index);
						data.questionList[qindex].content = data.questionList[qindex].content.filter((item, eindex) => eindex !== index)
					}" type="closeempty" size="20"></uni-icons>
				</view>
				<uni-icons style="margin-left: 0px;" @click="()=>{
					console.log(qindex);
					data.questionList[qindex].content.push(' ');
				}" type="plusempty" size="20"></uni-icons>
			</view>
		</view>
	</uni-section>
		
	</view>
	<view class="handlequestion">
		<button class="add" @click="(e)=>add(e,1)">创建单选</button>
		<button class="add" @click="(e)=>add(e,2)">创建多选</button>
		<button class="add" @click="(e)=>add(e,3)">创建问答</button>
	</view>
	<view>
		<button class="submit" @click="submit">创建</button>
	</view>
</template>
<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive,ref,watch} from "vue";
import {http} from '@/utils/http'
const data = reactive({
	isanonymous:true,//需要传给后端
	range:[],
	types:[
          { value: 0, text: '篮球' },
          { value: 1, text: '足球' },
          { value: 2, text: '游泳' },
        ],
	timer:null,//延时器，用于防抖处理
	//传到后端的数据
	info:{},
	questionList: [],
})
const questype=(type,qindex)=>{
	if(type===1){
		return '单选题'
	}else if(type===2){
		return '多选题'
	}else{
		return '问答题'
	}
}
const add=(e,option)=>{
	console.log(option);
	data.questionList.push({
		type: option,
		name: "",
		description: "",
		content: option==3?null:["A", "B", "C"],
		questionnaire_id: "",
	});
	console.log(data.questionList)
} 
const submit = async ()=> {
	console.log("修改后的问卷",data.info)
	console.log("修改后的问卷的问题",data.questionList)
	//校验
	
	//提交到后端
	let list=[];
	for(let i=0;i<data.questionList.length;i++){
		list[i]={...data.questionList[i]};
		list[i].content=JSON.stringify(list[i].content);
	}
	console.log('data.questionList',data.questionList)
	const res = await http('/questionnaire/updateQuestionnaireById/'+data.info.id,'POST',{...data.info,questionList:list,anonymous:data.isanonymous},);

	uni.showToast({
		title: "创建成功"
	});
	setTimeout(() => {
		uni.navigateBack({
			url: '../questionnaire_list/questionnaire_list'
		});
	}, 2000); 
}
const getquestions = async () => { 
	const res = await http('/questionnaire/question/selectByQuestionnaireId/'+data.info.id,'GET',{},)
	
	data.questionList=res.data;
	for(let i=0;i<data.questionList.length;i++){
		data.questionList[i].content=JSON.parse(data.questionList[i].content)
	}
}
onLoad((options)=>{
	data.info=JSON.parse(options.info)
	console.log(data.info);
	// description: "吃啥呀"
	// endTime: "2024-06-29"
	// id: 5
	// isEnd: false
	// name: "星期三吃啥"
	// startTime: "2024-05-29"
	// type: 1
	data.range=[data.info.startTime,data.info.endTime];
	console.log("--",data.range);
	getquestions();
})
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
