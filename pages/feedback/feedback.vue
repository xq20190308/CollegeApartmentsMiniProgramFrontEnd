<template>
	<view>
		<view class="spacing"></view>
		<uni-section>
			<uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @blur="blur" @focus="focus" @input="input"
				@cancel="cancel" @clear="clear">
			</uni-search-bar>
			<view class="search-result">
				<text class="search-result-text">当前输入为：{{ searchValue }}</text>
			</view>
		</uni-section>

		<view class="container">
			
				<view class="warp">
					<button class="button floating-button" type="primary" @click="onpress" ></button>
				</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: '123123'
			}
		},
		methods: {
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},
			input(res) {
				console.log('----input:', res)
			},
			clear(res) {
				uni.showToast({
					title: 'clear事件，清除值为：' + res.value,
					icon: 'none'
				})
			},
			blur(res) {
				uni.showToast({
					title: 'blur事件，输入值为：' + res.value,
					icon: 'none'
				})
			},
			focus(e) {
				uni.showToast({
					title: 'focus事件，输出值为：' + e.value,
					icon: 'none'
				})
			},
			cancel(res) {
				uni.showToast({
					title: '点击取消，输入值为：' + res.value,
					icon: 'none'
				})
			},
			onpress() {
				uni.navigateTo({
					url: '../feedback/feedbackSubmit'
				});
			}
		},
		onBackPress() {
			// #ifdef APP-PLUS
			plus.key.hideSoftKeybord();
			// #endif
		}
	}
</script>

<style>
	.spacing {
		height: 40rpx;
		background-color: transparent;
	}
	.floating-button {
			position: fixed;
			bottom: 30rpx; /* 调整到底部的距离 */
			right: 30rpx; /* 调整到右侧的距离 */
			background-color: blue;
		}
		.wrap{
			color: red;
			background-color:rebeccapurple;
		}
</style>
