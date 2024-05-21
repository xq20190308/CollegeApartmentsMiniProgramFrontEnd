<template>
	<view class="container">
		<uni-section :title="id+'.'+name" type="line" titleFontSize=42rpx>
			<view class="questionsform">
				<uni-forms-item v-for="(item,index) in questionList " :key="index" :label="item.name" required label-width="top">
					{{item.descr}}
				</uni-forms-item>
				
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
			</view>
		</uni-section>
	</view>
</template>
<script>
	
	export default {
		data() {
			return {
				id:"",
				type: 0,
				name: "",
				descr: null,
				startTime: "",
				endTime: "",
				questionList: [],
				questionidList: [],
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
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					uni.showToast({
						title: `校验通过`
					})
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
						this.questionList=res.data.data;
						console.log('获取到问题',this.questionList);				
					},
					complete: (res)=>{
						console.log();
					}
				});
			}
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
			
			console.log("问卷id",this.id);
		},
		onReady() {
			
		}
	}
</script>

<style>
</style>
