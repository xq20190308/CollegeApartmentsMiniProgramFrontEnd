<template>
	<bannerVue>
		<uni-section type="line" title="空教室" class="bar,barb">
			<view class="pick-view">
				<picker-view class="picker-con" indicator-style="height: 40px;" @change="bindPickerChange">
					<!-- <picker-view-column>
						<view v-for="(item, index) in queryDate" :key="index" class="picker-item">
							{{ item.lable }}
						</view>
					</picker-view-column> -->
					<picker-view-column>
						<view v-for="(item, index) in queryTime" :key="index" class="picker-item">
							{{ item.lable }}
						</view>
					</picker-view-column>
					<picker-view-column>
						<view v-for="(item, index) in queryFloor" :key="index" class="picker-item">
							{{ item.lable }}
						</view>
					</picker-view-column>
				</picker-view>
				<button class="search-btn" @click="search">搜索</button>
			</view>
		</uni-section>
		<uni-section v-if="content" type="line" :title="content" class="bar,barw,barb">
			<view class="room">
				<view class="room-view" v-for="(item,index) in jsList" :key="index">
					<text>{{jsList[index]}}</text>
				</view>				
			</view>
		</uni-section>
	</bannerVue>
</template>

<script setup>
import bannerVue from '../../../components/banner/banner.vue';
import { ref } from 'vue';
import {onLoad,onShow} from "@dcloudio/uni-app";
import { http } from '../../../utils/http';
import { useLoginStore } from '../../../store/login';
import { getCurrentDate } from '../../../utils/time';
const searchValue = ref([0,0])
const loginInof = useLoginStore()
const bindPickerChange = (e)=>{
	searchValue.value = e.target.value
	console.log(searchValue.value)
}
onLoad(()=>{
	if(loginInof.loginInfos.qz.login){
		console.log(loginInof.qz)
	}
	else{
		loginInof.tologin("强智系统")
	}
})
const jsList = ref([])
const content = ref('')
const search = ()=>{
	content.value = queryTime.value[searchValue.value[0]].content+'['+getCurrentDate()+']'
	console.log(queryTime.value[searchValue.value[0]].content)
	http('/api/getClassroom/'+queryTime.value[searchValue.value[0]].value,'POST',loginInof.qz).then((res)=>{
		let jsL = JSON.parse(res.data).filter((item)=>{return item.jxl===queryFloor.value[searchValue.value[1]].value})
		jsList.value = jsL?.[0].jsList.map((item,index)=>{
			return item.jsmc
		})
		console.log(jsList.value)
	})
}
const queryDate = ref([
	{lable:"周一",value:"周一"},
	{lable:"周二",value:"周二"},
	{lable:"周三",value:"周三"},
	{lable:"周四",value:"周四"},
	{lable:"周五",value:"周五"},
	{lable:"周六",value:"周六"},
	{lable:"周七",value:"周七"},
]);
const queryTime = ref([
	{lable:"12节",value: "0102", content:"12节(8:00-9:50)"},
	{lable:"34节",value: "0304", content:"34节(10:10-12:00)"},
	{lable:"56节",value: "0506", content:"56节(14:00-15:50)"},
	{lable:"78节",value: "0708", content:"78节(16:00-17:50)"},
	{lable:"9X节",value: "0910", content:"9X节(19:00-20:50)"},
	{lable:"上午", value:"am", content:"上午(8:00-12:00)"},
	{lable:"下午", value:"pm", content:"下午(14:00-17:50)"},
	{lable:"全天", value:"allday", content:"全天(8:00-20:50)"},
]);
const queryFloor = ref([
	{lable:"青-J1", value:"青岛校区-1号楼"},
	{lable:"青-J2", value:"青岛校区-2号楼"},
	{lable:"青-J3", value:"青岛校区-3号楼"},
	{lable:"青-J4", value:"青岛校区-4号楼"},
	{lable:"青-J5", value:"青岛校区-5号楼"},
	{lable:"青-J6", value:"青岛校区-6号楼"},
	{lable:"青-J7", value:"青岛校区-7号楼"},
	{lable:"青-J8", value:"青岛校区-8号楼"},
	{lable:"青-J9", value:"青岛校区-9号楼"},
	{lable:"青-J11", value:"青岛校区-11号楼"},
	{lable:"青-J13", value:"青岛校区-13号楼"},
	{lable:"青-J14", value:"青岛校区-14号楼"},
	{lable:"青-S1", value:"青岛校区-S1楼"},
	{lable:"青-S2", value:"青岛校区-S2楼"},
	{lable:"青-S3", value:"青岛校区-S3楼"},
	{lable:"青-S5", value:"青岛校区-S5楼"}
]);
</script>

<style>
.room{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 10px;
	justify-content: center;
}
.room-view{
	width: fit-content;
	height: fit-content;
	text-align: center;
	background: #577dba;
	padding: 10px;
	font-size: inherit;
	color: #fff;
}
</style>
