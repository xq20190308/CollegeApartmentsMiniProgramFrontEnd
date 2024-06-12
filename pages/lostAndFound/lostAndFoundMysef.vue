<template>
	<view class="uni-padding-wrap uni-common-mt">
		<uni-segmented-control :current="data.current" :values="data.items" :active-color="data.activeColor"
			@clickItem="onClickItem" />
	</view>
	<view>
		<view v-if="data.current === 0">
			<view v-for="(item, index) in data.AllItems" :key="index" @click="onpress(item)">
				<uni-card :title="item.name">
					<text class="uni-body">{{item.describes}}</text>
				</uni-card>
				
			</view>
			<image class="floating-button" src="../../static/feedback/plus.png" @click="add"></image>
		</view>
		<view v-if="data.current === 1">
			<view v-for="(item, index) in data.AllItems" :key="index" @click="onpress(item)">
				<uni-card :title="item.name">
					<text class="uni-body">{{item.describes}}</text>
				</uni-card>
				
			</view>
			<image class="floating-button" src="../../static/feedback/plus.png" @click="add"></image>
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
  items: ['捡到的', '丢失的'],
  colors: ['#007aff', '#4cd964', '#dd524d'],
  current: 0,
  colorIndex: 0,
  activeColor: '#007aff',
  styleType: 'button',
  AllItems: [],
})

onLoad(() => {
	fetchallItems();
})

onShow(() => {
  fetchallItems();
})

//要实时更新current，注意fetchallItems的调用时机
const onClickItem = (e) => {
	console.log("点击的索引",e.currentIndex);
  if (data.current != e.currentIndex) {
    data.current = e.currentIndex;
  }
	fetchallItems();
	
}

 const fetchallItems = async () => {
	 console.log("当前索引faaaaaaaaaa",data.current);
        if(data.current == 0)
        {
            const category = 'found';
            //奇了怪了，为什么
            //const res = await http(`/api/Getdata?category=${category}`, 'GET',{})就不行
            //破案了，少了个横线，参照下面lost的写法
            //是用``不是单引号写网址
            const res = await http(`/api/Getdata/${category}`, 'GET',{})
            console.log("封装后请求的结果", res);
						console.log("找的的", res);
            data.AllItems = res.data //与问卷的返回不同
        }
        else
        {
            const category = 'lost';
						// const res = await http(`/api/Getdata/?category=${category}`, 'GET')
           const res = await http(`/api/Getdata/${category}`, 'GET',{})
            console.log("丢失的", res);
            data.AllItems = res.data //与问卷的返回不同
        }
    }

const onpress = (item) => {
  console.log("跳转到每条失物招领的详细信息,要携带id", item.pickLocation);
  uni.navigateTo({
    url: `../lostAndFound/detailLostandFound?` +
      `describes=${item.describes}&` +
      `img=${item.img}&` +
      `contactobject=${item.contactobject}&` +
      `pickLocation=${item.pickLocation}&` +
      `pickTime=${item.pickTime}&` +
			`filepath=${item.filepath}`,
  });
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