<template>
	<view>
		<uni-section :title="学校通知" sub-title="" type="line" style="width: 98%;margin: auto;">
			<view class="notice-list">
				<view class="notice-item" v-for="(item,index) in articles" :key="index" @click="todetail(item.id)">
					<text style="text-aign: center;">{{item.title}}</text>
					<text>山东科技大学运动会圆满落幕</text>
					<text style="text-align: right;">活动结束：{{item.publish_time}}</text>
					<text style="text-align: right;">发布时间：{{item.is_active}}</text>
				</view>
			</view>
		</uni-section>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				articles:[
					{id:'3', title:'通知', publish_time:'2024/5/20', is_active:'true'}
				]
			}
		},
		methods:{
			todetail(id){
				uni.navigateTo({
					url:`../notice/noticedetail?articleId=${id}`
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
		border-radius: calc(18rpx * 2);
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
</style>