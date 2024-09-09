<template>
	<view style="padding-left: 20rpx;" >示例数据：</view>
	<view style="padding-left: 40rpx;" ><text v-for="(item,index) in data.detail.example" :key="index">{{item}}{{'\n'}}</text></view>
	<uni-section :title="data.detail.title" type="line" v-if="true">
		<view style="margin: 15px;border-radius: 20px;overflow: hidden;box-shadow: 0px 2px 20px rgb(0 0 0 / 10%);">
			<uni-list border-full>
				<uni-list-item v-for="(item,index) in data.detail.contentname" :key="index" style="padding: 2px 8px;" :showArrow="false" :title="data.detail.content[index]" rightText="" >
					<template v-slot:footer>
						<uni-datetime-picker v-if="data.flag[index]==='date'||data.flag[index]==='time'" type="datetime" v-model="data.detail.contentResult[item].value" @change="datechage" />
						<uni-easyinput v-else v-model="data.detail.contentResult[item].value" :clearable="false" :inputBorder="false" type="line" placeholder="请输入"></uni-easyinput>
					</template>
				</uni-list-item>
				<uni-list-item style="padding: 2px 8px;" :showArrow="false" title="接受者学号(ID)" rightText="" >
					<template v-slot:footer>
						<uni-easyinput v-model="data.receiverId" :clearable="false" :inputBorder="false" type="line" placeholder="请输入学号"></uni-easyinput>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
	</uni-section>
	<view style="padding-left: 40rpx;" ><text v-for="(item,index) in data.detail.contentResult" :key="index">{{item.value}}{{'\n'}}</text></view>
	<button type="default" @click="()=>{data.currentTime=getCurrentTime()}">获取当前时间</button>
	{{data.currentTime}}
	<button type="default" @click="subscribe(data.detail.priTmplId)">订阅</button>
	<button type="default" @click="send(data.receiverId,data.detail.priTmplId,JSON.stringify(data.detail.contentResult))">推送</button>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive,ref} from "vue";
import {http} from '@/utils/http'
import {getarticles} from "../notice/api/getnotices.js"
import {getCurrentTime} from '@/utils/time'
// import {mainFun} from '../../main.js'
import {send,subscribe,check,test} from "@/utils/sengmessage.js"
import { useUserStore } from "../../store/User.js"
import { storeToRefs } from 'pinia'
const store=useUserStore()
const data = reactive({
	detail:{},
	detailPut:[],
	currentTime:"",
	receiverId:"",
	flag:[]
})
const datechage=(e)=>{
	console.log(e)
}
onLoad((detail)=>{
	data.detail=JSON.parse(detail.detail)
	data.detail.content=data.detail.content.split("\n")
	data.detail.content=data.detail.content.slice(0,data.detail.content.length-1)
	data.detail.example=data.detail.example.split("\n")
	data.detail.example=data.detail.example.slice(0,data.detail.example.length-1)
	data.detail={
		...data.detail,
		contentname:[],
		contentResult:{},
	}
	for (let i = 0; i < data.detail.content.length; i++) {
		let contents=data.detail.content[i].split(":")
		data.detail.content[i]=contents[0]
		let name=contents[1].split(".")[0].slice(2)
		if(name.startsWith('date')){
			data.flag.push("date")
		}else if(name.startsWith('time')){
			data.flag.push('time')
		}else{
			data.flag.push('else')
		}
		data.detail.contentname.push(name)
		data.detail.contentResult[name]={value:""}
	}
	//data.detail.content=JSON.parse(data.detail.content)
	console.log(data.detail)
})
</script>

<style lang="scss" scoped>
::v-deep .uni-easyinput{
	text-align: end;
}
</style>