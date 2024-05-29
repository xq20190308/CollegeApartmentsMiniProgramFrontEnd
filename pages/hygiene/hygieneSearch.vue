<template>
    <view>

        <!-- <cu-custom bgColor="my-theme-bg" :isBack="false">
            <block slot="backText">返回</block>
            <block slot="content">搜索页面</block>
        </cu-custom> -->

        <d-search-log 
        :color_border="color_border"
        :color_text="color_border"
        :search_list_hot="search_list_hot"
        :store_key="store_key"
				:input_text="input_text"
        @onClickDelAllApi="onClickDelAll"
        @onSearchNameApi="onSearchName"
        ></d-search-log>

    </view>
		<image class = "floating-button" src="../../static/feedback/plus.png" @click="onpress"></image>
</template>

<script setup>
	//组件不用加花括号
	import dSearchLog from "@/uni_modules/d-search-log/components/d-search-log/d-search-log.vue"

	import { onMounted, reactive } from "vue"
	//vue3不需要显示的注册组件
	// export default {
	//   components: {
	//     dSearchLog,
	//     dAlert
	//   },
		
	const data = reactive({
		color_border:"#ff00ff",
		search_list_hot:[],
		store_key:'search_list',
		input_text:''
	})

	//方法都要用箭头函数
	const onClickDelAll=()=>{
		console.log('[父级接收事件]：删除全部搜索记录')
	}
	const onSearchName=()=>{
		console.log('[父级接收事件]：点击搜索'+e)
	}
	const onpress=()=>{
		console.log('教师端跳转到上传文件界面'),
		uni.navigateTo({
			url:'/pages/hygiene/hygieneGradesSubmit'
		})
	}
	//vue3不用onLoad， 用onMount来替代
	onMounted(()=>{
		//搜索热点
		// data.search_list_hot = [
		// 	'大物','高数','Java'
		// ]
	})
</script>

<style>
	.my-theme-bg {
	        background: linear-gradient(117deg,#60DF9D,#31CB7B);
	        color:#fff;
	        /* background: linear-gradient(117deg,#23C0F7,#ff661e); */
	        /* background: linear-gradient(90deg, #FFAA57, #23C0F7); */
	        /* background: linear-gradient(90deg, #F37749, #FFAA57); */
	        /* #FFAA57 */
	        /* background-image: linear-gradient(45deg, #39b54a, #8dc63f); */
	        /* color: #ffffff; */
	        /* background-color: #f37b1d; */
	        /* color: #ffffff; */
	        /* background-color: #ffffff; */
	        /* color: #666666; */
	        /* linear-gradient(-27deg, #33CB80, #28D0AF) */
	        /* background-image: line=ar-gradient(-27deg,#33CB80,#28D0AF); */
	        /* color: #ffffff; */
	        /* background-image: line=ar-gradient(-27deg,#fff,#fff); */
	        /* background-image: line=ar-gradient(-27deg,#23C0F7,#23C0F7); */
	        /* color: #000; */
	    }
	.floating-button {
		position: fixed;
		bottom:60rpx; 
		right: 50rpx; 
		width: 80rpx; 
		height: 80rpx; 
	}
</style>