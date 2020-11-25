<template>
	<view class="exam-detail">
		<u-navbar title="" :is-back="false" :border-bottom="false">
			<view class="slot-wrap">
				<view class="exam-exit" @click="$utils.Back()">
					<text>退出</text>
				</view>
				<view class="right_app" @click="openapp"></view>
			</view>
		</u-navbar>

		<u-popup v-model="showApp" mode="top" border-radius="20">
			<view class="header-block"></view>
			<view class="app-content">
				<view class="app-header">
					<view class="exam-title ellipse-line">
						{{detail.examName}}
					</view>
					<view class="close-app" @click="closeapp"></view>
				</view>
				<view class="datilist">
					<view class="dati-item dati-suc">
						<text>1</text>
					</view>
					<view class="dati-item dati-err">
						<text>1</text>
					</view>
					<view class="dati-item dati-none">
						<text>1</text>
					</view>
				</view>
				<view class="exam-btn">
					<button class="exam-sumbit"><text>交 卷</text></button>
				</view>
			</view>
		</u-popup>

		<view class="time-header">
			<view class="time-left">
				<text>剩余时间</text>
			</view>
			<view class="time-num">
				<view class="item">
					<text>00</text>
				</view>
				<view class="dot">
					<text>:</text>
				</view>
				<view class="item">
					<text>00</text>
				</view>
				<view class="dot">
					<text>:</text>
				</view>
				<view class="item">
					<text>00</text>
				</view>
			</view>
			<view class="time-right">
				<text class="that-num">46</text>
				<text class="count">/ 50</text>
			</view>
		</view>
		<view class="line">
		</view>
		<view class="box">
			<view class="text-header">
				<text>【多选题】中国特色社会主义进入新时代，意味着（）。</text>
			</view>
			<view class="text-option">
				<text>A.近代以来久经磨难的中华民族迎来了从站起来。</text>
			</view>
			<view class="text-option option-action">
				<text>B.科学社会主义在二十一世纪的中国焕发出强大生机活力。</text>
			</view>
			<view class="text-option">
				<text>C.科学社会主义在二十一世纪的中国焕发出强大生机活力。</text>
			</view>
		</view>

		<view class="footer">
			<view class="footer-content">
				<view class="footer-left">
					<view class="item">
						<view class="suc-icon"></view>
						<text class="suc-num">18</text>
					</view>
					<view class="item">
						<view class="err-icon"></view>
						<text class="err-num">3</text>
					</view>
				</view>
				<view class="footer-right">
					<view class="right-item">
						<text>上一题</text>
					</view>
					<view class="right-item">
						<text>下一题</text>
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
				showApp: false,
				id:0,
				detail:""
			};
		},
		methods: {
			async getExamInfo(){
				
			},
			openapp() {
				this.showApp = true
			},
			closeapp(){
				this.showApp = false
			}
		},
		onLoad() {
			_this = this
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('onExamDetail', function(data) {
				_this.detail = data.detail
				// _this.getSelects()
			})
		}
	}
