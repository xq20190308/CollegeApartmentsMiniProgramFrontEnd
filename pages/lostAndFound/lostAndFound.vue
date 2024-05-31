<template>
	<view class="uni-padding-wrap uni-common-mt">
		<uni-segmented-control :current="data.current" :values="data.items" :style-type="data.styleType"
			:active-color="data.activeColor" @clickItem="onClickItem" />
	</view>
	<view class="content">
		<view v-if="data.current === 0"><text class="content-text">
				<uni-section title="失物招领" sub-title="" type="line" style="width: 98%;margin: auto;">
					<view class="notice-list">
						<view class="notice-item" v-for="(item,index) in AllItems" :key="index">
							<view style="display: flex;width: 80%; flex-direction: column;justify-content: center; align-items: left;"
								@click="onpress(item)">
								<view>捡到的时间：{{item.id}}</view>
								<view>捡到的地点：{{item.describes}}</view>
								<view>描述：{{item.category}}</view>
								<view>联系方式：{{item.contactobject}}</view>
							</view>
						</view>
					</view>
				</uni-section>
			</text></view>
		<view v-if="data.current === 1"><text class="content-text">选项卡2的内容</text></view>
	</view>

	<view>
		<image class="floating-button" src="../../static/tabBar/myself_icon.png" @click="changePage"></image>
	</view>
</template>

<script setup>
	//vue3导入
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
		items: ['寻物广场', '捡到的来找'],
		colors: ['#007aff', '#4cd964', '#dd524d'],
		current: 0,
		colorIndex: 0,
		activeColor: '#007aff',
		styleType: 'button'

	})
	onLoad(() => {

	})
	//用户从其他页面返回到当前页面，或者从后台切前台时，onShow会被触发
	//onshow是原生的 onshow()最外面的括号表示传递参数
	onShow(() => {
		fetchallItems();
	})
	const onClickItem = (e) => {
		if (data.current != e.currentIndex) {
			data.current = e.currentIndex;
		}
	}
	const fetchallItems = async () => {
		const res = await http()
		console.log("封装后请求的结果", res);
		data.AllItems = res.data //与问卷的返回不同
		console.log("data.allItems", data.AllItmes)
	}
	const onpress = (options) => {
		console.log("跳转到每条失物招领的详细信息,要携带id"),
			uni.navigateTo({
				url: '../',
			});
	}
	const changePage = () => {
		console.log("跳转到发布页面"),
			uni.navigateTo({
				url: '../lostAndFound/lostAndFoundMysef',
			});
	}
</script>

<style lang="scss">
	.notice-list {
		width: 95%;
		margin-left: 8px;
	}

	.notice-item {
		margin-top: 24rpx !important;
		width: 90%;
		height: auto;
		border: 1px solid #e2e2e2;
		border-radius: 25px;
		padding: 10rpx 30rpx;
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		background-color: azure;
		box-shadow: #999999 2px 2px 2px 2px;
		place-items: flex-start;
	}

	.notice-item>text {
		display: block;
	}


	.notice-item text:nth-child(2) {
		text-indent: 2em;
		display: flex;
		padding-top: 10rpx;
	}

	.notice-item text:nth-child(3) {
		padding-top: 24rpx;
		font-size: 16rpx !important;
	}

	.notice-item text:nth-child(4) {
		font-size: 16rpx !important;
	}

	.notice-item text:nth-child(2),
	.notice-item text:nth-child(3),
	.notice-item text:nth-child(4) {
		color: #999999;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: calc(12rpx * 2);
		line-height: calc(15rpx * 2);
	}

	.floating-button {
		position: fixed;
		bottom: 60rpx;
		right: 50rpx;
		width: 80rpx;
		height: 80rpx;
	}

	.deletbutton {
		background-color: indianred;
		color: white;
		width: 50px;
		height: 40x;
		font-size: 10px;
		text-align: center;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 0;
	}

//修改上面选项卡的间距
	.uni-common-mt {
		margin-top: 5px;
	}

	.uni-padding-wrap {
		// width: 750rpx;
		padding: 10px ;
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
</style>