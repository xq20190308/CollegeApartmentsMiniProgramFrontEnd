<template>
	<bannerVue :showLoading="showLoading" :showType="showType">
		<button type="primary">你好你好</button>
		<button type="primary">你好你好</button>
		<button type="primary">你好你好</button>
		<button type="primary">你好你好</button>
		<button type="primary">你好你好</button>
		<button type="primary">你好你好</button>
 		<button type="primary">你好你好</button>
		<button type="primary">你好你好</button>
		<button type="primary">你好你好</button>
		<button type="primary">你好你好</button>
		<button type="primary">你好你好</button>
		<button type="primary">你好你好</button>
		<button type="primary">你好你好</button>
		<button type="primary">你好你好</button>
		<button type="primary">你好你好</button>
		<button type="primary">你好你好</button>
		<button type="primary">你好你好</button>
		<button type="primary">你好你好</button>
		<button type="primary">你好你好5</button>
		{{data}}
	</bannerVue>
</template>

<script setup>
import { ref } from 'vue';
import bannerVue from '../../components/banner/banner.vue';
const showLoading = ref(false)
const showType = ref(3)
const data=ref({})
uni.request({
	url:'http://localhost:8081/user',
	method:'GET',
}).then((res)=>{data.value = res.data})
</script>

<style>
</style>
