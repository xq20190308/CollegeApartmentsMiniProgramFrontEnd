<template>
	<view style="display: flex;flex-direction: column;">
		<view style="width: 100%; height: auto;">
			<d-search-log placeholder="输入学号" color_border="#666666" color_text="#666666"
			:is_show_more="false" @onSearchNameApi="onSearchName"></d-search-log>
		</view>
	</view>
	<uni-section title="个人信息" type="line" v-if="data.userInfo!=''">
		<view style="margin: 15px;
					border-radius: 20px;
					overflow: hidden;
					box-shadow: 0px 2px 20px rgb(0 0 0 / 10%);">
			<uni-list border-full>
				<uni-list-item style="padding: 2px 8px;" showArrow title="微信解绑" rightText="" >
					<template v-slot:footer>
						<template v-slot:footer>
							<uni-data-picker popup-title="请选择" :localdata="data.dataTree" v-model="data.classes"
							:border="false" :clear-icon="false"
							@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
							</uni-data-picker>
						</template>
					</template>
				</uni-list-item>
				<uni-list-item style="padding: 2px 8px;" showArrow title="学号" :rightText="data.userInfo.userid" >
					<template v-slot:footer>
						<text style="color: #c1c1c1;font-size: small;">{{data.userInfo.userid}}</text>
					</template>
				</uni-list-item>
				<uni-list-item style="padding: 2px 8px;" showArrow title="密码" :rightText="data.userInfo.password" >
					<template v-slot:footer>
						<text style="color: #c1c1c1;font-size: small;">{{data.userInfo.password}}</text>
					</template>
				</uni-list-item>
				<uni-list-item style="padding: 2px 8px;" showArrow title="姓名" :rightText="data.userInfo.name" >
					<template v-slot:footer>
						<text style="color: #c1c1c1;font-size: small;">{{data.userInfo.name}}</text>
					</template>
				</uni-list-item>
				<uni-list-item style="padding: 2px 8px;" :showArrow="false" title="权限" :righticon="''" >
					<template v-slot:footer>
						<uni-data-picker popup-title="请选择" :localdata="data.dataTree" v-model="data.classes"
						:border="false" :clear-icon="false"
						@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
						</uni-data-picker>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
	</uni-section>
	<view>{{data.userInfo}}</view>
</template>

<script setup>
import '@/utils/http';
import {computed, reactive, ref} from "vue";
import {onLoad,onReady} from "@dcloudio/uni-app";
import {http} from '@/utils/http';
const data = reactive({
	inputValue : '',
	userInfo:{
		avatar: "2705e30c-7192-4b0b-96da-1e5c525b1e49",
		id: 2,
		name: "曹晓玉",
		openid: "ormTS5A6OPUrfzEUmUL2gSozu7y4",
		password: "123456",
		phone: "18765248196",
		userLevel: "0",
		userid: "202211070501",
		username: "202211070501",
	},
	classes: '1',
	dataTree: [{
		text: "管理员",
		value: "1"
	},
	{
		text: "教师",
		value: "2",
	},
	{
		text: "学生",
		value: "3",
		//disable: true
	}],
})
const onSearchName = async (e)=>{
	data.inputValue=e;
	console.log(data.inputValue);
	if(/^\d{12}$/.test(data.inputValue)){
		console.log("数据有效")
		const res = await http('/user/findByUserid?userid='+data.inputValue,'GET',{},)
		data.userInfo = res.data;
	}
}
onLoad(async ()=>{
	const res = await http('/user/findByUserid?userid='+"202211070501",'GET',{},)
	data.userInfo = res.data;
})
</script>

<style>

</style>




<!-- <template>
  <view class="container">
    <view class="tabs">
      <view class="tab" :class="{'active': status === 'completed'}" @click="switchStatus('completed')">已完成</view>
      <view class="tab" :class="{'active': status === 'uncompleted'}" @click="switchStatus('uncompleted')">未完成</view>
    </view>
    <swiper class="swiper" :current="status === 'completed' ? 0 : 1" @change="onSwiperChange">
      <swiper-item class="swiper-item">
        <view>内容1 - 已完成</view>
      </swiper-item>
      <swiper-item class="swiper-item">
        <view>内容2 - 未完成</view>
      </swiper-item>
    </swiper>
  </view>
</template>
 
<script>
export default {
  data() {
    return {
      status: 'completed' // 默认为已完成状态
    };
  },
  methods: {
    switchStatus(newStatus) {
      this.status = newStatus;
    },
    onSwiperChange(e) {
      this.status = e.detail.current === 0 ? 'completed' : 'uncompleted';
    }
  }
};
</script>
 
<style>
.container {
  padding: 10px;
}
.tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.tab {
  padding: 5px;
  border: 1px solid #ccc;
  text-align: center;
  cursor: pointer;
}
.tab.active {
  background-color: #007aff;
  color: #fff;
}
.swiper {
  height: 100px;
}
.swiper-item {
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style> -->