<template>
	<uni-section title="1111" type="line">
				<uni-list border-full>
					<uni-list-item title="22" />
					<uni-list-item title="111" note="222" rightText="右侧文字" />
					<uni-list-item title="333" note="333" rightText="右侧文字" />
				</uni-list>
		</uni-section>
</template>


<script>
	// export default {
	// 	components: {},
	// 	data() {
	// 		return {
				
	// 	},
	// 	methods: {
	// 		onClick(e) {
	// 			console.log('执行click事件', e.data),
	// 			//表示提交成功
	// 			// uni.showToast({
	// 			// 	title: '点击反馈'
	// 			// });
	// 			uni.navigateTo({
	// 			        url: '../questionnaire/example_questionnarie'
	// 			      });
	// 		},
	// 		switchChange(e) {
	// 			uni.showToast({
	// 				title: 'change:' + e.value,
	// 				icon: 'none'
	// 			})
	// 		}
	// 	}
	// };
</script>

<style lang="scss">
	.slot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.slot-image {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		margin-right: 10px;
		width: 30px;
		height: 30px;
	}

	.slot-text {
		flex: 1;
		font-size: 14px;
		color: #4cd964;
		margin-right: 10px;
	}
</style>

