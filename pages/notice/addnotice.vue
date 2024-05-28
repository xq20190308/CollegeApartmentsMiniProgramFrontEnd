<template>
	<uni-section title="通知类型（下拉选择）：" type="line" padding>
		<uni-data-select :localdata="data.types" @change="(e) => {data.newNotice.typeName = data.types[e].text; console.log(data.newNotice.typeName)}"></uni-data-select>
	</uni-section>
	<uni-section title="选择日期及时间：" type="line" padding>
		<view class="example-body">
			<uni-datetime-picker type="datetimerange" rangeSeparator="至" @change="(e) => {data.newNotice.publishTime = e[1];console.log(data.newNotice.publishTime)}" />
		</view>
	</uni-section>
	<uni-section title="通知标题：" type="line" padding>
		<view style="display: flex;flex-wrap: nowrap;">
			<input @input="(e) => {data.newNotice.title=newdata(e.detail.value);}" placeholder="请输入通知的标题" placeholder-class="answerplacehoder" />
		</view>
	</uni-section>
	<uni-section title="通知内容" subTitle="请输入通知的内容" type="line" padding>
		<uni-easyinput type="textarea" autoHeight maxlength=-1 placeholder="请输入内容" @input="(e) => { data.newNotice.content=e;console.log(data.newNotice.content);}"></uni-easyinput>
	</uni-section>
	<view>
		<button class="submit" @click="submit">创建</button>
	</view>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive,ref,watch} from "vue";
import {http} from '@/utils/http'
const data = reactive({
	types:[
	      { value: 0, text: '篮球' },
	      { value: 1, text: '足球' },
	      { value: 2, text: '游泳' },
	    ],
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
const submit=async ()=>{
	const res = await http('/notifications','POST',{title:"title",content:"content",typeName:"typeName"},)
	console.log(res)
}
const newdata=(value)=>{
	clearTimeout(data.timer);
	data.timer = setTimeout(()=>{
		console.log(value);
	}, 500)
	return value;
}
onLoad(()=>{
	
})
</script>

<style>
.submit{
	margin-top: 20px;
	background-color:#008cff;
	width: 80%;
}
</style>