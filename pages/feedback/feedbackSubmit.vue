<template>
	<view class="container">

		<uni-section title="投诉与意见" type="line">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="baseForm" :rules="customRules" :modelValue="baseFormData">
					<!-- 用labelstyle设置样式 -->
					<uni-forms-item label="投诉分类" label-width="100px" label-style="font-size: 14px;" required>
						<uni-data-checkbox v-model="baseFormData.category" multiple :localdata="categories" />
					</uni-forms-item>
					<!-- 校验的话要加上name属性 -->
					<uni-forms-item label="  问题描述" label-width="100px" label-style="font-size: 14px;" name="describes" class="small"
						required>
						<uni-easyinput type="textarea" v-model="baseFormData.describes" placeholder="请输入您遇到的问题" />
					</uni-forms-item>
					<uni-section>
						<view class="example-body">
							<uni-file-picker limit="9" @select="selectUpload" file-mediatype="video,image" title="最多选择9个图片"
								ref="uniFilePicker" required></uni-file-picker>
						</view>
					</uni-section>
					<uni-forms-item label="手机号" name="contactobject" required>
						<uni-easyinput v-model="baseFormData.contactobject" placeholder="请输入手机号"   />
					</uni-forms-item>
				</uni-forms>
			</view>
		</uni-section>
		<view class="button-row">
			<button @click="submit('baseForm')" class="button">提交</button>
			<button @click="save" class="button" style="background-color:green; color: #ffffff;">保存</button>
		</view>
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
				category: [],
				pictures: []
				//上传图片.
				//imageValue:[]

			},
			// 表单数据
			customRules: {
				describes: {
					rules: [{
						required: true,
						errorMessage: '问题描述不能为空'
					}]
				},
				contactobject: {
					rules: [{
						required: true,
						errorMessage: '手机号不能为空'
					}]
				}

			},
			onReady() {
				console.log('onReady 生命周期钩子被调用');
				this.$refs.baseForm.setRules(this.customRules)
			}

		}
	},


	methods: {
		selectUpload(e) {
			console.log(2)
			uni.uploadFile({
				url: 'http://172.20.10.2:8080/api/upload', //仅为示例，非真实的接口地址
				filePath: e.tempFilePaths[0],
				name: 'file',
				// formData: {
				// 	'file': ''
				// },
				success: (uploadFileRes) => {
					console.log(uploadFileRes.data);
				},
				fail: (err) => {
					console.log(err);
				}
			})
		},
		submit(ref) {
			console.log(this.baseFormData)
			this.$refs[ref].validate(['']).then(res => {
				console.log('success', res);
				uni.showToast({
					title: `校验通过`,
				});
				uni.uploadFile({
					url: "http://172.20.10.2:8080/api/upload",
					files: this.baseFormData.pictures,
					success: (res) => {
						console.log(res)
					}
				});
				uni.request({
					url: 'http://172.20.10.2:8080/api/suggestions', // 示例接口地址
					method: 'POST',
					data: {
						describes: this.baseFormData.describes,
						contactobject: this.baseFormData.contactobject,
						category: this.baseFormData.category
					},
					success: (res) => {
						console.log(res.data);
						this.text = 'request success';
						this.id = res.id;
						uni.navigateTo({
							url: '/pages/feedback/feedback',
						})
					},
					fail: (err) => {
						console.log('request failed', err);
					}
				})
			}).catch(err => {
				console.log('err', err);
				// 处理验证失败的情况
			})
		},

		//保存和提交分别交到后端不同的地方
		save() {
			uni.request({
				url: 'http://172.20.10.2:8080/api/suggestionsDraft', //仅为示例，并非真实接口地址。
				method: 'POST',
				data: {
					describes: this.baseFormData.describes,
					contactobject: this.baseFormData.contactobject,
					category: this.baseFormData.category
				},
				success: (res) => {
					console.log(res.data);
					this.text = 'request success';
					this.id = res.id;
					uni.navigateTo({
						url: '/pages/feedback/feedback',
					})
				}
			})
		},
		select(e) {
			// 文件选择后的处理
			console.log('选择文件：', e);
			const files = e.tempFiles;
			files.forEach(file => {
				this.uploadFile(file);
			});
		},
		uploadFile(file) {
			const formData = new FormData();
			formData.append('file', file);

			uni.uploadFile({
				url: 'http://172.20.10.2:8080/api/upload',
				files: formData,
				success: (res) => {
					console.log('文件上传成功', res);
				},
				fail: (err) => {
					console.log('文件上传失败', err);
				}
			})
		},
		progress(e) {
			console.log('上传进度：', e)
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

.button-row {
	display: flex;
	justify-content: space-between;
	/* 用于在按钮之间添加等间距 */

}

.button {
	background-color: dodgerblue;
	color: white;
	width: 300px;
	height: 47px;
	border: 0;
	font-size: 16px;
	border-radius: 30px;
	margin: 10px;
}

.example-body {
	padding: 10px;
	padding-top: 0;
}

.custom-image-box {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

.text {
	font-size: 14px;
	color: #333;
}

.small-label {
	font-size: 12px; // 调整投诉分类标签文字大小
}
</style>