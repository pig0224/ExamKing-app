<template>
	<view>
		<view class="search-none" v-if="items.length==0">
			<view class="search-none-icon">
			</view>
		</view>
		<view v-else class="subject" v-for="(item, index) in items" :key="index">
			<view class="on-line" :class=" ((index%3)==1)?'':(index%3)==2?'two':'three'">
				<view class="exma-title">
					<text>{{item.examName}}</text>
					<view class="white"></view>
				</view>
				<view class="footer">
					<view class="rate">
						<text>共{{item.stuanswerdetails.length}}道题 错题率{{$utils.QuestionPercent(item.examquestions.length, item.stuanswerdetails.length)}}</text>
					</view>
					<view class="details" @click="goWrongDetail(index)">
						<text>查看详情</text>
					</view>
				</view>
			</view>
		</view>
		<view class="footer-block"></view>
	</view>
</template>

<script>
	var _this
	export default {
		data() {
			return {
				title: '全部错题',
				pageindex: 1,
				pagesize: 10,
				items: []
			};
		},
		async onPullDownRefresh() {
			this.pageindex = 1
			await this.getItems()
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			this.getItems()
		},
		methods: {
			goWrongDetail(index){
				var detail = this.items[index]
				uni.navigateTo({
					url:'/pages/wrong_details/wrong_details',
					success:function(res){
						res.eventChannel.emit('onWrongDetail', { detail: detail })
					}
				})
			},
			async getItems() {
				if (this.title == "今日错题") {
					return await this.$api.GetWrongTodayList({
						pageindex: this.pageindex,
						pagesize: this.pagesize
					}).then(({
						data
					}) => {
						if (_this.pageindex <= data.data.totalPages) {
							if (_this.pageindex == 1) {
								_this.items = []
							}
							data.data.items.forEach((item) => {
								// 判断是否存在错题
								if(this.$utils.QuestionAnswerCount(item.stuanswerdetails, '0')>0){
									_this.items.push(item)
								}
							})
						}
						_this.pageindex++
					})
				} else {
					return await this.$api.GetWrongList({
						pageindex: this.pageindex,
						pagesize: this.pagesize
					}).then(({
						data
					}) => {
						if (_this.pageindex <= data.data.totalPages) {
							if (_this.pageindex == 1) {
								_this.items = []
							}
							data.data.items.forEach((item) => {
								// 判断是否存在错题
								if(this.$utils.QuestionAnswerCount(item.stuanswerdetails, '0') > 0){
									_this.items.push(item)
								}
							})
						}
						_this.pageindex++
					})
				}
			}
		},
		onLoad(e) {
			_this = this
			var title = e.title ? e.title : "全部错题"
			console.log(title)
			uni.setNavigationBarTitle({
				title: title
			})
			this.title = title
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

	.subject {
		display: flex;
		justify-content: center;
		padding-top: 30rpx;
	}

	.subject:last-child {
		margin-bottom: 30rpx;
	}

	.two {
		background: linear-gradient(90deg, #f9be64 1%, #f58635) !important;
		box-shadow: 0rpx 0rpx 10rpx 0rpx #f68d3b !important;

		.footer>.details {
			text {
				color: #F68D3B !important;
				;
			}
		}
	}

	.three {
		background: linear-gradient(90deg, #73cfff 1%, #40aafe) !important;
		box-shadow: 0rpx 0rpx 10rpx 0rpx #40aafe !important;

		.footer>.details {
			text {
				color: #40aafe !important;
			}
		}
	}

	.on-line {
		padding: 30rpx;
		width: 690rpx;
		height: 240rpx;
		background: linear-gradient(90deg, #949ff9 1%, #5a67e7);
		border-radius: 20rpx;
		box-shadow: 0rpx 0rpx 18rpx 0rpx rgba(129, 141, 243, 0.85);
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.footer {
			display: flex;
			justify-content: space-between;

			.rate {
				position: relative;
				top: 20rpx;
			}
		}

		text {
			width: 610rpx;
			height: 56rpx;
			font-size: 34rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 200;
			text-align: left;
			color: #ffffff;
			line-height: 50rpx;
		}

		.white {
			width: 50rpx;
			height: 8rpx;
			background: #ffffff;
			border-radius: 50rpx;
			position: relative;
			top: 10rpx;
		}

		.rate {
			text {
				width: 278rpx;
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Light;
				font-weight: 300;
				text-align: left;
				color: #ffffff;
				line-height: 40rpx;
			}
		}

		.details {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 150rpx;
			height: 56rpx;
			background: #ffffff;
			border-radius: 28rpx;

			text {
				width: 96rpx;
				height: 34rpx;
				font-size: 24rpx;
				font-family: PingFangSC, PingFangSC-Light;
				font-weight: 300;
				text-align: left;
				color: #606de9;
				line-height: 34rpx;
			}
		}
	}
</style>
