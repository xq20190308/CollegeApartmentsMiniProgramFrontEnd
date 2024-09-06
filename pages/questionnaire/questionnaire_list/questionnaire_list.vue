<template> 
	<view class="banner">
	<view class="notice-list">
		<view  v-for="(item,index) in data.questionnairelist" :key="index" class="bar,questionitem"  @click="gotonaire(item)">
			<uni-section  :title="item.name" type="line" titleFontSize=42rpx :sectionstyle="item.isEnd?'opacity: 0.5':''" >
				<template v-slot:right>
					<view style="display: flex; gap: 5rpx;">
						<button @click.stop="(e)=>{modifynaire(item)}" class="deletbutton">修改</button>
						<button @click.stop="(e)=>{deletenaire(item)}" class="deletbutton">删除</button>
					</view>
				</template>
				<questionnaire :naireinfo="item" ></questionnaire>
			</uni-section>
		</view>
	</view>
	</view>
	<view>
		<image class = "addnaireicon" src="../../../static/feedback/plus.png" @click="goto('../addquestionnaire/addquestionnaire','questionnaireManage')"></image>
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
import { useUserStore } from "../../../store/User.js";
const data = reactive({
	questionnairelist:[],
})
const store = useUserStore()
const getNaireslist = async ()=>{
	
	const res = await http('/questionnaire/selectAll','GET',{},);
	
	data.questionnairelist=res.data;
	let currentTimeStamp = getTimeStamp(await getCurrentTime())
	for (let i=0;i<data.questionnairelist.length;i++) {
		data.questionnairelist[i].isBegin = getTimeStamp(data.questionnairelist[i].startTime)>currentTimeStamp?false:true;
		data.questionnairelist[i].isEnd = getTimeStamp(data.questionnairelist[i].endTime)>currentTimeStamp?false:true;
	}
	console.log("data.questionnairelist",data.questionnairelist)
}
const gotonaire = (item) =>{
	if(!item.isBegin){
		console.log("问卷未开始");
		uni.showModal({
			title:'问卷未开始',
			icon:'error'
		})
	}else{
		if(uni.getStorageSync('token')){
			uni.navigateTo({
				url:'../questionnaire_home/questionnaire_home?info='+JSON.stringify(item)
			})
		}else{
			store.tologin()
		}
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
		goto('../addquestionnaire/addquestionnaire?info='+JSON.stringify(item),
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
		if(store.user.userPermission['questionnaireManage']){
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
<style lang="scss" scoped>
.questionitem{
	display: block;
}

</style>

