<template>
	<view class="question">
		<view class="questiontitle">
			{{questioninfo.questiontitle}}
		</view>
		<view class="questionchoice" v-for="(item,index) in questioninfo.choices" :key="index">
			{{item}}
		</view>
	</view>
</template>

<script>
	export default {
		name:"questionnaire",
		data() {
			return {
			};
		},
		props:{
			questioninfo:{
				questionid: 1,
				questiontitle: "问题1",
				choices:[
					{"value": 0, "text": "选项1"},
					{"value": 1, "text": "选项2"},
					{"value": 2, "text": "选项3"},
					{"value": 3, "text": "选项4"},
				],
			}
		}
	}
</script>

<style>
</style>