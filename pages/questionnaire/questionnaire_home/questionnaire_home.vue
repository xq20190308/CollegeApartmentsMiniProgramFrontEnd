<template>
	<view class="container">
		<view style="height: 20px;margin-bottom: 1px;">
			<text class="underline-text" @click="overview">{{data.showsubmits?"问卷详情":"提交情况"}}</text>
		</view>
		<uni-section v-if="data.showsubmits">
			<text>总提交份数：{{data.numOfAnswers}}</text>
			<text class="underline-text" @click="()=>{data.table=data.table?false:true}">{{data.table?"饼状图":"表格"}}</text>
			<view style="height: 20px;"></view>
			<view  v-if="data.table">
				<uni-table border stripe emptyText="暂无更多数据" >
					<!-- 表头行 -->
					<uni-tr>
						<uni-th :width="50" align="center">序号</uni-th>
						<uni-th :width="100" align="center">选项</uni-th>
						<uni-th :width="50" align="left">数量</uni-th>
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
		<uni-section v-else :title="data.id+'.'+data.name" type="line" titleFontSize=42rpx>
			<template v-slot:right>
				<uni-icons @click="showmyanswer" type="arrow-up" size="20"></uni-icons>
			</template>
			<view class="questionsform">
				<view class="questionitem" v-for="(que,qindex) in data.questionList" :key="qindex">
					<view class="quetitle">{{qindex + 1}}.{{que.name}}</view>
					<view class="quedes">描述:{{que.description}}</view>
					<view class="choice" v-if="que.type===1">
						<radio-group  @change="(e) => radioChange(e,qindex)">
							<label v-for="(item, index) in que.content" :key="index">
								<view class="choitem">
									<radio :value="index" :checked="index==data.current[qindex]" />
									<text>{{item}}</text>
								</view>
							</label>
						</radio-group>
					</view>
					<view class="mulchoice"  v-else-if="que.type===2">
						<checkbox-group :value="data.current[qindex]" @change="(e) => checkboxChange(e,qindex)">
							<label v-for="(item, index) in que.content" :key="index">
								<view class="mulchoitem">
									<checkbox :value="index" :checked="ischeckedmul(qindex,index)" />
									<text>{{item}}</text>
								</view>
							</label>
						</checkbox-group>
					</view>
					<view v-else class="answer">
						<input v-model="data.current[qindex]" class="answerinput" placeholder="请输入" placeholder-class="answerplacehoder" />
					</view>
				</view>
			</view>
			<!-- 表单校验 -->
			<uni-forms ref="valiForm" :rules="rules" :modelValue="data.valiFormData" label-position="top">
				<uni-forms-item  class="form-item" label="姓名" name="name" :required="data.isanonymous">
					<uni-easyinput v-model="data.valiFormData.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item  class="form-item" label="学号" name="id" :required="data.isanonymous">
					<uni-easyinput v-model="data.valiFormData.id" placeholder="请输入学号" />
				</uni-forms-item>
			</uni-forms>
			
			<button type="primary" style="backgroundColor:#008cff; width:90%"  @click="submit('valiForm')">提交</button>
		</uni-section>
	</view>
