<template>
	<view class="mentor_list">
		<view style="width: 100%; height: auto;">
			<d-search-log placeholder="输入学号" color_border="#666666" color_text="#666666"
			:is_show_more="false"  @onSearchNameApi="onSearchName"></d-search-log>
		</view>
		<uni-list v-if="data.isonsearch">
			<view class="searchList" v-for="(i,index) in data.searchIndex" :key="index">
				<uni-list-item :title="data.mentor_list[i].trueName" :clickable="true" @click="bindClick(i)" />
			</view>
		</uni-list>
		<uni-indexed-list v-else :options="data.mentor_list_ABC" :show-select="false" @click="bindClick" />
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
	input_text:'',
	searchIndex:[],
	isonsearch:false,
})
const bindClick=(e)=>{
	console.log(e)
	let i=typeof e=="number"?e:e.item.itemIndex
	let detail=data.mentor_list[i]
	console.log(data.mentor_list[i])
	let info={
		name:detail.trueName,
		userid:detail.userId,
		avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg",
		unreceivedNum:0
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
	if(e!=""){//搜索
		data.searchIndex = data.mentor_list.map((item, index) => ({ item, index }))
        .filter(({ item }) => item.trueName == e)
        .map(({ index }) => index);
		console.log("data.searchIndex",data.searchIndex)
		data.isonsearch=true
	}else{
		data.searchIndex=[]
		data.isonsearch=false;
	}
}
onShow(()=>{
	
})
onLoad(async (options) => {
	console.log("store.user",store.user.length)
	if(store.user.length>0){//这里
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
	}else{
		data.mentor_list=[]
		data.mentor_list_ABC=[]
		uni.showModal({
			title: '提示',
			content: '未登录影响功能的使用',
			success: (res) => {
				if (res.confirm) { 
					uni.navigateTo({
						url: "/pages/login/loginPage"
					})
				} else if (res.cancel) { 
				}
			}
		});
	}
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