<template>
	<view id="index-content">
		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			<view class="content">
				<!-- 头部 -->
				<view class="header" :class="modalName=='viewModal'?'hide':''">
					<view class="headimg" @tap="showModal" data-target="viewModal">
						<image src="../../static/timg.jpg" mode="heightFix"></image>
					</view>
					<text class="nickname">{{StuName}}</text>
				</view>
				<!-- 搜索 -->
				<view class="search">
					<input v-model="searchKeyword" type="text" placeholder="请输入课程关键词" @confirm="onSearch">
					<image src="../../static/search@2x.png" mode="widthFix" @click="onSearch"></image>
				</view>
				<!-- 轮播 -->
				<swiper class="banner">
					<swiper-item class="item">
						<image src="../../static/banner.jpg" mode="heightFix">
					</swiper-item>
				</swiper>
				<!-- 错题集 -->
				<view class="cuoti">
					<view class="item" @click="$utils.href('/pages/wrongs/wrongs?title=全部错题')">
						<view class="item-top">
							<view class="cuoti-num ellipse-line">
								<text>{{WrongAnswerCount}}</text>
							</view>
							<view class="right">
								<image src="../../static/you@2x.png" mode="widthFix" />
							</view>
						</view>
						<view class="item-bottom">
							<view class="bottom-txt">
								<text>总错题集</text>
							</view>
						</view>
					</view>
					<view style="width:50rpx;"></view>
					<view class="item" @click="$utils.href('/pages/wrongs/wrongs?title=今日错题')">
						<view class="item-top">
							<view class="cuoti-num ellipse-line">
								<text>{{WrongAnswerTodayCount}}</text>
							</view>
							<view class="right">
								<image src="../../static/you@2x.png" mode="widthFix" />
							</view>
						</view>
						<view class="item-bottom">
							<view class="bottom-txt">
								<text>今日错题</text>
							</view>
						</view>
					</view>
				</view>

				<!-- 考试课程 -->
				<view class="cell-title">
					<view class="left-block"></view>
					<text class="title">
						考试课程
					</text>
					<text class="more" @click="$utils.href('/pages/all_exam/all_exam')">更多</text>
				</view>

				<view class="exam-list">
					<view class="exam-item" @click="goExam(item.id)" v-for="(item, index) in ExamList" :key="index">
						<view class="exambg">
							<image :src="'../../static/exambg'+(index+1)+'.png'" mode="aspectFill" />
						</view>
						<view class="exam-title ellipse-2">
							<text>{{item.examName}}</text>
						</view>
						<view class="exam-icon">
							<image src="../../static/examwin.png" mode="widthFix" />
						</view>
					</view>
					<view v-show="ExamList.length==0">
						<view class="exam-none"></view>
					</view>
				</view>

				<!-- 今日成绩 -->
				<view class="cell-title">
					<view class="left-block"></view>
					<text class="title">
						今日成绩
					</text>
					<text class="more" @click="$utils.href('/pages/score_list/score_list')">更多</text>
				</view>

				<view class="today-chengji" v-if="ExamScore!=''" @click="goExamResult(ExamScore.exam)">
					<view class="today-content">
						<view><text class="ellipse-2">{{ExamScore.exam.examName}}</text>
						</view>
						<view>考试成绩：{{ExamScore.score}}分</view>
					</view>
					<view class="bg">
						<image src="../../static/Oval2@2x@2x.png" mode="widthFix" />
					</view>
					<view class="icon">
						<image src="../../static/calendar@2x@2x.png" mode="widthFix" />
					</view>
				</view>
				<view class="today-chengji" v-else>
					<view class="today-content">
						<view><text class="ellipse-2">无考试记录</text>
						</view>
					</view>
					<view class="bg">
						<image src="../../static/Oval2@2x@2x.png" mode="widthFix" />
					</view>
					<view class="icon">
						<image src="../../static/calendar@2x@2x.png" mode="widthFix" />
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="DrawerClose" :class="modalName=='viewModal'?'show':''" @tap="hideModal">
			<!-- <text class="cuIcon-pullright footer-block"></text> -->
			<view class="footer-block close-block"></view>
		</view>

		<!-- 侧边栏 -->
		<scroll-view scroll-y class="DrawerWindow" :class="modalName=='viewModal'?'show':''">
			<view class="left-content">
				<!-- 头部 -->
				<view class="header left-header" @click="$utils.href('/pages/stu_info/stu_info')" :class="modalName=='viewModal'?'':'hide'">
					<view class="headimg" @tap="showModal" data-target="viewModal">
						<image src="../../static/timg.jpg" mode="heightFix"></image>
					</view>
					<text class="nickname">{{StuName}}</text>
				</view>
			</view>

			<view class="left-list">
				<view class="item active" @tap="hideModal()">
					<view class="item-active"></view>
					<view class="conetnt">
						<view class="icon">
							<image style="width: 40rpx;height: 40rpx;margin-top: 5rpx;" src="../../static/home_active.png" mode="widthFix" />
						</view>
						<text>主页</text>
					</view>
				</view>
				<view class="item" @click="$utils.href('/pages/all_exam/all_exam')">
					<view class="item-active"></view>
					<view class="conetnt">
						<view class="icon">
							<image style="width: 45rpx;height: 45rpx;margin-top: 2.5rpx;" src="../../static/chengji.png" mode="widthFix" />
						</view>
						<text>我的考试</text>
					</view>
				</view>

				<view class="item" @click="$utils.href('/pages/score_list/score_list')">
					<view class="item-active"></view>
					<view class="conetnt">
						<view class="icon">
							<image style="width: 55rpx;height: 55rpx;margin-top: -1rpx;" src="../../static/notice.png" mode="aspectFil" />
						</view>
						<text>我的成绩</text>
					</view>
				</view>

				<view class="item" @click="$utils.href('/pages/wrongs/wrongs?title=全部错题')">
					<view class="
				 item-active"></view>
					<view class="conetnt">
						<view class="icon">
							<image style="width: 55rpx;height: 55rpx;margin-top: -1rpx;" src="../../static/notice.png" mode="aspectFil" />
						</view>
						<text>我的错题</text>
					</view>
				</view>

				<view class="item">
					<view class="item-active"></view>
					<view class="conetnt">
						<view class="icon">
							<image style="width: 35rpx;height: 35rpx;margin-left: 8rpx;margin-top:8rpx;" src="../../static/kefu.png" mode="aspectFil" />
						</view>
						<text>在线客服</text>
					</view>
				</view>

				<view class="item">
					<view class="item-active"></view>
					<view class="conetnt">
						<view class="icon">
							<image style="width: 38rpx;height: 38rpx;margin-left: 8rpx;margin-top:8rpx;" src="../../static/about.png" mode="aspectFil" />
						</view>
						<text>关于我们</text>
					</view>
				</view>

				<view class="item" @click="Logout">
					<view class="conetnt">
						<view class="icon">
							<image style="width: 38rpx;height: 38rpx;margin-left: 8rpx;margin-top:9rpx;" src="../../static/tuichu@2x.png"
							 mode="aspectFil" />
						</view>
						<text>退出</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				modalName: null,
				WrongAnswerCount: 0,
				WrongAnswerTodayCount: 0,
				ExamList: [],
				ExamScore: "",
				searchKeyword: ""
			}
		},
		computed: {
			...mapState('student', ['StuName']),
		},
		async onPullDownRefresh() {
			await this.init();
			uni.stopPullDownRefresh();
		},
		methods: {
			...mapActions('student', ['Logout']),
			goExamResult(item) {
				uni.navigateTo({
					url: '/pages/exam_result/exam_result?id='+item.id
				})
			},
			goExamDetail(item) {
				uni.navigateTo({
					url: '/pages/exam_detail/exam_detail',
					success: function(res) {
						res.eventChannel.emit('onExamDetail', {
							detail: item
						})
					}
				})
			},
			goExamStart(item) {
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
				await this.$api.GetExamInfo(id).then(({
					data
				}) => {
					item = data.data
				})
				if (item.isEnable == '1' && item.isFinish == '1') { // 考试结束
					this.goExamResult(item)
				} else if (item.isEnable == '1' && item.isFinish == '0') { //正在考试
					// 判断是否答过题
					if (item.stuanswerdetails.length > 0) {
						// 判断是否已交卷
						if (item.stuscores.length > 0) {
							this.goExamResult(item)
						} else {
							// 继续答题
							this.goExamDetail(item)
						}
					} else {
						this.goExamStart(item)
					}
				} else if (item.isEnable == '0' && item.isFinish == '0') { // 考试未开始
					this.goExamStart(item)
				}
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			onSearch() {
				var keyword = this.searchKeyword
				uni.navigateTo({
					url: '/pages/search_list/search_list',
					success: function(res) {
						res.eventChannel.emit('onSearch', {
							keyword: keyword
						})
					}
				})
			},
			async init() {
				await this.$api.GetWrongAnswerCount().then(({
					data
				}) => {
					this.WrongAnswerCount = data.data
				})
				await this.$api.GetWrongAnswerTodayCount().then(({
					data
				}) => {
					this.WrongAnswerTodayCount = data.data
				})
				await this.$api.GetExamNewList({
					pageindex: 1,
					pagesize: 4
				}).then(({
					data
				}) => {
					this.ExamList = data.data.items
				})
				await this.$api.GetExamScoreOne().then(({
					data
				}) => {
					this.ExamScore = data.data ? data.data : ''
				})
			}
		},
		async onShow() {
			this.searchKeyword = ''
			await this.init()
			// #ifdef APP-PLUS  
			plus.navigator.closeSplashscreen()
			// #endif
		}
	}
