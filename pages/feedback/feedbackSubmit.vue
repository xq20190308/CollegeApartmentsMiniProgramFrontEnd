<template>
	<view class="container">

		<uni-section title="投诉与意见" type="line">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="baseForm" :modelValue="baseFormData">
					<!-- <uni-forms-item label="姓名" required>
						<uni-easyinput v-model="baseFormData.name" placeholder="请输入姓名" />
					</uni-forms-item> -->
					<uni-forms-item label="投诉分类" required>
						<uni-data-checkbox v-model="baseFormData.category" multiple :localdata="categories" />
					</uni-forms-item>
					<uni-forms-item label="问题描述">
						<uni-easyinput type="textarea" v-model="baseFormData.describes" placeholder="请输入您遇到的问题" />
					</uni-forms-item>
					<uni-forms-item label="手机号" required>
						<uni-easyinput v-model="baseFormData.contactobject" placeholder="请输入手机号" />
					</uni-forms-item>
				</uni-forms>
			</view>
		</uni-section>
		<button @click="submit" class="button">提交</button>
		</view>
	</template>



	

<script>
export default {
	data() {
		return {
			// 基础表单数据
			baseFormData: {
				contactobject: '',
				describes: '',
				category: '',
			},
			// 表单数据
			alignmentFormData: {
				name: '',
				age: '',
			},
			// 分段器数据
			current: 0,
			items: ['左对齐', '顶部对齐'],
			// 校验规则
			rules: {
				contactobject: {
					rules: [{
						required: true,
						errorMessage: '联系方式不能为空'
					}]
				}
			}
		}
	},
	//     export default {
	//         data() {
	//             return {
	//                 // 基础表单数据
	//                 baseFormData: {            
	//                     contactobject: '',
	//                     describes: '',
	//                     category: '',
	//                 },
	//                 // 表单数据
	//                 alignmentFormData: {
	//                     name: '',
	//                     age: '',
	//                 },
	//                 // 单选数据源
	//                 // 多选数据源
	//                 // categories: [{
	//                 //     text: '宿舍管理',
	//                 //     value: 0
	//                 // }, {
	//                 //     text: '饮水机问题',
	//                 //     value: 1
	//                 // }, {
	//                 //     text: '图书馆问题',
	//                 //     value: 2
	//                 // }, {
	//                 //     text: '足球',
	//                 //     value: 3
	//                 // }, {
	//                 //     text: '篮球',
	//                 //     value: 4
	//                 // }, {
	//                 //     text: '其他',
	//                 //     value: 5
	//                 // }],
	//                 // 分段器数据
	//                 current: 0,
	//                 items: ['左对齐', '顶部对齐'],
	//                 // 校验表单数据
	//                 valiFormData: {
	//                     name: '',
	//                     age: '',
	//                     introduction: '',
	//                 },
	//                 // 校验规则
	//                 rules: {
	//                     contactobject: {
	//                         rules: [{
	//                             required: true,
	//                             errorMessage: '联系方式不能为空'
	//                         }]
	//                     }
	
	//                 // 自定义表单数据
	//                 // customFormData: {
	//                 //     name: '',
	//                 //     age: '',
	//                 //     hobby: []
	//                 // },
	//                 // // 自定义表单校验规则
	//                 // customRules: {
	//                 //     category: {
	//                 //         rules: [{
	//                 //                 format: 'array'
	//                 //             },
	//                 //             {
	//                 //                 validateFunction: function(rule, value, data, callback) {
	//                 //                     if (value.length < 1) {
	//                 //                         callback('请至少勾选一个分类标签')
	//                 //                     }
	//                 //                     return true
	//                 //                 }
	//                 //             }
	//                 //         ]
	//                 //     }
	
	//                 // },
	
	//             // submit(ref) {
	//             //     this.$refs[ref].validate().then(res => {
	//             //         console.log('success', res);
	//             //         uni.showToast({
	//             //             title: `校验通过`
	//             //         })
	//             //     }).catch(err => {
	//             //         console.log('err', err);
	//             //     })
	//             // },
	//         }
	//         }
	//         },
	//     methods:{
	//         uni.request({
	//             url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
	//             method:'POST';
	//                 data: {
	//                 describes:this.baseFormData.describes;
	//                         contactobject:this.baseFormData.contactobject;
	//                         category:this.baseFormData.category;
	//             },
	//             success: (res) => {
	//                 console.log(res.data);
	//                 this.text = 'request success';
	//             }
	//         })
	//     }
	    
	
	
	//     }

	methods: {
		submit() {
			uni.request({
				url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
				method: 'POST',
				data: {
					describes: this.baseFormData.describes,
					contactobject: this.baseFormData.contactobject,
					category: this.baseFormData.category
				},
				success: (res) => {
					console.log(res.data);
					this.text = 'request success';
					uni.navigateTo({
						url:'/pages/feedback/feedback',
					})
				}
			})
		}
	}
}
</script>


<style lang="scss">

	.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
	}

	.button{
		            background-color:dodgerblue;
		            color:white;
		            width: 300px;
		            height: 47px;
		            border:0;
		            font-size: 16px;			
	                border-radius: 30px;
	            } 
</style>

