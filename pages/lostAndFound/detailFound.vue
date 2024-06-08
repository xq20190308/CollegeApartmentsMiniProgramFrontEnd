<template>

	<view v-for="(item, idex) in showdata" :key="idex">
		<uni-card title="基础卡片" sub-title="副标题" extra="额外信息" padding="10px 0" :thumbnail="avatar">
			<template v-slot:title>
				<uni-list>
					<uni-list-item :show-switch="true" title="自定义标题" />
				</uni-list>
			</template>
			<image style="width: 100%;" :src="cover"></image>
			<text class="uni-body uni-mt-5">卡片组件通用来显示完整独立的一段信息，同时让用户理解他的作用。例如一篇文章的预览图、作者信息、时间等，卡片通常是更复杂和更详细信息的入口点。</text>
			<!-- 					<view slot="actions" class="card-actions">
						<view class="card-actions-item" @click="actionsClick('分享')">
							<uni-icons type="pengyouquan" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">分享</text>
						</view>
						<view class="card-actions-item" @click="actionsClick('点赞')">
							<uni-icons type="heart" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">点赞</text>
						</view>
						<view class="card-actions-item" @click="actionsClick('评论')">
							<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">评论</text>
						</view>
					</view> -->
		</uni-card>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.container {
		overflow: hidden;
	}

	.custom-cover {
		flex: 1;
		flex-direction: row;
		position: relative;
	}

	.cover-content {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 40px;
		background-color: rgba($color: #000000, $alpha: 0.4);
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 15px;
		font-size: 14px;
		color: #fff;
	}

	.card-actions {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		height: 45px;
		border-top: 1px #eee solid;
	}

	.card-actions-item {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.card-actions-item-text {
		font-size: 12px;
		color: #666;
		margin-left: 5px;
	}

	.cover-image {
		flex: 1;
		height: 150px;
	}

	.no-border {
		border-width: 0;
	}
</style>