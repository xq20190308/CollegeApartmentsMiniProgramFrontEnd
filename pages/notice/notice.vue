<template>
	<view>
		<view class="cates">
			<view v-for="(cate,index) in data.cates" :class="{'cateitem':true,'cateactive':index==data.active,}" :key="index" @click="dircate(index)">
				{{cate.name}}
			</view>
		</view>
		<uni-section title="个人通知" sub-title="" type="line" style="width: 98%;margin: auto;font-weight: 550;">
			<view class="notice-list">
				<view class="notice-item" v-for="(item,index) in data.individualarticles" :key="index" @click="todetail(index)">
					<text style="text-aign: center;">{{item.id}}.{{item.title}}</text>
					<text>{{item.content}}</text>
					<text style="text-align: right;">结束时间：{{item.publishTime}}</text>
					<text style="text-align: right;">类型：{{item.typeName}}</text>
				</view>
			</view>
		</uni-section>
		<uni-section title="学校通知" sub-title="" type="line" style="width: 98%;margin: auto;font-weight: 550;">
			<view class="notice-list">
				<view class="notice-item" v-for="(item,index) in data.articles" :key="index" @click="todetail(index)">
					<text style="text-aign: center;">{{item.id}}.{{item.title}}</text>
					<text>{{item.content}}</text>
					<text style="text-align: right;">结束时间：{{item.publishTime}}</text>
					<text style="text-align: right;">类型：{{item.typeName}}</text>
				</view>
			</view>
		</uni-section>
		<view>
			<image class = "addnaireicon" src="../../static/feedback/plus.png" @click="goto('addnotice','addNotice')"></image>
		</view>
	</view>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {getLocalData,delLocalData, setLocalData} from "../../utils/cache.js"
import {reactive} from "vue";
import {http} from '@/utils/http'
import {goto} from "../../utils/access.js"
const data = reactive({
	articles:[],
	individualarticles:[],
	catenotice:["个人通知","学校通知"],
	cates:[{
			name:"全部"
		},{
			name:"未结束"
		}],
	active:0,
})
const todetail = (id) =>{
	console.log(JSON.stringify(data.articles[id]))
	uni.navigateTo({
		url:"../notice/noticedetail?detail="+JSON.stringify(data.articles[id])
	})
}
const getarticles = async (cates) =>{
	console.log("分类请求的参数",cates);
	let noticeurl='/notifications';
	if(cates!=null){
		noticeurl='/notifications?isActive='+cates;
	}
	//获取通知数据
	const res = await http(noticeurl,'GET',{},)
	
	console.log("封装后请求的结果",res);
   
	data.articles = res.data;
	console.log(data.articles)

}
const dircate = (options)=>{
		data.active=options;
		console.log("点击事件的参数",options)
		if(options===0){getarticles();}
		else{getarticles(options);}
}
onLoad((options) => {
	setLocalData('addNotice',true);
	console.log("通知列表参数",options);
	getarticles();
})
</script>


<style>
	.cates{
		display: flex;
		flex-direction: row;
		background-color: #fff;
		height: 40px;
		justify-content: space-between;
	}
	.cateitem{
		text-align: center;
		width: 50%;
		padding-top: 9px;
		padding-bottom: 9px;
		background-color: #008cff;
	}
	.cateactive{
		background-color: #fff;
	}
	.notice-list {
	}
	.notice-item {
		width: 89%;
		height: auto;
		border: 1px solid #e2e2e2;
		border-radius: calc(18rpx * 2);
		box-sizing: border-box;
		padding: 10rpx 30rpx;
		padding-top: 30rpx;
		flex-shrink: 0;
		margin-top: 24rpx!important;
		margin-button: 28rpx;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 500;
		font-size: calc(18rpx * 2);
		line-height: calc(17rpx * 2);
		color: #444444;
		margin: auto;
	}

	.notice-item>text {
		display: block;
	}
	
	.notice-item text:nth-child(2) {
		text-indent: 2em;
		display: flex;
		padding-top: 12rpx;
	}

	.notice-item text:nth-child(3) {
		padding-top: 24rpx;
		font-size: 24rpx !important;
	}
	.notice-item text:nth-child(4) {
		font-size: 24rpx !important;
	}
	
	.notice-item text:nth-child(2),
	.notice-item text:nth-child(3),
	.notice-item text:nth-child(4) {
		color: #444444;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 500;
		font-size: calc(14rpx * 2);
		line-height: calc(15rpx * 2);
	}
	.addnaireicon {
		position: fixed;
		bottom:60rpx; 
		right: 50rpx; 
		width: 80rpx; 
		height: 80rpx; 
	}
</style>