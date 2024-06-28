<template>
	<uni-popup ref="popup" background-color="#fff" @change="(e)=>{console.log('change',e)}">
		<scroll-view :scroll-y="true" class="popup-content">
			<text class="title">通知</text><br/><text class="timebottom">{{store.noticeList[data.clickindex].sendTime}}</text>
			<br/>
			<view class="content">
				<text class="text">{{store.noticeList[data.clickindex].data}}</text>
			</view>
		</scroll-view>
	</uni-popup>
	<button style="color:#ffffff;backgroundColor:#008fff;" type="primary" size="mini" @click="readall">全部已读</button>
	<view class="notice-list">
		<view v-for="(item,index) in store.noticeList" :key="index" >
			<view style="margin-right: 4px;margin-left: 4px;text-align: center;"><text class="time">{{item.sendTime}}</text></view>
			<uni-card @click="(e)=>{popupToggle(index)}" title="通知" :sub-title="item.senderUserId" thumbnail="../../../../static/home/future_icon.png">
				<text>{{item.senderUserId}}:{{item.data}}</text>
				<template v-slot:extra>
					<uni-badge v-if="item.isConfirm===false" text="1" :is-dot="true" />
				</template>
			</uni-card>
		</view>
	</view>
</template>

<script setup>
import { onLoad, onShow, onUnload } from "@dcloudio/uni-app";
import { reactive, ref,computed,watch,onMounted, onUnmounted } from "vue";
import { getCurrentTime } from '@/utils/time'
import { http, load } from '@/utils/http'
import { wsclose,wsopen,wssend,socketTask } from "../../utils/socket.js";
import { getLocalData, setLocalData } from "../../utils/cache.js"
import { useUserStore } from "../../store/User.js"
import { storeToRefs } from 'pinia'
const popup=ref(null)
const data = reactive({
	clickindex:0,
})
const readall = ()=>{
	for (var i = 0; i < store.noticeList.length; i++) {
		store.noticeList[i].isConfirm=true
	}
	//触发更新事件
	uni.$emit('upgradeNoticeList',store.noticeList)
}
const popupToggle =(e)=>{
	console.log('index',e);
	data.clickindex=e;
	store.noticeList[e].isConfirm=true
	//触发更新事件
	uni.$emit('upgradeNoticeList',store.noticeList)
	console.log("store.noticeList[e].isConfirm",store.noticeList[e].isConfirm)
	popup.value.open()
}
const store = useUserStore();
onLoad(()=>{
})
onUnload(()=>{
	
})
onShow(()=>{
})
</script>

<style>
	.notice-list{
		display: flex;
	    flex-direction: column-reverse;
		margin-top: 15px;
	}
	.time{
		font-size: small;
		color: #c1c1c1;
	}
	.popup-content{
		padding: 15px;
		height: 450px;
		width: 300px;
		display: flex;
		flex-direction: column;
	    justify-content: center;
	}
	.text{
		color: rgb(66, 62, 62);
	}
	.title{
		color: #000000;
		font-size: larger;
		font-weight: 800;
		font-style: bolder;
	}
	.content{
		text-indent: 30px;
	}
	.timebottom{
		font-size: small;
	    color: #c1c1c1;
	    padding-left: 170px;
	}

</style>
