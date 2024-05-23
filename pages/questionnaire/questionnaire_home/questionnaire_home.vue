<template>
	<view class="container">
		<uni-section :title="id+'.'+name" type="line" titleFontSize=42rpx>
			<view class="questionsform">
				<view class="questionitem" v-for="(que,qindex) in questionList" :key="qindex">
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
			<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData" label-position="top">
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
			inputChange: function (evt,qindex) {
				clearTimeout(this.timer);
				this.timer = setTimeout(()=>{
					console.log(evt);
					console.log(qindex);
					this.current[qindex]=evt.detail.value;
					console.log(this.current);
					
				}, 500)
			},
			checkboxChange: function (evt,qindex) {
				console.log(evt);
				console.log(qindex);
				this.current[qindex]=evt.detail.value;
				console.log(this.current);
			},
			radioChange: function(evt,qindex) {
				console.log(evt);
				console.log(qindex);
				this.current[qindex]=evt.detail.value;
				console.log(this.current);
			},
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					console.log('success', res);	
					//检验问题
					if(this.current.length != this.questionList.length){
						uni.showToast({
							title: "请检查作答",
							icon: "error"
						});
						return;
					};
					console.log("填写正确",this.current);
					console.log(this.valiFormData);
					//POST
					uni.request({
						url:'',
						method: 'POST',
						data:{
						},
						success: (res)=> {
							uni.showToast({
								title: "提交成功"
							})			
						},
						complete: (res)=>{
							
						}
					});
					
				}).catch(err => {
					console.log('err', err);
				})
			},
			getquestions(){
				uni.request({
					//url:'http://127.0.0.1:4523/m1/4414254-4059226-default/question/selectById?idList='+this.questionidList,
					url:'http://127.0.0.1:4523/m1/4414254-4059226-default/question/selectById?idList='+this.questionidList,
					method: 'GET',
					header: 'Content-Type: application/json',
					data:{
						idList:this.questionidList,
					},
					success: (res)=> {
						
						console.log("请求返回",res)
						this.questionList=res.data.data;
						console.log('获取到问题',this.questionList);
						
						// 使用for循环来修改数据
						for (let i = 0; i < this.questionList.length; i++) {
						  //this.questionList[i].content=JSON.parse(this.questionList[i].content);
							this.questionList[i].content=["A","B","C"]
						}
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
			console.log("参数列表",options);
			this.questionidList=["20181252102","20187874601"]
			//this.questionidList = JSON.parse(options.questionidList);
			console.log('问题列表：',this.questionidList);
			
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
