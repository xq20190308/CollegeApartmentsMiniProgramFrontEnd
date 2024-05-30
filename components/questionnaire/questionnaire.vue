<template>
	<view class="questionnaire" :style="naireinfo.id===1?filter:''">
		<uni-section :title="naireinfo.id + naireinfo.name" type="line" titleFontSize=42rpx>
			<text>{{naireinfo.description}}</text>
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
			description: '',
			startTime: "",
			endTime: "",
			questionList: null,
		},
	},
	filter:{
		type: String,
		default: 'filter: grayscale(1)',
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