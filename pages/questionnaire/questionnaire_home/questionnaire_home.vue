<template>
	<view class="container">
		<uni-section :title="id+'.'+name" type="line" titleFontSize=42rpx>
			<view class="questionsform" v-for="(que,qindex) in questionList" :key="qindex">
				<view class="quetitle">{{que.id}}.{{que.name}}</view>
				<view class="quedes">描述:{{que.describe}}</view>
				<view class="que-list">
					<radio-group @change="(e) => radioChange(e,qindex)">
						<label class="choitem" v-for="(item, index) in que.content" :key="index">
							<view class="">
								<radio :value="index" />
								<text>{{item}}</text>
							</view>
						</label>
					</radio-group>
				</view>
			</view>
			<!-- 表单校验 -->
			<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
				<uni-forms-item label="姓名" required name="name">
					<uni-easyinput v-model="valiFormData.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="学号" required name="id">
					<uni-easyinput v-model="valiFormData.id" placeholder="请输入学号" />
				</uni-forms-item>
			</uni-forms>
			<button type="primary" style="backgroundColor:#008cff; width:90%"  @click="submit('valiForm')">提交</button>
		
		</uni-section>
	</view>
</template>
<script>
	import question from '../../../components/question/question.vue'
	
	export default {
		data() {
			return {
				id:"",
				type: 0,
				name: "",
				descr: null,
				startTime: "",
				endTime: "",
				questionList: [{
					id: "20187874601",
					type: 1,
					name: "去几楼",
					describe: "which floor",
					content: "[\"1\",\"2\",\"3\"]",
					questionnaire: "20181215506"
				}],
				questionidList: [],
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
			}
		},
		props:{
			id:"",
			type: 0,
			name: "",
			descr: null,
			startTime: "",
			endTime: "",
			questionidList: [],
		},
		methods: {
			radioChange: function(evt,qindex) {
				console.log(evt);
				console.log(qindex);
				this.current[qindex]=evt.detail.value;
				console.log(this.current);
			},
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					uni.showToast({
						title: `校验通过`
					})
					//POST
					
				}).catch(err => {
					console.log('err', err);
				})
			},
			getquestions(){
				uni.request({
					url:'http://127.0.0.1:4523/m1/4414254-4059226-default/question/selectById',
					method: 'POST',
					data:{
						idList: this.questionidList
					},
					success: (res)=> {
						//this.questionList=res.data.data;
						this.questionList=[
						    {
						      id: "20181252102",
						      type: 1,
						      name: "去哪个餐厅",
						      describe: "那个餐厅你更想去",
						      content: "[\"A\",\"B\",\"C\"]",
						      questionnaire: "20181215506"
						    },
						    {
						      id: "20187874601",
						      type: 1,
						      name: "去几楼",
						      describe: "which floor",
						      content: "[\"1\",\"2\",\"3\"]",
						      questionnaire: "20181215506"
						    }]
						
						
						// 假设我们要修改的初始数据
						let contentexample = "[\"A\",\"B\",\"C\"]";
						
						// 使用for循环来修改数据
						for (let i = 0; i < this.questionList.length; i++) {
						  this.questionList[i].content=JSON.parse(contentexample);
						}
						console.log('获取到问题',this.questionList);				
					},
					complete: (res)=>{
						console.log();
					}
				});
			},
		},
		computed: {
			
		},
		onLoad(options) {
			let opquidliexample="[\"20181252102\",\"20187874601\"]"
			this.questionidList = JSON.parse(opquidliexample);
			console.log('问题列表：',this.questionidList);
			console.log("参数列表",options);
			
			this.id=options.id;
			this.type=options.type;
			this.name=options.name;
			this.descr=options.descr;
			this.startTime=options.startTime;
			this.endTime =options.endTime ;
			
			this.getquestions();
			
		},
		onReady() {
			
		}
	}
</script>

<style>
</style>
