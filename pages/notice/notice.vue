<template>
	<view>
		<uni-section title="学校通知" sub-title="" type="line" style="width: 98%;margin: auto;">
			<view class="notice-list">
				<view class="notice-item" v-for="(item,index) in articles" :key="index" @click="todetail(index)">
					<text style="text-aign: center;">{{item.id}}.{{item.title}}</text>
					<text>{{item.content}}</text>
					<text style="text-align: right;">结束时间：{{item.publishTime}}</text>
					<text style="text-align: right;">类型：{{item.typeName}}</text>
				</view>
				<view class="notice-item" v-for="(item,index) in articles" :key="index" @click="todetail(index)">
					<text style="text-aign: center;">{{item.id}}.{{item.title}}</text>
					<text>{{item.content}}</text>
					<text style="text-align: right;">结束时间：{{item.publishTime}}</text>
					<text style="text-align: right;">类型：{{item.typeName}}</text>
				</view>
				<view class="notice-item" v-for="(item,index) in articles" :key="index" @click="todetail(index)">
					<text style="text-aign: center;">{{item.id}}.{{item.title}}</text>
					<text>{{item.content}}</text>
					<text style="text-align: right;">结束时间：{{item.publishTime}}</text>
					<text style="text-align: right;">类型：{{item.typeName}}</text>
				</view>
			</view>
		</uni-section>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				articles:[{//测试数据
					content: "Lorem",
					id: 87,
					isActive: true,
					publishTime: "1976-01-02 07:27:42",
					title: "学府属习",
					typeName: "律况平将体集题",
					}
				]
			}
		},
		methods:{
			todetail(id){
				uni.navigateTo({
					url:"../notice/noticedetail?content="+this.articles[id].content+
					'&id='+this.articles[id].id+
					'&isActive='+this.articles[id].isActive+
					'&publishTime='+this.articles[id].publishTime+
					'&title='+this.articles[id].title+
					'&typeName='+this.articles[id].typeName
				})
			},
			getarticles(){
				//获取通知数据
			   uni.request({
				url: "http://127.0.0.1:4523/m1/4414254-4059226-default/notifications",
				method: 'GET',
				success: (res) => {
					console.log("success",res);
					this.articles = res.data.data;
					console.log(this.articles)
				},
				fail: (err) => {
					 console.error('Fetch error:', err);
				}
			   });
				
			}
		},
		onLoad(){
			this.getarticles();
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