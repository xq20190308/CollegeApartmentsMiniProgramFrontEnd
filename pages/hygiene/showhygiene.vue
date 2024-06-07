<template>
	<view>
		<view class="uni-container">
			<uni-table ref="table"  border stripe type="" emptyText="暂无更多数据" >
				<uni-tr>
					<uni-th width="150" align="left">周次</uni-th>
					<uni-th width="150" align="left">成绩</uni-th>

				</uni-tr>
				<uni-tr v-for="(item, index) in tableData.all" :key="index">
					<uni-td>
						<view class="week">{{ item.week }}</view>
					</uni-td>
					<uni-td align="grades">{{ item.grades }}</uni-td>
				</uni-tr>
			</uni-table>
			<!-- <view class="uni-pagination-box"><uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change" /></view> -->
		</view>
		<image class="floating-button" src="../../static/feedback/plus.png" @click="add"></image>
	</view>
</template>


<script setup>
	import {onLoad, onReady} from "@dcloudio/uni-app";
	import {reactive, ref} from "vue";
	import {http} from '@/utils/http';
	import {login} from "@/pages/login/api/login.js"
import {getLocalData,delLocalData, setLocalData} from "../../utils/cache.js"
	const tableData=reactive({
		all:[
			{week:"1", grades:"A"},
			{week:"2", grades:"B"}
		]
	})
	// const dormId = getLocalData('domitary');
	
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
		uni.navigateTo({
			url:"../hygiene/hygieneGradesSubmit"
		})
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



