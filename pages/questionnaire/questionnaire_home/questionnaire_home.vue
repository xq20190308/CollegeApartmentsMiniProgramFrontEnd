<template>
	<view class="container">
		<uni-section title="自定义校验规则" type="line">
			<view class="example">
				<!-- 自定义表单校验 -->
				<uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData">
					<uni-forms-item label="姓名" required name="name">
						<uni-easyinput v-model="customFormData.name" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="学号" required name="age">
						<uni-easyinput v-model="customFormData.age" placeholder="请输入学号" />
					</uni-forms-item>
				</uni-forms>
				<button type="primary" @click="submit('customForm')">提交</button>
			</view>
		</uni-section>
	</view>
</template>
<script>
	import {getLocalData} from '../../utils/cache.js';
	
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
				// 校验表单数据
				valiFormData: {
					name: '',
					age: '',
					introduction: '',
				},
				// 校验规则
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					age: {
						rules: [{
							required: true,
							errorMessage: '年龄不能为空'
						}, {
							format: 'number',
							errorMessage: '年龄只能输入数字'
						}]
					}
				},
				// 自定义表单数据
				customFormData: {
					name: '',
					age: ''
				},
				// 自定义表单校验规则
				customRules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					age: {
						rules: [{
							required: true,
							errorMessage: '年龄不能为空'
						}]
					}
				},
			}
		},
		props:{
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
		},
		computed: {
			
		},
		onLoad() {
			
		},
		onReady() {
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
		}
	}
</script>

<style>
</style>
