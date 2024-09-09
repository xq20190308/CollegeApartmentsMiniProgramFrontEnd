<template>
	<uni-section title="课程表" type="line" >
		<view>
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
			<div class="class-table">
				<div class="thead">
					<div class="tr">
						<div class="th" v-for="(item, index) in CourseStore.classTableData[index].weeks" :key="index">
							<text class="title">{{'周' + item.day}}</text><br/>
							<text class="title">{{item.date}}</text>
						</div>
					</div>
				</div>
				<div class="tbody">
					<div class="tr" v-for="(item, index) in CourseStore.classTableData[index].courses" :key="index">
						<div class="td" v-for="(innerItem, idx) in item" :key="idx">
							<div v-if="innerItem.jsxm!=0">
								<text class="name">{{ innerItem?.kcmc }}\n</text>
								<text class="title">{{ innerItem?.jsmc }}\n\n</text>
								<text class="title">{{ innerItem?.jsxm }}\n</text>
							</div>
						</div>
					
					</div>
				</div>
			</div>
		</view>
	</uni-section>
</template>

<script setup>
import { isInteger } from 'lodash-es';
import { computed, ref } from 'vue';
import { useCourseStore } from "../../store/study/course.js";
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
        display: table;
		table-layout: fixed;
		flex-direction: row;
		justify-content: space-around;
		margin: 6rpx;
		width: 700rpx;
    }
    .thead {
        display: table-header-group;
    }
    .tr {
		display: table-row;
    }
	.tooltr{
		display: flex;
		justify-content: space-between;
		border-top: 1px solid #bebebe;
		padding: 20rpx;
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
       display: table-cell;
	   text-align: center;
	}
	.title{
		font-size: smaller;
		font-weight: 300;
	}
	.name{
		font-size: smaller;
		font-weight: 200;
	}
    .th {
       display: table-cell;
	   text-align: center;
	   padding: 20rpx;
	   border-bottom: 1px solid #bebebe;
	   border-top: 1px solid #bebebe;
    }
    .tbody {
        display: table-row-group;
    }
    .tr .td {
		display: table-cell;
		text-align: center;
		padding: 4rpx;
		padding-bottom: 8rpx;
		width: 14.2857%;
		height: 100px;
	   border-bottom: 1px solid #bebebe;
    }
</style>