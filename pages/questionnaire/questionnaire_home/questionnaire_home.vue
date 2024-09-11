<template>
	<view class="banner">
		<text class="underline-text" @click="overview">{{data.showsubmits?"问卷详情":"提交情况"}}</text>
		<view class="bar,barb">
			<uni-section v-if="data.showsubmits">
				<text>总提交份数：{{data.numOfAnswers}}</text>
				<text class="underline-text" @click="()=>{data.table=data.table?false:true}">{{data.table?"饼状图":"表格"}}</text>
				<view style="height: 20px;"></view>
				<view  v-if="data.table">
					<uni-table border stripe emptyText="暂无更多数据" >
						<!-- 表头行 -->
						<uni-tr>
							<uni-th :width="25" align="center">序号</uni-th>
							<uni-th :width="100" align="center">选项</uni-th>
							<uni-th :width="25" align="left">数量</uni-th>
							<uni-th :width="50" align="left">百分比</uni-th>
							<uni-th :width="100" align="left">题目</uni-th>
						</uni-tr>
						<!-- 表格数据行 -->
						<uni-tr v-for="(item,index) in data.answerCountList" :key="index">
							<uni-td>{{index+1}}</uni-td>
							<uni-td>
								<uni-tr v-if="item.choiceSumList!=null" v-for="(itemofc,indexofc) in item.choiceSumList" :key="indexofc">{{String.fromCharCode(indexofc.toString().charCodeAt(0)-'0'.charCodeAt(0)+'A'.charCodeAt(0))+"  "+data.questionList[index].content[indexofc]}}</uni-tr>
							</uni-td>
							<uni-td>
								<uni-tr v-if="item.choiceSumList!=null" v-for="(itemofc,indexofc) in item.choiceSumList" :key="indexofc">{{itemofc}}</uni-tr>
							</uni-td>
							<uni-td>
								<uni-tr v-if="item.choiceSumList!=null" v-for="(itemofc,indexofc) in item.choiceSumList" :key="indexofc">{{itemofc/data.numOfAnswers*100}}%</uni-tr>
							</uni-td>
							<uni-td>{{data.questionList[index].name}}</uni-td>
						</uni-tr>
					</uni-table>
				</view>
				<view v-else v-for="(item,index) in data.chartDatas" :key="index">
					<view class="charts-box" style="top: 2px;" v-if="data.chartDatas[index].series[0].data.length>0">{{index+1}}.{{data.questionList[index].name}}：
						<qiun-data-charts type="pie" :opts="data.opts" :chartData="data.chartDatas[index]"></qiun-data-charts>
					</view>
				</view>
			</uni-section>
			<uni-section :padding="true" v-else :title="newNaire.id+'.'+newNaire.name" type="line" titleFontSize="42rpx">
			<template v-slot:right>
				<uni-icons @click="showmyanswer" type="arrow-up" size="18"></uni-icons>
			</template>
			<text class="text-common">{{newNaire.type}}</text>
			<text class="text-common">{{newNaire.description}}</text>
			<text class="text-common">{{newNaire.startTime}}-{{newNaire.endTime}}</text>
			<!-- 表单校验 -->
			<uni-forms ref="valiForm" :rules="rules" :modelValue="data.valiFormData" label-position="top">
				<uni-forms-item v-if="!newNaire.anonymous" label="姓名" name="name" required>
					<uni-easyinput v-model="data.valiFormData.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item  v-if="!newNaire.anonymous"  label="学号" name="id" required>
					<uni-easyinput v-model="data.valiFormData.id" placeholder="请输入学号" />
				</uni-forms-item>
				<uni-forms-item v-for="(que,qindex) in data.questionList" :label="(qindex + 1)+'.'+que.name" :name="'q'+qindex" required :key="qindex" class="questionitem" >
						<view class="text-common" >描述:{{que.description}}</view>
						<uni-data-checkbox v-if="data.questionList[qindex].type.includes('选')" :multiple="data.questionList[qindex].type.includes('多')" v-model="data.valiFormData['q'+qindex]" :localdata="data.questionList[qindex].content"/>
						<uni-easyinput v-else v-model="data.valiFormData['q'+qindex]" placeholder="请输入" />
					
				</uni-forms-item>
			</uni-forms>
			<button v-if="data.isEnd!='true'" type="primary" style="backgroundColor:#008cff; width:90%;bottom: 15rpx;"  @click="submit('valiForm')">提交</button>
		</uni-section>
		</view>
	</view>
