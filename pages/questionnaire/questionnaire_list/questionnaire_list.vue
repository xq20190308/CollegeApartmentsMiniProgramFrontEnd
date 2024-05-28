<template>
	<view class="qcates">
		<view v-for="(cate,index) in data.cates" :class="{'cateitem':true,'cateactive':index==data.active,}" :key="index" @click="dircate(index)">
			{{cate.name}}
		</view>
	</view>
	<view class="qusnalist">
		<view class="qusna" v-for="(item,index) in data.questionnairelist" :key="index" @click="gotonaire(item)">
			<questionnaire :naireinfo="item"></questionnaire>
			<questionnaire :naireinfo="item"></questionnaire>
		</view>
	</view>
	<view>
		<image class = "addnaireicon" src="../../static/feedback/plus.png" @click="goto('../addquestionnaire/addquestionnaire','addNaire')"></image>
	</view>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive} from "vue";
import {getLocalData,delLocalData, setLocalData} from "../../../utils/cache.js"
import questionnaire from '../../../components/questionnaire/questionnaire.vue'
import {goto} from "../../../utils/access.js"
import {http} from '@/utils/http'
const data = reactive({
	questionnairelist:[],
	total: 0,
	cates:[{
			id:0,
			name:"全部"
		},{
			id:1,
			name:"未完成"
		},{
			id:2,
			name:"已完成"
	}],
	active:0
})
const getNaireslist = async (cates)=>{
	console.log("分类请求的参数",cates);
	
	const res = await http('/questionnaire/selectAll','GET',{},);
	
	console.log("封装后请求的结果",res)
	
	data.questionnairelist=res.data;
}
const gotonaire = (item) =>{
	console.log("问卷信息",item);
	uni.navigateTo({
		url:'../questionnaire_home/questionnaire_home?questionidList='+item.questionList+
		'&id='+item.id+'&type='+item.type+'&name='+item.name+
		'&descr='+item.descr+'&startTime='+item.startTime+
		'&endTime='+item.endTime,
	})
}
const dircate=(options)=>{
	data.active=options;
	console.log("点击事件的参数",options)
	if(options===0){getNaireslist();}
	else{getNaireslist(options);}
}
onLoad(() => {
	setLocalData('addNaire',true);
	getNaireslist()
})
onShow(()=>{
})
</script>
<style lang="scss">
.qcates{
	display: flex;
	flex-direction: row;
	background-color: #fff;
	height: 40px;
	justify-content: space-between;
}
.cateitem{
	text-align: center;
	width: 33.33%;
	padding-top: 9px;
	padding-bottom: 9px;
	background-color: #008cff;
}
.cateactive{
	background-color: #fff;
}
.qusnalist{
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	questionnaire{
		width:100%;
	}
}
.addnaireicon {
	position: fixed;
	bottom:60rpx; 
	right: 50rpx; 
	width: 80rpx; 
	height: 80rpx; 
}

</style>

