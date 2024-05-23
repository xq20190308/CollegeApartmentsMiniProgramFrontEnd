<template>
	<view>类型：{{newNaire.type}}</view>
	<view>名称：{{newNaire.name}}</view>
	<view>描述：{{newNaire.descr}}</view>
	<view>开始时间：{{newNaire.startTime}}</view>
	<view>结束时间：{{newNaire.endTime}}</view>
	<view class="nairetype">
		<input @input="(e) => qnameChange(e,qindex)" placeholder="请输入题目类型" placeholder-class="answerplacehoder" />
	</view>
	<view class="nairename">
		<input @input="(e) => qnameChange(e,qindex)" placeholder="请输入题目名称" placeholder-class="answerplacehoder" />
	</view>
	<view class="nairedescri">
		<input @input="(e) => qnameChange(e,qindex)" placeholder="请输入题目描述" placeholder-class="answerplacehoder" />
	</view>
	<view class="nairrest">
		<input @input="(e) => qnameChange(e,qindex)" placeholder="请输入题目开始时间" placeholder-class="answerplacehoder" />
	</view>
	<view class="naireet">
		<input @input="(e) => qnameChange(e,qindex)" placeholder="请输入题目结束时间" placeholder-class="answerplacehoder" />
	</view>
	<view class="questionsform">
		<view class="questionitem" v-for="(que,qindex) in questionList" :key="qindex">
			<view v-if="que.type===1">{{qindex + 1}}.单选题</view>
			<view v-else-if="que.type===2">{{qindex + 1}}.多选题</view>
			<view v-else>{{qindex + 1}}.问答题</view>
			<view class="answer">
				<input @input="(e) => qnameChange(e,qindex)" placeholder="请输入题目名称" placeholder-class="answerplacehoder" />
			</view>
			<view class="answer">
				<input @input="(e) => qdescriChange(e,qindex)" placeholder="请输入题目描述" placeholder-class="answerplacehoder" />
			</view>
			<view class="choice" v-if="que.type===1">
				<view style="display: flex; flex-wrap: nowrap; margin-bottom: 2px;" v-for="(item, index) in que.content" :key="index">
					<view style="background-color: white; width: 20px;height: 20px;border-radius: 50px; border: 1px solid #7f7f7f; margin-right: 5px;"></view>
					<input  @input="(e) => qchitemChange(e,qindex)" placeholder="请输入选项" placeholder-class="answerplacehoder" />
				</view>
			</view>
			<view class="mulchoice"  v-else-if="que.type===2">
				<view style="display: flex; flex-wrap: nowrap; margin-bottom: 2px;" v-for="(item, index) in que.content" :key="index">
					<view style="background-color: white; width: 20px;height: 20px; border: 1px solid #7f7f7f; margin-right: 5px;"></view>
					<input @input="(e) => qmulchitemChange(e,qindex)" placeholder="请输入选项" placeholder-class="answerplacehoder" />
				</view>
			</view>
		</view>
	</view>
	<view class="handlequestion">
		<button class="add" @click="(e)=>add(e,1)">创建单选</button>
		<button class="add" @click="(e)=>add(e,2)">创建多选</button>
		<button class="add" @click="(e)=>add(e,3)">创建问答</button>
	</view>
	<view>
		<button class="submit" @click="submit">创建</button>
	</view>
</template>
<script>
	import question from '../../../components/question/question.vue'
	
	export default {
		data() {
			return {
				//传到后端的数据
				newNaire:{//传到问卷列表页面中的数据
					descr: "null",
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
			add(e,option){
				console.log(option);
				this.questionList.push({
					content: ["A", "B", "C"],
					describe: "",
					id: "",
					name: "",
					questionnaire: "",
					type: option,
				});
				console.log(this.questionList)
			},
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

<style lang="scss" scoped>
.submit{
	margin-top: 20px;
	background-color:#008cff;
	width: 80%;
}
.handlequestion{
	margin-top: 20px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.add{
	font-size: small;
	background-color:#008cff;
	width: 25%;
}
.questionsform{
	margin-left: 10px;
	margin-right: 10px;
	display: flex;
	flex-wrap: wrap;
}
.questionitem{
	width: 100%;
	margin-top: 10px;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
}
</style>
