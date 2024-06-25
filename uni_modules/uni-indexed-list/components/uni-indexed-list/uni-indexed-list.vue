<template>
	<view class="uni-indexed-list" ref="list" id="list">
		<scroll-view :scroll-into-view="scrollViewId" class="uni-indexed-list__scroll" :show-scrollbar="true" :scroll-with-animation="true" :scroll-y="true">
			<view v-for="(list, idx) in lists" :key="idx" :id="'uni-indexed-list-' + idx">
				<indexed-list-item :list="list" :loaded="loaded" :idx="idx" :showSelect="showSelect"
					@itemClick="onClick"></indexed-list-item>
			</view>
		</scroll-view>
		<view id="menu" class="uni-indexed-list__menu" @touchstart="touchStart" @touchmove.stop.prevent="touchMove"
			@touchend="touchEnd" @mousedown.stop="mousedown" @mousemove.stop.prevent="mousemove"
			@mouseleave.stop="mouseleave">
			<view v-for="(list, key) in lists" :key="key" class="uni-indexed-list__menu-item"
				:class="touchmoveIndex == key ? 'uni-indexed-list__menu--active' : ''">
				<text class="uni-indexed-list__menu-text"
					:class="touchmoveIndex == key ? 'uni-indexed-list__menu-text--active' : ''">{{ list.key }}</text>
			</view>
		</view>
		<view v-if="touchmove" class="uni-indexed-list__alert-wrapper">
			<text class="uni-indexed-list__alert">{{ lists[touchmoveIndex].key }}</text>
		</view>
	</view>
</template>
<script>
	import indexedListItem from './uni-indexed-list-item.vue'
	/**
	 * IndexedList 索引列表
	 * @description 用于展示索引列表
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=375
	 * @property {Boolean} showSelect = [true|false] 展示模式
	 * 	@value true 展示模式
	 * 	@value false 选择模式
	 * @property {Object} options 索引列表需要的数据对象
	 * @event {Function} click 点击列表事件 ，返回当前选择项的事件对象
	 * @example <uni-indexed-list options="" showSelect="false" @click=""></uni-indexed-list>
	 */
	export default {
		name: 'UniIndexedList',
		components: {
			indexedListItem
		},
		emits: ['click'],
		props: {
			options: {
				type: Array,
				default () {
					return []
				}
			},
			showSelect: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				lists: [],
				winHeight: 0,
				itemHeight: 0,
				winOffsetY: 0,
				touchmove: false,
				touchmoveIndex: -1,
				scrollViewId: '',
				touchmovable: true,
				loaded: false,
				isPC: false
			}
		},
		watch: {
			options: {
				handler: function() {
					this.setList()
				},
				deep: true
			}
		},
		mounted() {
			setTimeout(() => {
				this.setList()
			}, 500)//延时不能太短
			setTimeout(() => {
				this.loaded = true
			}, 300);
		},
		methods: {
			setList() {
				let indexofvalid = 0;
				this.lists = []
				this.options.forEach((value, index) => {
					if (value.data.length != 0) {
						let indexBefore = index
						let items = value.data.map(item => {
							let obj = {}
							obj['key'] = value.letter
							obj['name'] = item
							obj['itemIndex'] = indexofvalid
							indexofvalid++
							obj.checked = item.checked ? item.checked : false
							return obj
						})
						this.lists.push({
							title: value.letter,
							key: value.letter,
							items: items,
							itemIndex: indexBefore
						})
					}
					
				})
				uni.createSelectorQuery()
					.in(this)
					.select('#menu')
					.boundingClientRect()
					.exec(ret => {
						this.winOffsetY = ret[0].top
						this.winHeight = ret[0].height
						this.itemHeight = this.winHeight / this.lists.length
					})
			},
			touchStart(e) {
				this.touchmove = true
				let pageY = this.isPC ? e.pageY : e.touches[0].pageY
				let index = Math.floor((pageY - this.winOffsetY) / this.itemHeight)
				let item = this.lists[index]
				
				if (item) {
					this.scrollViewId = 'uni-indexed-list-' + index
					this.touchmoveIndex = index
				}
			},
			touchMove(e) {
				let pageY = this.isPC ? e.pageY : e.touches[0].pageY
				let index = Math.floor((pageY - this.winOffsetY) / this.itemHeight)
				if (this.touchmoveIndex === index) {
					return false
				}
				let item = this.lists[index]
				if (item) {
					this.scrollViewId = 'uni-indexed-list-' + index
					this.touchmoveIndex = index
				}
			},
			touchEnd() {
				console.log("touchEnd()")
				this.touchmove = false
				// this.touchmoveIndex = -1
			},

			/**
			 * 兼容 PC @tian
			 */

			mousedown(e) {
				if (!this.isPC) return
				this.touchStart(e)
			},
			mousemove(e) {
				if (!this.isPC) return
				this.touchMove(e)
			},
			mouseleave(e) {
				if (!this.isPC) return
				this.touchEnd(e)
			},
			onClick(e) {
				let {
					idx,
					index
				} = e
				let obj = {}
				for (let key in this.lists[idx].items[index]) {
					obj[key] = this.lists[idx].items[index][key]
				}
				let select = []
				if (this.showSelect) {
					this.lists[idx].items[index].checked = !this.lists[idx].items[index].checked
					this.lists.forEach((value, idx) => {
						value.items.forEach((item, index) => {
							if (item.checked) {
								let obj = {}
								for (let key in this.lists[idx].items[index]) {
									obj[key] = this.lists[idx].items[index][key]
								}
								select.push(obj)
							}
						})
					})
				}
				this.$emit('click', {
					item: obj,
					select: select
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.uni-indexed-list {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row-reverse;
		
	}

	.uni-indexed-list__scroll {
		flex: 1;
		height: 540px;
	}

	.uni-indexed-list__menu {
		width: 24px;
		display: flex;
		flex-direction: column;
		float: right !important;
		z-index: 9;
		height: -webkit-fit-content;
		position: fixed;
		height: 540px;
		justify-content: space-between;
	}

	.uni-indexed-list__menu-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		//flex: 1;
		height: auto;
		align-items: center;
		justify-content: center;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.uni-indexed-list__menu-text {
		font-size: 12px;
		text-align: center;
		color: #aaa;
	}

	.uni-indexed-list__menu--active {
		// background-color: rgb(200, 200, 200);
	}

	.uni-indexed-list__menu--active {}

	.uni-indexed-list__menu-text--active {
		border-radius: 16px;
		width: 16px;
		height: 16px;
		line-height: 16px;
		background-color: #007aff;
		color: #fff;
	}

	.uni-indexed-list__alert-wrapper {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.uni-indexed-list__alert {
		width: 80px;
		height: 80px;
		border-radius: 80px;
		text-align: center;
		line-height: 80px;
		font-size: 35px;
		color: #fff;
		background-color: rgb(0 0 0 / 27%);
		position: fixed;
		top: 250px;
	}
</style>
