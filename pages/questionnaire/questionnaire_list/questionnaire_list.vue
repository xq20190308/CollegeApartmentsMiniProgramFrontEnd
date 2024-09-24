<template> 
	<view class="banner">
	<view class="notice-list">
		<view  v-for="(item,index) in data.questionnairelist" :key="index" class="bar,questionitem"  @click="gotonaire(item)">
			<uni-section  :title="item.name" type="line" titleFontSize=42rpx :sectionstyle="item.isEnd?'opacity: 0.5':''" >
				<template v-slot:right>
					<view style="display: flex; gap: 5rpx;">
						<button v-if="!item.isBegin" @click.stop="(e)=>{modifynaire(item)}" class="deletbutton">修改</button>
						<button @click.stop="(e)=>{deletenaire(item)}" class="deletbutton">删除</button>
					</view>
				</template>
				<questionnaire :naireinfo="item"></questionnaire>
			</uni-section>
		</view>
	</view>
	</view>
	<view>
		<image class = "addnaireicon" src="../../../static/feedback/plus.png" @click="goto('../addquestionnaire/addquestionnaire')"></image>
	</view>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive} from "vue";
// import questionnaire from '../../../components/questionnaire/questionnaire.vue'
import {goto} from "../../../utils/access.js"
import {http} from '@/utils/http'
import {getCurrentTime,getTimeStamp} from '@/utils/time'
import { useUserStore } from "../../../store/User.js";
import { useDict } from '../../../utils/dict';
useDict('fun_question_type')
const data = reactive({
	questionnairelist:[],
	fun_questionnare_type:[]
})
const store = useUserStore()
const getNaireslist = ()=>{
	http('/questionnaire/selectAll','GET',{},).then((res)=>{
		data.questionnairelist=res.data;
		let currentTimeStamp = getTimeStamp(getCurrentTime())
		for (let i=0;i<data.questionnairelist.length;i++) {
			// console.log(data.fun_questionnare_type)
			data.questionnairelist[i].type=data.fun_questionnare_type.filter((dict)=>{return dict.value===data.questionnairelist[i].type})[0].label
			data.questionnairelist[i].isBegin = getTimeStamp(data.questionnairelist[i].startTime)>currentTimeStamp?false:true;
			data.questionnairelist[i].isEnd = getTimeStamp(data.questionnairelist[i].endTime)>currentTimeStamp?false:true;
		}
		console.log("data.questionnairelist",data.questionnairelist)
	})
}
const gotonaire = (item) =>{
	if(!item.isBegin){
		console.log("问卷未开始");
		uni.showModal({
			title:'问卷未开始',
			icon:'error'
		})
	}else{
		uni.navigateTo({
			url:'../questionnaire_home/questionnaire_home?info='+JSON.stringify(item)
		})
	}
}
const modifynaire = (naire)=>{
	let item = {...naire}
	item.type = data.fun_questionnare_type.filter((dict)=>{return dict.label===item.type})[0].value
	goto('../addquestionnaire/addquestionnaire?info='+JSON.stringify(item))
}
const deletenaire =async (item)=> {
	uni.showModal({
		title: '提示',
		content: '确定要删除该文件吗',
		success:async (res) => {
			if (res.confirm) { 
				const res = await http('/questionnaire/deleteById/'+item.id,'DELETE',{},);
				console.log(res);
				getNaireslist()
			} else if (res.cancel) {
				console.log("取消删除问卷");
			}
		}
	});
}
onLoad(() => {
	data.fun_questionnare_type=useDict('fun_questionnare_type')
	getNaireslist()
})
onShow(()=>{
	console.log(data.questionnairelist)
})
</script>
<style lang="scss" scoped>
.questionitem{
	display: block;
}

</style>

