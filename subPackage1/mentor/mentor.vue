<template>
	<view class="banner" style="margin-top: 0;">
		<view>
			<dSearchLogVue placeholder="输入姓名" :is_show_more="false"  @onSearchNameApi="onSearchName"></dSearchLogVue>
		</view>
		<uni-list v-if="data.isonsearch">
			<view class="barl" v-for="(i,index) in data.searchIndex" :key="index">
				<uni-list-item :title="MentorStore.mentor_list[i].trueName" :clickable="true" @click="gotoinfo(i)" />
			</view>
		</uni-list>
		<uni-indexed-list v-else :options="mentor_list_ABC" :show-select="false" @click="gotoinfo" />
	</view>
</template>

<script setup>
import {onLoad,onShow,onPullDownRefresh} from "@dcloudio/uni-app";
import {computed, reactive} from "vue";
import {http} from '@/utils/http'
import { useUserStore } from "@/store/User.js"
import { useMentorStore } from '/subPackage1/store/study/mentor.js';
import { getMentors } from "./api/mentor.js";
import dSearchLogVue from "../../uni_modules/d-search-log/components/d-search-log/d-search-log.vue";
const MentorStore =useMentorStore()
const store=useUserStore()
const mentor_list_ABC=computed(()=>{
	let list=[]
	for (var i = 0; i < 26; i++) {
		list.push({
			letter:String.fromCharCode('A'.charCodeAt(0)+ i),
			data: []
		});
	}
	for (var i = 0; i < MentorStore.mentor_list.length; i++) {
		let index = list.findIndex(item => item.letter === MentorStore.mentor_list[i].nameInitialLetter);
		list[index].data.push(MentorStore.mentor_list[i].trueName)
	}
	console.log('list',list)
	return list
})
const data = reactive({
	search_list:[],
	store_key:'mentor_namelist',
	input_text:'',
	searchIndex:[],
	isonsearch:false,
})
const gotoinfo=(e)=>{
	let i=typeof e=="number"?e:e.item.itemIndex
	let detail=MentorStore.mentor_list[i]
	uni.navigateTo({
		url:"/pages/chat/chatinfo?info="+JSON.stringify({...{},userid:detail.userId})
	})
}
const onSearchName = (e)=>{
	if(e!=""){//搜索
		data.searchIndex = MentorStore.mentor_list.map((item, index) => ({ item, index }))
        .filter(({ item }) => item.trueName.includes(e))
        .map(({ index }) => index);
		data.isonsearch=true
	}else{
		data.searchIndex=[]
		data.isonsearch=false;
	}
}
onPullDownRefresh(()=>{
	getMentors(true)
	setTimeout(()=>{
		uni.stopPullDownRefresh();
	},500)
})
onLoad((options) => {
	getMentors(true)
})
</script>


<style lang="scss" scoped>
	::v-deep .uni-indexed-list.data-v-476e099e{
		position: relative;
	}
</style>