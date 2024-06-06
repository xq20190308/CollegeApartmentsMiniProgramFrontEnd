<template>
	<view class="uni-padding-wrap uni-common-mt">
		<uni-segmented-control :current="data.current" :values="data.items" :active-color="data.activeColor"
			@clickItem="onClickItem" />
	</view>
	<view>
		<view v-if="data.current === 0">
			<view v-for="(item, index) in data.lostandfound" :key="index">
				<uni-card :title="item.name">
					<text class="uni-body">{{item.describes}}</text>
				</uni-card>
				<image class="floating-button" src="../../static/feedback/plus.png" @click="add"></image>
			</view>
		</view>
		<view v-if="data.current === 1">
			<view v-for="(item, index) in data.lostandfound" :key="index">
				<uni-card :title="item.name">
					<text class="uni-body">{{item.describes}}</text>
				</uni-card>
				<image class="floating-button" src="../../static/feedback/plus.png" @click="add"></image>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";
	import {
		reactive
	} from "vue";
	import {
		http
	} from '@/utils/http'
	const data = reactive({
		items: ['我丢失的', '我捡到的'],
		colors: ['#007aff', '#4cd964', '#dd524d'],
		current: 0,
		colorIndex: 0,
		activeColor: '#007aff',
		styleType: 'button',
		lostandfound: [{
				name: '脑子',
				describes: '可恶，我的脑子呢'
			},
			{
				name: '脑子',
				describes: '可恶，我的脑子呢'
			}
		]

	})

	const onClickItem = (e) => {
		if (data.current != e.currentIndex) {
			data.current = e.currentIndex;
		}
	}
	const add = () => {
		//跳转到我想要找的，利用current
		if (data.current === 0) {
			uni.navigateTo({
				url: '/pages/lostAndFound/lostSubmit'
			})
		} else if (data.current === 1) {
			uni.navigateTo({
				url: '/pages/lostAndFound/foundSubmit'
			})
		}
	}
</script>

<style lang="scss">
	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 0;
	}

	.uni-common-mt {
		margin-top: 5px;
	}

	.uni-padding-wrap {
		// width: 750rpx;
		padding: 10px;
	}

	.content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		height: 150px;
		text-align: center;
	}

	.content-text {
		font-size: 14px;
		color: #666;
	}

	.color-tag {
		width: 25px;
		height: 25px;
	}

	.uni-list {
		flex: 1;
	}

	.uni-list-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		background-color: #FFFFFF;
	}


	.uni-list-item__container {
		padding: 12px 15px;
		width: 100%;
		flex: 1;
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-bottom-color: #eee;
	}

	.uni-list-item__content-title {
		font-size: 14px;
	}

	.floating-button {
		position: fixed;
		bottom: 60rpx;
		right: 50rpx;
		width: 80rpx;
		height: 80rpx;
	}
</style>