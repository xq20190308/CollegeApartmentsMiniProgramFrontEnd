<template> 
	<view class="qusnalist">
		<view  v-for="(item,index) in data.questionnairelist" :key="index" class="questionnaire" :style="item.id===1?filter:''"  @click="gotonaire(item)">
			<uni-section :style="item.isEnd?'opacity: 0.5':''" :title="item.name" type="line" titleFontSize=42rpx>
				<template v-slot:right style="margin-left: 10px;">
					<view style="display: flex; flex-direction: row;">
						<button @click.stop="(e)=>{modifynaire(item)}" class="deletbutton" style="margin-right: 5px;">修改</button>
						<button @click.stop="(e)=>{deletenaire(item)}" class="deletbutton">删除</button>
					</view>
				</template>
				<questionnaire :naireinfo="item" ></questionnaire>
			</uni-section>
		</view>
	</view>
	<view>
		<image class = "addnaireicon" src="../../static/feedback/plus.png" @click="goto('../addquestionnaire/addquestionnaire','questionnaireManage')"></image>
	</view>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive} from "vue";
import {getLocalData,delLocalData, setLocalData} from "../../../utils/cache.js"
import questionnaire from '../../../components/questionnaire/questionnaire.vue'
import {goto} from "../../../utils/access.js"
import {http} from '@/utils/http'
import {getCurrentTime,getTimeStamp} from '@/utils/time'
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
const getNaireslist = async ()=>{
	
	const res = await http('/questionnaire/selectAll','GET',{},);
	
	data.questionnairelist=res.data;
	let currentTimeStamp = getTimeStamp(await getCurrentTime())
	for (let i=0;i<data.questionnairelist.length;i++) {
		data.questionnairelist[i].isEnd = getTimeStamp(data.questionnairelist[i].endTime)>currentTimeStamp?false:true;
	}
}
const gotonaire = (item) =>{
	if(item.isEnd){
		console.log("问卷已结束");
		uni.showModal({
			title:'问卷已结束',
			icon:'error'
		})
	}else{
		uni.navigateTo({
			url:'../questionnaire_home/questionnaire_home?id='+item.id+
			'&type='+item.type+'&name='+item.name+
			'&description='+item.description+'&startTime='+item.startTime+
			'&endTime='+item.endTime,
		})
	}
}
const modifynaire = (item)=>{
	if(item.isEnd){
		console.log("问卷已结束");
		uni.showModal({
			title:'问卷已结束',
			icon:'error'
		})
	}else{
		goto('../addquestionnaire/modifyquestionnaire?info='+JSON.stringify(item),
			'questionnaireManage')
	}
}
const deletenaire =async (item)=> {
	if(item.isEnd){
		console.log("问卷已结束");
		uni.showModal({
			title:'问卷已结束',
			icon:'error'
		})
	}else{
		console.log("--",item.id);
		if(true){
			const res = await http('/questionnaire/deleteById/'+item.id,'DELETE',{},);
			console.log(res);
			getNaireslist()
		}
		else{
			uni.showToast({
				title: "你没有权限",
				icon: "error"
			})
		}
	}
}
onLoad(() => {
})
onShow(()=>{
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
	z-index: 200;
}
.questionnaire{
	width: 97%;
	background-color: #fff;
	box-shadow: 0 4px 15px 0 rgba(230, 228, 228, 0.52);
	display: flex;
	flex-direction: column;
	margin: 22rpx 10rpx;
	border-radius: 10px;
	padding: 20rpx 20rpx;
	box-sizing: border-box;
	z-index: 10;
}
.deletbutton{
	background-color:#e2e2e2;
	color: #000;
	width: 50px;
	height:40x;
	font-size: 10px;
	text-align: center;
	z-index: 100;
} 
</style>

