<template>
	<uni-section title="通知类型（下拉选择）：" type="line" padding>
		<uni-data-select :localdata="data.types" @change="(e) => {data.newNotice.typeName = data.types[e].text; console.log(data.newNotice.typeName)}"></uni-data-select>
	</uni-section>
	<uni-section title="通知标题：" type="line" padding>
		<view style="display: flex;flex-wrap: nowrap;">
			<input v-model="data.newNotice.title" @input="(e) => {data.newNotice.title=newdata(e.detail.value);}" placeholder="请输入通知的标题" placeholder-class="answerplacehoder" />
		</view>
	</uni-section>
	<uni-section title="通知内容" subTitle="请输入通知的内容" type="line" padding>
		<uni-easyinput v-model="data.newNotice.content" type="textarea" autoHeight maxlength=-1 placeholder="请输入内容" @input="(e) => { data.newNotice.content=e;console.log(data.newNotice.content);}"></uni-easyinput>
	</uni-section>
	<view>
		<button class="submit" @click="submit">发布</button>
	</view>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive,ref,watch} from "vue";
import {http} from '@/utils/http'
import {getarticles} from "../notice/api/getnotices.js"
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
	id:null,
})
const submit=async ()=>{
	const res = await http('/notifications/modify','POST',{
		...data.newNotice,
		id : data.newNotice.id,
	},)
	console.log(res)
	uni.showToast({
		title: "发布成功"
	});
	setTimeout(() => {
		uni.navigateBack({
			url: 'notice'
		});
	}, 2000); 
}
const newdata=(value)=>{
	clearTimeout(data.timer);
	data.timer = setTimeout(()=>{
		console.log(value);
	}, 500)
	return value;
}
onLoad((options)=>{
	if(options.id!=null){
		data.id=options.id;
		console.log("options",options)
	}
	getarticles({id:data.id}).then(response => {
	  // 在这里处理数据
	  data.newNotice = response[0];
		console.log('response',response); // 输出: 这是返回的数据
	})
})
</script>

<style>
.submit{
	margin-top: 20px;
	background-color:#008cff;
	width: 80%;
}
</style>