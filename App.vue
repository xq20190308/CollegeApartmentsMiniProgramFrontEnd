<script>
	import {wsopen} from './utils/socket.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			wsopen('/websocket1');
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