</script>
<style lang="scss" scoped>
	.slot-wrap {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 40rpx;
			flex: 1;
			.exam-exit {
				font-size: 36rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: left;
				color: #333333;
				line-height: 48rpx;
			}
			.right_app {
				background: url(../../static/exam_app.svg);
				background-repeat: no-repeat;
				background-size: 100%;
				height: 49rpx;
				width: 49rpx;
			}
			
		}
	.app-content{
		margin: 0 40rpx 25rpx 40rpx;
		.exam-btn{
			padding: 0rpx 200rpx 0 200rpx;
			.exam-sumbit{
				height: 88rpx;
				background: #fff;
				border-radius: 10rpx;
				font-size: 36rpx;
				line-height: 88rpx;
				color: #2db0fe;
				text-align: center;
				
			}
		}
		.datilist{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-start;
			padding-left: 10rpx;
			.dati-suc{
				background: #2db0fe;
				color: #fff;
			}
			.dati-err{
				background: #ff4545;
				color: #fff;
			}
			.dati-none{
				border: 4rpx solid #2db0fe;
				color: #2db0fe;
				text{
					line-height: 76rpx !important;
				}
			}
			.dati-item{
				width: 81.66666rpx;
				height:81.66666rpx;
				margin: 15rpx;
				border-radius: 100%;
				text-align: center;
				text{
					font-size: 36rpx;
					line-height: 81rpx;
				}
			}
		}
		.app-header{
			height: 88rpx;
			.close-app{
				width: 50rpx;
				height: 50rpx;
				position: absolute;
				right: 40rpx;
				background-image: url(../../static/app_close.svg);
				background-repeat: no-repeat;
				background-size: 100%;
				top: 18rpx;
				top: calc(18rpx + env(safe-area-inset-top)) !important;
			}
			.exam-title{
				position: relative;
				line-height: 88rpx;
				text-align: center;
				font-size: 32rpx;
				text{
					width: 520rpx;
					height: 88rpx;
					font-family: PingFangSC, PingFangSC-Light;
					font-weight: 300;
					text-align: center;
					color: #333333;
					line-height: 88rpx;
				}
			}
		}
	}
	.footer {
		position: fixed;
		bottom: 0;
		background: #fff;
		padding-bottom: env(safe-area-inset-bottom);
		box-shadow: 0rpx -2rpx 20rpx 20rpx #f5f5f5;

		.footer-content {
			background: #ffffff;
			min-width: 740rpx;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			padding: 0 40rpx;

			.footer-right {
				display: flex;
				line-height: 100rpx;

				.right-item:first-child {
					margin-right: 54rpx;
				}

				.right-item {
					height: 100rpx;
					width: 96rpx;
					font-size: 32rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: left;
					color: #44a7fc;
				}
			}

			.footer-left {
				display: flex;
				justify-content: space-between;
				line-height: 100rpx;
				box-flex: 1;

				.item:first-child {
					margin-right: 54rpx;
				}

				.item {
					display: flex;
					justify-content: space-between;

					.suc-num {
						width: 36rpx;
						height: 48rpx;
						font-size: 34rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						text-align: left;
						color: #299afa;
						line-height: 100rpx;
						position: relative;
						left: 10rpx;
					}

					.err-num {
						width: 36rpx;
						height: 48rpx;
						font-size: 34rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						text-align: left;
						color: #fd0000;
						line-height: 100rpx;
						position: relative;
						left: 10rpx;
					}

					.suc-icon {
						width: 40rpx;
						height: 40rpx;
						position: relative;
						top: 30rpx;
						background-image: url(../../static/exam_suc.svg);
						background-repeat: no-repeat;
						background-size: 100%;
					}

					.err-icon {
						width: 40rpx;
						height: 40rpx;
						position: relative;
						top: 30rpx;
						background-image: url(../../static/exam_err.svg);
						background-repeat: no-repeat;
						background-size: 100%;
					}
				}
			}
		}
	}

	
	.exam-detail {
		background: #fff;
		height: 100vh;
	}

	.line {
		margin: 0 30rpx;
		height: 1rpx;
		background: rgba(218, 218, 218, 0.3);
	}

	.time-header {

		padding: 0 32rpx;
		display: flex;
		height: 120rpx;
		justify-content: space-start;

		.time-left {
			width: 130rpx;
			height: 120rpx;
			font-size: 28rpx;
			font-weight: 300;
			text-align: right;
			color: #333333;
			line-height: 120rpx;
		}

		.time-num {
			width: 200rpx;
			height: 120rpx;
			display: flex;
			padding: 37rpx 15rpx;
			justify-content: space-between;

			.item {
				width: 44rpx;
				height: 46rpx;
				background: #333333;
				border-radius: 6rpx;
				color: #fff;
				text-align: center;
				line-height: 46rpx;

				text {
					width: 42rpx;
					height: 46rpx;
					font-size: 24rpx;
					font-weight: 300;
					color: #ffffff;
					line-height: 46rpx;
				}
			}

			.dot {
				line-height: 46rpx;
			}
		}

		.time-right {
			width: 96rpx;
			height: 120rpx;
			line-height: 120rpx;
			text-align: right;
			flex: 1;

			.that-num {
				width: 48rpx;
				height: 56rpx;
				font-size: 40rpx;
				color: #333333;
				line-height: 56rpx;
				padding-right: 5rpx;
			}

			.count {
				width: 48rpx;
				height: 40rpx;
				font-size: 28rpx;
				font-weight: 400;
				text-align: center;
				color: #cccccc;
				line-height: 40rpx;
			}
		}
	}

	.text-header {
		width: 670rpx;
		height: 100rpx;
		font-size: 36rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: left;
		color: #333333;
		line-height: 50rpx;
		margin-left: 32rpx;
		margin-top: 30rpx;
		display: flex;
	}

	.text-option {
		width: 670rpx;
		height: 160rpx;
		background: #eeeeee;
		border-radius: 4rpx;
		margin-left: 32rpx;
		margin-top: 30rpx;
	}

	.text-option text {
		font-size: 36rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		color: #888888;
		line-height: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 30rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;

	}

	.option-action {
		background: #2799fa !important;

		text {
			color: #ffffff !important;
		}
	}
</style>
