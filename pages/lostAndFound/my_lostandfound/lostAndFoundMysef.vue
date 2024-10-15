<template >
	<view class="banner">
	<view class="uni-padding-wrap uni-common-mt">
		<uni-segmented-control :current="data.current" :values="data.items" :active-color="data.activeColor"
			@clickItem="onClickItem" />
	</view>
	<view>
		<view v-if="data.current === 0">
			<view  style="padding-bottom: 50rpx;" v-for="(item, index) in data.AllItems" :key="index" @click="onpress(item)">
				<uni-card>
					<template v-slot:title>
						<uni-list-item :title="item.name">
							<template v-slot:footer>
								<button class="button-biankuang" hover-class="bg-click"
									@click.stop="(e)=>{deletelost(item)}">删除</button>
							</template>
						</uni-list-item>
					</template>
					<image v-for="(src,index) in item.file_path" :key="index" style="width:100%;" :src="src"></image>
					<text style="uni-body uni-mt-5">{{item.describes}}</text>
					<!-- <text class="uni-body">{{item.describes}}</text> -->
				</uni-card>
			</view>
			<image class="floating-button" src="https://william.fit:8082/static/default/plus.png" @click="add"></image>
		</view>
		<view  v-if="data.current === 1">
			<view style="padding-bottom: 50rpx;" v-for="(item, index) in data.AllItems" :key="index" @click="onpress(item)">
				<uni-card>
					<template v-slot:title>
						<uni-list-item :title="item.name">
							<template v-slot:footer>
								<button class="button-biankuang" hover-class="bg-click"
									@click.stop="(e)=>{deletelost(item)}">删除</button>
							</template>
						</uni-list-item>
					</template>
					<image v-for="(src,index) in item.file_path" :key="index" style="width:100%;" :src="src"></image>
					<text style="uni-body uni-mt-5">{{item.describes}}</text>
				</uni-card>
			</view>
			<image class="floating-button" src="https://william.fit:8082/static/default/plus.png" @click="add"></image>
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
	import {
		useUserStore,
	} from "../../../store/User.js";

	const store = useUserStore();
	const data = reactive({
		items: ['丢失的', '捡到的'],
		colors: ['#007aff', '#4cd964', '#FF88C2'],
		current: 0,
		colorIndex: 2,
		activeColor: '#FF0088',
		inActiveColor:'#4cd964',
		styleType: 'button',
		AllItems: [],
	})

	onLoad(() => {
		// fetchallItems();
	})

	onShow(() => {
		fetchallItems();
	})

	//要实时更新current，注意fetchallItems的调用时机
	const onClickItem = (e) => {
		console.log("点击的索引", e.currentIndex);
		if (data.current != e.currentIndex) {
			data.current = e.currentIndex;
		}
		fetchallItems();

	}

	const fetchallItems = async () => {
		console.log("当前索引faaaaaaaaaa", data.current);
		let category = 'found';
		const id = store.user.username
		if (data.current === 0) {
			category = 'lost';
		}
		const res = await http(`/api/getMydata/${id}`, 'GET', {})
		res.data = res.data.filter((item)=>{
			return item.category===category
		})
		console.log(category,res.data)
		for (let i = 0; i < res.data.length; i++) {
			res.data[i].file_path = JSON.parse(res.data[i].file_path);
			// console.log("file_path[i]", res.data[i].file_path);
		}
		data.AllItems = res.data
	}

	const onpress = (item) => {
		console.log("跳转到每条失物招领的详细信息,要携带id", item.pick_location);
		uni.navigateTo({
			url: `../public_lostandfound/detailLostandFound?` +
				`describes=${item.describes}&` +
				`name=${item.name}&` +
				`contactobject=${item.contact_object}&` +
				`pickLocation=${item.pick_location}&` +
				`pickTime=${item.pick_time}&` +
				`filepath=${item.file_path}`,
		});
	}

	const add = () => {
		//跳转到我想要找的，利用current
		if (data.current === 0) {
			uni.navigateTo({
				url: '/pages/lostAndFound/my_lostandfound/lostSubmit'
			})
		} else if (data.current === 1) {
			uni.navigateTo({
				url: '/pages/lostAndFound/my_lostandfound/foundSubmit'
			})
		}
	}
	const modifylost = () => {

	}
	const deletelost = (item) => {
		uni.showModal({
			title: '提示',
			content: '确定要删除该文件吗',
			success: async (res) => {
				if (res.confirm) {
					const res = await http('/api/deleteData/' + item.id, 'DELETE', {}, );
					console.log(res);
					fetchallItems();
				} else if (res.cancel) {
					console.log("取消删除");
				}
			}
		});

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
		margin-top: 0px;
	}

	.uni-padding-wrap {
		// width: 750rpx;
		    padding: 0rpx;
		    margin-bottom: 30rpx;
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

	.button-biankuang {
		width: 150rpx;
		height: 50rpx;
		display: flex;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		line-height: 50rpx;
		justify-content: center;
		border-radius: 25px;
		border: 3rpx solid #6699FF;
		font-size: 28rpx;
		// background-color: red;
	}

	.bg-click {
		top: 3upx;
		background-color: #a7a9ff;
	}
</style>