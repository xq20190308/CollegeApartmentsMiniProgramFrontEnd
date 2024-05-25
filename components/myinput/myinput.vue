<template>
	<view>
		<view class="nairetype" style="display: flex;flex-wrap: nowrap;">
			<slot></slot>
			<input @input="(e) => typeChange(e,qindex)" :placeholder="text" placeholder-class="answerplacehoder" />
		</view>
	</view>
</template>

<script>
	export default {
		name:"myinput",
		data() {
			return {
				text:""
			};
		},
		onLoad(options) {
			this.text=options;
			console.log(this.text);
		}
	}
</script>

<style lang="scss">

</style>