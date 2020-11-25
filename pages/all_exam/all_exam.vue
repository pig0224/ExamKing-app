<template>
	<view class="box">
		<u-tabs :list="tabs" :is-scroll="false" :current="current" @change="changeTab"></u-tabs>
		<view class="on-line" style="padding-top: 30rpx;">
			<view class="category" v-for="(index, item) in 5" :key="index">
				<view class="exam-title">
					<text>大学生形式与政策课程 在线考试</text>
				</view>
				<view class="subject">
					<view class="nubber">
						<text class="num">50</text>
						<text class="txt">总题数</text>
					</view>
					<view class="nubber">
						<text class="num">20</text>
						<text class="txt">是非题</text>
					</view>
					<view class="nubber">
						<text class="num">30</text>
						<text class="txt">选择题</text>
					</view>
				</view>

				<view class="footer">
					<view class="item" style="margin-left: 30rpx;">
						<!-- <image src="../../static/data.svg" style="margin-right: 8rpx;" mode="aspectFit"></image> -->
						<view class="date-icon"></view>
						<text>2020-10-29 18:00</text>
					</view>
					<view class="item" style="padding-left: 30rpx;">
						<!-- <image src="../../static/time.svg" style="margin-right: 8rpx;" mode="aspectFit"></image> -->
						<view class="time-icon"></view>
						<text>90分钟</text>
					</view>
					<view class="item" style="flex: 1;">
						<view class="none-exam" style="float: right;">
							<text class="txt">未考试</text>
						</view>
						<view class="finsh-exam" style="display: none;float: right;">
							<text class="txt">已结束</text>
						</view>
						<view class="err-exam" style="display: none;float: right;">
							<text class="txt">缺考</text>
						</view>
					</view>
				</view>
			</view>

		</view>
		<view class="footer-block"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [{
					name: '考试中'
				}, {
					name: '未考试'
				}, {
					name: '已结束',
				}],
				current: 0
			};
		},
		methods:{
			changeTab(index){
				this.current = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		background: #F5F6F7;
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
