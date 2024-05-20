<template>
	<view class="qusnalist">
		<view class="qusna" v-for="(item,index) in questionnairelist" :key="index" @click="gotonaire(item)">
			<questionnaire :naireinfo="item"></questionnaire>
		</view>
	</view>
</template>

<script>
	import questionnaire from '../../../components/questionnaire/questionnaire.vue'

	import { setLocalData, getLocalData } from "../../utils/cache.js";
		
	export default {
		data() {
			return {
				questionnairelist:[{
					id:"",
					type: 0,
					name: "",
					descr: null,
					startTime: "",
					endTime: "",
					questionList: [],
				},],
				total: 0
			}
		},
		methods:{
			getNaireslist(){
				uni.request({
					url:'http://127.0.0.1:4523/m1/4414254-4059226-default/questionnaire/selectAll',
					method: 'GET',
					data:{},
					success: (res)=> {
						this.questionnairelist=res.data.data;
						console.log(this.questionnairelist);	
						console.log(res.data.data);				
					},
					complete: (res)=>{
						console.log(res);
					}
				});
			},
			gotonaire: (item) =>{
				setLocalData("qeid", item.id)
				setLocalData("qetype", item.type)
				setLocalData("qename", item.name)
				setLocalData("qedescr", item.descr)
				setLocalData("qesTime", item.startTime)
				setLocalData("qeeTime", item.endTime)
				setLocalData("qidList", item.questionList)
				uni.navigateTo({
					url:'../questionnaire_home/questionnaire_home'
				})
			}
		},
		onLoad(options) {
			this.getNaireslist()
		}
	}
</script>

<style lang="scss">
	
.qusnalist{
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	questionnaire{
		width:100%;
	}
}

</style>

