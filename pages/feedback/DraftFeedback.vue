<template>
	<view class="container">

		<uni-section title="投诉与意见" type="line">
			<view class="example">
				<uni-forms ref="baseForm" :modelValue="baseFormData">

					<uni-forms-item label="投诉分类"  label-width="100px" label-style="font-size: 14px;" required >
						<uni-data-checkbox v-model="baseFormData.category" multiple :localdata="categories" />
					</uni-forms-item>
					<uni-forms-item label="  问题描述" label-width="100px" label-style="font-size: 14px;" class = "small" required>
						<uni-easyinput type="textarea" v-model="baseFormData.describes" placeholder="请输入您遇到的问题" />
					</uni-forms-item>
					<uni-section  >
								<view class="example-body">
									<uni-file-picker limit="9" title="最多选择9张图片" file-extname="png,jpg" required></uni-file-picker>
								</view>
							</uni-section>
							<uni-section >
								<view class="example-body">
									<uni-file-picker limit="9" file-mediatype="video" title="最多选择9个视频" required></uni-file-picker>
								</view>
							</uni-section>
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
				//上传图片.
				imageValue:[]
				
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
		},
		select(e){
						console.log('选择文件：',e)
					},
					// 获取上传进度
		progress(e){
						console.log('上传进度：',e)
					},
					
					// 上传成功
		success(e){
						console.log('上传成功')
					},
					
					// 上传失败
		fail(e){
						console.log('上传失败：',e)
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

