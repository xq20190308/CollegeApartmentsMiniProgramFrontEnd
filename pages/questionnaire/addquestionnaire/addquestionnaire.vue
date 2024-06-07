<template>
	<uni-section title="问卷类型（下拉选择）：" type="line" padding>
		<uni-data-select :localdata="data.types" @change="(e) => {data.newNaire.type = data.types[e].value; console.log(data.newNaire.type)}"></uni-data-select>
	</uni-section>
	<uni-section title="问卷名称（填写）：" type="line" padding>
		<view style="display: flex;flex-wrap: nowrap;">
			<input @input="(e) => {data.newNaire.name=newdata(e.detail.value);}" placeholder="请输入问卷名称" placeholder-class="answerplacehoder" />
		</view>
	</uni-section>
	<uni-section title="问卷描述（填写）：" type="line" padding>
		<view style="display: flex;flex-wrap: nowrap;">
			<input @input="(e) => {data.newNaire.description=newdata(e.detail.value);}" placeholder="请输入问卷描述" placeholder-class="answerplacehoder" />
		</view>
	</uni-section>
	<uni-section title="选择日期及时间：" type="line" padding>
		<view class="example-body">
			<uni-datetime-picker type="datetimerange" rangeSeparator="至" @change="(e) => {data.newNaire.startTime = e[0];console.log(data.newNaire.startTime);data.newNaire.endTime = e[1];console.log(data.newNaire.endTime)}" />
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
				<input @input="(e) => {data.questionList[qindex].name=qnewdata(e,qindex)}" placeholder="请输入题目名称"  />
			</view>
			<view class="answer">
				<input @input="(e) => {data.questionList[qindex].description=qnewdata(e,qindex)}" placeholder="请输入题目描述"  />
			</view>
			<view class="choice" v-if="que.type===1">
				<view style="display: flex; flex-wrap: nowrap; margin-bottom: 2px;" v-for="(item, index) in que.content" :key="index">
					<view style="background-color: white; width: 20px;height: 20px;border-radius: 50px; border: 1px solid #7f7f7f; margin-right: 5px;"></view>
					<input  @input="(e) => {data.questionList[qindex].content[index]=qnewdata(e,qindex);console.log(data.questionList[qindex].content)}" placeholder="请输入选项"  />
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
					<input @input="(e) => {data.questionList[qindex].content[index]=qnewdata(e,qindex);console.log(data.questionList[qindex].content[index])}" placeholder="请输入选项"  />
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
	types:[
          { value: 0, text: '篮球' },
          { value: 1, text: '足球' },
          { value: 2, text: '游泳' },
        ],
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
		content: ["A", "B", "C"],
		questionnaire_id: "",
	});
	console.log(data.questionList)
} 
const submit = async ()=> {
	console.log("新问卷",data.newNaire)
	console.log("新问卷的问题",data.questionList)
	//校验
	
	//提交到后端
	let list=[];
	for(let i=0;i<data.questionList.length;i++){
		list[i]={...data.questionList[i]};
		list[i].content=JSON.stringify(list[i].content);
	}
	console.log('list',list)
	console.log('data.questionList',data.questionList)
	const res = await http('/questionnaire/add','POST',{...data.newNaire,questionList:list},);
	
	console.log("封装后请求的结果",res) 

	uni.showToast({
		title: "创建成功"
	});
	setTimeout(() => {
		uni.navigateTo({
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
