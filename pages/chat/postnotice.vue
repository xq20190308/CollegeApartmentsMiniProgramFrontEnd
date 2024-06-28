<template>
	<view class="content">
	<uni-easyinput type="textarea" :maxlength="-1" v-model="data.content" placeholder="请输入内容" :placeholderStyle="data.placeholderStyle"></uni-easyinput>
	</view>
	<view style="margin: 15px;
				border-radius: 20px;
				overflow: hidden;
				box-shadow: 0px 2px 20px rgb(0 0 0 / 5%);" class="list">
		<uni-list border-full>
			<uni-list-item style="padding: 2px 8px;" :showArrow="false" title="权限" :righticon="''" >
				<template v-slot:footer>
					<uni-data-picker popup-title="" :localdata="data.dataTree" v-model="data.receiver"
					:border="false" :clear-icon="false"
					@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
					</uni-data-picker>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
	<button style="left: 150px; top: 15px; color:#ffffff;backgroundColor:#008fff;" type="primary" size="mini" @click="post">发布</button>
	
</template>

<script setup>
import '@/utils/http';
import {computed, reactive, ref} from "vue";
import {onLoad,onReady} from "@dcloudio/uni-app";
import {http} from '@/utils/http';
import { wsclose,wsopen,wssend,socketTask } from "../../utils/socket.js";
import { getTimeStamp } from "../../utils/time.js";
import { useUserStore } from "../../store/User.js"
import { storeToRefs } from 'pinia'
const data = reactive({
	content:"",
	placeholderStyle:"",
	receiver:"",
	dataTree: [{
		text: "专业一",
		value: "1-0-0",
		children: [{
			text: "一年级",
			value: "1-1-0",
			children: [{
				text: "1.1.1班",
				value: "1-1-1"
			},
			{
				text: "1.1.2班",
				value: "1-1-2"
			}]
		},{
			text: "二年级",
			value: "1-2-0",
			children: [{
				text: "1.2.1班",
				value: "1-2-1"
			},
			{
				text: "1.2.1班",
				value: "1-2-2"
			}]
		}]
	},{
		text: "专业二",
		value: "2-0-0",
		children: [{
			text: "一年级",
			value: "2-1-0",
			children: [{
				text: "2.1.1班",
				value: "2-1-1"
			},
			{
				text: "2.1.2班",
				value: "2-1-2"
			}]
		},{
			text: "二年级",
			value: "2-2-0",
			children: [{
				text: "2.2.1班",
				value: "2-2-1"
			},
			{
				text: "2.2.2班",
				value: "2-2-2"
			}]
		}]
	},{
		text: "专业三",
		value: "3-0-0",
		children: [{
			text: "一年级",
			value: "3-1-0",
			children: [{
				text: "3.1.1班",
				value: "3-1-1"
			},
			{
				text: "3.1.2班",
				value: "3-1-2"
			}]
		},{
			text: "二年级",
			value: "3-2-0",
			children: [{
				text: "3.2.1班",
				value: "3-2-1"
			},
			{
				text: "3.2.2班",
				value: "3-2-2"
			}]
		}]
	},]
})
const store = useUserStore()
const post = ()=>{
	if(data.content&&data.receiver){
		console.log("data.content",data.content)
		wssend('1',data.content,data.receiver)
	}else{
		uni.showToast({
			icon:"error",
			title:"内容不能为空！"
		})
	}
}
const onnodeclick=(e)=> {
	//console.log('onnodeclick',e);
	//console.log("receiver",data.receiver)
}
const onpopupopened=(e)=> {
	//console.log('popupopened',e);
	//console.log("receiver",data.receiver)
}
const onpopupclosed=(e)=> {
	//console.log('popupclosed',e);
	//console.log("receiver",data.receiver)
}
const onchange=(e)=> {
	//console.log('onchange:', e);
	console.log("receiver",data.receiver)
}
onLoad(()=>{
	console.log("store.user",store.user)
})
</script>

<style lang="scss" scoped>
.content{
	width: 90%;
	padding-left: 33rpx;
	margin-top: 50rpx;
	::v-deep .uni-easyinput__content-textarea {
		height: 750rpx;
	}
}
.list{
	::v-deep .uni-easyinput{
		text-align: end;
	}
	::v-deep .text-color {
	  color: #9e9a9a;
	  font-family: UICTFontTextStyleBody;
	  font-size: smaller;
	}
}
</style>