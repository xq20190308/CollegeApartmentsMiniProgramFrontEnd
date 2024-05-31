<template>
	  <view>
	    <uni-data-select
	      v-model="value"
	      :localdata="range"
	      @change="change"
	    ></uni-data-select>
	  </view>
	<uni-section title="">
		<view class="example-body">
			<uni-file-picker limit="9" @select="selectUpload" file-mediatype="video,image" 
				ref="uniFilePicker" required></uni-file-picker>
		</view>
	</uni-section>
</template>

<script>
	import {onLoad, onReady} from "@dcloudio/uni-app";
	import {reactive, ref} from "vue";
	import sysurl from '../../system.config.js';
	import {http} from '@/utils/http'
	
	const data = reactive({
		 value: 1,
		range: 
		[
			{ value: 0, text: "篮球" },
			{ value: 1, text: "足球" },
			{ value: 2, text: "游泳" },
		],
	})
</script>

<style>
</style>