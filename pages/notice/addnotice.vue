<template>
	<view style="display: flex;flex-wrap: nowrap;">
		通知类型（下拉选择）：<input @input="(e) => {data.newNotice.typeName=newdata(e.detail.value);}" placeholder="请输入" placeholder-class="answerplacehoder" />
	</view>
	<view style="display: flex;flex-wrap: nowrap;">
		结束时间（选择）：<input @input="(e) => {data.newNotice.title=newdata(e.detail.value);}" placeholder="请输入标题" placeholder-class="answerplacehoder" />
	</view>
	<view style="display: flex;flex-wrap: nowrap;">
		通知内容（文本）：<input @input="(e) => {data.newNotice.publishTime=newdata(e.detail.value);}" placeholder="请" placeholder-class="answerplacehoder" />
	</view>
	<view class="uni-title uni-common-pl">日期选择器</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						当前选择
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
			</view>
</template>

<script setup>
import {reactive,ref} from "vue";
import {http} from '@/utils/http'
const data = reactive({
	timer:null,//延时器，用于防抖处理
	//传到后端的数据
	newNotice:{//传到通知列表页面中的数据
		/*content: "修改4由于天气原因，原定于下周的考试安排已变更至下下周。"
		id: 7
		isActive: true
		publishTime: "2024-05-12T21:28:59"
		title: "修改考试延期3"
		typeName: "修改紧急"*/
	},
            title: 'picker',
            array: ['中国', '美国', '巴西', '日本'],
            index: 0,
            date: currentDate,
            time: '12:01',
})
const bindPickerChange = (e) =>{
            console.log('picker发送选择改变，携带值为', e.detail.value)
            data.index = e.detail.value
        }
const bindDateChange= (e) => {
            data.date = e.detail.value
        }
const bindTimeChange= (e) => {
            data.time = e.detail.value
        }
const getDate = (type) => {
            const date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            if (type === 'start') {
                year = year - 60;
            } else if (type === 'end') {
                year = year + 2;
            }
            month = month > 9 ? month : '0' + month;
            day = day > 9 ? day : '0' + day;
            return `${year}-${month}-${day}`;
        }
        const currentDate = getDate({
            format: true
        })
        const startDate = ()=> {
            return getDate('start');
        }
        const endDate = ()=> {
            return getDate('end');
        }

const newdata=(value)=>{
	clearTimeout(data.timer);
	data.timer = setTimeout(()=>{
		console.log(value);
	}, 500)
	return value;
}
</script>

<style>
</style>