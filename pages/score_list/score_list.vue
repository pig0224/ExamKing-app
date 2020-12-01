<template>
	<view>
		<view class="search-none" v-if="items.length==0">
			<view class="search-none-icon">
			</view>
		</view>
		<view class="score-list" v-else>
			<view class="score-item" @click="goExamResult(item.exam)" v-for="(item, index) in items" :key="index">
				<view class="left-score">
					<view class="score-content">
						<view class="score">
							<text>{{item.score}}</text>
						</view>
						<view class="score-tip">
							<text>考试成绩</text>
						</view>
					</view>
					<view class="block-top"></view>
					<view class="block-bottom"></view>
				</view>
				<view class="right-exam">
					<view class="exam-content">
						<view class="exam-title ellipse-2">
							<text>{{item.exam.examName}}</text>
						</view>
						<view class="exam-sub">
							<view class="exam-time ellipse-line">
								<view class="date-icon"></view>
								<text>{{item.exam.startTime}}</text>
							</view>
							<view class="exam-duration ellipse-line">
								<view class="time-icon"></view>
								<text>{{$utils.showTime(item.exam.duration)}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	var _this
	export default {
		data() {
			return {
				pageindex: 1,
				pagesize: 10,
				items: []
			}
		},
		methods: {
			goExamResult(item){
				uni.navigateTo({
					url: '/pages/exam_result/exam_result?id='+item.id
				})
			},
			async getItems(){
				return await this.$api.GetExamScoreList({
						pageindex: _this.pageindex,
						pagesize: _this.pagesize
					}).then(({
						data
					}) => {
						if (_this.pageindex <= data.data.totalPages) {
							if (_this.pageindex == 1) {
								_this.items = []
							}
							data.data.items.forEach((item) => {
								_this.items.push(item)
							})
						}
						_this.pageindex++
					})
				}
		},
		async onPullDownRefresh() {
			this.pageindex = 1
			_this.items = []
			await this.getItems()
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			this.getItems()
		},
		onLoad() {
			_this = this
			this.getItems()
		}
	}
</script>

<style lang="scss" scoped>
	.search-none {
		margin: 0;
		padding: 0;
		width: 100vw;
		height: 288rpx;
		display: flex;
		padding-top: 200rpx;
		justify-content: center;
	
		.search-none-icon {
			width: 538rpx;
			height: 288rpx;
			background-image: url(../../static/search-none.svg);
			background-repeat: no-repeat;
			background-size: 538rpx 288rpx;
		}
	}
	.exam-content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 30rpx;
		width: 490rpx;
		height: 206rpx;
		.exam-title{
			padding-top: 10rpx;
			text{
				font-size: 30rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: left;
				color: #666666;
				line-height: 40rpx;
			}
		}
		.exam-sub{
			display: flex;
			padding-top: 10rpx;
			justify-content: flex-start;
			.exam-time{
				.date-icon {
					margin-top: 13rpx;
					margin-right: 8rpx;
					float: left;
					width: 25rpx;
					height: 25rpx;
					background-image: url("../../static/data.svg");
					background-size: 100%;
					background-repeat: no-repeat;
				}
				
				text{
					font-size: 22rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: left;
					color: #999999;
					line-height: 48rpx;
				}
			}
			.exam-duration{
				margin-left: 10rpx;
				.time-icon {
					margin-top: 13.5rpx;
					margin-right: 8rpx;
					float: left;
					width: 25rpx;
					height: 25rpx;
					background-image: url("../../static/time.svg");
					background-size: 100%;
					background-repeat: no-repeat;
				}
				text{
					font-size: 22rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: left;
					color: #999999;
					line-height: 48rpx;
				}
			}
		}
	}
	.score-content{
		width: 180rpx;
		height: 200rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.score{
			text-align: center;
			text{
				width: 68rpx;
				height: 80rpx;
				font-size: 56rpx;
				font-family: PingFangSC, PingFangSC-Semibold;
				font-weight: 600;
				text-align: center;
				color: #2db0fe;
				line-height: 80rpx;
			}
		}
		.score-tip{
			text-align: center;
			text{
				width: 88rpx;
				height: 32rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				color: #999999;
				line-height: 32rpx;
			}
		}
	}
.score-list{
	padding: 30rpx;
	.score-item{
		margin-bottom: 30rpx;
		height: 200rpx;
		display: flex;
		justify-content: space-between;
		.right-exam{
			width: 490rpx;
			height: 206rpx;
			background: #ffffff;
			border-radius: 16rpx;
			box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(219,219,219,0.1); 
		}
		.left-score{
			position: relative;
			.block-top{
				position: absolute;
				width: 42rpx;
				height: 16rpx;
				background: #e5e5e5;
				border-radius: 8rpx;
				left: 170rpx;
				top: 68rpx;
			}
			.block-bottom{
				position: absolute;
				width: 42rpx;
				height: 16rpx;
				background: #e5e5e5;
				border-radius: 8rpx;
				left: 170rpx;
				bottom: 68rpx;
			}
			width: 180rpx;
			height: 200rpx;
			background: #ffffff;
			border-radius: 16rpx;
			box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(219,219,219,0.1); 
		}
	}
}
</style>
