<template>
	<view>
		    <picker-view
		        class="picker-con"
		        indicator-style="height: 40px;"
		        @change="bindPickerChange"
		    >
		        <picker-view-column>
		            <view v-for="(item, index) in queryData" :key="index" class="picker-item">
		                {{ item[1] }}
		            </view>
		        </picker-view-column>
		        <picker-view-column>
		            <view v-for="(item, index) in queryTime" :key="index" class="picker-item">
		                {{ item[0] }}
		            </view>
		        </picker-view-column>
		        <picker-view-column>
		            <view v-for="(item, index) in queryFloor" :key="index" class="picker-item">
		                {{ item[0] }}
		            </view>
		        </picker-view-column>
		    </picker-view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
	
	    const queryData = ref([]);
	    const queryTime = ref([
	        ["12节", "0102", "12节(8:00-9:50)"],
	        ["34节", "0304", "34节(10:10-12:00)"],
	        ["56节", "0506", "56节(14:00-15:50)"],
	        ["78节", "0708", "78节(16:00-17:50)"],
	        ["9X节", "0910", "9X节(19:00-20:50)"],
	        ["上午", "am", "上午(8:00-12:00)"],
	        ["下午", "pm", "下午(14:00-17:50)"],
	        ["全天", "allday", "全天(8:00-20:50)"],
	    ]);
	    const queryFloor = ref([
	        ["青-J1", "1", 1],
	        ["青-J3", "3", 1],
	        ["青-J5", "5", 1],
	        ["青-J7", "7", 1],
	        ["青-J14", "14", 1],
	        ["青-S1", "S1", 1],
	        ["泰东-1", "0201", 2],
	        ["泰东-2", "0202", 2],
	        ["泰东-3", "0203", 2],
	        ["泰东-4", "0204", 2],
	        ["泰东-5", "0205", 2],
	        ["泰西-1", "0211", 2],
	        ["泰西-2", "0212", 2],
	        ["泰西-3", "0213", 2],
	        ["泰西-4", "0214", 2],
	        ["济-1", "0301", 3],
	        ["济-2", "0302", 3],
	        ["济-3", "0303", 3],
	    ]);
</script>

<style>
.picker-con {
    width: 77%;
    height: 100px;
}

.picker-item {
    line-height: 40px;
}
</style>
