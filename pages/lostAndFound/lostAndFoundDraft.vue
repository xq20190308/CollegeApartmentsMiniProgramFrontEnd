<template>
				<view class="container">
					<uni-section title="失物招领" type="line">
					<!-- 基础表单校验 -->
					<view class="example">
					<uni-forms ref="baseForm" :rules="data.rules" :modelValue="data.baseFormData">
						<uni-forms-item label="捡到的地点" required name="pickLocation">
							<uni-easyinput v-model="data.baseFormData.pickLocation" placeholder="请输入捡到的地点" />
						</uni-forms-item>
						<uni-forms-item label="捡到的时间" required name="pickTime">
							<uni-easyinput v-model="data.baseFormData.pickTime" placeholder="请输入捡到的时间" />
						</uni-forms-item>
						<uni-forms-item label="描述" name="describes" required>
							<uni-easyinput type="textarea" v-model="data.baseFormData.describes" placeholder="请输入描述" />
						</uni-forms-item>
						<uni-forms-item label="联系方式" name="contactobject" required>
							<uni-easyinput type="textarea" v-model="data.baseFormData.contactobject" placeholder="请输入描述" />
						</uni-forms-item>
					</uni-forms>
					</view>
					</uni-section>
					<button type="primary" @click="submit('valiForm')">发布</button>
				</view>
			
			

</template>

<script setup>
	
	import {onLoad, onReady} from "@dcloudio/uni-app";
	import {reactive, ref} from "vue";
	import sysurl from '../../system.config.js';
	import {http} from '@/utils/http'
	
	const data = reactive({
		//基础表单数据
		baseFormData:{
			pickLocation:'',
			pickTime:'',
			describes:'',
			contactobject:null,
			imageValue:[]
		},
		
		// 分段器数据
		current: 0,
		items: ['左对齐', '顶部对齐'],
		rules:{
			pickLocation:{
				rules:[{
					required:true,
					errorMessage:'捡到的地点不能为空'
				}]
			},
			pickTime:{
				rules:[{
					required:true,
					errorMessage:'捡到的时间不能为空'
				}]
			},
			describes:{
				rules:[{
					required:true,
					errorMessage:'描述内容不能为空'
				}]
			},
			contactobject:{
				rules:[{
					required:true,
					errorMessage:'手机号不能为空'
				},{
					minLength: 11,
					maxLength: 11,
					errorMessage: '请输入11位手机号'
				}]
			},
		}
		})
		// const submit=async ()=>{
		// 	const res = await http('/api/suggestionsDraft','POST',{
		// 		describes: data.baseFormData.describes,
		// 		contactobject: data.baseFormData.contactobject,
		// 		pickTime: data.baseFormData.pickTime,
		// 		pickLocation:data.baseFormData.pickLocation,
		// 	},);
		// 	console.log("封装后请求的结果",res)
		// 	console.log(res.data);
		// 	uni.navigateBack({//接口已经好了，但逻辑存在错误
		// 		url:'../pages/lostAndFound/lostAndFound',
		// 	});
		// }
		const baseForm = ref()
		const submit=async (ref)=>{
			baseForm.value?.validate().then(async res1 => {
				console.log('success', res1);
				//还没写接口
				const res = await http('/api/suggestionsDraft','POST',{
					describes: data.baseFormData.describes,
					contactobject: data.baseFormData.contactobject,
					pickTime: data.baseFormData.pickTime,
					pickLocation:data.baseFormData.pickLocation,
				},);
				console.log("封装后请求的结果",res)
				console.log(res.data);
				uni.navigateBack({//接口已经好了，但逻辑存在错误
					url:'../pages/lostAndFound/lostAndFound',
				});
			}).catch(err => {
				console.log('err', err);
			})
		}
		onReady(()=>{
			console.log('onReady 生命周期钩子被调用');
			this.$refs.baseForm.setRulse(this.customRules)
		})
	
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

