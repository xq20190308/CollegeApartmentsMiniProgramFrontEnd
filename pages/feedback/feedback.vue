<template>
	<view>
		<uni-section :title="我的草稿" sub-title="" type="line" style="width: 98%;margin: auto;">
			<view class="notice-list">
				<view class="notice-item" v-for="(item,index) in complaintDrafts" :key="index" @click="change(item)">
					<button @click="delet(item.id)" class="button" style="background-color:red; color: #ffffff; ">删除</button>
					<text style="">{{item.describe}}</text>
				</view>
			</view>
		</uni-section>
	</view>
	<view class="container">
		
	<image class = "floating-button" src="../../static/feedback/plus.png" @click="onpress"></image>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				complaintDrafts: [
					{ describe:"问题投诉" ,id:2 }
					
				] // 初始为空数组
			}
		},
		onLoad() {
			this.fetchComplaintDrafts(); // 页面加载时获取数据
		},
		methods: {
			fetchComplaintDrafts() {
				uni.request({
					url: 'https://yourserver.com/api/complaint-drafts', // 替换为您的服务器接口URL
					method: 'GET',
					success: (res) => {
						if (res.statusCode === 200) {
							// 假设后端返回的数据格式是 [{id: 1, title: '标题1', rightText: '右侧文字1'}, ...]
							this.complaintDrafts = res.data; // 直接使用返回的列表
						} else {
							// 处理错误情况
							console.error('Failed to fetch complaint drafts:', res);
						}
					},
					fail: (err) => {
						// 处理请求失败的情况
						console.error('Request failed:', err);
					}
				});
			},
			onpress() {
					uni.navigateTo({
						url: '../feedback/feedbackSubmit'
					});
				},
			onchange(){
				uni.navigateTo({
					url:'../feedback/DraftFeedback'
				})
			},
			delet(thisid){
				uni.request({
					url:'11',
					method:"DEL",
					data:{
						id:thisid
					}
				})
			}
		}
	}
</script>




<style>
	.notice-list {
	}
	
	.notice-item {
		width: 89%;
		height: auto;
		border: 1px solid #e2e2e2;
		box-sizing: border-box;
		padding: 10rpx 30rpx;
		padding-top: 30rpx;
		flex-shrink: 0;
		margin-top: 24rpx!important;
		margin-button: 24rpx;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: calc(14rpx * 2);
		line-height: calc(17rpx * 2);
		color: #333333;
		margin: auto;
		
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center; /* 垂直居中 */
			height: 50px; /* 根据需要设置高度 */
	
		
	}

	.notice-item>text {
		display: block;
	}
	
	
	.notice-item text:nth-child(2) {
		text-indent: 2em;
		display: flex;
		padding-top: 10rpx;
	}

	.notice-item text:nth-child(3) {
		padding-top: 24rpx;
		font-size: 16rpx !important;
	}
	.notice-item text:nth-child(4) {
		font-size: 16rpx !important;
	}
	
	.notice-item text:nth-child(2),
	.notice-item text:nth-child(3),
	.notice-item text:nth-child(4) {
		color: #999999;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: calc(12rpx * 2);
		line-height: calc(15rpx * 2);
	}
	.floating-button {
			position: fixed;
			bottom:60rpx; 
			right: 60rpx; 
			width: 120rpx; 
			height: 120rpx; 
		/* 	box-shadow: 5rpx 5rpx 10rpx rgba(0, 0, 0, 0.5); */ /* 添加阴影样式 */
		}
.button{
		            background-color:dodgerblue;
		            color:white;
		            width: 50px;
		            height: 47px;
		            border:0;
		            font-size: 10px;			
	                border-radius: 30px;
									margin: 10px;
					} 
</style>


