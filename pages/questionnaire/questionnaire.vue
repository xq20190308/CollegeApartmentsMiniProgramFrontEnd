<template>
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
</style>
