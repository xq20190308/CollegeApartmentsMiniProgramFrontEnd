<template>
	<view class="banner">

		<uni-section title="投诉与意见" type="line">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="baseForm" :rules="data.customRules" :modelValue="data.baseFormData">
					<!-- 用labelstyle设置样式 -->

					<uni-forms-item label="投诉分类" label-width="100px" label-style="font-size: 14px;" name="category" required>
						<uni-data-checkbox v-model='data.baseFormData.category' :localdata="data.fun_advise_type" :map="data.map" />
					</uni-forms-item>
					<uni-forms-item label="  问题描述" label-width="100px" label-style="font-size: 14px;" name="describes" class="small"
						required>

						<uni-easyinput type="textarea" v-model="data.baseFormData.describes" placeholder="请输入您遇到的问题" />
					</uni-forms-item>
					<uni-section title="">
						<view class="example-body">
							<uni-file-picker :modelValue="data.baseFormData.path0" limit="9" @select="selectUpload"
								@delete="(e) => {data.baseFormData.path0.splice(e.index, 1);}"
								file-mediatype="video,image" title="选择文件,不支持.txt"
								ref="uniFilePicker">
								<button type="primary" size="mini">选择文件</button>
							</uni-file-picker>
						</view>
					</uni-section>
					<uni-forms-item label="手机号" name="contactobject" required>
						<uni-easyinput v-model="data.baseFormData.contactobject" placeholder="请输入手机号" />
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
import { onLoad, onShow } from "@dcloudio/uni-app";
import { getLocalData, delLocalData, setLocalData } from "/utils/cache.js"
import { reactive, ref, toRefs } from "vue";
import { load, http } from "/utils/http.js"
import { goto } from "/utils/access.js"
import { getCurrentTime } from '@/utils/time'
import { useDict } from '/utils/dict';
import { submitFeedback } from "./api/feedback.js";
const data = reactive({
	index: '',
	fun_advise_type:[],
	map: {text:'label',value:'value'},
	baseFormData: {
		contactobject: '',
		describes: '',
		category: '',
		pushtime:'',
		path0: []
	},
	path: [],
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
const selectUpload = (e) => {//上传文件的函数
	data.baseFormData.path0.push(e.tempFiles[0])
	console.log('this.baseFormData.path0', data.baseFormData.path0);
}
const baseForm = ref()
const submit = (ref) => {
	baseForm.value?.validate(['']).then(async res => {
		for (var i = 0; i < data.baseFormData.path0.length; i++) {
			const res1 = await load('/api/upload', data.baseFormData.path0[i].url, "files")
			data.path.push(res1.data);
		}
		console.log("this.baseFormData.path", data.path)
		submitFeedback({
			contactobject: data.baseFormData.contactobject,
			describes: data.baseFormData.describes,
			category: data.baseFormData.category,
			path: JSON.stringify(data.path)
		}).then((res)=>{
			if(res.msg=="操作成功"){
				uni.showToast({
					icon:"success",
					title:"提交成功"
				})
				if(data.index===''){
				}else{
					let newlist = JSON.parse(getLocalData('feedDraft') ? getLocalData('feedDraft') : '[]').filter((item, index) => index !== data.index)
					console.log("提交后：",newlist)
					setLocalData('feedDraft',newlist)
				}
				setTimeout(()=>{uni.navigateBack({
					url: '/pages/feedback/feedback',
				})},500)
			}else{
				uni.showToast({
					icon:"error",
					title:"提交失败"
				})
			}
		})
	}).catch(err => {
		console.log('err', err);
	})
	
}
//保存和提交分别交到后端不同的地方
const save = async () => {
		console.log("++data.index", data.index);
		//console.log("--", JSON.parse(getLocalData('feedDraft') ? getLocalData('feedDraft') : '[]'));
		let newlist;
		if (data.index === '') {
			//console.log('data.index==" "');
			newlist = JSON.parse(getLocalData('feedDraft') ? getLocalData('feedDraft') : '[]');
		} else {
			//console.log("data.index", data.index);
			newlist = JSON.parse(getLocalData('feedDraft') ? getLocalData('feedDraft') : '[]').filter((item, index) => index !== data.index);
		}
		//console.log("newlist", newlist);
		data.baseFormData.pushtime=getCurrentTime()
		await setLocalData('feedDraft', [
			...newlist,
			data.baseFormData,
		])
		uni.navigateBack({
			url: '/pages/feedback/feedback',
		})
	
}
onShow(() => {
})
onLoad(async (options) => {
	console.log(options)
	options=options?.info?JSON.parse(options.info):null
	data.fun_advise_type=useDict('fun_advise_type')
	console.log(data.fun_advise_type)
	if (options?.index != null) {
		console.log("需要获取已经草稿的内容", Number(options.index));
		data.baseFormData = options.baseFormData
		data.index = Number(options.index);
		console.log("data.baseFormData", data.baseFormData);
	}
	
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
}</style>