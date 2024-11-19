<template>
	<uni-section title="课程表" type="line" >
		<view class="class-table">
			<view class="tooltr">
				<view class="tool">
					<text class="title">第{{CourseStore.classTableData[index].curWeek}}周</text>
				</view>
				<view class="tooltrend">
					<view class="toolbutton" @click="last"><uni-icons style="margin-top: 6rpx;" type="arrow-left" size="14" color="#969696"></uni-icons></view>
					<view class="toolbutton" @click="next"><uni-icons style="margin-top: 6rpx;" type="arrow-right" size="14" color="#969696"></uni-icons></view>
					<view class="toolbutton" @click="refresh"><uni-icons style="margin-top: 6rpx;" type="refreshempty" size="14" color="#969696"></uni-icons></view>
					<view class="toolbutton" @click="goto('./addedCourse')"><uni-icons style="margin-top: 6rpx;" type="gear" size="14" color="#969696"></uni-icons></view>
				</view>
			</view>
			<view class="tool" >
				<uni-table stripe emptyText="暂无更多数据" >
					<!-- 表头行 -->
					<uni-tr>
						<uni-th padding="10rpx 10rpx" :width="40" align="center" v-for="(item, index) in CourseStore.classTableData[index].weeks" :key="index">
							<text class="title">{{item.day}}\n</text>
							<text class="title">{{item.date}}</text>
						</uni-th>
					</uni-tr>
					<!-- 表格数据行 -->
