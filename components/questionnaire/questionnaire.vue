<template>
		<text>{{naireinfo.description}}</text>
		<view>ID：{{naireinfo.id }}</view>
		<view>类型：{{naireinfo.type}}</view>
		<view>开始时间：{{naireinfo.startTime}}</view>
		<view>截止到：{{naireinfo.endTime}}</view>  
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

</style>