</template>
<script setup>
import '@/utils/http'
import {computed, reactive, ref} from "vue"; 
import {onLoad,onReady} from "@dcloudio/uni-app";
import {http} from '@/utils/http'
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
	showsubmits:false,
	timer:null,//延时器，用于防抖处理
	//匿名的话questionnaire加一个isAnonymous
	isanonymous:true,//需要从后端获取
	id:"",
	type: 0,
	name: "",
	description: null,
	startTime: "",
	endTime: "",
	questionList: [
	// 	{
	// 	id: "",
	// 	type: 1,
	// 	name: "",
	// 	describe: "",
	// 	content: "[]",
	// 	questionnaire: ""
	// },
	],
	current: [],
	// 校验表单数据
	valiFormData: {
		name: '',
		id: '',
	},
	// 校验规则
	chartDatas:[],
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
					datai.push({"name":data.questionList[i].content[j],"value":data.answerCountList[i].choiceSumList[j]})
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
const rules = computed(()=>{
	if(data.isanonymous==true){
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
			}
		}
	}else{
		return {
			name: {
				rules: []
			},
			id: {
				rules: []
			}
		};
	};
})
const ischeckedmul = (qindex,index)=>{
	//console.log("--",data.current[qindex]);
	return (data.current[qindex]?data.current[qindex].indexOf(String(index)):-1)!=-1;
}
const showmyanswer = async () => {
	console.log("显示我的回答questionnaireId=",data.id);
	const res = await http('/questionnaire/useranswer/getmyanswer?questionnaireId='+data.id,'GET',{},)
	if(res.msg=='您还没有填写该问卷'){
		uni.showModal({
			title:'您还没有填写该问卷',
			icon: 'error'
		})
	}else{
		data.current=JSON.parse(res.data.answer);
	}
	console.log(data.current);
}
const inputChange = (evt,qindex) => {
	clearTimeout(data.timer);
	data.timer = setTimeout(()=>{
		data.current[qindex]=evt.detail.value;
		console.log(data.current);
	}, 500)
}
const checkboxChange = (evt,qindex) => {
	data.current[qindex]=evt.detail.value.sort();
	console.log(data.current);
}
const radioChange = (evt,qindex) => {
	data.current[qindex]=evt.detail.value;
	console.log(data.current);
}
const valiForm = ref()
const submit = async (ref) => {
	console.log('valiForm ',valiForm)
	//先检验必填信息项
	valiForm.value?.validate().then(async res1 => {
		console.log('success', res1);
		console.log(data.current);
		console.log(data.questionList);
		//再检验问题
		let correctlen = data.questionList.length
		if(data.current.length != correctlen){
			uni.showToast({
				title: "请检查作答",
				icon: "error"
			});
			return;
		};
		//POST提交到后端
		let answer = JSON.stringify(data.current);
		if(data.isanonymous){
			answer = JSON.stringify([...data.current,res1.name,res1.id])
		}
		const res = await http('/questionnaire/useranswer/submit','POST',{
			answer: answer ,
			questionnaireId: data.id,
		},);
		if(res.msg=="您已填写过该问卷"){
			clearTimeout(data.timer);
			data.timer = setTimeout(()=>{
				uni.showModal({
					title: "你已填写过该问卷,是否显示填写情况",
					success:async (res3) => {
						const res2 = await http('/questionnaire/useranswer/getmyanswer?questionnaireId='+data.id,'GET',{},)
						if (res3.confirm) {
							data.current=JSON.parse(res2.data.answer);
							if(!data.isanonymous){
								data.current=data.current.slice(0,data.current.length-2)
							}
						} else if (res3.cancel) {
							console.log('用户点击取消');
							data.current={};
							data.valiFormData={};
						}
					}
				});
			}, 300)
			return;
		}else{
			clearTimeout(data.timer);
			data.timer = setTimeout(()=>{
				uni.showToast({
					title: "提交成功"
				})
			}, 300)
			uni.navigateBack();
		}
	}).catch(err => {
		console.log('err', err);
	})
}
const getquestions = async () => { 
	const res = await http('/questionnaire/question/selectByQuestionnaireId/'+data.id,'GET',{},)
	
	data.questionList=res.data;
	for(let i=0;i<data.questionList.length;i++){
		data.questionList[i].content=JSON.parse(data.questionList[i].content)
	}
}
onLoad(async (options) => {
	console.log("参数列表",options);
	
	data.id=options.id;
	data.type=options.type;
	data.name=options.name;
	data.description=options.description;
	data.startTime=options.startTime;
	data.endTime =options.endTime ;
	data.isanonymous=options.anonymous=='false'?false:true;
	clearTimeout(data.timer);
	data.timer = setTimeout(()=>{
		getquestions();
	}, 100)
	const res = await http('/questionnaire/useranswer/getmyanswer?questionnaireId='+data.id,'GET',{},)
	
	if(res.msg=='您还没有填写该问卷'){
		console.log("该用户没填写过此问卷")
	}else{
		uni.showModal({
			title: "已填写过,是否显示填写情况",
			success: (res1) => {
				if (res1.confirm) {
					data.current=JSON.parse(res.data.answer);
					console.log('++',data.current)
					if(!data.isanonymous){
						data.current=data.current.slice(0,data.current.length-2)
						console.log('++',data.current)
					}
					
				} else if (res1.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}
})
onReady(()=>{
	
}) 
</script>

<style lang="scss" scoped>
	.charts-box {
		padding-left: 40px;
	    width: 80%;
	    height: 150px;
		padding-top: 5px;
	  }
	::v-deep .uni-forms-item{
		margin-left: 10px;
		margin-right: 10px;
		background-color: ghostwhite;
	}
	.questionsform{
		margin-left: 10px;
		margin-right: 10px;
		display: flex;
		flex-wrap: wrap;
	}
	.underline-text {
		padding-left: 5px;
		padding-right: 5px;
		padding-top: 5px;
		float: right;
		font-weight: 300;
		font-size: 12px;
		text-decoration: underline;
		color: #000000;
	  }
	  .underline-text:active {
	    color: #0000ff; /* 点击时的蓝色 */
	  }
	.questionitem{
		width: 100%;
		margin-bottom: 20px;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		.quetitle{
			width: 100%;
			background-color: ghostwhite;
		}
		.quedes{
			width: 100%;
			background-color: ghostwhite;
			padding-bottom: 10px;
			
		}
		.answer{
			border: 1px solid #dcdfe6;
			border-radius: 4px;
			.answerinput{
				font-size: 14px;
				height: 35px;
				padding-left: 10px;
			}
			
		}
		.choice{
			border: 1px solid #dcdfe6;
			border-radius: 4px;
			.choitem{
				border-bottom: 1px solid #dcdfe6;
				padding-top: 10px;
				padding-bottom: 3px;
			}
		}
		.mulchoice{
			border: 1px solid #dcdfe6;
			border-radius: 4px;
			.mulchoitem{
				border-bottom: 1px solid #dcdfe6;
				padding-top: 10px;
				padding-bottom: 3px;
			}
		}
		::v-deep .answerplacehoder{
			font-size: 12px;
		}
	}
</style>
