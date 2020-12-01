<template>
	<view class="box" v-if="detail!=''">
		<u-navbar :title="detail.examName" title-width="400"></u-navbar>
		<view class="portrait">
			<view class="titlel">
				<image src="../../static/timg.jpg" mode="widthFix"></image>
				<br>
				<b>{{stuName}}</b>
			</view>
		</view>
		<view class="so">
			<view class="detailed">
				<p>考试课程：{{detail.course.courseName}}</p>
				<p>所属教师：{{detail.teacher.teacherName}}</p>
				<p>开始考试：{{detail.startTime}}</p>
				<p>结束考试：{{detail.endTime}}</p>
				<p>考试时长：{{$utils.showTime(detail.duration)}}</p>
				<p>考试总分：{{detail.examScore}}分</p>
				<view class="tit">
					<text>
						考试要求：考试提交前途禁止退出考试，谨慎答题提交后不可修改。</text>
				</view>
			</view>
		</view>
		<view class="button" v-if="isStart">
			<button @click="startExam">
				开始考试
			</button>
		</view>
		<view class="button-disabele" v-else>
			<button disabled>
				考试未开始
			</button>
		</view>
		<view class="images">
			<image src="../../static/background.png" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
	import {
		showModal
	} from '@/utils'
	import store from '@/store/index.js'
	var _this
	export default {
		data() {
			return {
				stuName: store.state.student.StuName,
				detail: '',
				isStart: true
			}
		},
		methods: {
			goExamDetail() {
				var item = this.detail
				uni.navigateTo({
					url: '/pages/exam_detail/exam_detail',
					success: function(res) {
						res.eventChannel.emit('onExamDetail', {
							detail: item
						})
					}
				})
			},
			startExam() {
				var nowTime = Date.parse(new Date());
				var startTime = Date.parse(new Date(this.detail.startTime.replace(/-/g, '/')));
				var endTime = Date.parse(new Date(this.detail.endTime.replace(/-/g, '/')));
				var delay = 60 * 15; // 超时15分钟后不可以考试
				// console.log(this.detail.endTime);
				// console.log((nowTime >= endTime))
				if (nowTime < startTime) { //考试未开始
					showModal({
						title: "提示",
						content: "考试未开始",
					})
					return
				} else if ((startTime - nowTime) >= delay) { // 迟到15分钟不允许考试
					showModal({
						title: "提示",
						content: "迟到15分钟不允许考试",
					})
					return
				} else if (nowTime >= endTime) { // 考试结束
					showModal({
						title: "提示",
						content: "考试已结束",
					})
					return
				}
				showModal({
					title: "提示",
					content: "确定开始考试？",
					showCancel: true,
					success: function(res) {
						if (res.confirm) {
							// 进入考试页面
							_this.goExamDetail()
						}
					}
				})

			}
		},
		onLoad() {
			_this = this
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('onExamDetail', function(data) {
				_this.detail = data.detail
			})
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		min-height: 100vh;
		background-color: #f8fbfc;
	}

	.portrait image {
		width: 95rpx;
		height: 95rpx;
		border-radius: 50%;
		overflow: hidden;
	}

	.portrait {
		background: #f9fbfc;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60rpx;
	}

	.so {
		width: 690rpx;
		background: #ffffff;
		margin-left: 30rpx;
	}

	.tit {
		color: #d4d4d4;
		font-size: 20rpx;
		margin-top: 30rpx;
		padding-bottom: 30rpx;

		text {
			line-height: 34rpx;
		}
	}

	.detailed {
		padding-left: 40rpx;
		padding-top: 152rpx;

		p {
			line-height: 60rpx;
		}
	}

	.titlel {
		margin-top: 115rpx;
	}

	.button {
		width: 750rpx;
		height: 80rpx;
		display: flex;
		justify-content: center;
		margin-top: 40rpx;
	}

	.button-disabele {
		width: 750rpx;
		height: 80rpx;
		display: flex;
		justify-content: center;
		margin-top: 40rpx;

		button {
			width: 624rpx;
			height: 80rpx;
			background-image: #eee;
			border-radius: 80rpx;
			color: #797979;
			font-size: 32rpx;
		}
	}

	.button button {
		width: 624rpx;
		height: 80rpx;
		background-image: linear-gradient(to right, #61d3e5, #3b86f2);
		border-radius: 80rpx;
		color: #fff;
		font-size: 32rpx;
	}

	.images {
		margin-top: 60rpx;
		width: 750rpx;
		display: flex;
		justify-content: center;
		padding-bottom: 60rpx;
	}
</style>