</script>

<style lang="scss" scpoe>
	.today-chengji {
		width: 630rpx;
		height: 172rpx;
		background: #ffffff;
		border-radius: 20rpx;
		margin-top: 28rpx;
		position: relative;

		.today-content {
			position: absolute;
			top: 10rpx;
			left: 38rpx;
			width: 400rpx;
			height: 152rpx;
			font-size: 26rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: left;
			color: #a055e3;
			display: flex;
			flex-direction: column;

			view {
				flex: 1;
				display: flex;
				align-items: center;
			}

			view:nth-child(1) {
				font-size: 30rpx;
				font-weight: 700;
			}
		}

		.icon {
			position: absolute;
			right: 80rpx;
			top: 42rpx;

			image {
				height: 88rpx;
				width: 88rpx;
			}
		}

		.bg {
			position: absolute;
			right: 0;
			top: 0;

			image {
				height: 172rpx;
				float: right;
			}
		}
	}

	.exam-list {
		width: 632rpx;
		display: flex;
		justify-content: space-between;
		margin-top: 30rpx;
		flex-wrap: wrap;

		.exam-none {
			background-image: url(../../static/exam-none.svg);
			width: 356rpx;
			height: 306rpx;
			background-repeat: no-repeat;
			background-size: 356rpx 306rpx;
			margin-left: 137rpx;
		}

		.exambg {
			width: 100%;
			height: 130rpx;
			border-radius: 16rpx;
			position: absolute;
			z-index: -1;
			left: 0;
			top: 0;

			image {
				width: 100%;
				height: 130rpx;
				border-radius: 16rpx;
				z-index: -1;
			}
		}

		.exam-item:nth-child(1) {
			margin-bottom: 15rpx;
		}

		.exam-item:nth-child(2) {
			margin-bottom: 15rpx;
		}

		.exam-item {
			padding: 20rpx 16rpx;
			flex: 1;
			// width: 300rpx;
			height: 130rpx;
			border-radius: 16rpx;
			position: relative;

			.exam-title {
				width: 260rpx;
				font-size: 26rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: left;
				color: #ffffff;
				line-height: 34rpx;
				margin-left: 10rpx;

				text {
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: left;
					color: #ffffff;
					line-height: 34rpx;
				}
			}

			.exam-icon {
				width: 40rpx;
				height: 42rpx;
				position: absolute;
				right: 20rpx;
				top: 74rpx;

				image {
					width: 40rpx;
					height: 42rpx;
				}
			}
		}
	}

	#index-content {
		background: #fbf6ff;
		min-height: 100vh;
	}

	.header.hide {
		opacity: 0;
		// position: absolute;
	}

	.header {
		display: flex;
		height: 100rpx;
		transition: all 0.6s;

		.headimg {
			height: 100rpx;
			width: 100rpx;
			border-radius: 100rpx;

			image {
				height: 100rpx;
				width: 100rpx;
				border-radius: 100rpx;
			}
		}

		.nickname {
			margin-left: 20rpx;
			color: rgba(34, 34, 34, 1);
			font-size: 42rpx;
			text-align: left;
			line-height: 100rpx;
		}
	}

	.search {
		width: 100%;
		height: 100rpx;
		background: #ffffff;
		border-radius: 36rpx;
		box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(251, 246, 255, 0.1);
		margin-top: 40rpx;
		padding-left: 50rpx;
		padding-right: 50rpx;
		display: flex;

		input {
			height: 70rpx;
			line-height: 70rpx;
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: left;
			color: #7e7e7e;
			width: 100%;
			margin-top: 15rpx;
			border: none;
			outline: none;
			display: inline-block;
		}

		image {
			height: 44rpx;
			width: 44rpx;
			margin-top: calc(56rpx / 2);
		}
	}

	.banner {
		margin-top: 50rpx;
		height: 200rpx;
		flex: 1;
		border-radius: 30rpx;
		box-shadow: 0rpx 10rpx 40rpx 4rpx rgba(234, 216, 249, 0.3);

		.item {
			flex: 1;
			height: 200rpx;
			width: 100%;
			border-radius: 30rpx;

			image {
				height: 200rpx;
				width: 100%;
				border-radius: 30rpx;
			}
		}
	}

	.cuoti {
		height: 200rpx;
		width: 100%;
		display: flex;
		margin-top: 50rpx;

		.item {
			width: 290rpx;
			height: 200rpx;
			background: #ffffff;
			border-radius: 50rpx;
			box-shadow: 2rpx 4rpx 40rpx 0rpx rgba(221, 219, 219, 0.4);
			display: flex;
			flex-direction: column;

			.item-top {
				display: flex;

				.cuoti-num {
					margin-left: 58rpx;
					margin-top: 26rpx;
					width: 109rpx;
					height: 90rpx;
					color: #434242;
					font-size: 64rpx;
					font-family: PingFangSC, PingFangSC-Semibold;
					font-weight: 600;
					text-align: center;

					text {
						font-size: 64rpx;
						font-family: PingFangSC, PingFangSC-Semibold;
						font-weight: 600;
						line-height: 90rpx;
					}
				}

				.right {
					padding-top: 52rpx;
					flex: 1;
					position: relative;

					image {
						width: 26rpx;
						height: 40rpx;
						position: absolute;
						right: 72rpx;
					}
				}
			}

			.item-bottom {
				padding-top: 10rpx;
				color: #888888;
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				line-height: 44rpx;
			}
		}
	}

	.cell-title {
		width: 100%;
		height: 50rpx;
		display: flex;
		margin-top: 50rpx;

		.left-block {
			width: 10rpx;
			height: 32rpx;
			background: #a055e3;
			border-radius: 6rpx;
			margin-top: 10rpx;
		}

		.title {
			padding-left: 10rpx;
			color: #444444;
			font-size: 36rpx;
			font-family: PingFangSC, PingFangSC-Semibold;
			font-weight: 600;
			text-align: left;
			line-height: 50rpx;
			flex: 1;
		}

		.more {
			width: 56rpx;
			height: 40rpx;
			color: #a055e3;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: center;
			line-height: 50rpx;
		}
	}

	.left-content {
		padding-top: calc(var(--status-bar-height));
	}

	.left-header {
		margin-top: 48rpx;
		padding-left: 60rpx;
	}

	.left-list {
		margin-top: 50rpx;
		padding-right: 80rpx;

		.item:active {
			background: rgba($color: #000000, $alpha: 0.05);
		}

		.active {
			background: #f6edff;
			display: flex;

			.item-active {
				width: 15rpx;
				border-radius: 0 20rpx 20rpx 0;
				height: 100%;
				background: #9237e3;
			}

			.conetnt {
				margin-left: calc(70rpx - 15rpx) !important;

				text {
					color: #9237e3 !important;
				}
			}
		}

		.item {
			margin: 10rpx 0;
			height: 100rpx;
			border-radius: 0 20rpx 20rpx 0;

			.conetnt {
				display: flex;
				height: 100rpx;
				margin-left: 70rpx;

				.icon {
					width: 50rpx;
					height: 50rpx;
					margin-top: 25rpx;

					image {
						width: 50rpx;
						height: 50rpx;
					}
				}

				text {
					line-height: 100rpx;
					font-size: 32rpx;
					font-weight: 700;
					color: #828085;
					font-family: PingFangSC, PingFangSC-Regular;
					padding-left: 60rpx;
				}
			}
		}
	}
</style>

<style scoped>
	page {
		width: 100vw;
		overflow: hidden;
		background: #fbf6ff;
	}

	.content {
		padding-left: 60rpx;
		padding-right: 60rpx;
		padding-top: calc(30rpx + var(--status-bar-height));
	}

	.DrawerPage {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0vw;
		background-color: #fbf6ff;
		transition: all 0.2s;
	}

	.DrawerPage.show {
		transform: scale(0.75, 0.75);
		left: 65vw;
		box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
		border-radius: 40rpx;
	}

	.DrawerWindow {
		position: absolute;
		width: 65vw;
		height: 100vh;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.2s;
		/* padding: 100upx 0; */
	}

	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
	}

	.DrawerClose {
		position: absolute;
		width: 45vw;
		height: 100vh;
		right: 0;
		top: 0;
		color: transparent;
		padding-bottom: 30upx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background-image: linear-gradient(90deg,
			rgba(0, 0, 0, 0.01),
			rgba(0, 0, 0, 0.6));
		letter-spacing: 5px;
		font-size: 50upx;
		opacity: 0;
		pointer-events: none;
		transition: all 0.2s;
	}

	.DrawerClose.show {
		opacity: 1;
		pointer-events: all;
		width: 35vw;
		color: #fff;
	}

	.DrawerClose>.close-block {
		height: 60rpx;
		width: 60rpx;
		background-image: url('../../static/X@2X.png');
		background-size: 60rpx 60rpx;
		background-repeat: no-repeat;
	}

	.DrawerPage .cu-bar.tabbar .action button.cuIcon {
		width: 64upx;
		height: 64upx;
		line-height: 64upx;
		margin: 0;
		display: inline-block;
	}

	.DrawerPage .cu-bar.tabbar .action .cu-avatar {
		margin: 0;
	}

	.DrawerPage .nav {
		flex: 1;
	}

	.DrawerPage .nav .cu-item.cur {
		border-bottom: 0;
		position: relative;
	}

	.DrawerPage .nav .cu-item.cur::after {
		content: '';
		width: 10upx;
		height: 10upx;
		background-color: currentColor;
		position: absolute;
		bottom: 10upx;
		border-radius: 10upx;
		left: 0;
		right: 0;
		margin: auto;
	}

	.DrawerPage .cu-bar.tabbar .action {
		flex: initial;
	}
</style>
