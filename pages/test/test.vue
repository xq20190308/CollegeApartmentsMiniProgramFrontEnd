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
	</bannerVue>
</template>

<script setup>
import { ref } from 'vue';
import bannerVue from '../../components/banner/banner.vue';
const showLoading = ref(true)
const showType = ref(3)
</script>

<style>
</style>
