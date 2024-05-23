<template>
	<view>
		<button class="submit" type="primary" @click="submit">创建</button>
	</view>
</template>
<script>
	import question from '../../../components/question/question.vue'
	
	export default {
		data() {
			return {
				//传到后端的数据
				newNaire:{//传到问卷列表页面中的数据
					descr: null,
					endTime: "2000-03-17 20:08:53",
					id: "51",
					name: "与素系办",
					questionList: ["123","234","345"],
					startTime: "2021-10-22 13:21:08",
					type: 87,
				},
				questionList: [{
					content: ["A", "B", "C"],
					describe: "sed dolor ea mollit aute",
					id: "32",
					name: "转时决劳场候",
					questionnaire: "nisi fugiat",
					type: 8,
				}],
			}
		},
		methods: {
			submit() {
				//提交到后端
				uni.request({
					url:'',
					method: 'POST',
					data:{
					},
					success: (res)=> {
						uni.showToast({
							title: "提交成功"
						})			
					},
					complete: (res)=>{
						uni.showToast({
							title: "创建成功"
						});
						console.log("问卷提交",res)
						//返回问卷列表界面
						uni.navigateTo({
							url: '../questionnaire_list/questionnaire_list?newNaire='+JSON.stringify(this.newNaire)
						});
					}
				});
				
			}
		},
	}
</script>

<style>
.submit{
	top: 80px;
}
</style>
