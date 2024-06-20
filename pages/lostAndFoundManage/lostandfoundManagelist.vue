<template>
    <view style="padding: 10px ;margin-top: 5px;">
       <uni-segmented-control :current="data.current" :values="data.items" :style-type="data.styleType"
           :active-color="data.activeColor" @clickItem="onClickItem" />
        <view class="content">
            <view v-show="data.current === 0">
                <view class="card2" v-for="(item, idex) in data.AllItems" :key="idex" @click="onpress(item)">
                
                    <uni-card title="捡到的东西" :sub-title="item.name" padding="10px 0">
                        <image style="width:100%;" :src="item.img"></image>
                        <text class="uni-body uni-mt-5">{{item.describes}}</text>
                    </uni-card>
                </view>
            </view>
            <view v-show="data.current === 1">
                <uni-card :title="item.category === 'lost' ? '捡到的东西' : '丢失的东西'" :sub-title="item.name" padding="10px 0">
                    <image style="width:100%;" :src="item.img"></image>
                    <text class="uni-body uni-mt-5">{{item.describes}}</text>
                </uni-card>
            </view>
            <view v-show="data.current === 2">
                <uni-card title="捡到的东西" :sub-title="item.name" padding="10px 0">
                    <image style="width:100%;" :src="item.img"></image>
                    <text class="uni-body uni-mt-5">{{item.describes}}</text>
                </uni-card>
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
	  items: ['待审核', '已通过', '已驳回'],
	  colors: ['#007aff', '#4cd964', '#dd524d'],
	  current: 0,
	  colorIndex: 0,
	  activeColor: '#007aff',
	  styleType: 'button',
	  AllItems: [],
		status:'',
	})
  const  onClickItem = (e)=> {
      if (data.current != e.currentIndex) {
        data.current = e.currentIndex;
      }
			fetchallItems();
    }
		
		const fetchallItems = async() =>{
			if(data.current == 0)
			{
				const status = '待审核';
				const res = await http()
				console.log("封装后请求的结果", res);
				data.AllItems = res.data;
			}
			if(data.current == 1)
			{
				const status = '已通过';
				const res = await http()
				console.log("封装后请求的结果", res);
				data.AllItems = res.data;
			}
			if(data.current == 2)
			{
				const status = '已驳回';
				const res = await http()
				console.log("封装后请求的结果", res);
				data.AllItems = res.data;
			}
			
		}
		
		const onpress = (item) => {
		  console.log("跳转到每条失物招领的详细信息,要携带id", item.pickLocation);
		  uni.navigateTo({
		    url: `../lostAndFoundManage/detailLostandFoundManage?` +
		      `describes=${item.describes}&` +
		      `img=${item.img}&` +
		      `contactobject=${item.contactobject}&` +
		      `pickLocation=${item.pickLocation}&` +
		      `pickTime=${item.pickTime}&` +
					`filepath=${item.filepath}`,
		  });
		}
</script>


<style>
	
</style>