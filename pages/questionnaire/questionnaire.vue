<!-- <template>
	<view class="container">
		<view class="text-style">请写出您的诉求</view>
		<view class="input-container">
			<p class="text-style1">请输入</p>
		</view>
		<view class="btn-container">
			<button class="btn" @click="handleClick">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		methods: {
			handleClick() {
				// Handle the click event
			}
		}
	};
</script>

<style lang="scss">
	/* 全局样式 */
	page, view {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	/* 主容器 */
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background-color: #F3F4F6; // 轻背景色，提高可读性
	}

	/* 文本样式 */
	.text-style {
		font-size: 24px;
		font-weight: 400;
		line-height: 24px;
		color: #333;
		margin-bottom: 16px;
	}

	/* 输入容器样式 */
	.input-container {
		background: #F0EBEB;
		border-radius: 10px;
		border: 1px solid #333;
		padding: 16px;
		width: 80%;
		max-width: 400px;
	}

	/* 文本样式1 */
	.text-style1 {
		font-size: 16px;
		font-weight: 400;
		color: #333;
	}

	/* 按钮容器 */
	.btn-container {
		display: flex;
		justify-content: flex-end;
		margin-top: 40px; // 根据需要调整
	}

	/* 按钮样式 */
	.btn {
		background-color: #FFC300;
		color: #fff;
		padding: 8px 20px;
		border-radius: 10px;
		border: none;
		cursor: pointer;
		transition: background-color 0.3s ease;

		&:active {
			background-color: #FFB000; // 点击时颜色变深
		}
	}
</style -->>

<template>
	<uni-section title="" type="line">
				<view class="example">
					<!-- 基础表单校验 -->
					<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
						<uni-forms-item label="姓名" required name="name">
							<uni-easyinput v-model="valiFormData.name" placeholder="请输入姓名" />
						</uni-forms-item>
						<uni-forms-item label="年龄" required name="age">
							<uni-easyinput v-model="valiFormData.age" placeholder="请输入年龄" />
						</uni-forms-item>
						<uni-forms-item label="自我介绍" name="introduction">
							<uni-easyinput type="textarea" v-model="valiFormData.introduction" placeholder="请输入自我介绍" />
						</uni-forms-item>
					</uni-forms>
					<button type="primary" @click="submit('valiForm')">提交</button>
				</view>
			</uni-section>
</template>

<script>
	export default {
		data() {
			return {
				// 基础表单数据
				baseFormData: {
					name: '',
					age: '',
					introduction: '',
					sex: 2,
					hobby: [5],
					datetimesingle: 1627529992399
				},
				// 表单数据
				alignmentFormData: {
					name: '',
					age: '',
				},
				// 单选数据源
				sexs: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}, {
					text: '保密',
					value: 2
				}],
				// 多选数据源
				hobbys: [{
					text: '跑步',
					value: 0
				}, {
					text: '游泳',
					value: 1
				}, {
					text: '绘画',
					value: 2
				}, {
					text: '足球',
					value: 3
				}, {
					text: '篮球',
					value: 4
				}, {
					text: '其他',
					value: 5
				}],
				// 分段器数据
				current: 0,
				items: ['左对齐', '顶部对齐'],
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
					age: '',
					hobby: []
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
					},
					hobby: {
						rules: [{
								format: 'array'
							},
							{
								validateFunction: function(rule, value, data, callback) {
									if (value.length < 2) {
										callback('请至少勾选两个兴趣爱好')
									}
									return true
								}
							}
						]
					}

				},
				dynamicFormData: {
					email: '',
					domains: {}
				},
				dynamicLists: [],
				dynamicRules: {
					email: {
						rules: [{
							required: true,
							errorMessage: '域名不能为空'
						}, {
							format: 'email',
							errorMessage: '域名格式错误'
						}]
					}
				}
			}
		},
		computed: {
			// 处理表单排列切换
			alignment() {
				if (this.current === 0) return 'left'
				if (this.current === 1) return 'top'
				return 'left'
			}
		},
		onLoad() {},
		onReady() {
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
			this.$refs.customForm.setRules(this.customRules)
		},
		methods: {
			onClickItem(e) {
				console.log(e);
				this.current = e.currentIndex
			},
			add() {
				this.dynamicLists.push({
					label: '域名',
					rules: [{
						'required': true,
						errorMessage: '域名项必填'
					}],
					id: Date.now()
				})
			},
			del(id) {
				let index = this.dynamicLists.findIndex(v => v.id === id)
				this.dynamicLists.splice(index, 1)
			},
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

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		margin-left: 10px;
	}
</style>

