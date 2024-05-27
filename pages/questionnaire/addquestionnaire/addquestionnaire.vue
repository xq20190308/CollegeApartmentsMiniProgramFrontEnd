<template>
	<view style="display: flex;flex-wrap: nowrap;">
		问卷类型（下拉选择）：<input @input="(e) => {data.newNaire.type=newdata(e.detail.value);}" placeholder="请输入问卷类型" placeholder-class="answerplacehoder" />
	</view>
	<view style="display: flex;flex-wrap: nowrap;">
		问卷名称（填写）：<input @input="(e) => {data.newNaire.name=newdata(e.detail.value);}" placeholder="请输入问卷名称" placeholder-class="answerplacehoder" />
	</view>
	<view style="display: flex;flex-wrap: nowrap;">
		问卷描述（填写）：<input @input="(e) => {data.newNaire.descr=newdata(e.detail.value);}" placeholder="请输入问卷描述" placeholder-class="answerplacehoder" />
	</view>
	<view style="display: flex;flex-wrap: nowrap;">
		开始时间（选择日期）：<input @input="(e) => {data.newNaire.startTime=data.newdata(e.detail.value);}" placeholder="请输入开始时间" placeholder-class="answerplacehoder" />
	</view>
	<view style="display: flex;flex-wrap: nowrap;">
		结束时间（选择日期）：<input @input="(e) => {data.newNaire.endTime=data.newdata(e.detail.value);}" placeholder="请输入结束时间" placeholder-class="answerplacehoder" />
	</view>
	<view class="questionsform">
		<view class="questionitem" v-for="(que,qindex) in data.questionList" :key="qindex">
			<view v-if="que.type===1">{{qindex + 1}}.单选题</view>
			<view v-else-if="que.type===2">{{qindex + 1}}.多选题</view>
			<view v-else-if="que.type===3">{{qindex + 1}}.问答题</view>
			<view class="answer">
				<input @input="(e) => {data.questionList[qindex].name=qnewdata(e,qindex)}" placeholder="请输入题目名称"  />
			</view>
			<view class="answer">
				<input @input="(e) => {data.questionList[qindex].describe=qnewdata(e,qindex)}" placeholder="请输入题目描述"  />
			</view>
			<view class="choice" v-if="que.type===1">
				<view style="display: flex; flex-wrap: nowrap; margin-bottom: 2px;" v-for="(item, index) in que.content" :key="index">
					<view style="background-color: white; width: 20px;height: 20px;border-radius: 50px; border: 1px solid #7f7f7f; margin-right: 5px;"></view>
					<input  @input="(e) => {data.questionList[qindex].content[index]=qnewdata(e,qindex)}" placeholder="请输入选项"  />
				</view>
			</view>
			<view class="mulchoice"  v-else-if="que.type===2">
				<view style="display: flex; flex-wrap: nowrap; margin-bottom: 2px;" v-for="(item, index) in que.content" :key="index">
					<view style="background-color: white; width: 20px;height: 20px; border: 1px solid #7f7f7f; margin-right: 5px;"></view>
					<input @input="(e) => {data.questionList[qindex].content[index]=qnewdata(e,qindex)}" placeholder="请输入选项"  />
				</view>
			</view>
		</view>
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
import {reactive,ref} from "vue";
import {http} from '@/utils/http'
const data = reactive({
	timer:null,//延时器，用于防抖处理
	//传到后端的数据
	newNaire:{//传到问卷列表页面中的数据
		/*descr: "",
		endTime: "",
		name: "",
		startTime: "",
		type: 1,
		id: "",
		questionList: “["","",""]”,*/
	},
	questionList: [/*{
		content: ["", "", ""],
		describe: "",
		name: "",
		type: 1,
		id: "",
		questionnaire: "",// 用questionnaire的id标记
	}*/],
})
const newdata=(value)=>{
	clearTimeout(data.timer);
	data.timer = setTimeout(()=>{
		console.log(value);
	}, 500)
	return value;
}
const qnewdata=(e,qindex)=>{
	clearTimeout(data.timer);
	data.timer = setTimeout(()=>{
		console.log(qindex+ '.' +data.questionList[qindex].name);
	}, 500)
	return e.detail.value;
}
const add=(e,option)=>{
	console.log(option);
	data.questionList.push({
		content: ["A", "B", "C"],
		describe: "",
		id: "",
		name: "",
		questionnaire: "",
		type: option,
	});
	console.log(data.questionList)
} 
const submit = async ()=> {
	console.log("新问卷",data.newNaire)
	console.log("新问卷的问题",data.questionList)
	//校验
	
	//提交到后端
	
	//const res = await http('','POST',{newNaire: data.newNaire},);
	
	//console.log("封装后请求的结果",res)
	
	/*this.newNaire.questionList=//后端生成并返回每个问题的id组成的数组并且“[]”*/		
	/*this.newNaire.id=后端生成questionnaire的id*/
	/*for (let i = 0; i < this.questionList.length; i++) {
	this.questionList[i].questionnaire=后端生成questionnaire的id*/

	//测试数据
	data.newNaire.questionList="[\"一\",\"二\",\"三\"]";
	data.newNaire.id="this.newNaire.id";

	uni.showToast({
		title: "创建成功"
	});
	setTimeout(() => {
		//返回问卷列表界面
		//uni.navigateBack({//如何传参？
		  //delta: 1
		//});
		uni.navigateTo({//返回逻辑不对
			url: '../questionnaire_list/questionnaire_list?newNaire='+JSON.stringify(data.newNaire)
		});
	}, 2000); // 3000毫秒后执行页面跳转
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
	margin-top: 10px;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
}
</style>
