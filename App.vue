<script>
	import { useUserStore } from "./store/User.js"
	export default {
		onLaunch: function() {
			console.log('App Launch')
			const store=useUserStore();
			store.initLogin()
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
