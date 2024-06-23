<template>
	<view class="mentor_list">
		<view style="width: 100%; height: auto;">
			<d-search-log placeholder="输入学号" color_border="#666666" color_text="#666666"
			:is_show_more="false" @onSearchNameApi="onSearchName"></d-search-log>
		</view>
		<!--uni-list>
			<uni-list-item v-for="(item,index) in data.mentor_list" :key="index" :title="item.name" :to="'../chat/chat'" @click="(e)=>{console.log('--',e)}" />
		</uni-list-->
		<uni-indexed-list :options="data.mentor_list_ABC" :show-select="false" @click="bindClick" />
	</view>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {getLocalData,delLocalData, setLocalData} from "../../utils/cache.js"
import {reactive} from "vue";
import {http} from '@/utils/http'
import {goto} from "../../utils/access.js"
import { useUserStore } from "../../store/User.js"
import { storeToRefs } from 'pinia'
const store=useUserStore()
const data = reactive({
	mentor_list:[],
	mentor_list_ABC:[],
	search_list:[],
	store_key:'mentor_namelist',
	input_text:''
})
const bindClick=(e)=>{
	let detail=data.mentor_list[e.item.itemIndex]
	console.log(data.mentor_list[e.item.itemIndex])
	let info={
		name:detail.trueName,
		userid:detail.userId,
		avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg",
		unreceivedNum:""
	}
	//对话添加到列表中
	if(store.chatList.findIndex(item => item.userid === detail.userId)==-1){
		store.chatList.push(info)
		uni.$emit('upgradeChatList',store.chatList)
		console.log("uni.$emit('upgradeChatList',store.chatList)")
	}
	uni.navigateTo({
		url:'/pages/chat/chat?info='+JSON.stringify(info)
	})
}
const onClickDelAll = (e)=>{
	console.log("onClickDelAll",e)
}
const onSearchName = (e)=>{
	console.log("onSearchName",e)
}
onShow(()=>{
	
})
onLoad(async (options) => {
	const res = await http('/user/findByUserLevel?userLevel='+1,'GET',{},)
	console.log("导师信息表",res.data)
	data.mentor_list=res.data
	data.mentor_list_ABC=[]
	
	for (var i = 0; i < 26; i++) {
		data.mentor_list_ABC.push({
			letter:String.fromCharCode('A'.charCodeAt(0)+ i),
			data: []
		});
	}
	for (var i = 0; i < data.mentor_list.length; i++) {
		let index = data.mentor_list_ABC.findIndex(item => item.letter === data.mentor_list[i].nameInitialLetter);
		data.mentor_list_ABC[index].data.push(data.mentor_list[i].trueName)
	}
	console.log('data.mentor_list_ABC',data.mentor_list_ABC)
})
</script>


<style lang="scss" scoped>
	::v-deep .uni-indexed-list.data-v-476e099e{
		position: relative;
	}
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
		z-index: 99;
	}
	.deletbutton {
		width: 15%;
		font-size: 12px;
		padding: 0px;
		margin: 0px;
		bottom: 8px;
		z-index: 999;
	}
	.notice-item>text {
		display: block;
	}
	
	.notice-item text:nth-child(2) {
		text-indent: 1em;
		display: flex;
		padding-top: 10rpx;
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