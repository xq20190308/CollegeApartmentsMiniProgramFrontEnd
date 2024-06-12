<template>
	<view class="input-container">
		<text>请输入第</text>
		<input v-model="data.weeks" class="short-input"/>
		<text>周</text>
	</view>
<view>
	<uni-section title="">
		<view class="example-body">
			<uni-file-picker limit="9" @select="selectUpload" file-extname='png,git,jpeg,pdf,jpg,xlsx'  file-mediatype="all" title="请上传成绩文件"
				ref="uniFilePicker" required>
				<button type="primary" size="mini">选择文件</button>
			</uni-file-picker>
		</view>
	</uni-section>
	</view>
	<button type="primary" @click="add">提交</button>
</template>

<script setup>
	import {onLoad, onReady} from "@dcloudio/uni-app";
	import {reactive, ref} from "vue";
	import {load,http} from '@/utils/http'
	
	//传不过去？
	const data = reactive({
		 weeks:'',
		 path0:[],
		 path:[],
	})
	console.log("weeks类型", typeof data.weeks);
	const selectUpload = (e) =>{
		console.log(e);
		data.path0.push(e.tempFiles[0]);
	}
	const add =async ()=>{
		for(var i = 0; i < data.path0.length; i++){
			
		 await load('/api/updateData', data.path0[i].url,'file',{
			weeks:data.weeks
		}).then((res1) =>{
			console.log("返回的文件路径", res1);
			data.path.push(res1.data);
		})
		};
		uni.navigateBack({
			url:'../../pages/hygiene/showhygiene',
		})
		
	}

</script>

<style lang="scss">
	.input-container {
	  display: flex;
	  align-items: center;
		margin-left: 30px;
		margin-top: 30px;
	}
	
	.input-container view {
	  white-space: nowrap; /* 防止换行 */
		
	}
	
	.short-input {
	  width: 50px; /* 设置输入框的宽度 */
	  margin: 0px 20px; /* 输入框与文字的间距 */
		
		margin-left: 20px;
	}
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
		margin-left: 20px;
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
</style>