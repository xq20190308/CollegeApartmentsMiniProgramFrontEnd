<template>
	<view class="banner" style="margin-top: 0;">
		<view>
			<d-search-log placeholder="输入姓名" :is_show_more="false"  @onSearchNameApi="onSearchName"></d-search-log>
		</view>
		<uni-list v-if="data.isonsearch">
			<view class="barl" v-for="(i,index) in data.searchIndex" :key="index">
				<uni-list-item :title="data.mentor_list[i].trueName" :clickable="true" @click="gotoinfo(i)" />
			</view>
		</uni-list>
		<uni-indexed-list v-else :options="data.mentor_list_ABC" :show-select="false" @click="gotoinfo" />
	</view>
</template>

<script setup>
import {onLoad,onShow} from "@dcloudio/uni-app";
import {reactive} from "vue";
import {http} from '@/utils/http'
import { useUserStore } from "../../store/User.js"
const store=useUserStore()
const data = reactive({
	mentor_list:[],
	mentor_list_ABC:[],
	search_list:[],
	store_key:'mentor_namelist',
	input_text:'',
	searchIndex:[],
	isonsearch:false,
})
const gotoinfo=(e)=>{
	let i=typeof e=="number"?e:e.item.itemIndex
	let detail=data.mentor_list[i]
	uni.navigateTo({
		url:"/pages/chat/chatinfo?info="+JSON.stringify({...{},userid:detail.userId})
	})
}
const onSearchName = (e)=>{
	if(e!=""){//搜索
		data.searchIndex = data.mentor_list.map((item, index) => ({ item, index }))
        .filter(({ item }) => item.trueName.includes(e))
        .map(({ index }) => index);
		data.isonsearch=true
	}else{
		data.searchIndex=[]
		data.isonsearch=false;
	}
}
onLoad(async (options) => {
	console.log("store.user",store.token)
	data.mentor_list=[]
	data.mentor_list_ABC=[]
	if(store.token!=""){//这里
		http('/user/findByUserLevel?userLevel='+1,'GET',{},).then((res)=>{
			console.log("导师信息表",res.data)
			data.mentor_list=res.data
			for (var i = 0; i < 26; i++) {
				data.mentor_list_ABC.push({
					letter:String.fromCharCode('A'.charCodeAt(0)+ i),
					data: []
				});
			}
			for (var i = 0; i < data.mentor_list.length; i++) {
				let index = data.mentor_list_ABC.findIndex(item => item.letter === data.mentor_list[i].nameInitialLetter);
				data.mentor_list_ABC[index].data.push(data.mentor_list[i].trueName)
			}
			console.log('data.mentor_list_ABC',data.mentor_list_ABC)
		})
	}else{
		store.tologin()
	}
})
</script>


<style lang="scss" scoped>
	::v-deep .uni-indexed-list.data-v-476e099e{
		position: relative;
	}
</style>