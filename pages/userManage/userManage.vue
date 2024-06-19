<template>
	<view style="display: flex;flex-direction: column;">
		<view style="width: 100%; height: auto;">
			<d-search-log placeholder="输入学号" color_border="#666666" color_text="#666666"
			:is_show_more="false" @onSearchNameApi="onSearchName"></d-search-log>
		</view>
	</view>
	<uni-section title="个人信息" type="line" v-if="data.userInfo!=null">
		<view style="margin: 15px;
					border-radius: 20px;
					overflow: hidden;
					box-shadow: 0px 2px 20px rgb(0 0 0 / 10%);">
			<uni-list border-full>
				<uni-list-item style="padding: 2px 8px;" showArrow clickable @click="debindwx" title="微信解绑" rightText="" >

				</uni-list-item>
				<uni-list-item style="padding: 2px 8px;" :showArrow="false" title="学号" rightText="" >
					<template v-slot:footer>
						<uni-easyinput v-model="data.newInfo.id" maxlength=12 :clearable="false" :inputBorder="false" type="line" :placeholder="data.userInfo.userid"></uni-easyinput>
					</template>
				</uni-list-item>
				<uni-list-item style="padding: 2px 8px;" :showArrow="false" title="密码" rightText="" >
					<template v-slot:footer>
						<!--text style="color: #c1c1c1;font-size: small;">{{data.userInfo.password}}</text-->
						<uni-easyinput v-model="data.newInfo.password" maxlength=12 :clearable="false" :inputBorder="false" type="line" :placeholder="data.userInfo.password"></uni-easyinput>
					</template>
				</uni-list-item>
				<uni-list-item style="padding: 2px 8px;" :showArrow="false" title="姓名" rightText="" >
					<template v-slot:footer>
						<uni-easyinput v-model="data.newInfo.name" :clearable="false" :inputBorder="false" type="line" :placeholder="data.userInfo.name"></uni-easyinput>
					</template>
				</uni-list-item>
				<uni-list-item style="padding: 2px 8px;" :showArrow="false" title="权限" :righticon="''" >
					<template v-slot:footer>
						<uni-data-picker popup-title="" :localdata="data.dataTree" v-model="data.newInfo.userLevel"
						:border="false" :clear-icon="false"
						@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
						</uni-data-picker>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
	</uni-section>
	<button v-if="data.userInfo!=null" style="left: 150px; top: 50px; color:#ffffff;backgroundColor:#008fff;" type="primary" size="mini" @click="modify">提交修改</button>
	
</template>

<script setup>
import '@/utils/http';
import {computed, reactive, ref} from "vue";
import {onLoad,onReady} from "@dcloudio/uni-app";
import {http} from '@/utils/http';
const data = reactive({
	newInfo:{
		id:"",
		password:"",
		name:"",
		userLevel:"",
	},
	inputValue : '',
	userInfo:null,
	dataTree: [{
		text: "管理员",
		value: "0"
	},
	{
		text: "教师",
		value: "1",
	},
	{
		text: "学生",
		value: "2",
		//disable: true
	}],
})
const onnodeclick=(e)=> {
	console.log('onnodeclick');
	console.log(e);
}
const onpopupopened=(e)=> {
	console.log('popupopened');
}
const onpopupclosed=(e)=> {
	console.log('popupclosed');
}
const onchange=(e)=> {
	console.log('onchange:', e);
}
const modify=async()=>{
	console.log(data.newInfo)
	if(data.newInfo.password!=data.userInfo.password){
		//改密码
		const res = await http('/user/updatePasswordByUserid/'+data.userInfo.userid,'POST',{
			password:data.newInfo.password,
		},)
		if(res.msg=="success"){
			uni.showToast({
				icon:"success",
				title:"修改成功"
			})
			data.userInfo.password=data.newInfo.password;
			data.newInfo.password=""
		}else{
			uni.showToast({
				icon:"error",
				title:"修改失败"
			})
		}
	}
	if(data.newInfo.userLevel!=data.userInfo.userLevel){
		//改level
		const res = await http('/user/updateLevelByUserid/'+data.userInfo.userid,'POST',{
			userLevel:data.newInfo.userLevel,
		},)
		if(res.msg=="success"){
			uni.showToast({
				icon:"success",
				title:"修改成功"
			})
			data.userInfo.userLevel=data.newInfo.userLevel;
		}else{
			uni.showToast({
				icon:"error",
				title:"修改失败"
			})
		}
	}
}
const debindwx=async()=>{
	if(data.userInfo.openid==null){
		uni.showToast({
			icon:"error",
			title:"该用户尚未绑定微信账号"
		})
	}else{
		uni.showModal({
			title: "确定解除绑定微信吗",
			success: async(res1) => {
				if (res1.confirm) {
					console.log('用户点击确认');
					const res = await http('/user/initOpenidByUserid/'+data.userInfo.userid,'POST',{},)
					if(res.msg=="success"){
						uni.showToast({
							icon:"success",
							title:"解绑成功"
						})
						data.userInfo.openid=null
					}else{
						uni.showToast({
							icon:"error",
							title:"解绑失败"
						})
					}
				} else if (res1.cancel) {
					console.log('用户点击取消');
				}
			}
		})
	}
}
const onSearchName = async (e)=>{
	data.inputValue=e;
	console.log(data.inputValue);
	if(/^\d{12}$/.test(data.inputValue)){
		console.log("数据有效")
		const res = await http('/user/findByUserid?userid='+data.inputValue,'GET',{},)
		data.userInfo = res.data;
		data.newInfo.userLevel=data.userInfo.userLevel;
	}
}
onLoad(async ()=>{
	
})
</script>

<style lang="scss" scoped>
::v-deep .uni-easyinput{
	text-align: end;
}
::v-deep .text-color {
  color: #9e9a9a;
  font-family: UICTFontTextStyleBody;
  font-size: smaller;
}
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