<!-- 					<uni-tr>
						<uni-td padding="5px 5px" :width="35" align="center" v-for="(item, index) in CourseStore.classTableData[index].courses" :key="index">
							<uni-tr v-for="(innerItem, idx) in item" :key="idx">
								<view style="overflow-y: scroll;height: 150px; width: 35px; border-bottom: 1px #cdd1db solid;">
									<text class="name">{{ innerItem.kcmc?innerItem.kcmc:'' }}\n</text>
									<text class="name">{{ innerItem.jsmc?innerItem.jsmc:'' }}\n</text>
									<text class="name">{{ innerItem.jsxm?innerItem.jsxm:'' }}\n</text>
								</view>
							</uni-tr>
						</uni-td>
					</uni-tr> -->
					<uni-tr v-for="(item, i) in CourseStore.classTableData[index].courses" :key="i">
						<uni-td padding="5rpx 5rpx" :radius="true" :width="35" align="center" v-for="(innerItem, idx) in item" :key="idx" :background="innerItem.info.kcmc!='0'?appData.colorList[innerItem.code % appData.colorN]:''">
							<!-- <view v-if="innerItem.info.kcmc!='0'" style="min-height: 15vh;"> -->
							<view @click="add(i,idx)" style="min-height: 15vh; max-height: 15vh; overflow: scroll; max-width: 100%;">
								<text class="name">{{ innerItem.info.kcmc!='0'?innerItem.info.kcmc:'' }}\n</text>
								<text class="name">{{ innerItem.info.jsmc!='0'?innerItem.info.jsmc:'' }}\n</text>
								<text class="name">{{ innerItem.info.jsxm!='0'?innerItem.info.jsxm:'' }}\n</text>
								<text v-if="innerItem.info.bz" class="name">备注：{{ innerItem.info.bz }}\n</text>
								<uni-icons v-if="innerItem.info.jsxm==='0'" style="opacity: 30%" size="30" type="plusempty"></uni-icons>
							</view>
							<!-- <view v-else style="min-height: 15vh;">
								
							</view> -->
						</uni-td>
					</uni-tr>
				</uni-table>
			</view>
		</view>
	</uni-section>
	<view>
		<!-- 输入框 -->
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog mode="input" :before-close="true" title="添加课程" @confirm="dialogInputConfirm" @close="dialogInputClose">
				<uni-forms required ref="inputForm" :rules="rules" :modelValue="newCourse" label-position="top">
					<uni-forms-item label="课程名称" name="kcmc">
						<uni-easyinput :disabled="newCourse.onlyBz" :maxlength="20" v-model="newCourse.kcmc" placeholder="请输入课程名称" />
					</uni-forms-item>
					<uni-forms-item label="教室名称" name="jsmc">
						<uni-easyinput :disabled="newCourse.onlyBz" :maxlength="20" v-model="newCourse.jsmc" placeholder="请输入课程名称" />
					</uni-forms-item>
					<uni-forms-item label="教师姓名" name="jsxm">
						<uni-easyinput :disabled="newCourse.onlyBz" :maxlength="20" v-model="newCourse.jsxm" placeholder="请输入课程名称" />
					</uni-forms-item>
					<uni-forms-item label="备注" name="bz">
						<uni-easyinput :maxlength="50" type="textarea" autoHeight v-model="newCourse.bz" placeholder="请输入备注" />
					</uni-forms-item>
				</uni-forms>
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script setup>
import { computed, ref, unref, nextTick, reactive } from 'vue';
import { useCourseStore } from "/subPackage1/store/study/course.js";
import { appData } from "@/main.js";
import { goto } from '../../../utils/access';
const CourseStore = useCourseStore()
const newCourse=reactive({
	kcmc:"",
	jsmc:"",
	jsxm:"",
	bz:"",
	onlyBz: false,
	jssj: "" ,
	kssj:"",
	kcsj:"",
	kkzc:"",
	sjbz:"",
})
const underline = (index)=>{
	return CourseStore.classTableData[props.index].curDay%7===index+1?"text-decoration: underline;text-underline-position: under;":""
}
const last=()=>{
	if(CourseStore.classTableData[props.index].curWeek>1){
		uni.$emit("courseIndexLast")
	}
}
const next=()=>{
	if(CourseStore.classTableData[props.index].curWeek<19){
		uni.$emit("courseIndexNext")
	}
}
const refresh=()=>{
	CourseStore.classTableData[props.index].courses=[]
	uni.$emit("courseRefresh")
}
const currenti = ref('')
const currentidx = ref('')
const inputDialog = ref()
const inputForm = ref()
const rules=ref({
	kcmc: {
		rules: [{
			required: true,
			errorMessage: '课程名称不能为空'
		},
		{
		    pattern: /^(?!0$).*/,
		    errorMessage: '课程名称不能为“0”'
		}
		]
	}
})
const resetNewCourse = ()=>{
	newCourse.jsmc = ""
	newCourse.jsxm = ""
	newCourse.kcmc = ""
	newCourse.jssj = ""
	newCourse.kssj = ""
	newCourse.kcsj = ""
	newCourse.kkzc = ""
	newCourse.sjbz = ""
	newCourse.bz = ""
	newCourse.onlyBz = false
	currenti.value = ''
	currentidx.value = ''
	currentDay.value = {}
}
const dialogInputClose = () => {
	const inputDialogInstance = unref(inputDialog);
	if (inputDialogInstance) {
		inputDialogInstance.close();
	}
	resetNewCourse()
}
const dialogInputConfirm = () => {
	inputForm.value?.validate(['']).then(res => {
		console.log({...newCourse})
		CourseStore.classTableData[props.index].courses[currenti.value][currentidx.value].info = {...newCourse}
		uni.$emit("courseAdd", {info: {...newCourse},day: currentDay.value,index: props.index, i:currenti.value,idx:currentidx.value})
		dialogInputClose()
	}
	).catch(err => {
		console.log("输入不合法",err)
	})
}
const currentDay = ref({}) 
const add=(i,idx)=>{
	currenti.value = i
	currentidx.value = idx
	let info = CourseStore.classTableData[props.index].courses[currenti.value][currentidx.value].info
	console.log(info)
	let day = CourseStore.classTableData[props.index].weeks[currenti.value]
	currentDay.value = day
	console.log(currentDay.value)
	if(info.kcmc != '0'){
		// 拷贝 info 到 newCourse
		console.log("拷贝 info 到 newCourse",info)
		newCourse.jsmc = info.jsmc
		newCourse.jsxm = info.jsxm
		newCourse.kcmc = info.kcmc
		newCourse.jssj = info.jssj
		newCourse.kssj = info.kssj
		newCourse.kcsj = info.kcsj
		newCourse.kkzc = info.kkzc
		newCourse.sjbz = info.sjbz
		newCourse.bz = info.bz
		newCourse.onlyBz = true
		console.log(newCourse)
	}else{
		let sj = [{kssj: '08:00',jssj: '09:50'}, 
		{kssj: '10:10',jssj: '12:00'},
		{kssj: '14:00',jssj: '15:50'},
		{kssj: '16:10',jssj: '18:00'},
		{kssj: '19:00',jssj: '20:50'}]
		newCourse.kssj = sj[i].kssj
		newCourse.jssj = sj[i].jssj
	}
	// 调用 open 方法
	// 使用 nextTick 确保在 newCourse 更新后再打开弹出层
	nextTick(() => {
		const inputDialogInstance = unref(inputDialog);
		if (inputDialogInstance) {
		  inputDialogInstance.open();
		}
	});
}
const props = defineProps({
  index: {
	  type: Number,
	  default: 1
  }
});
</script>

<style scoped>
    .class-table {
		display: flex;
		flex-direction: column;
        gap: 10rpx;
    }
	.tooltr{
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		padding: 0 20rpx;
		border-bottom: 1px #EBEEF5 solid;
	}
	.tooltrend{
		width: 35%;
		display: flex;
		justify-content: space-between;
	}
	.toolbutton{
		border: 1px solid #bebebe;
		width: 45rpx;
		height: 45rpx;
		display: flex;
		justify-content: center;
		font-weight: 200;
	}
	.tool{
	   display: flex;
	   flex-direction: column;
	   /* padding: 0 20rpx; */
	   justify-content: center
	}
	.title{
		font-size: smaller;
		font-weight: 300;
		text-align: center;
		line-height: 0px;
	}
	.name{
		font-size: smaller;
		font-weight: 200;
		line-height: 0px;
		text-align: left;
		color: #fafafa;
	}
	.bz{
		font-size: smaller;
		font-weight: 200;
		line-height: 0px;
		text-align: left;
		color: #000;
	}
	.class-item {
	  border-radius: 10rpx;
	}
</style>