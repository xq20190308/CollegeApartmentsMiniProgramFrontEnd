<template>
	<view style="display: flex; flex-direction: column; height: auto;">
		<view style="width: 82.9%;height: auto; margin: auto;">
			<view class="title">
				<text> {{title}}</text>
			</view>
			<view class="message" >
				<view>{{typeName}}</view>
				<view>{{content}}</view>
			</view>
		</view>
	</view>
</template>

<script >
export default {
  data() {
    return {
		content: "Lorem",
		id: 87,
		isActive: true,
		publishTime: "1976-01-02 07:27:42",
		title: "学府属习",
		typeName: "律况平将体集题",
    };
  },
 props:{
 },
  onLoad(options) {
	console.log(options);
	this.content=options.content
	this.id=options.id
	this.isActive=options.isActive
	this.publishTime=options.publishTime
	this.title=options.title
	this.typeName=options.typeName
  },
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
