<template>
	<view class="nairetype" style="display: flex;flex-wrap: nowrap;">
		问卷类型（下拉选择）：
		<input @input="(e) => typeChange(e)" placeholder="请输入问卷类型" placeholder-class="answerplacehoder" />
	</view>
	<view class="nairename" style="display: flex;flex-wrap: nowrap;">
		问卷名称（填写）：
		<input @input="(e) => nameChange(e)" placeholder="请输入问卷名称" placeholder-class="answerplacehoder" />
	</view>
	<view class="nairedescri" style="display: flex;flex-wrap: nowrap;">
		问卷描述（填写）：
		<input @input="(e) => descriChange(e)" placeholder="请输入问卷描述" placeholder-class="answerplacehoder" />
	</view>
	<view class="nairrest" style="display: flex;flex-wrap: nowrap;">
		开始时间（选择日期）：
		<input @input="(e) => stChange(e)" placeholder="请输入开始时间" placeholder-class="answerplacehoder" />
	</view>
	<view class="naireet" style="display: flex;flex-wrap: nowrap;">
		结束时间（选择日期）：
		<input @input="(e) => etChange(e)" placeholder="请输入结束时间" placeholder-class="answerplacehoder" />
	</view>
	<view class="questionsform">
		<view class="questionitem" v-for="(que,qindex) in questionList" :key="qindex">
			<view v-if="que.type===1">{{qindex + 1}}.单选题</view>
			<view v-else-if="que.type===2">{{qindex + 1}}.多选题</view>
			<view v-else-if="que.type===3">{{qindex + 1}}.问答题</view>
			<view class="answer">
				<input @input="(e) => qnameChange(e,qindex)" placeholder="请输入题目名称"  />
			</view>
			<view class="answer">
				<input @input="(e) => qdescriChange(e,qindex)" placeholder="请输入题目描述"  />
			</view>
			<view class="choice" v-if="que.type===1">
				<view style="display: flex; flex-wrap: nowrap; margin-bottom: 2px;" v-for="(item, index) in que.content" :key="index">
					<view style="background-color: white; width: 20px;height: 20px;border-radius: 50px; border: 1px solid #7f7f7f; margin-right: 5px;"></view>
					<input  @input="(e) => qcChange(e,qindex,index)" placeholder="请输入选项"  />
				</view>
			</view>
			<view class="mulchoice"  v-else-if="que.type===2">
				<view style="display: flex; flex-wrap: nowrap; margin-bottom: 2px;" v-for="(item, index) in que.content" :key="index">
					<view style="background-color: white; width: 20px;height: 20px; border: 1px solid #7f7f7f; margin-right: 5px;"></view>
					<input @input="(e) => qcChange(e,qindex,index)" placeholder="请输入选项"  />
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
	import myinput from "../../../components/myinput/myinput.vue"
	
	export default {
		data() {
			return {
				timer:null,//延时器，用于防抖处理
				//传到后端的数据
				newNaire:{//传到问卷列表页面中的数据
					/*descr: "",
					endTime: "",
					id: "",
					name: "",
					questionList: ["123","234","345"],
					startTime: "",
					type: 1,*/
				},
				questionList: [/*{
					content: ["A", "B", "C"],
					describe: "",
					id: "",
					name: "",
					questionnaire: "",
					type: 1,
				}*/],
			}
		},
		methods: {
			typeChange(e){
				clearTimeout(this.timer);
				this.timer = setTimeout(()=>{
					this.newNaire.type=e.detail.value;
					console.log(this.newNaire.type);
					
				}, 500)
			},
			nameChange(e){
				clearTimeout(this.timer);
				this.timer = setTimeout(()=>{
					this.newNaire.name=e.detail.value;
					console.log(this.newNaire.name);
					
				}, 500)
			},
			descriChange(e){
				clearTimeout(this.timer);
				this.timer = setTimeout(()=>{
					this.newNaire.descri=e.detail.value;
					console.log(this.newNaire.descri);
					
				}, 500)
			},
			stChange(e){
				clearTimeout(this.timer);
				this.timer = setTimeout(()=>{
					this.newNaire.st=e.detail.value;
					console.log(this.newNaire.st);
					
				}, 500)
			},
			etChange(e){
				clearTimeout(this.timer);
				this.timer = setTimeout(()=>{
					this.newNaire.et=e.detail.value;
					console.log(this.newNaire.et);
					
				}, 500)
			},
			qnameChange(e,qindex){
				clearTimeout(this.timer);
				this.timer = setTimeout(()=>{
					this.questionList[qindex].name=e.detail.value;
					console.log(qindex+ '.' +this.questionList[qindex].name);
					
				}, 500)
			},
			qdescriChange(e,qindex){
				clearTimeout(this.timer);
				this.timer = setTimeout(()=>{
					this.questionList[qindex].describe=e.detail.value;
					console.log(qindex+ '.' +this.questionList[qindex].describe);
					
				}, 500)
			},
			qcChange(e,qindex,index){
				clearTimeout(this.timer);
				this.timer = setTimeout(()=>{
					this.questionList[qindex].content[index]=e.detail.value;
					console.log(qindex+ '.'+ index+ '.' +this.questionList[qindex].content[index]);
					
				}, 500)
			},
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
				console.log(this.newList)
				console.log(this.questionList)
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
::v-deep .answerplacehoder{
	//text-align: center;
}
</style>
