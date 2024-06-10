<template>
    <view class="uni-padding-wrap uni-common-mt">
        <uni-segmented-control :current="data.current" :values="data.items" :style-type="data.styleType"
            :active-color="data.activeColor" @clickItem="onClickItem" />
    </view>
    <view class="content">
        <view v-if="data.current === 0">
                <view class="card2" v-for="(item, idex) in data.AllItems" :key="idex" @click="onpress(item)">

                    <uni-card title="捡到的东西" :sub-title="item.name" padding="10px 0">
                        <!-- 显示头像的 -->
                        <!-- :thumbnail="item.img" -->
                        <image style="width:100%;" :src="item.img"></image>
                        <text class="uni-body uni-mt-5">{{item.describes}}</text>
                        <!--                     <view slot="actions" class="card-actions">
                                <view class="card-actions-item" @click="actionsClick('分享')">
                                    <uni-icons type="pengyouquan" size="18" color="#999"></uni-icons>
                                    <text class="card-actions-item-text">分享</text>
                                </view>
                                <view class="card-actions-item" @click="actionsClick('点赞')">
                                    <uni-icons type="heart" size="18" color="#999"></uni-icons>
                                    <text class="card-actions-item-text">点赞</text>
                                </view>
                                <view class="card-actions-item" @click="actionsClick('评论')">
                                    <uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
                                    <text class="card-actions-item-text">评论</text>
                                </view>
                            </view> -->
                    </uni-card>
                </view>
        </view>
        <view v-if="data.current === 1">
            <view class="card2" v-for="(item, idex) in data.AllItems" :key="idex" @click="onpress(item)">

                <uni-card title="丢失东西" :sub-title="item.name" padding="10px 0">
                    <!-- 显示头像的 -->
                    <!-- :thumbnail="item.img" -->
                    <image style="width:100%;" :src="item.img"></image>
                    <text class="uni-body uni-mt-5">{{item.describes}}</text>
                    <!--                     <view slot="actions" class="card-actions">
                            <view class="card-actions-item" @click="actionsClick('分享')">
                                <uni-icons type="pengyouquan" size="18" color="#999"></uni-icons>
                                <text class="card-actions-item-text">分享</text>
                            </view>
                            <view class="card-actions-item" @click="actionsClick('点赞')">
                                <uni-icons type="heart" size="18" color="#999"></uni-icons>
                                <text class="card-actions-item-text">点赞</text>
                            </view>
                            <view class="card-actions-item" @click="actionsClick('评论')">
                                <uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
                                <text class="card-actions-item-text">评论</text>
                            </view>
                        </view> -->
                </uni-card>
            </view>

        </view>
    </view>
		
		    <view>
		        <image class="floating-button" src="../../static/function/lostandfound_per.png" @click="changePage"></image>
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
    url: `../lostAndFound/detailLost?` +
      `describes=${item.describes}&` +
      `img=${item.img}&` +
      `contactobject=${item.contactobject}&` +
      `pickLocation=${item.pickLocation}&` +
      `pickTime=${item.pickTime}&` +
			`filepath=${item.filepath}`,
  });
}

const changePage = () => {
  console.log("跳转到发布页面");
  uni.navigateTo({
    url: '../../pages/lostAndFound/lostAndFoundMysef',
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

	// .content {
	// 	/* #ifndef APP-NVUE */
	// 	display: flex;
	// 	/* #endif */
	// 	justify-content: center;
	// 	align-items: center;
	// 	height: 150px;
	// 	text-align: center;
	// }


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