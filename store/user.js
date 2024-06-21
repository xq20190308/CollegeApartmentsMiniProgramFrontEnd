import { defineStore } from 'pinia'
import { reactive,ref,computed } from "vue";

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserStore = defineStore('User', ()=>{
    const count = ref(202211070501)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
      count.value++
    }
    // 其他配置...
	const user = ref("202211070501")
	const token = ref(false)
	// 通讯录列表
	const mailList = ref([])
	// websocket
	const chat = ref(null)
	// 会话列表
	const chatList = ref([
		{name:"张晨冉1",userid:"202211070625",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg"},
		{name:"曹晓玉2",userid:"202211070501",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg"},
		{name:"朱喜珍3",userid:"202311071133",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg"},
		{name:"王义仓4",userid:"202211070621",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg"},
		{name:"王克帅5",userid:"202211070617",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg"},
		{name:"徐敏清6",userid:"202311071222",avatar:"https://c-ssl.duitang.com/uploads/item/201602/04/20160204001032_CBWJF.jpeg"},
		
	])
	
	const nref="123"
    return { count, doubleCount, increment,user,token,mailList,chat,chatList }
})