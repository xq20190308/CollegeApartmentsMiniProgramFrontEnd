<template>
	<view class="container">

		<uni-section title="投诉与意见" type="line">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="baseForm" :rules="data.customRules" :modelValue="data.baseFormData">
					<!-- 用labelstyle设置样式 -->

					<uni-forms-item label="投诉分类"  label-width="100px" label-style="font-size: 14px;" name="category" required >
					        <uni-data-checkbox  @change=" (e) => {
								data.baseFormData.category=e.detail.data.text;console.log('--',data.baseFormData.category);
							}" :localdata="data.categories"/>
					</uni-forms-item>
					<uni-forms-item label="  问题描述" label-width="100px" label-style="font-size: 14px;"  name="describes" class = "small" required>

						<uni-easyinput type="textarea" v-model="data.baseFormData.describes" placeholder="请输入您遇到的问题" />
					</uni-forms-item>
					<uni-section title="">
						<view class="example-body">
							<uni-file-picker :modelValue="data.baseFormData.path0" limit="9" @select="selectUpload" @delete="(e)=>{console.log(e);data.baseFormData.path0.splice(e.index,1);console.log(data.baseFormData.path0)}" @success="console.log(data.baseFormData.path0)" file-mediatype="video,image" title="最多选择9个图片"
								ref="uniFilePicker" required>
								<button type="primary" size="mini">选择文件</button>
							</uni-file-picker>
						</view>
					</uni-section>
					<uni-forms-item label="手机号" name="contactobject" required>
						<uni-easyinput v-model="data.baseFormData.contactobject" placeholder="请输入手机号"   />
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





<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {getLocalData,delLocalData, setLocalData} from "../../utils/cache.js"
import {reactive,ref} from "vue";
import {load,http} from "../../utils/http.js"
import {goto} from "../../utils/access.js"
import {getarticles} from "../notice/api/getnotices.js"
import {getCurrentTime} from '@/utils/time'
const data = reactive({
	index:'',
	categories: [{
		text: '课程',
		value: 0
	}, {
		text: '安全',
		value: 1
	}, {
		text: '其他',
		value: 2
	}],
	// 基础表单数据
	baseFormData: {
		contactobject: '',
		describes: '',
		category: [],
		path0: [],
		//path1: [],
		path: [],
		//上传图片.
		//imageValue:[]
	},
	// 表单数据
	customRules: {
		category: {
			rules: [{
				required: true,
				errorMessage: '请选择分类'
			}]
		},
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
			}, {
					minLength: 11,
					maxLength: 11,
					errorMessage: '请输入11位手机号'
				}]
		}
	}
})
const selectUpload= (e) => {//上传文件的函数
	console.log(e);
	data.baseFormData.path0.push(e.tempFiles[0])
	console.log('this.baseFormData.path0',data.baseFormData.path0);
}
const baseForm = ref() 
		const submit=(ref) => { 
			console.log(data.baseFormData)
			baseForm.value?.validate(['']).then(async res => {
				console.log('success', res);
				uni.showToast({
					title: `校验通过`,
				});
				for (var i = 0; i<data.baseFormData.path0.length;i++){
					//这里需要改
					await load('http://localhost:8080/api/upload',data.baseFormData.path0[i].url,"files").then(
						(res1)=>{
							console.log("res1",res1);
							data.baseFormData.path.push(res1.data);
						}
					)
				}
				console.log("this.baseFormData.path",data.baseFormData.path)
				
				uni.request({
					url: 'http://localhost:8080/api/suggestions', 
					method: 'POST',
					data: {
						describes: data.baseFormData.describes,
						contactobject: data.baseFormData.contactobject,
						category: JSON.stringify(data.baseFormData.category),
						path: JSON.stringify(data.baseFormData.path)
					},
					header:{
						Authorization: '',
					},
					success: (res) => {
						console.log('success',res.data);
						data.text = 'request success';
						data.id = res.id;
						// uni.navigateBack({
						// 	url: '/pages/feedback/feedback',
						// })
					},
					fail: (err) => {
						console.log('request failed', err);
					}
				})
			}).catch(err => {
				console.log('err', err);
				// 处理验证失败的情况
			})
		}
		//保存和提交分别交到后端不同的地方
		const save= async () => {//修改后pushtime返回的是null?
			let newlist=data.index==''?JSON.parse(getLocalData('feedDraft'))
			:JSON.parse(getLocalData('feedDraft')).splice(data.index,1);
			await setLocalData('feedDraft',[
				...newlist,
				{
					describes: data.baseFormData.describes,
					contactobject: data.baseFormData.contactobject,
					category: JSON.stringify(data.baseFormData.category),
					path: JSON.stringify(data.baseFormData.path0),
					pushtime:getCurrentTime(),
				},
			])
			uni.navigateBack({
			 	url: '/pages/feedback/feedback',
			})
		}
		//{
			
		// 		id:data.id,
		// 		describes: data.baseFormData.describes,
		// 		contactobject: data.baseFormData.contactobject,
		// 		category: JSON.stringify(data.baseFormData.category),
		// 		path: JSON.stringify(data.baseFormData.path),
		// 		stu_id:"202211070501"
		// 	}
		
			// for (var i = 0; i<data.baseFormData.path0.length;i++){
			// 	//这里需要改
			// 	await load('http://localhost:8080/api/upload',data.baseFormData.path0[i],"files").then(
			// 		(res1)=>{
			// 			console.log("res1",res1);
			// 			data.baseFormData.path.push(res1.data);
			// 		}
			// 	)
			// }
			// console.log("this.baseFormData.path",data.baseFormData.path)
			// uni.request({
			// 	url: 'http://localhost:8080/api/suggestionsDraft', //仅为示例，并非真实接口地址。
			// 	method: 'POST',
			// 	data: {
			// 		id:data.id,
			// 		describes: data.baseFormData.describes,
			// 		contactobject: data.baseFormData.contactobject,
			// 		category: JSON.stringify(data.baseFormData.category),
			// 		path: JSON.stringify(data.baseFormData.path),
			// 		stu_id:"202211070501"
			// 	},
			// 	header:{
			// 		Authorization: '',
			// 	},
			// 	success: (res) => {
			// 		uni.navigateBack({
			// 			url: '/pages/feedback/feedback',
			// 		})
			// 	}
			// })
		//}
	onLoad(async (options)=>{
		//需要获取已经id的草稿内容
		console.log("需要获取已经草稿的内容",Number(options.index));
		if(options.index!=null){
			data.baseFormData.category=options.category;
			data.baseFormData.contactobject=options.contactobject;
			data.baseFormData.describes=options.describes;
			data.baseFormData.path0=JSON.parse(options.path0);
			data.index=options.index;
			// for (var i = 0; i<data.baseFormData.path0.length;i++){
			// 	await data.baseFormData.path1.push({
			// 		"name":data.baseFormData.path0[i],
			// 		"extname":"jpg",
			// 		"url":data.baseFormData.path0[i],
			// 	})
			// 	console.log('data.baseFormData.path1',data.baseFormData.path1)
			// }
			console.log("data.baseFormData",data.baseFormData)
		}
		// baseFormData: {
		// 	contactobject: '',
		// 	describes: '',
		// 	category: [],
		// 	path: [],
		// },
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