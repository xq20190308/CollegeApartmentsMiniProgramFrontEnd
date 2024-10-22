<template>
	<view class="banner">
		<auiLoadingVue
		  :SHOW="showLoading"
		  :msg="'加载中'"
		  :styles="{background:'transparent',color:'#000'}"
		  :type="showType"
		  image="/static/success.png"
		></auiLoadingVue>
		<slot></slot>
	</view>
</template>

<script setup>
import auiLoadingVue from '../aui-loading/aui-loading.vue';
const props = defineProps({
	showLoading:{
		type: Boolean,
		default: false
	},
	showType:{
		type: Number,
		default: 3
	},
	loadingMsg:{
		type: String,
		default: "加载中"
	}
})
</script>

<style>

</style>