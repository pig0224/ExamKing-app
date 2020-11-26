<template>
	<view>
		<u-navbar title-color="#ffffff" back-icon-color="#ffffff" :border-bottom="false" title="错题本" :background="{background:'linear-gradient(90deg, rgba(28,162,251,1), rgba(2,123,254,1))'}"></u-navbar>
		<view class="box" v-show="detail!=''">
			<view class="cuoti-header" v-if="detail!=''">
				<view class="cuoti-one">
					<text>{{stuName}}{{$utils.QuestionAnswerCount(detail.stuanswerdetails, '0')}}条错题</text>
				</view>
				<view class="cuoti-two">
					<text>错题率{{$utils.QuestionPercent(detail.examquestions.length, detail.stuanswerdetails.length)}}</text>
				</view>
			</view>

			<view class="dq">
				<view class="subject">
					<view class="nubber">
						<text class="num">{{$utils.QuestionAnswerCount(detail.stuanswerdetails, '0')}}</text>
						<text class="txt">全部错题</text>
					</view>
					<view class="nubber">
						<text class="num">{{$utils.QuestionTypeCount(detail.stuanswerdetails, 'judge', '0')}}</text>
						<text class="txt">是非题</text>
					</view>
					<view class="nubber">
						<text class="num">{{$utils.QuestionTypeCount(detail.stuanswerdetails, 'select','0')+$utils.QuestionTypeCount(detail.stuanswerdetails, 'single','0')}}</text>
						<text class="txt">选择题</text>
					</view>
				</view>
			</view>
		</view>

		<view class="wrong-list">
			<view class="wrong-list-item" v-for="(item, index) in select.items" :key="'select'+index">
				<view class="exam-title">
					<text>【多选题】{{item.select.question}}</text>
				</view>
				<view class="title-line"></view>
				<view class="select-option" v-show="item.select.optionA!=''">
					<view class="select-content" :class="item.stuanswerdetail.stuanswer.split('、').indexOf('A')!=-1?'error-option':''">
						<text>A.{{item.select.optionA}}</text>
					</view>
				</view>
				<view class="select-option" v-show="item.select.optionB!=''">
					<view class="select-content" :class="item.stuanswerdetail.stuanswer.split('、').indexOf('B')!=-1?'error-option':''">
						<text>B.{{item.select.optionB}}</text>
					</view>
				</view>
				<view class="select-option" v-show="item.select.optionC!=''">
					<view class="select-content" :class="item.stuanswerdetail.stuanswer.split('、').indexOf('C')!=-1?'error-option':''">
						<text>C.{{item.select.optionC}}</text>
					</view>
				</view>
				<view class="select-option" v-show="item.select.optionD!=''">
					<view class="select-content" :class="item.stuanswerdetail.stuanswer.split('、').indexOf('D')!=-1?'error-option':''">
						<text>D.{{item.select.optionA}}</text>
					</view>
				</view>
				<view class="answer">
					<text>正确答案：{{item.stuanswerdetail.answer}}</text>
				</view>
				<view class="title-line"></view>
				<view class="ideas" @click="onShowIdeas(item.select.id, 'select')">
					<text>查看解析</text>
				</view>
			</view>

			<view class="wrong-list-item" v-for="(item, index) in single.items" :key="'single'+index">
				<view class="exam-title">
					<text>【单选题】{{item.single.question}}</text>
				</view>
				<view class="title-line"></view>
				<view class="select-option" v-show="item.single.optionA!=''">
					<view class="select-content" :class="item.stuanswerdetail.stuanswer.split('、').indexOf('A')!=-1?'error-option':''">
						<text>A.{{item.single.optionA}}</text>
					</view>
				</view>
				<view class="select-option" v-show="item.single.optionB!=''">
					<view class="select-content" :class="item.stuanswerdetail.stuanswer.split('、').indexOf('B')!=-1?'error-option':''">
						<text>B.{{item.single.optionB}}</text>
					</view>
				</view>
				<view class="select-option" v-show="item.single.optionC!=''">
					<view class="select-content" :class="item.stuanswerdetail.stuanswer.split('、').indexOf('C')!=-1?'error-option':''">
						<text>C.{{item.single.optionC}}</text>
					</view>
				</view>
				<view class="select-option" v-show="item.single.optionD!=''">
					<view class="select-content" :class="item.stuanswerdetail.stuanswer.split('、').indexOf('D')!=-1?'error-option':''">
						<text>D.{{item.single.optionA}}</text>
					</view>
				</view>
				<view class="answer">
					<text>正确答案：{{item.stuanswerdetail.answer}}</text>
				</view>
				<view class="title-line"></view>
				<view class="ideas" @click="onShowIdeas(item.single.id, 'single')">
					<text>查看解析</text>
				</view>
			</view>

			<view class="wrong-list-item" v-for="(item, index) in judge.items" :key="'select'+index">
				<view class="exam-title">
					<text>【是非题】{{item.judge.question}}</text>
				</view>
				<view class="title-line"></view>
				<view class="select-option">
					<view class="select-content" :class="item.stuanswerdetail.stuanswer=='1'?'error-option':''">
						<text>正确。</text>
					</view>
				</view>
				<view class="select-option">
					<view class="select-content" :class="item.stuanswerdetail.stuanswer=='0'?'error-option':''">
						<text>错误。</text>
					</view>
				</view>
				<view class="answer">
					<text>正确答案：{{item.stuanswerdetail.answer=='1'?'正确':'错误'}}</text>
				</view>
				<view class="title-line"></view>
				<view class="ideas" @click="onShowIdeas(item.judge.id, 'judge')">
					<text>查看解析</text>
				</view>
			</view>

		</view>

		<u-popup v-model="showIdeas" mode="bottom" border-radius="20">
			<view class="ideas-line">
			</view>
			<view class="ideas-content">
				<text>{{ideas}}</text>
			</view>
			<view class="footer-block"></view>
		</u-popup>
		<view class="footer-block">
		</view>
	</view>
