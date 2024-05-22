<template>
	<view style="display: flex; flex-direction: column; height: auto;">
		<view style="width: 82.9%;height: auto; margin: auto;">
			<view class="title">
				<text> {{articleData.title}}</text>
			</view>
			<view class="message" >
				<text> {{articleData.type_name}}</text>
				<text> {{articleData.content}} </text>
			</view>
		</view>
	</view>
</template>

<script >
export default {
  onLoad(options) {
    const articleId = options;
    console.log('Article ID:',options);
    // 发送 GET 请求
   uni.request({
   	url: `前面是测试接口/api/articles/${articleId}`,
   	success: (res) => {
   		this.articleData = res;
   	},
   	fail: (err) => {
   		 console.error('Fetch error:', err);
   	}
   });
  },
  data() {
    return {
      articleData: [
				{id:'3', title:'山东科技大学运动会' ,content:'圆满落幕', type_name:'校级', publish_time:'2024.5.21', is_active:'true'}
			] 
    };
  }
}

</script>
<style>
	.content :text {
		text-align: center;
	}
	
	.title {
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 19px;
		color: #333333;
		padding-top: 40rpx;
		text-align: center;
		padding-bottom: 20rpx;
		border-width: 3rpx;
		border-bottom-style: solid;
		border-color: cornflowerblue;
		
	}
	.message {
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 12px;
		line-height: 15px;
		color: #999999;
		margin-bottom: 70rpx;
		margin-top: 6rpx;
	}
	.message text:nth-child(1) {
		float: left;
	}
	.message text:nth-child(2) {
		float: right;
	}
</style>
