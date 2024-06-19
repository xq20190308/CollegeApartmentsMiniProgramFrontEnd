	<template>
		<view class="container">

	
			<uni-section title="输入框示例" type="line" padding>
				<view class="dialog-box">
					<text class="dialog-text">输入内容：{{ data.value }}</text>
				</view>
				<button class="button" type="primary" @click="inputDialogToggle"><text
						class="button-text">输入对话框</text></button>
	
			</uni-section>
			
	

	
			<view>
				<!-- 输入框示例 -->
				<uni-popup ref="inputDialog" type="dialog">
					<uni-popup-dialog ref="data.inputClose"  mode="input" title="输入内容"  value="对话框预置提示内容!"
						placeholder="请输入内容" @confirm="dialogInputConfirm"></uni-popup-dialog>
					
				</uni-popup>
			</view>
	
			
		</view>
	</template>



<script setup>
	// export default {
	// 	data() {
	// 		return {
	// 			type: 'center',
	// 			msgType: 'success',
	// 			messageText: '这是一条成功提示',
	// 			value: ''
	// 		}
	// 	},
	// 	onReady() {},
	// 	methods: {
	// 		dialogToggle(type) {
	// 			this.msgType = type
	// 			this.$refs.alertDialog.open()
	// 		},
	// 		dialogConfirm() {
	// 			console.log('点击确认')
	// 			this.messageText = `点击确认了 ${this.msgType} 窗口`
	// 			this.$refs.message.open()
	// 		},
	// 		inputDialogToggle() {
	// 			this.$refs.inputDialog.open()
	// 		},
	// 		dialogClose() {
	// 			console.log('点击关闭')
	// 		},
	// 		dialogInputConfirm(val){
	// 			this.value = val;
	// 		}
	// 		// dialogInputConfirm(val) {
	// 		// 	uni.showLoading({
	// 		// 		title: '3秒后会关闭'
	// 		// 	})

	// 		// 	setTimeout(() => {
	// 		// 		uni.hideLoading()
	// 		// 		console.log(val)
	// 		// 		this.value = val
	// 		// 		// 关闭窗口后，恢复默认内容
	// 		// 		this.$refs.inputDialog.close()
	// 		// 	}, 3000)
	// 		// },
	// 		// shareToggle() {
	// 		// 	this.$refs.share.open()
	// 		// }
	// 	}
	// }
	import {onLoad, onReady} from "@dcloudio/uni-app";
	import {reactive, ref} from "vue";
	import {load,http} from '@/utils/http'
	
	const data = reactive({
		value:'',
		//inputDialog:null,
		//inputClose:null,
	})
	const inputDialog = ref(null);
	const inputDialogToggle = () =>{
		inputDialog.value.open();
	}
	
	const dialogInputConfirm = (val) =>{
		data.value = val;
	}
	//inputClose
</script>


<style lang="scss">
	@mixin flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	@mixin height {
		/* #ifndef APP-NVUE */
		height: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
	}

	.box {
		@include flex;
	}

	.button {
		@include flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		height: 35px;
		margin: 0 5px;
		border-radius: 5px;
	}

	.example-body {
		background-color: #fff;
		padding: 10px 0;
	}

	.button-text {
		color: #fff;
		font-size: 12px;
	}

	.popup-content {
		@include flex;
		align-items: center;
		justify-content: center;
		padding: 15px;
		height: 50px;
		background-color: #fff;
	}

	.popup-height {
		@include height;
		width: 200px;
	}

	.text {
		font-size: 12px;
		color: #333;
	}

	.popup-success {
		color: #fff;
		background-color: #e1f3d8;
	}

	.popup-warn {
		color: #fff;
		background-color: #faecd8;
	}

	.popup-error {
		color: #fff;
		background-color: #fde2e2;
	}

	.popup-info {
		color: #fff;
		background-color: #f2f6fc;
	}

	.success-text {
		color: #09bb07;
	}

	.warn-text {
		color: #e6a23c;
	}

	.error-text {
		color: #f56c6c;
	}

	.info-text {
		color: #909399;
	}

	.dialog,
	.share {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.dialog-box {
		padding: 10px;
	}

	.dialog .button,
	.share .button {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		margin: 0;
		margin-top: 10px;
		padding: 3px 0;
		flex: 1;
	}

	.dialog-text {
		font-size: 14px;
		color: #333;
	}
</style>

