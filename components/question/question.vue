<template>
	<view>	
		<radio-group @change="radioChange">
			<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in questions" :key="item.value">
				<view>
					<radio :value="item.value" :checked="index === current" />
				</view>
				<view>{{item.name}}</view>
			</label>
		</radio-group>
	</view>
	
</template>

<script>
	export default {
		name:"questionnaire",
		data() {
			return {
				questions: [{
						value: 'USA',
						name: '美国',
						checked: 'true'
					},
					{
						value: 'CHN',
						name: '中国'
					},
					{
						value: 'BRA',
						name: '巴西'
					},
					{
						value: 'JPN',
						name: '日本'
					},
					{
						value: 'ENG',
						name: '英国'
					},
					{
						value: 'FRA',
						name: '法国'
					},
				],
				current: 0,
			};
		},
		props:{
			questions:[]
		},
		methods:{
			radioChange: function(evt) {
			    for (let i = 0; i < this.items.length; i++) {
			        if (this.items[i].value === evt.detail.value) {
			            this.current = i;
			            break;
			        }
			    }
			},
		}
	}
</script>

<style>
</style>