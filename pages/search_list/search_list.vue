<template>
	<view class="box">
		<view class="search-none" v-if="items.length==0">
			<view class="search-none-icon">
			</view>
		</view>
		<view class="on-line" v-else>
			<view class="category" @click="goExam(item.id)" v-for="(item, index) in items" :key="index">
				<view class="exam-title">
					<text>{{item.examName}}</text>
				</view>
				<view class="subject">
					<view class="nubber">
						<text class="num">{{item.examquestions.length}}</text>
						<text class="txt">总题数</text>
					</view>
					<view class="nubber">
						<text class="num">{{$utils.QuestionCount(item.examquestions, "judge")}}</text>
						<text class="txt">是非题</text>
					</view>
					<view class="nubber">
						<text class="num">{{$utils.QuestionCount(item.examquestions, "select")+$utils.QuestionCount(item.examquestions, "select")}}</text>
						<text class="txt">选择题</text>
					</view>
				</view>
				<view class="footer">
					<view class="item" style="margin-left: 30rpx;">
						<!-- <image src="../../static/data.svg" style="margin-right: 8rpx;" mode="aspectFit"></image> -->
						<view class="date-icon"></view>
						<text>{{item.startTime}}</text>
					</view>
					<view class="item" style="padding-left: 30rpx;">
						<!-- <image src="../../static/time.svg" style="margin-right: 8rpx;" mode="aspectFit"></image> -->
						<view class="time-icon"></view>
						<text>{{$utils.showTime(item.duration)}}</text>
					</view>
					<view class="item" style="flex: 1;">
						<view v-if="item.isEnable=='0'&&item.isFinish=='0'" class="finsh-exam" style="float: right;">
							<text class="txt">未考试</text>
						</view>
						<view class="err-exam" v-if="item.isEnable=='1'&&item.isFinish=='1'" style="float: right;">
							<text class="txt">已结束</text>
						</view>
						<view class="none-exam" v-if="item.isEnable=='1'&&item.isFinish=='0'" style="float: right;">
							<text class="txt">考试中</text>
						</view>
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
				keyword: "",
				pageindex: 1,
				pagesize: 10,
				items: []
			};
		},
		async onPullDownRefresh() {
			this.pageindex = 1
			_this.items = []
			await this.search()
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			this.search()
		},
		methods: {
			goExamResult(item){
				uni.navigateTo({
					url: '/pages/exam_result/exam_result?id='+item.id
				})
			},
			goExamDetail(item){
				uni.navigateTo({
					url: '/pages/exam_detail/exam_detail',
					success: function(res) {
						res.eventChannel.emit('onExamDetail', {
							detail: item
						})
					}
				})
			},
			goExamStart(item){
				uni.navigateTo({
					url: '/pages/exam_start/exam_start',
					success: function(res) {
						res.eventChannel.emit('onExamDetail', {
							detail: item
						})
					}
				})
			},
			async goExam(id) {
				// 查询考试信息
				var item = ""
				await this.$api.GetExamInfo(id).then(({data})=>{
					item = data.data
				})
				if (item.isEnable == '1' && item.isFinish == '1') { // 考试结束
					this.goExamResult(item)
				} else if (item.isEnable == '1' && item.isFinish == '0') { //正在考试
					// 判断是否答过题
					if(item.stuanswerdetails.length>0){
						// 判断是否已交卷
						if(item.stuscores.length>0){
							this.goExamResult(item)
						}else{
							// 继续答题
							this.goExamDetail(item)
						}
					}else{
						this.goExamStart(item)
					}
				} else if (item.isEnable == '0' && item.isFinish == '0') { // 考试未开始
					this.goExamStart(item)
				}
			},
			async search() {
				return await this.$api.SearchExamList({
					keyword: _this.keyword,
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
		onLoad: function(e) {
			_this = this
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('onSearch', function(data) {
				_this.keyword = data.keyword
				_this.search()
			})
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

	.progress {
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #FFFFFF;
		height: 84rpx;

		.active {
			text {
				color: #1677FF !important;
			}

			border-bottom: 4rpx solid #1677FF;
		}

		.text {
			text-align: center;
			height: 84rpx;

			text {
				width: 102rpx;
				height: 48rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				text-align: center;
				color: #333333;
				line-height: 84rpx;
			}
		}
	}

	.finsh-exam {
		text-align: center;
		width: 116rpx;
		height: 50rpx;
		background: #f5f5f5;
		border-radius: 26rpx 0rpx 0rpx 26rpx;
		padding-right: 0rpx;
		font-size: 24rpx;
		font-weight: 400;
		text-align: center;
		line-height: 50rpx;
		color: red;

		.txt {
			width: 72rpx;
			height: 50rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #A3A3A3 !important;
			line-height: 50rpx;
		}
	}

	.err-exam {
		text-align: center;
		width: 116rpx;
		height: 50rpx;
		background: #f8b0b0;
		border-radius: 26rpx 0rpx 0rpx 26rpx;
		padding-right: 0rpx;
		font-size: 24rpx;
		font-weight: 400;
		text-align: center;
		line-height: 50rpx;
		color: red;

		.txt {
			width: 72rpx;
			height: 50rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #fff !important;
			line-height: 50rpx;
		}
	}

	.none-exam {
		text-align: center;
		width: 116rpx;
		height: 50rpx;
		background: #dff1fe;
		border-radius: 26rpx 0rpx 0rpx 26rpx;
		padding-right: 0rpx;
		font-size: 24rpx;
		font-weight: 400;
		text-align: center;
		line-height: 50rpx;
		color: red;

		.txt {
			width: 72rpx;
			height: 50rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #368dee !important;
			line-height: 50rpx;
		}
	}
	
	.on-line {
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-top: 30rpx;
	}

	.category {
		height: 320rpx;
		background: #ffffff;
		border: 2rpx solid #ededed;
		border-radius: 10rpx;
		box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(234, 234, 234, 0.5);
		margin-bottom: 32rpx;
		display: flex;
		flex-direction: column;

		.footer {
			display: flex;
			justify-content: space-between;
			border-radius: 0 0 10rpx 10rpx;
			flex: 1;

			.item {
				float: right;
				height: 50rpx;
				line-height: 50rpx;
				padding-top: 18rpx;

				.date-icon {
					margin-top: 10rpx;
					margin-right: 8rpx;
					float: left;
					width: 30rpx;
					height: 30rpx;
					background-image: url("../../static/data.svg");
					background-size: 100%;
					background-repeat: no-repeat;
				}

				.time-icon {
					margin-top: 11rpx;
					margin-right: 8rpx;
					float: left;
					width: 30rpx;
					height: 30rpx;
					background-image: url("../../static/time.svg");
					background-size: 100%;
					background-repeat: no-repeat;
				}
			}
		}

		.footer text {
			width: 208rpx;
			height: 34rpx;
			font-size: 24rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: left;
			color: #999999;
			line-height: 34rpx;
		}

		.subject {
			padding: 0 30rpx;
			display: flex;
			justify-content: center;
			height: 150rpx;

			.nubber {
				width: 210rpx;
				height: 150rpx;
				text-align: center;
				display: flex;
				flex-direction: column;

				.num {
					font-size: 72rpx;
					font-family: "宋体";
					color: #595a78;
					line-height: 120rpx;
				}

				.txt {
					font-size: 24rpx;
					text-align: center;
					color: #333333;
					line-height: 30rpx;
				}
			}
		}

		.exam-title {
			margin: 0 30rpx;
			border-bottom: 2rpx solid #f7f7f7;

			text {
				width: 630rpx;
				height: 82rpx;
				font-size: 32rpx;
				font-family: "宋体";
				font-weight: "宋体";
				text-align: left;
				color: #333333;
				line-height: 82rpx;
			}
		}
	}
</style>
