<script>
	import { useUserStore } from "./store/User.js"
	export default {
		onLaunch: async function() {
			console.log('App Launch')
			const store=useUserStore();
			await store.initLogin()
			uni.$on('onMessage',async(msg)=>{
				let pages = await getCurrentPages();
				if(pages[pages.length - 1]!=undefined&&pages[pages.length - 1].$vm.__route__ != 'pages/chat/chat'){
					console.log('!!!!!pages/chat/chat',"+++",pages[pages.length - 1].$vm.__route__)
					//不能是chat页面，否则会重复监听
					console.log("APP.vue uni.$on('onMessage')",msg)
					//存本地
					let message=JSON.parse(msg);
					message.sendTime=message.sendTime.slice(0,10) +" "+ message.sendTime.slice(11,19);
					let prelog=uni.getStorageSync('single'+ store.user.userid +'_with_'+message.senderUserId)
					prelog=prelog!=""?JSON.parse(prelog):[]
					prelog.push(message)
					console.log(prelog)
					uni.setStorageSync('single'+ store.user.userid +'_with_'+message.senderUserId,JSON.stringify(prelog))
					
				}else{
					console.log('pages/chat/caht',"---",pages[pages.length - 1].$vm.__route__)
				}
				})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
