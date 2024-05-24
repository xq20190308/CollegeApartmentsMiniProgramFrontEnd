<template>
	<view class="questionnaire">
		<uni-section :title="naireinfo.name" type="line" titleFontSize=42rpx>
		</uni-section>
		<text>{{naireinfo.descr}}</text>
		<view>{{naireinfo.questionList}}</view>
		<view>截止到：{{naireinfo.startTime}}</view>
		<!--<view class="questions" v-for="(item,index) in naireinfo.questions" :key="index">
			<question :questioninfo="item"></question>
		</view>-->
	</view>
</template>

<script>
	import question from '../question/question.vue'
	
	export default {
		name:"questionnaire",
		data() {
			return {
			};
		},
		props:{
			naireinfo:{
				type: Object,
				default: {
					id:"",
					type: 0,
					name: "",
					descr: null,
					startTime: "",
					endTime: "",
					questionList: null,
				},
			}
		},
		methods:{
		},
		onLoad(){
			
		}
	}
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