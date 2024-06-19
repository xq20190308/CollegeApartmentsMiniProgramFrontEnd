<template>
	<uni-section class="mb-10" :title="data.name" type="line"></uni-section>
	<uni-section class="mb-10" title="地点" :sub-title="data.pickLocation" type="circle"></uni-section>
	<uni-section class="mb-10" title="时间" :sub-title="data.pickTime" type="circle"></uni-section>
	<uni-section class="mb-10" title="描述" :sub-title="data.describes" type="circle"></uni-section>
	<uni-section class="mb-10" title="联系方式" :sub-title="data.contactobject" type="circle"></uni-section>
<!-- 	<view v-for="(item, i) in data.filepath" :key="i">
		<!-- <image src="item"></image> -->
		<!-- 这里路径没写对，所以他会报错? -->
		<!-- {{i}}是{{item}} -->
<!-- 	</view> -->
<br>
<br>
	<view class="button-row">
			<button @click="submit('baseForm')" class="button">通过</button>
			<button class="button" type="primary" @click="inputDialogToggle" 
				style="background-color:red; color: #ffffff;"><text class="button-text" >驳回</text></button>
			<view v-if = "data.showReason"  class="dialog-box">
				<textarea class="dialog-text">   驳回原因：{{ data.reason }}</textarea>
			</view>
			
	</view>
	<view>
		<!-- 输入框示例 -->
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="输入内容" value="对话框预置提示内容" placeholder="请输入内容"
				@close="close" @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		goto
	} from "../../utils/access.js"
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";
	import {
		reactive, ref
	} from "vue";
	import {
		http
	} from '@/utils/http'
	const data = reactive({
		describes: '',
		contactobject: '',
		img: [],
		pickLocation: '',
		name: '',
		pickTime: '',
		filepath: ["@/static/feedback/plus.png"],
		reason: '',
		showReason:false,
	})
	//弹窗
	const inputDialog = ref(null);
	
	const inputDialogToggle = () => {
		inputDialog.value.open();
		data.showReason = true;
	}

	const dialogInputConfirm = (val) => {
		data.reason = val;
	}
	onLoad((options) => {
		console.log('所有信息', options);
		//检查filepath是否为数组，结果不是
		console.log(Array.isArray(options.filepath))
		data.describes = options.describes;
		data.contactobject = options.contactobject;
		data.pickLocation = options.pickLocation;
		data.pickTime = options.pickTime;
		data.name = options.name;
		//给他转换成数组
		//data.filepath = options.filepath.split(',');
	})
	const submitreason = () => {

	}
</script>

<style lang="scss">
	$uni-success: #18bc37 !default;

	.uni-wrap {
		flex-direction: column;
		/* #ifdef H5 */
		height: calc(100vh - 44px);
		/* #endif */
		/* #ifndef H5 */
		height: 100vh;
		/* #endif */
		flex: 1;
	}

	.mb-10 {
		margin-bottom: 10px;
	}

	.decoration {
		width: 6px;
		height: 6px;
		margin-right: 4px;
		border-radius: 50%;
		background-color: $uni-success;
	}

	.button-row {
			display: flex;
			flex-direction: column; // 修改为垂直排列
			align-items: stretch; // 使按钮宽度充满容器
		}
	
		.button {
			background-color: dodgerblue;
			color: white;
			width: 100%; // 使按钮宽度充满容器
			height: 47px;
			border: 0;
			font-size: 16px;
			border-radius: 30px;
			margin: 10px 0; // 上下边距，左右边距为0
		}
</style>
