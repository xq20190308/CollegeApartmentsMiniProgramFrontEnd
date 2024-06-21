<template>
	<view v-if="data.detail.id!=null" style="display: flex; flex-direction: column; height: auto;">
		<view style="width: 82.9%;height: auto; margin: auto;">
			<view class="title" v-html="markdown( data.detail.title)">
				<text class="underline-text" @click="goto('addnotice?id='+data.detail.id,'noticeManage')"> 修改</text> 
			</view>
			<view class="message" >
				<view v-html= "data.detail.content"></view>
				<!-- <view v-html="markdown(data.detail.img)"></view> -->
				<!-- //绑定不用加冒号 -->
				<!-- <image :src="data.detail.img"></image> -->
			</view>
		</view>
	</view>
</template>

<script setup>
import {goto} from "../../utils/access.js"
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive} from "vue";
import {http} from '@/utils/http'
import {getarticles} from "../notice/api/getnotices.js"
import MarkdownIt from "markdown-it";
const data = reactive({
	detail:{
		id: null,
		title:'今天天气真好',
		
	},
	types:[
	  { value: 0, text: '篮球' },
	  { value: 1, text: '足球' },
	  { value: 2, text: '游泳' },
	],
	option: null,
})
onShow(()=>{
	getarticles({id:data.option}).then(response => {
		
    // 在这里处理数据
    data.detail = response[0];
		console.log("跳转的页面信息",data.detail);
		//给他手动加上markdown语法
	//	data.detail.img = 'https://gitee.com/jiangwan6/images/raw/master/images/202405082009004.jpeg';
	//如果是markdown这样写
		//data.detail.title = '# '+data.detail.title;
		//如果是html
		data.detail.title = '<h1>'+data.detail.title+'</h1>'
	//	data.detail.img = '![]'+'('+data.detail.img+')';
		data.detail.typeName = '# '+data.detail.typeName;
		data.detail.content = '<br>'+data.detail.content+'<\\br>'
		
	})
})
onLoad((options) => {
	console.log(options.id);
	data.option=options.id;
	console.log('data.option',data.option);
})

//返回为markdown格式
const md = new MarkdownIt({
	html:true, //也渲染html标签,要用逗号分隔，这是一个选项
})

const markdown = (text) =>{
	//接受一个名为md字符串，让他解析为markdown语法，因为前面创建了md实例，直接调用内置属性
	return md.render(text)
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
		color: #333333;
		padding-top: 40rpx;
		text-align: center;
		border-width: 3rpx;
		border-bottom-style: solid;
		border-color: cornflowerblue;
		padding-bottom: 20px;
	}
	.title text:nth-child(1) {
		display: block;
	}
	.title text:nth-child(2){
		padding-left: 5px;
		float: right;
		font-weight: 300;
		font-size: 12px;
	}
	.underline-text {
	    text-decoration: underline;
	    color: #000000; /* 正常颜色 */
	  }
	  .underline-text:active {
	    color: #0000ff; /* 点击时的蓝色 */
	  }
	.message {
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 12px;
		line-height: 15px;
		color: black;
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
