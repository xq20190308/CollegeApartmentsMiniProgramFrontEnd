<template>
	<view class="qusnalist">
		<view class="qusna" v-for="(item,index) in questionnairelist" :key="index" @click="gotonaire(item)">
			<questionnaire :naireinfo="item"></questionnaire>
			<questionnaire :naireinfo="item"></questionnaire>
			<questionnaire :naireinfo="item"></questionnaire>
			<questionnaire :naireinfo="item"></questionnaire>
		</view>
	</view>
</template>

<script>
	import questionnaire from '../../../components/questionnaire/questionnaire.vue'
		
	export default {
		data() {
			return {
				questionnairelist:[],
				total: 0
			}
		},
		methods:{
			getNaireslist(){
				uni.request({
					//url:'http://192.168.76.218:8080/questionnaire/selectAll',
					url:'http://127.0.0.1:4523/m1/4414254-4059226-default/questionnaire/selectAll',
					method: 'GET',
					data:{},
					success: (res)=> {
						this.questionnairelist=res.data.data;
						console.log('获取到列表',this.questionnairelist);				
					},
					complete: (res)=>{
					}
				});
			},
			gotonaire: (item) =>{
				console.log("问卷信息",item);
				uni.navigateTo({
					url:'../questionnaire_home/questionnaire_home?questionidList='+item.questionList+
					'&id='+item.id+'&type='+item.type+'&name='+item.name+
					'&descr='+item.descr+'&startTime='+item.startTime+
					'&endTime ='+item.endTime 
				})
			}
		},
		onLoad(options) {
			this.getNaireslist()
		},
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

