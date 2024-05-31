<template>
	<view class="container">
		<uni-section :title="data.id+'.'+data.name" type="line" titleFontSize=42rpx>
			<view class="questionsform">
				<view class="questionitem" v-for="(que,qindex) in data.questionList" :key="qindex">
					<view class="quetitle">{{que.id}}.{{que.name}}</view>
					<view class="quedes">描述:{{que.describe}}</view>
					<view class="choice" v-if="que.type===1">
						<radio-group @change="(e) => radioChange(e,qindex)">
							<label v-for="(item, index) in que.content" :key="index">
								<view class="choitem">
									<radio :value="index" />
									<text>{{item}}</text>
								</view>
							</label>
						</radio-group>
					</view>
					<view class="mulchoice"  v-else-if="que.type===2">
						<checkbox-group @change="(e) => checkboxChange(e,qindex)">
							<label v-for="(item, index) in que.content" :key="index">
								<view class="mulchoitem">
									<checkbox :value="index"  />
									<text>{{item}}</text>
								</view>
							</label>
						</checkbox-group>
					</view>
					<view v-else class="answer">
						<input class="answerinput" @input="(e) => inputChange(e,qindex)" placeholder="请输入" placeholder-class="answerplacehoder" />
					</view>
				</view>
			</view>
			<!-- 表单校验 -->
			<uni-forms ref="valiForm" :rules="data.rules" :modelValue="data.valiFormData" label-position="top">
				<uni-forms-item class="form-item" label="姓名" required name="name">
					<uni-easyinput v-model="data.valiFormData.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item class="form-item" label="学号" required name="id">
					<uni-easyinput v-model="data.valiFormData.id" placeholder="请输入学号" />
				</uni-forms-item>
			</uni-forms>
			<button type="primary" style="backgroundColor:#008cff; width:90%"  @click="submit('valiForm')">提交</button>
		
		</uni-section>
	</view>
</template>
<script setup>
import '@/utils/http'
import {reactive, ref} from "vue"; 
import {onLoad,onReady} from "@dcloudio/uni-app";
import {http} from '@/utils/http'
const data = reactive({
	timer:null,//延时器，用于防抖处理
	id:"",
	type: 0,
	name: "",
	descr: null,
	startTime: "",
	endTime: "",
	questionList: [{
		id: "",
		type: 1,
		name: "",
		describe: "",
		content: "[]",
		questionnaire: ""
	}],
	questionidList: null,
	current: [],
	// 校验表单数据
	valiFormData: {
		name: '',
		id: '',
	},
	// 校验规则
	rules: {
		name: {
			rules: [{
				required: true,
				errorMessage: '姓名不能为空'
			}]
		},
		id: {
			rules: [{
				required: true,
				errorMessage: '年龄不能为空'
			}, {
				minLength: 12,
				maxLength: 12,
				errorMessage: '请输入12位学号'
			}]
		}
	},
}) 
const inputChange = (evt,qindex) => {
	clearTimeout(data.timer);
	data.timer = setTimeout(()=>{
		console.log(evt);
		console.log(qindex);
		data.current[qindex]=evt.detail.value;
		console.log(data.current);
		
	}, 500)
}
const checkboxChange = (evt,qindex) => {
	console.log(evt);
	console.log(qindex);
	data.current[qindex]=evt.detail.value;
	console.log(data.current);
}
const radioChange = (evt,qindex) => {
	console.log(evt);
	console.log(qindex);
	data.current[qindex]=evt.detail.value;
	console.log(data.current);
}
const valiForm = ref()
const submit = async (ref) => {
	//先检验必填信息项
	valiForm.value?.validate().then(async res1 => {
		console.log('success', res1);	
		//再检验问题
		if(data.current.length != data.questionList.length){
			uni.showToast({
				title: "请检查作答",
				icon: "error"
			});
			return;
		};
		console.log("填写正确",data.current);
		console.log(data.valiFormData);
		//POST提交到后端
		
		//参数需要改
		const res = await http('/useranswer/submit','POST',{
			answer: "答案",
			questionnaireId: data.id,
		},);
	
		console.log("封装后请求的结果",res)
		uni.showToast({
			title: "提交成功"
		})
		
		
	}).catch(err => {
		console.log('err', err);
	})
}
const getquestions = async () => { 
	const res = await http('/question/selectById?idList='+data.questionidList,'GET',{},)
	
	console.log("封装后请求的结果",res);
	
	console.log("test",data.idList)
	data.questionList=res.data;
	console.log('获取到问题',data.questionList);
	// 使用for循环来修改数据
	for (let i = 0; i < data.questionList.length; i++) {
	  //this.questionList[i].content=JSON.parse(this.questionList[i].content);
		data.questionList[i].content=["A","B","C"]
	}
	
}
onLoad((options) => {
	console.log("参数列表",options);
	
	//测试数据
	data.questionidList=["20181252102","20187874601"];
	
	//this.questionidList = JSON.parse(options.questionidList);
	console.log('问题列表：',data.questionidList);
	
	data.id=options.id;
	data.type=options.type;
	data.name=options.name;
	data.descr=options.descr;
	data.startTime=options.startTime;
	data.endTime =options.endTime ;
	
	getquestions();
	
})
onReady(()=>{
	// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
	//this.$refs.valiForm.setRules(data.rules)
}) 
</script>

<style lang="scss" scoped>
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
