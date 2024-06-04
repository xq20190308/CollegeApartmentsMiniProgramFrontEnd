<template>
	<view class="container">
		<uni-section :title="data.id+'.'+data.name" type="line" titleFontSize=42rpx>
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
			<view style="margin-left: 280px;">匿名<switch :checked="data.isanonymous" @change="(e)=>{data.isanonymous=e.detail.value}" /></view>
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
	timer:null,//延时器，用于防抖处理
	//匿名的话questionnaire加一个isAnonymous
	isanonymous:false,
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
})
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
		return {};
	};
})
const ischeckedmul = (qindex,index)=>{
	console.log("--",data.current[qindex]);
	return (data.current[qindex]?data.current[qindex].indexOf(String(index)):-1)!=-1;
}
const showmyanswer = async () => {
	console.log("显示我的回答questionnaireId=",data.id);
	const res = await http('/useranswer/getmyanswer?questionnaireId='+data.id,'GET',{},)
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
	data.current[qindex]=evt.detail.value;
	console.log(data.current);
}
const radioChange = (evt,qindex) => {
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
		//POST提交到后端
		const res = await http('/useranswer/submit','POST',{
			answer: JSON.stringify(data.current),
			questionnaireId: data.id,
		},);

		clearTimeout(data.timer);
		data.timer = setTimeout(()=>{
			uni.showToast({
				title: "提交成功"
			})
		}, 300)
		uni.navigateBack();
	}).catch(err => {
		console.log('err', err);
	})
}
const getquestions = async () => { 
	const res = await http('/question/selectByQuestionnaireId/'+data.id,'GET',{},)
	
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
	clearTimeout(data.timer);
	data.timer = setTimeout(()=>{
		getquestions();
	}, 100)
	const res = await http('/useranswer/getmyanswer?questionnaireId='+data.id,'GET',{},)
	
	if(res.msg=='您还没有填写该问卷'){
		console.log("该用户没填写过此问卷")
	}else{
		uni.showModal({
			title: "已填写过,是否显示填写情况",
			success: (res1) => {
				if (res1.confirm) {
					data.current=JSON.parse(res.data.answer);
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
