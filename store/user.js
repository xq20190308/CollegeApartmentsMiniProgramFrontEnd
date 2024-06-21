import { defineStore } from 'pinia'
import { reactive,ref,computed } from "vue";

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserStore = defineStore('User', ()=>{
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
      count.value++
    }
    // 其他配置...
	const user = false
	const token = false
	// 通讯录列表
	const mailList = []
	// websocket
	const chat = null
	// 会话列表
	const chatList = []
    return { count, doubleCount, increment,user,token,mailList,chat }
})