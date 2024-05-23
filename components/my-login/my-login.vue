<template>
	<view>
		登录组件
	</view>
</template>

<script>
	// 按需从 vuex 中导入 mapState 辅助函数
	import { mapState } from 'vuex'
	
	export default {
		computed:{
			 // token 是用户登录成功之后的 token 字符串
			...mapState('m_user', ['token'])
		},
		name:"my-login",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>