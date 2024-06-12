<template>
	<view>
		<view class="uni-container">
			<uni-table ref="table"  border stripe type="" emptyText="暂无更多数据" >
				<uni-tr>
					<uni-th width="150" align="left">周次</uni-th>
					<uni-th width="150" align="left">成绩</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in Object.entries(tableData.all).slice(1)" :key="index">
					<uni-td>
						<view class="week">{{ item[0] -1}}</view>
					</uni-td>
					<uni-td align="grades">{{ item[1] }}</uni-td>
				</uni-tr>
			</uni-table>
			<!-- <view class="uni-pagination-box"><uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change" /></view> -->
		</view>
		<image class="floating-button" src="../../static/feedback/plus.png" @click="add"></image>
	</view>
</template>


<script setup>
	import {onLoad, onReady, onShow} from "@dcloudio/uni-app";
	import {reactive, ref} from "vue";
	import {http} from '@/utils/http';
	import {login} from "@/pages/login/api/login.js"
import {getLocalData,delLocalData, setLocalData} from "../../utils/cache.js"
	const tableData=reactive({
		// all:[
		// 	// {week:"1", grades:"A", tip:"无"},
		// 	// {week:"2", grades:"B"},
		// 	// {week:"3", }
		// ]
		all:{}
	})
	
	 onShow(()=>{
		fetchgrades();
	 })
	const fetchgrades = async () =>{
		//这里把userId后端的这配置好
		const dormId = "GA17-434";
		//下面这个为啥不行
		 //const dormId = getLocalData('domitary');
		// http://localhost:8080/api/SelesctRank/GA17-434
		 const res =  await http(`/api/SelesctRank/${dormId}`, 'GET', );
		 console.log("后端接收到的数据",res)
		 //对象数组转数组Object.entries(obj)
		 
		 tableData.all=res.data;
		 console.log("获取到的卫检成绩(对象类型)", tableData.all);
		 console.log("获取到的卫检成绩(数组类型)", Object.entries(tableData.all));
		 //tableData.all = tableData.all.filter(item => item. !== 'g');
	}
	
	//获取数据并且存到本地
	// const new_data = http('/api/SelesctRank', 'GET',[]);
	// tableData.all.append(new_data);
	// //存数据
	// uni.setStorage({
	// 	key:'tableData',
	// 	data:tableData.all,
	// 	success:function(){
	// 		console.log('数据存储成功')
	// 	}
	// })
	// //取数据
	// uni.getStorage({
	// 	key:'tableData',
	// 	success:function(res){
	// 		tableDate.all = res.all;
	// 	}
	// })
	
	const add=()=>{
		console.log("跳转");
		uni.navigateTo({
			//好混乱，为什么有的标点用逗号，有的标点用分号
			url:"../hygiene/hygieneGradesSubmit"
		});
	}

</script>

<style>

.uni-group {
	display: flex;
	align-items: center;
}
.uni-container {
	  display: flex;
	  align-items: center;
		margin-left: 30px;
		margin-right: 20px;
		margin-top: 30px;
	}
	.floating-button {
		position: fixed;
		bottom: 60rpx;
		right: 50rpx;
		width: 80rpx;
		height: 80rpx;
	}
</style>



