<template>
	<view class="banner">
	<uni-popup v-if="store.noticeList.length>0" ref="popup" background-color="#fff" @change="(e)=>{console.log('change',e)}">
		<view class="popup-content">
			<text class="title">通知</text><br/>
			<text class="text-bottom">{{store.noticeList[data.clickindex].sendTime}}</text><br/>
			<text class="text-bottom">{{store.noticeList[data.clickindex].senderUserId}}</text><br/>
			<textarea class="text-block">{{store.noticeList[data.clickindex].data}}</textarea>
		</view>
	</uni-popup>
	<text v-if="store.noticeList.length>0" class="underline-text" @click="readall">全部已读</text>
	<view v-if="store.noticeList.length>0" class="notice-list">
		<view v-for="(item,index) in store.noticeList" :key="index" >
			<view class="chat-time-view"><text class="chat-time">{{item.sendTime}}</text></view>
			<uni-card @click="(e)=>{popupToggle(index)}" title="通知" :sub-title="item.senderUserId" thumbnail="../../../../static/home/future_icon.png">
				<text>{{item.data}}</text>
				<template v-slot:extra>
					<uni-badge v-if="item.isConfirm===false" text="1" :is-dot="true" />
				</template>
			</uni-card>
		</view>
	</view>
	</view>
</template>

<script setup>
import { onLoad, onShow, onUnload } from "@dcloudio/uni-app";
import { reactive, ref,computed,watch,onMounted, onUnmounted } from "vue";
import { getCurrentTime } from '@/utils/time'
import { http, load } from '@/utils/http'
import { useUserStore } from "../../store/User.js"
const store = useUserStore();
const popup=ref(null)
const data = reactive({
	clickindex:0,
})
const readall = ()=>{
	store.noticeList.forEach((notice)=>{
		notice.isConfirm=true
	})
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
</script>

<style lang="scss" scoped>
	::v-deep .uni-card__content{ 
		padding: 10px;
	    width: 650rpx;
	    white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	}

	.title{
		color: #000000;
		font-size: larger;
		font-weight: 800;
		font-style: bolder;
	}

</style>
