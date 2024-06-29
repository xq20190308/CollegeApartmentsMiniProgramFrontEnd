<template>
	<text class="underline-text" @click="()=>{data.sendtodoc=data.sendtodoc?false:true}">{{data.sendtodoc?'发给宿舍':"发给教学单位"}}</text>
	<view style="margin: 15px;margin-top: 40px;
				border-radius: 20px;
				overflow: hidden;
				box-shadow: 0px 2px 20px rgb(0 0 0 / 5%);" class="list">
				
		<uni-list v-if="data.sendtodoc" border-full>
			<uni-list-item style="padding: 2px 8px;" :showArrow="false" title="请选择宿舍" :righticon="''" >
				<template v-slot:footer>
					<uni-data-picker :clear-icon="true" popup-title="" :localdata="docs"
					:border="false" :placeholder="'默认全选'" v-model="data.receiverOfDo" :map="{text:'docName',value:'docId'}"
					@change="(e)=>{console.log('data.receiverOfDo',data.receiverOfDo)}" >
					</uni-data-picker>
				</template>
			</uni-list-item>
		</uni-list>
		<uni-list v-else border-full>
			<!-- <uni-list-item v-for="(item,key) in data.receiver" :key="key" style="padding: 2px 8px;" :showArrow="false" :title="key" :righticon="''" >
				<template v-slot:footer>
					<uni-data-picker :clear-icon="true" popup-title="" :localdata="storedata.classes"
					:border="false" :placeholder="'请选择'+key" v-model="data.receiver[key]" :map="{text:'text',value:'value'}"
					@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
					</uni-data-picker>
				</template>
			</uni-list-item> -->
			<uni-list-item style="padding: 2px 8px;" :showArrow="false" title="请选择校区" :righticon="''" >
				<template v-slot:footer>
					<uni-data-picker :clear-icon="true" popup-title="" :localdata="storedata.origin"
					:border="false" :placeholder="'默认全选'" v-model="data.receiver.campusId" :map="{text:'campusName',value:'campusId'}"
					@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
					</uni-data-picker>
				</template>
			</uni-list-item>
			<uni-list-item v-if="data.receiver.campusId" style="padding: 2px 8px;" :showArrow="false" title="请选择年级" :righticon="''" >
				<template v-slot:footer>
					<uni-data-picker :clear-icon="true" popup-title="" :localdata="storedata.origin[data.idIndex.campusIndex].grades"
					:border="false" :placeholder="'默认全选'" v-model="data.receiver.gradeId" :map="{text:'gradeName',value:'gradeId'}"
					@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
					</uni-data-picker>
				</template>
			</uni-list-item>
			<uni-list-item v-if="data.receiver.gradeId&&data.receiver.campusId" style="padding: 2px 8px;" :showArrow="false" title="请选择学院" :righticon="''" >
				<template v-slot:footer>
					<uni-data-picker :clear-icon="true" popup-title="" :localdata="storedata.origin[data.idIndex.campusIndex].grades[data.idIndex.gradeIndex].colleges"
					:border="false" :placeholder="'默认全选'" v-model="data.receiver.collegeId" :map="{text:'collegeName',value:'collegeId'}"
					@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
					</uni-data-picker>
				</template>
			</uni-list-item>
			<uni-list-item v-if="data.receiver.collegeId&&data.receiver.gradeId&&data.receiver.campusId" style="padding: 2px 8px;" :showArrow="false" title="请选择专业" :righticon="''" >
				<template v-slot:footer>
					<uni-data-picker :clear-icon="true" popup-title="" :localdata="storedata.origin[data.idIndex.campusIndex].grades[data.idIndex.gradeIndex].colleges[data.idIndex.collegeIndex].majors"
					:border="false" :placeholder="'默认全选'" v-model="data.receiver.majorId" :map="{text:'majorName',value:'majorId'}"
					@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
					</uni-data-picker>
				</template>
			</uni-list-item>
			<uni-list-item v-if="data.receiver.majorId&&data.receiver.collegeId&&data.receiver.gradeId&&data.receiver.campusId" style="padding: 2px 8px;" :showArrow="false" title="请选择班级" :righticon="''" >
				<template v-slot:footer>
					<uni-data-picker :clear-icon="true" popup-title="" :localdata="storedata.origin[data.idIndex.campusIndex].grades[data.idIndex.gradeIndex].colleges[data.idIndex.collegeIndex].majors[data.idIndex.majorIndex].classes"
					:border="false" :placeholder="'默认全选'" v-model="data.receiver.classId" :map="{text:'className',value:'classId'}"
					@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
					</uni-data-picker>
				</template>
			</uni-list-item>
			<!-- <uni-list-item style="padding: 2px 8px;" :showArrow="false" title="请选择" :righticon="''" >
				<template v-slot:footer>
					<uni-data-picker :clear-icon="true" popup-title="" :localdata="storedata.origin[grades]"
					:border="false" :placeholder="'请选择学院'" v-model="data.receiver.gradeId" :map="{text:'gradeName',value:'gradeId'}"
					@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
					</uni-data-picker>
				</template>
			</uni-list-item> -->
		</uni-list>
	</view>
	<view class="content">
	<uni-easyinput type="textarea" :maxlength="-1" v-model="data.content" placeholder="请输入内容" :placeholderStyle="data.placeholderStyle"></uni-easyinput>
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
import { useDataStore } from '../../store/data.js';
const picker = ref(null)
const data = reactive({
	sendtodoc:true,
	content:"",
	placeholderStyle:"",
	idIndex:{
		campusIndex:0,
		gradeIndex:0,
		collegeIndex:0,
		majorIndex:0,
	},
	receiverOfDo:"",
	receiver:{
		campusId:"",
		gradeId:"",
		collegeId:"",
		majorId:"",
		classId:"",
	},
	dataTree:[],
})
const docs=ref([{
	docName:"GA17-436",
	docId:"GA17-436",
},{
	docName:"GB14-412",
	docId:"GB14-412",
}])
const store = useUserStore()
const post = async()=>{
	
	let rece=data.sendtodoc?data.receiverOfDo:data.receiver
	if(data.content&&rece){
		console.log("data.content",data.content)
		if(!data.sendtodoc){rece.campusId=rece.campusId?rece.campusId:0
		rece.gradeId=rece.gradeId?rece.gradeId:0
		rece.collegeId=rece.collegeId?rece.collegeId:0
		rece.majorId=rece.majorId?rece.majorId:0
		rece.classId=rece.classId?rece.classId:0}
		const res = await wssend(data.sendtodoc?"2":"1",data.content,rece)
		if(res=="success"){
			uni.showToast({
				icon:"success",
				title:"发布成功"
			})
			data.content=""
		}else{
			uni.showToast({
				icon:"error",
				title:"发布失败"
			})
		}
	}else{
		uni.showToast({
			icon:"error",
			title:"内容不能为空！"
		})
	}
}
const onnodeclick=(e)=> {
	console.log('onnodeclick',e);
	console.log("receiver",data.receiver)
}
const onpopupopened=(e)=> {
	console.log('popupopened',e);
	console.log("receiver",data.receiver)
}
const onpopupclosed=(e)=> {
	console.log('popupclosed',e);
	console.log("receiver",data.receiver)
}
const onchange=(e)=> {
	console.log('onchange:', e);
	console.log("receiver",data.receiver)
	data.receiver.gradeId=data.receiver.campusId?data.receiver.gradeId:""
	data.receiver.collegeId=data.receiver.gradeId&&data.receiver.campusId?data.receiver.collegeId:""
	data.receiver.majorId=data.receiver.collegeId&&data.receiver.gradeId&&data.receiver.campusId?data.receiver.majorId:""
	data.receiver.classId=data.receiver.majorId&&data.receiver.collegeId&&data.receiver.gradeId&&data.receiver.campusId?data.receiver.classId:""
	console.log("receiver",data.receiver)
	console.log("storedata.origin",storedata.origin)
	if(data.receiver.campusId){//找到校区对应索引
		let index = storedata.origin.findIndex(item => item.campusId === data.receiver.campusId);
		data.idIndex.campusIndex=index
		console.log("校区的索引",data.idIndex.campusIndex)
	}
	if(data.receiver.gradeId){//找到年级对应索引
		let index = storedata.origin[data.idIndex.campusIndex].grades.findIndex(item => item.gradeId === data.receiver.gradeId);
		data.idIndex.gradeIndex=index
		console.log("年级的索引",data.idIndex.gradeIndex)
	}
	if(data.receiver.collegeId){//找到学院对应索引
		let index = storedata.origin[data.idIndex.campusIndex].grades[data.idIndex.gradeIndex].colleges.findIndex(item => item.collegeId === data.receiver.collegeId);
		data.idIndex.collegeIndex=index
		console.log("学院的索引",data.idIndex.collegeIndex)
	}
	if(data.receiver.majorId){//找到专业对应索引
		let index = storedata.origin[data.idIndex.campusIndex].grades[data.idIndex.gradeIndex].colleges[data.idIndex.collegeIndex].majors.findIndex(item => item.majorId === data.receiver.majorId);
		data.idIndex.majorIndex=index
		console.log("专业的索引",data.idIndex.majorIndex)
	}
}
const storedata = useDataStore()
onLoad(()=>{
	//console.log("store.user",store.user)
	console.log("storedata.origin",storedata.origin)	
})
</script>

<style lang="scss" scoped>
.content{
	width: 90%;
	padding-left: 33rpx;
	margin-top: 50rpx;
	::v-deep .uni-easyinput__content-textarea {
		height: 550rpx;
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
.underline-text {
		padding-bottom: 5px;
		padding-left: 5px;
		float: right;
		font-weight: 300;
		font-size: 12px;
		text-decoration: underline;
		color: #000000;
		position: fixed;
		left: 290px;
		top: 15px;
		z-index: 20;
	  }
	  .underline-text:active {
	    color: #0000ff; /* 点击时的蓝色 */
	  }
</style>