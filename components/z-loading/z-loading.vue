<template>
	<view>
		<view class="loading" >
			<image src="/static/img/icon/loading.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 238rpx;
		position: absolute;
		width: 100%;
		// background: #fff;
		z-index: 1;

		image {
			width: 60rpx;
			height: 60rpx;
			animation: myfirst2 2s infinite linear;
		}

		@keyframes myfirst2 {
			from {
				transform: rotate(0deg);
			}

			to {
				transform: rotate(359deg);
			}
		}
	}
</style>
