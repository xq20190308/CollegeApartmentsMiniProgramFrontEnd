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
					<view class="toolbutton" @click="add"><uni-icons style="margin-top: 6rpx;" type="plusempty" size="14" color="#969696"></uni-icons></view>
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
							<view v-if="innerItem.info.kcmc!='0'" style="min-height: 15vh;">
							<text class="name">{{ innerItem.info.kcmc }}\n</text>
							<text class="name">{{ innerItem.info.jsmc }}\n</text>
							<text class="name">{{ innerItem.info.jsxm }}\n</text>
							</view>
						</uni-td>
					</uni-tr>
				</uni-table>
			</view>
		</view>
	</uni-section>
</template>

<script setup>
import { isInteger } from 'lodash-es';
import { computed, ref } from 'vue';
import { useCourseStore } from "/subPackage1/store/study/course.js";
import { appData } from "@/main.js";
const CourseStore = useCourseStore()
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
	uni.$emit("courseRefresh")
}
const add=()=>{
	uni.$emit("courseAdd")
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
	.class-item {
	  border-radius: 10rpx;
	}
</style>