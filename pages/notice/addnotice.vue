<template>
	<view style="display: flex;flex-wrap: nowrap;">
		通知类型（下拉选择）：<input @input="(e) => {data.newNotice.typeName=newdata(e.detail.value);}" placeholder="请输入" placeholder-class="answerplacehoder" />
	</view>
	<view style="display: flex;flex-wrap: nowrap;">
		结束时间（选择）：<input @input="(e) => {data.newNotice.title=newdata(e.detail.value);}" placeholder="请输入标题" placeholder-class="answerplacehoder" />
	</view>
	<view style="display: flex;flex-wrap: nowrap;">
		通知内容（文本）：<input @input="(e) => {data.newNotice.publishTime=newdata(e.detail.value);}" placeholder="请" placeholder-class="answerplacehoder" />
	</view>
	<view class="example-body">
		<uni-datetime-picker v-model="datetimerange" type="datetimerange" rangeSeparator="至" />
	</view>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive,ref,watch} from "vue";
import {http} from '@/utils/http'
const data = reactive({
	timer:null,//延时器，用于防抖处理
	//传到后端的数据
	newNotice:{//传到通知列表页面中的数据
		/*content: "修改4由于天气原因，原定于下周的考试安排已变更至下下周。"
		id: 7
		isActive: true
		publishTime: "2024-05-12T21:28:59"
		title: "修改考试延期3"
		typeName: "修改紧急"*/
	},
	
})
const datetimerange=ref([])
const newdata=(value)=>{
	clearTimeout(data.timer);
	data.timer = setTimeout(()=>{
		console.log(value);
	}, 500)
	return value;
}
onLoad(()=>{
	
})
watch(datetimerange,(newValue, oldValue)=>{
	console.log(datetimerange.value);
})
</script>

<style>
</style>