</template>

<script>
	import store from '@/store'
	var _this
	export default {
		data() {
			return {
				detail: "",
				showIdeas: false,
				ideas: "",
				stuName: store.state.student.StuName,
				single: {
					pageindex: 1,
					pagesize: 10,
					hasNextPages: true,
					items: []
				},
				select: {
					pageindex: 1,
					pagesize: 10,
					hasNextPages: true,
					items: []
				},
				judge: {
					pageindex: 1,
					pagesize: 10,
					hasNextPages: true,
					items: []
				}
			};
		},
		methods: {
			onShowIdeas(id, questiontype) {
				this.$api.GetQuestionIdeas({
					id,
					questiontype
				}).then(({
					data
				}) => {
					this.ideas = data.data
					this.showIdeas = true
				})
			},
			async getSelects() {
				return await this.$api.GetWrongSelects({
					examid: _this.detail.id,
					pageindex: _this.select.pageindex,
					pagesize: _this.select.pagesize
				}).then(({
					data
				}) => {
					if (_this.select.hasNextPages == false) {
						return _this.getSingles()
					} else {
						if (_this.select.pageindex <= data.data.totalPages) {
							if (_this.select.pageindex == 1) {
								_this.select.items = []
							}
							data.data.items.forEach((item) => {
								_this.select.items.push(item)
							})
						}
						_this.select.hasNextPages = data.data.hasNextPages
						_this.select.pageindex++
						if (data.data.hasNextPages == false && data.data.pageIndex == 1) {
							return _this.getSingles()
						}
					}
				})
			},
			async getSingles() {
				return await this.$api.GetWrongSingles({
					examid: _this.detail.id,
					pageindex: _this.single.pageindex,
					pagesize: _this.single.pagesize
				}).then(({
					data
				}) => {
					if (_this.single.hasNextPages == false) {
						return _this.getJudges()
					} else {
						if (_this.single.pageindex <= data.data.totalPages) {
							if (_this.single.pageindex == 1) {
								_this.single.items = []
							}
							data.data.items.forEach((item) => {
								_this.single.items.push(item)
							})
						}
						_this.single.hasNextPages = data.data.hasNextPages
						_this.single.pageindex++
						if (data.data.hasNextPages == false && data.data.pageIndex == 1) {
							return _this.getJudges()
						}
					}
				})
			},
			async getJudges() {
				return await this.$api.GetWrongJudges({
					examid: _this.detail.id,
					pageindex: _this.judge.pageindex,
					pagesize: _this.judge.pagesize
				}).then(({
					data
				}) => {
					if (_this.judge.hasNextPages != false) {
						if (_this.judge.pageindex <= data.data.totalPages) {
							if (_this.judge.pageindex == 1) {
								_this.judge.items = []
							}
							data.data.items.forEach((item) => {
								_this.judge.items.push(item)
							})
						}
						_this.judge.hasNextPages = data.data.hasNextPages
						_this.judge.pageindex++
					}
				})
			}
		},
		async onReachBottom() {
			await this.getSelects()
		},
		onLoad() {
			_this = this
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('onWrongDetail', function(data) {
				_this.detail = data.detail
				_this.getSelects()
			})
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		background-image: url(../../static/wrong_bg.png);
		background-repeat: no-repeat;
		background-size: 750rpx 292rpx;
		height: 292rpx;
		position: relative;

		.cuoti-header {
			height: 200rpx;
			z-index: 999;
			padding-left: 60rpx;
			padding-top: 26rpx;
			.cuoti-one{
				text{
					height: 50rpx;
					font-size: 36rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: left;
					color: #ffffff;
					line-height: 50rpx;
				}
			}
			.cuoti-two{
				padding-top: 10rpx;
				text{
					height: 34rpx;
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: left;
					color: #ffffff;
					line-height: 34rpx;
				}
			}
		}

		.image-header {
			position: absolute;
			left: 0;
			top: 0;

			image {
				height: 292rpx;
				width: 750rpx;
			}
		}
	}

	.ideas-line {
		margin: 25rpx auto 25rpx auto;
		width: 200rpx;
		height: 8rpx;
		background: rgba(216, 216, 216, 0.6);
		border-radius: 6rpx;
	}

	.ideas-content {
		padding: 0 60rpx 30rpx 60rpx;

		text {
			font-size: 40rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: center;
			color: #666666;
			line-height: 56rpx;
		}
	}

	.subject {
		display: flex;
		justify-content: center;
		height: 150rpx;

		.nubber {
			width: 210rpx;
			// height: 150rpx;
			text-align: center;
			display: flex;
			flex-direction: column;

			.num {

				font-size: 48rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				text-align: left;
				color: #333333;
				line-height: 66rpx;
				margin-top: 20rpx;
				text-align: center;
			}

			.txt {
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: left;
				color: #999999;
				line-height: 40rpx;
				text-align: center;
			}
		}
	}

	.dq {
		width: 630rpx;
		// height: 160rpx;
		background: #ffffff;
		border-radius: 10rpx;
		box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(206, 204, 204, 0.5);
		margin-left: 60rpx;
		position: absolute;
		top: 144rpx;
	}

	.wrong-list {
		padding: 30rpx 60rpx;

		.wrong-list-item {
			width: 630rpx;
			background: #ffffff;
			border-radius: 16rpx;
			box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(117, 117, 117, 0.28);
			margin-bottom: 30rpx;

			.exam-title {
				padding: 30rpx 25rpx 25rpx 25rpx;
				font-size: 30rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: left;
				color: #333333;
				line-height: 40rpx;
			}

			.title-line {
				width: 630rpx;
				height: 2rpx;
				background: rgba(216, 216, 216, 0.76);
			}

			.answer {
				padding: 30rpx;

				text {
					width: 254rpx;
					height: 40rpx;
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Light;
					font-weight: 300;
					text-align: center;
					color: #333333;
					line-height: 40rpx;
				}
			}

			.ideas {
				padding: 35rpx;
				text-align: center;

				text {
					font-size: 32rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: left;
					color: #1598fc;
				}
			}

			.select-option {
				padding: 30rpx 30rpx 0 30rpx;

				.error-option {
					background: #f66565 !important;

					text {
						color: #ffffff !important;
					}
				}

				.select-content {
					background: #eeeeee;
					border-radius: 4rpx;
					padding: 20rpx 30rpx;

					text {
						font-size: 30rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						text-align: left;
						color: #888888;
						line-height: 50rpx;
					}
				}
			}
		}
	}
</style>
