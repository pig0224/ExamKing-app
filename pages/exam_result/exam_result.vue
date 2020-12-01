<template>
	<view class="exam">
		<u-navbar :background="{background:'#44a7fc'}" :border-bottom="false" back-icon-color="#fff"></u-navbar>
		<view v-show="score!=''">
			<view class="a">
				<view class="aa">
					<text>{{score.score}}</text>
					<text class="fen">分</text>
				</view>
			</view>
			<view class="b">
				<p>本次考试成绩</p>
			</view>
			<view class="c" v-show="exam!=''">
				<view class="div1">
					<text class="d1">{{suc}}</text>
					<text class="div_1">%</text>
					<view class="p"><text>正确率</text></view>
				</view>
				<view class="div1">
					<text class="d1">{{useTime}}</text>
					<text class="div_1">min</text>
					<view class="p"><text>考试用时</text></view>
				</view>
				<view class="div1">
					<text class="d1">{{err}}</text>
					<text class="div_1">题</text>
					<view class="p"><text>错题数</text></view>
				</view>
			</view>
			<view class="d">
				<u-button class="button" @click="goExamDetail">查看详情</u-button>
			</view>

		</view>
	</view>

</template>

<script>
	var _this
	export default {
		data() {
			return {
				score: "",
				exam: "",
				useTime: "0",
				suc: "0",
				err: "0"
			}
		},
		methods: {
			goExamDetail() {
				uni.navigateTo({
					url: '/pages/exam_detail/exam_detail',
					success: function(res) {
						res.eventChannel.emit('onExamDetail', {
							detail: _this.exam
						})
					}
				})
			},
		},
		async onLoad(e) {
			_this = this
			var id = e.id
			this.$api.GetExamScore(id).then(({
				data
			}) => {
				_this.score = data.data
			}).catch((err) => {
				console.log(err)
			})
			
			this.$api.GetExamInfo(id).then(({
				data
			}) => {
				_this.exam = data.data
				// 计算正确率
				var sucNum = _this.$utils.QuestionAnswerCount(data.data.stuanswerdetails, "1")
				_this.suc = _this.$utils.QuestionPercent(data.data.examquestions.length, sucNum).split("%")[0].split(".")[0]
				_this.err = _this.$utils.QuestionAnswerCount(data.data.stuanswerdetails, "0")
				// 计算用时多少分钟
				var startTime = new Date(_this.exam.startTime.replace(/-/g, '/'))
				var paperTime = new Date(_this.score.createTime.replace(/-/g, '/'))
				var useTime = (paperTime.getTime() - startTime.getTime()) / 60000
				_this.useTime = parseInt(useTime)
			}).catch((err) => {
				console.log(err)
			})
		}
	}
</script>

<style lang="scss" scoped>
	* {
		background-color: #44a7fc;
	}

	.exam {
		min-height: 100vh;
	}

	.a {
		height: 200rpx;
		display: flex;
		justify-content: center;
	}

	.aa {
		height: 200rpx;
		font-size: 144rpx;
		font-family: STSongti, STSongti-SC;
		font-weight: SC;
		color: #ffffff;
		line-height: 200rpx;
		display: flex;

		.fen {
			width: 96rpx;
			height: 134rpx;
			font-size: 96rpx;
			font-family: STSongti, STSongti-SC;
			font-weight: SC;
			text-align: left;
			color: #ffffff;
			line-height: 134rpx;
			position: relative;
			top: 36rpx;
		}
	}

	.b {
		width: 216rpx;
		height: 50rpx;
		font-size: 36rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: left;
		color: #ffffff;
		line-height: 50rpx;
		margin: 0 auto;
		margin-bottom: 72rpx;
	}

	.c {

		height: 194rpx;
		display: flex;
		justify-content: center;
		margin-bottom: 468rpx;
	}

	.div1 {
		text-align: center;
		width: 180rpx;
		height: 194rpx;
		//display: flex;
		float: left;

		.p {
			text-align: center;
		}
	}

	.d1 {
		width: 58rpx;
		height: 66rpx;
		font-size: 48rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: left;
		color: #ffffff;
		line-height: 66rpx;
	}

	.div_1 {
		width: 28rpx;
		height: 40rpx;
		font-size: 28rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: left;
		color: #ffffff;
		line-height: 88rpx;

	}

	.p {
		height: 40rpx;
		font-size: 28rpx;
		font-family: STSongti, STSongti-SC;
		font-weight: SC;
		color: #ffffff;
		line-height: 40rpx;
	}

	.div2 {

		width: 180rpx;
		height: 194rpx;

		float: left;

	}

	.d2 {
		width: 58rpx;
		height: 66rpx;
		font-size: 48rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: left;
		color: #ffffff;
		line-height: 66rpx;
	}

	.div_2 {
		width: 48rpx;
		height: 40rpx;
		font-size: 28rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: left;
		color: #ffffff;
		line-height: 88rpx;
	}

	.p2 {
		width: 112rpx;
		height: 40rpx;
		font-size: 28rpx;
		font-family: STSongti, STSongti-SC;
		font-weight: SC;
		text-align: left;
		color: #ffffff;
		line-height: 40rpx;
		margin-top: 8rpx;
	}

	.div3 {
		width: 180rpx;
		height: 194rpx;
		//display: flex;
		float: left;

	}

	.d3 {
		width: 58rpx;
		height: 66rpx;
		font-size: 48rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: left;
		color: #ffffff;
		line-height: 66rpx;
	}

	.div_3 {
		width: 28rpx;
		height: 40rpx;
		font-size: 28rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: left;
		color: #ffffff;
		line-height: 88rpx;

	}

	.p3 {
		width: 84rpx;
		height: 40rpx;
		font-size: 28rpx;
		font-family: STSongti, STSongti-SC;
		font-weight: SC;
		text-align: left;
		color: #ffffff;
		line-height: 55rpx;
	}

	.d {
		width: 540rpx;
		height: 80rpx;
		background: #ffffff;
		border-radius: 8rpx;
		margin: auto;
	}

	.button {
		margin-top: 28rpx;
		margin-bottom: 18rpx;
		// width: 128rpx;
		// height: 44rpx;
		font-size: 32rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: left;
		color: #44a7fc;
		line-height: 44rpx;

	}
</style>