</template>
<script setup>
import '@/utils/http'
import {computed, reactive, ref} from "vue"; 
import {onLoad,onReady} from "@dcloudio/uni-app";
import {http} from '@/utils/http'
import { useDict } from '../../../utils/dict';
const newNaire = reactive({})//传到问卷列表页面中的数据
const data = reactive({
	numOfAnswers:0,
	answerCountList:[],
	opts: {
		color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
		padding: [5,5,5,5],
		enableScroll: false,
		extra: {
		  pie: {
			activeOpacity: 0.5,
			activeRadius: 10,
			offsetAngle: 0,
			labelWidth: 15,
			border: true,
			borderWidth: 3,
			borderColor: "#FFFFFF"
		  }
		}
	},
	chartDatas:[],
	showsubmits:false,
	timer:null,//延时器，用于防抖处理
	questionList: [],
	// 校验表单数据
	valiFormData: {
		name: '',
		id: '',
	},
	fun_question_type:[]
})
const overview = async ()=>{
	data.showsubmits=data.showsubmits?false:true;
	if(data.showsubmits==true&&data.answerCountList.length==0){
		const res = await http('/questionnaire/useranswer/anssum?questionnaireId='+data.id,'GET',{},)
		data.numOfAnswers=res.data.numOfAnswers
		data.answerCountList=res.data.answerCountList;
		console.log(data.answerCountList)
		for (var i = 0; i < data.answerCountList.length; i++) {
			if(data.answerCountList[i].answerType<=2){
				let datai=[]
				for (var j = 0; j < data.answerCountList[i].choiceSumList.length; j++) {
					datai.push({"name":data.questionList[i].content[j].text,"value":data.answerCountList[i].choiceSumList[j]})
				}
				data.chartDatas.push({
				  series: [
					{
					  data: datai
					}
				  ]
				})
			}else{
				data.chartDatas.push({
				  series: [
					{
					  data: []
					}
				  ]
				})
			}
		}
		console.log(data.chartDatas)
	}
}
const showmyanswer = async () => {
	http('/questionnaire/useranswer/getmyanswer?questionnaireId='+newNaire.id,'GET',{},).then((res)=>{
		if(res.msg=='您还没有填写该问卷'){
			uni.showToast({
				title: res.msg
			});
		}else{
			uni.showModal({
				title: "已填写过,是否显示填写情况",
				success: (res1) => {
					if (res1.confirm) {
						let current=JSON.parse(res.data.answer);
						for (var i = 0; i < current.length; i++) {
							data.valiFormData['q'+i] = current[i]
						}
						console.log('++',current)
					} else if (res1.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		}
	})
}
const valiForm = ref()
const submit = (ref) => {
	//检验
	valiForm.value?.validate().then(res1 => {
		let answer = []
		for (var i = 0; i < data.questionList.length; i++) {
			answer.push(data.valiFormData['q'+i])
		}
		console.log(JSON.stringify(answer));
		//POST提交到后端
		http('/questionnaire/useranswer/submit','POST',{
			answer: JSON.stringify(answer),
			questionnaireId: newNaire.id,
		}).then((res)=>{
			if(res.msg=="您已填写过该问卷"){
				uni.showToast({
					title: "你已填写过该问卷"
				});
			}else{
				uni.showToast({
					title: "提交成功"
				})
				uni.navigateBack();
			}
		})
	}).catch(()=>{})
}
const getquestions =() => { 
	http('/questionnaire/question/selectByQuestionnaireId/'+newNaire.id,'GET',{},).then((res)=>{
		for(let i=0;i<res.data.length;i++){
			res.data[i].content = JSON.parse(res.data[i].content)
			if(typeof res.data[i].content === "object"){
				res.data[i].content=res.data[i].content.map((item,index)=>{
					return {
						text: item,
						value: index
					}
				})
			}else{
				res.data[i].content=""
			}
			res.data[i].type=data.fun_question_type.filter((dict)=>{return dict.value===res.data[i].type})[0].label
			data.questionList.push(res.data[i])
		}
	})
}
onLoad(async (options) => {
	data.fun_question_type=useDict('fun_question_type')
	let info = JSON.parse(options.info)
	for(const key in info){
		newNaire[key]=info[key]
	}
	getquestions();
	
	console.log(newNaire)
})
// 校验规则
const rules = computed(()=>{
	return {
		name: {
			rules: [{
				required: true,
				errorMessage: '姓名不能为空'
			}]
		},
		id: {
			rules: [{
				required: true,
				errorMessage: '学号不能为空'
			},{
				minLength: 12,
				maxLength: 12,
				errorMessage: '请输入12位学号'
			}]
		},
		...generateQuestionRules(data.questionList)
	}
})
const generateQuestionRules = (questions) => {
    const questionRules = {};
    questions.forEach((que, qindex) => {
        questionRules['q' + qindex] = {
            rules: [
                { required: true, errorMessage: '问题不能为空' }
            ]
        };
    });
    return questionRules;
}
</script>

<style>
</style>
