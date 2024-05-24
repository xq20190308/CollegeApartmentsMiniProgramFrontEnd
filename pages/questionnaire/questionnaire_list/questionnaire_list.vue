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
		<image class = "addnaireicon" src="../../static/feedback/plus.png" @click="addnaire"></image>
	</view>
</template>

<script setup>
import {onLoad} from "@dcloudio/uni-app"
import sysurl from '../../../system.config.js';
import questionnaire from '../../../components/questionnaire/questionnaire.vue'
import {reactive} from "vue";
const data = reactive({
	questionnairelist:[],
	newNaire:null,
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
const getNaireslist = (cates)=>{
	console.log("分类请求的参数",cates);
	uni.request({
		//url:'http://192.168.76.218:8080/questionnaire/selectAll',
		url:sysurl.developUrl + '/questionnaire/selectAll', 
		method: 'GET',
		data:{},
		success: (res)=> {
			data.questionnairelist=res.data.data;
		},
		complete: (res)=>{
			console.log(res);
			if(data.newNaire!=null){
				console.log("新问卷",data.newNaire);
				loadNewlist();
			}
			else{
				console.log("newList为空");
				console.log('获取到列表',data.questionnairelist);
			}
		}
	});
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
const addnaire = ()=> {
	uni.navigateTo({
		url: '../addquestionnaire/addquestionnaire'
	});
}
const dircate=(options)=>{
	data.active=options;
	console.log("点击事件的参数",options)
	if(options===0){getNaireslist();}
	else{getNaireslist(options);}
}
const loadNewlist = ()=>{
	data.questionnairelist.push(data.newNaire);
	console.log("创建新问卷后的列表",data.questionnairelist);
	data.newNaire=null;
}
onLoad((options) => {
	console.log("列表参数",options);
	if(options.newNaire!=null){
		data.newNaire=JSON.parse(options.newNaire);
		console.log("组件数据",data.newNaire);
	}
	else{
		console.log("newNaire为null");
	}
	getNaireslist()
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

