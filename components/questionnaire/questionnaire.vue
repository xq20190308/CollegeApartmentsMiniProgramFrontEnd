<template>
	<view class="questionnaire">
		<uni-section :title="naireinfo.name" type="line" titleFontSize=42rpx>
			<text>{{naireinfo.descr}}</text>
			<view>{{naireinfo.questionList}}</view>
			<view>截止到：{{naireinfo.startTime}}</view>
		</uni-section>
	</view>
</template>

<script setup>
const props = defineProps({
	naireinfo:{
		type: Object,
		default: {
			id:"",
			type: 0,
			name: "",
			descr: '',
			startTime: "",
			endTime: "",
			questionList: null,
		},
	}
})
</script>
<style>
.questionnaire{
		width: 97%;
		background-color: #fff;
		box-shadow: 0 4px 15px 0 rgba(230, 228, 228, 0.52);
		display: flex;
		flex-direction: column;
		margin: 22rpx 10rpx;
		border-radius: 10px;
		padding: 20rpx 40rpx;
		box-sizing: border-box;
}

</style>