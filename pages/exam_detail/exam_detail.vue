<template>
	<view class="exam-detail">
		<u-navbar title="" v-if="detail.isEnable=='1'&&detail.isFinish=='0'&&detail.stuscores.length==0" :is-back="false"
		 :border-bottom="false">
			<view class="slot-wrap">
				<view class="exam-exit" @click="exitExam">
					<text>退出</text>
				</view>
				<view class="right_app" @click="openapp"></view>
			</view>
		</u-navbar>
		<u-navbar v-else :title="detail.examName">
			<view slot="right">
				<view class="show-ideas" @click="onShowIdeas">
					<text>分析</text>
				</view>
			</view>
		</u-navbar>

		<u-popup v-model="showApp" mode="top" border-radius="20">
			<view class="app-content">
				<u-navbar title="" :is-back="false" :border-bottom="false">
					<view class="app-header">
						<view class="exam-title ellipse-line" style="text-align: center;">
							{{detail.examName}}
						</view>
						<view class="close-app" @click="closeapp"></view>
					</view>
				</u-navbar>
				<view class="datilist">
					<view @click="goQuestion(index)" class="dati-item" :class="'dati-' + item.status" v-for="(item, index) in questionDic"
					 :key="index">
						<text>{{index+1}}</text>
					</view>
				</view>
				<view class="exam-btn">
					<button class="exam-sumbit" @click="submitExam"><text>交 卷</text></button>
				</view>
			</view>
		</u-popup>

		<view v-if="detail.isEnable=='1'&&detail.isFinish=='0'&&detail.stuscores.length==0">
			<view class="time-header" v-show="detail!=''">
				<view class="time-left">
					<text>剩余时间</text>
				</view>
				<view class="time-num">
					<view class="item">
						<text>{{examTime.hour}}</text>
					</view>
					<view class="dot">
						<text>:</text>
					</view>
					<view class="item">
						<text>{{examTime.min}}</text>
					</view>
					<view class="dot">
						<text>:</text>
					</view>
					<view class="item">
						<text>{{examTime.second}}</text>
					</view>
				</view>
				<view class="time-right">
					<text class="that-num">{{nowQuestionNum}}</text>
					<text class="count">/ {{QuestionCount}}</text>
				</view>
			</view>
			<view class="line">
			</view>
		</view>

		<view class="" v-else>
			<view v-show="question!=''">
				<view class="exam-header" v-show="detail!=''">
					<view class="exam-title">
						<text v-if="question.questionType=='select'">
							【多选题】{{question.select.question}}
						</text>
						<text v-if="question.questionType=='single'">
							【单选题】{{question.single.question}}
						</text>
						<text v-if="question.questionType=='judge'">
							【是非题】{{question.judge.question}}
						</text>
					</view>
					<view class="time-right">
						<text class="that-num">{{nowQuestionNum}}</text>
						<text class="count">/ {{QuestionCount}}</text>
					</view>
				</view>
				<view class="line">
				</view>
			</view>
		</view>

		<uni-transition :mode-class="['slide-right']" :show="showQuestion">
			<view class="box" v-if="showQuestion">
				<view class="text-header" v-show="detail.stuscores.length==0">
					<text v-if="question.questionType=='select'">
						【多选题】{{question.select.question}}
					</text>
					<text v-if="question.questionType=='single'">
						【单选题】{{question.single.question}}
					</text>
					<text v-if="question.questionType=='judge'">
						【是非题】{{question.judge.question}}
					</text>
				</view>
				<view v-if="question.questionType=='select'">
					<view class="text-option" :class="answer.indexOf('A') != -1 ? isRight=='1'?'option-action':'option-error':''"
					 data-type="select" data-option="A" v-if="question.select.optionA!=''" @click="selectOption">
						<text>A.{{question.select.optionA}}</text>
					</view>
					<view class="text-option" :class="answer.indexOf('B') != -1 ? isRight=='1'?'option-action':'option-error' :''"
					 data-type="select" data-option="B" v-if="question.select.optionB!=''" @click="selectOption">
						<text>B.{{question.select.optionB}}</text>
					</view>
					<view class="text-option" :class="answer.indexOf('C') != -1 ? isRight=='1'?'option-action':'option-error':''"
					 data-type="select" data-option="C" v-if="question.select.optionC!=''" @click="selectOption">
						<text>C.{{question.select.optionC}}</text>
					</view>
					<view class="text-option" :class="answer.indexOf('D') != -1 ? isRight=='1'?'option-action':'option-error':''"
					 data-type="select" data-option="D" v-if="question.select.optionD!=''" @click="selectOption">
						<text>C.{{question.select.optionD}}</text>
					</view>
				</view>

				<view v-if="question.questionType=='single'">
					<view class="text-option" :class="answer.indexOf('A') != -1 ? isRight=='1'?'option-action':'option-error':''"
					 data-type="single" data-option="A" v-if="question.single.optionA!=''" @click="selectOption">
						<text>A.{{question.single.optionA}}</text>
					</view>
					<view class="text-option" :class="answer.indexOf('B') != -1 ? isRight=='1'?'option-action':'option-error':''"
					 data-type="single" data-option="B" v-if="question.single.optionB!=''" @click="selectOption">
						<text>B.{{question.single.optionB}}</text>
					</view>
					<view class="text-option" :class="answer.indexOf('C') != -1 ? isRight=='1'?'option-action':'option-error':''"
					 data-type="single" data-option="C" v-if="question.single.optionC!=''" @click="selectOption">
						<text>C.{{question.single.optionC}}</text>
					</view>
					<view class="text-option" :class="answer.indexOf('D') != -1 ? isRight=='1'?'option-action':'option-error':''"
					 data-type="single" data-option="D" v-if="question.single.optionD!=''" @click="selectOption">
						<text>C.{{question.single.optionD}}</text>
					</view>
				</view>

				<view v-if="question.questionType=='judge'">
					<view class="text-option" data-type="judge" :class="answer.indexOf('1') != -1 ? isRight=='1'?'option-action':'option-error':''"
					 data-option="1" @click="selectOption">
						<text>正确。</text>
					</view>
					<view class="text-option" :class="answer.indexOf('0') != -1 ? isRight=='1'?'option-action':'option-error':''"
					 data-type="judge" data-option="0" @click="selectOption">
						<text>错误。</text>
					</view>
				</view>

				<view class="question-answer" v-show="questionAnswer!=''">
					<text v-if="question.questionType=='judge'">正确答案：{{questionAnswer=='1'?'正确':'错误'}}</text>
					<text v-else>
						正确答案：{{questionAnswer}}
					</text>
				</view>
			</view>
		</uni-transition>

		<view class="footer" v-show="detail!=''">
			<view class="footer-content">
				<view class="footer-left">
					<view class="item">
						<view class="suc-icon"></view>
						<text class="suc-num">{{rightNum}}</text>
					</view>
					<view class="item">
						<view class="err-icon"></view>
						<text class="err-num">{{wrongNum}}</text>
					</view>
				</view>
				<view class="footer-right">
					<view class="right-item" @click="preQuestion">
						<text>上一题</text>
					</view>
					<view class="right-item" @click="nextQuestion">
						<text>下一题</text>
					</view>
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
		<view class="footer-block"></view>
	</view>
</template>

<script>
	import uniTransition from '@/components/uni-transition/uni-transition.vue'
	import {
		showModal,
		Validation
	} from '@/utils'
	var _this
	export default {
		components: {
			uniTransition
		},
		data() {
			return {
				showApp: false,
				id: 0,
				detail: "",
				nowQuestionNum: 0,
				QuestionCount: 0,
				rightNum: 0,
				wrongNum: 0,
				examTime: {
					hour: '00',
					min: '00',
					second: '00'
				},
				questions: [],
				question: '',
				questionDic: [],
				answer: [],
				isRight: '1',
				questionAnswer: '',
				showIdeas: false,
				showQuestion: false,
				ideas: "",
				isAnswer: false, //是否可以继续答题
			};
		},
		watch: {
			question(val) {
				// 显示题目
				setTimeout(function() {
					_this.showQuestion = true
					// 获取已答题信息
					if (val.stuanswerdetail != null) {
						// 已经提交答题不允许作答
						_this.isAnswer = false
						_this.questionAnswer = val.stuanswerdetail.answer
						_this.answer = val.stuanswerdetail.stuanswer.split("、")
						_this.isRight = val.stuanswerdetail.isright
					} else {
						// 未答题允许作答
						_this.isAnswer = true
						_this.answer = [] // 恢复答案暂存
						_this.questionAnswer = '' // 恢复答案
						_this.isRight = '1' // 恢复正确样式
					}
				}, 300)
			},
			async nowQuestionNum(val) {
				// 刷新题目前初始化
				_this.showQuestion = false // 获取题目前隐藏就题目
				_this.isAnswer = false // 不允许答题
				// 获取下一题信息
				var question = _this.questions[val - 1]
				switch (question.questionType) {
					case "select":
						await _this.getSelect(question.id)
						break;
					case "single":
						await _this.getSingle(question.id)
						break;
					case "judge":
						await _this.getJudge(question.id)
						break;
				}
			}
		},
		methods: {
			async submitExam() {
				await this.$api.ExamPaper(_this.detail.id).then(({
					data
				}) => {
					var score = data.data
				}).catch((err) => {
					console.log(err)
				})
				uni.redirectTo({
					url: '/pages/exam_result/exam_result?id=' + _this.detail.id
				})
			},
			async getQuestion(question) {
				switch (question.questionType) {
					case "select":
						return await _this.getSelect(question.id)
						break;
					case "single":
						return await _this.getSingle(question.id)
						break;
					case "judge":
						return await _this.getJudge(question.id)
						break;
				}
			},
			goQuestion(index) {
				this.nowQuestionNum = index + 1
				this.showApp = false

			},
			async selectOption(e) {
				if (this.detail.isEnable == '1' && this.detail.isFinish == '0' && this.isAnswer == true) {
					var type = e.currentTarget.dataset.type
					var option = e.currentTarget.dataset.option
					var index = this.answer.indexOf(String(option))
					switch (type) {
						case 'select':
							if (index == -1) {
								this.answer.push(String(option))
							} else {
								this.answer.splice(index, 1);
							}
							break;
						case 'single':
							if (index == -1) {
								this.answer = []
								this.answer.push(String(option))
							} else {
								this.answer.splice(index, 1);
							}
							break;
						case 'judge':
							if (index == -1) {
								this.answer = []
								this.answer.push(String(option))
							} else {
								this.answer.splice(index, 1);
							}
							break;
					}
				}
			},
			async answerQuestion() {
				if (this.answer.length > 0 && this.detail.isEnable == '1' && this.detail.isFinish == '0' && this.isAnswer == true &&
					this.detail.stuscores.length == 0) {
					return await this.$api.ExamAnswer({
						questionId: this.question.id,
						answer: this.answer
					}).then(({
						data
					}) => {
						_this.questionAnswer = data.data.answer
						_this.answer = data.data.stuanswer.split("、")
						_this.isRight = data.data.isright
						if (data.data.isright == '1') {
							_this.rightNum = _this.rightNum + 1
							_this.questionDic[_this.nowQuestionNum - 1].status = "suc"
						} else if (data.data.isright == '0') {
							_this.wrongNum = _this.wrongNum + 1
							_this.questionDic[_this.nowQuestionNum - 1].status = "err"
						}
					}).catch((err) => {
						console.log(err)
					})
				}
			},
			async preQuestion() {
				var preNum = this.nowQuestionNum - 1
				if (preNum <= 0) {
					this.nowQuestionNum = 1
				} else {
					this.nowQuestionNum = preNum
				}
			},
			async nextQuestion() {
				var nextNum = this.nowQuestionNum + 1
				// 提交本题答案
				await this.answerQuestion()
				// 判断是否是最后一题提交
				if (nextNum > this.questions.length) { // 最后一题处理
					if (_this.detail.stuscores.length == 0) {
						this.showApp = true
					}
					return false
				} else {
					this.nowQuestionNum = nextNum
				}
			},
			async getSelect(id) {
				await this.$api.GetExamSelect(this.detail.id, id).then(({
					data
				}) => {
					_this.question = data.data
				})
			},
			async getSingle(id) {
				await this.$api.GetExamSingle(this.detail.id, id).then(({
					data
				}) => {
					_this.question = data.data
				})
			},
			async getJudge(id) {
				await this.$api.GetExamJudge(this.detail.id, id).then(({
					data
				}) => {
					_this.question = data.data
				})
			},
			showTime() {
				try {
					var nowtime = new Date(), //获取当前时间
						endtime = new Date(this.detail.endTime.replace(/-/g, '/')); //定义结束时间
					var lefttime = endtime.getTime() - nowtime.getTime(), //距离结束时间的毫秒数
						lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24), //计算小时数
						leftm = Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数
						lefts = Math.floor(lefttime / 1000 % 60); //计算秒数
					this.examTime.hour = this.$utils.addPreZero(lefth);
					this.examTime.min = this.$utils.addPreZero(leftm);
					this.examTime.second = this.$utils.addPreZero(lefts);
					// 判断是否考试结束
					if (lefth == 0 && leftm == 0 && lefts == 0) {
						_this.submitExam()
					}
				} catch (err) {
					console.log(err)
				}
			},
			exitExam() {
				showModal({
					title: "提示",
					content: "退出将立即交卷",
					showCancel: true,
					success: async function(res) {
						if (res.confirm) {
							await _this.submitExam()
						}
					}
				})
			},
			onShowIdeas() {
				var id = this.question.questionId
				var questiontype = this.question.questionType
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
			openapp() {
				this.showApp = true
			},
			closeapp() {
				this.showApp = false
			}
		},
		onLoad() {
			_this = this
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('onExamDetail', function(d) {
				var id = d.detail.id
				_this.$api.GetExamInfo(id).then(({
					data
				}) => {
					// 重新获取考试信息
					_this.detail = data.data
					_this.QuestionCount = data.data.examquestions.length
					// 储存题目
					_this.questions = data.data.examquestions
					data.data.examquestions.forEach((item) => {
						_this.questionDic.push({
							"id": item.id,
							"questionType": item.questionType,
							"status": 'none'
						})
					})
					if (data.data.stuanswerdetails.length > 0) {
						// 计算对题数
						_this.rightNum = _this.$utils.QuestionAnswerCount(data.data.stuanswerdetails, '1');
						// 计算错题数
						_this.wrongNum = _this.$utils.QuestionAnswerCount(data.data.stuanswerdetails, '0');
						// 处理已答题信息
						data.data.stuanswerdetails.forEach((answer, aindex) => {
							_this.questionDic.forEach((item, index) => {
								if (item.id == answer.questionId) { //存在已经答题
									var status = answer.isright == '1' ? 'suc' : answer.isright == '0' ? 'err' : 'none'
									_this.questionDic[index].status = status
								}
							})
						})
						var lastQuestionNum = _this.questions.length
						if (_this.detail.stuscores.length == 0) {
							// 获取最后一个答题位置
							for (var i = 0; i < _this.questionDic.length; i++) {
								if (_this.questionDic[i].status == 'none') { //存在已经答题
									lastQuestionNum = i + 1
									break;
								}
							}
						} else {
							lastQuestionNum = 1
						}
						_this.nowQuestionNum = lastQuestionNum
					} else {
						_this.nowQuestionNum = 1
					}
					if (_this.detail.stuscores.length == 0) {
						_this.showTime()
						// 开始考试倒计时
						setInterval(function() {
							_this.showTime()
						}, 1000);
					}

				})
			})
		}
	}
</script>
<style lang="scss" scoped>
	
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

	.exam-header {
		padding: 40rpx;
		position: relative;

		.time-right {
			position: absolute;
			right: 30rpx;
			bottom: 10rpx;

			.that-num {
				width: 48rpx;
				height: 56rpx;
				font-size: 40rpx;
				font-family: PingFangSC, PingFangSC-Semibold;
				font-weight: 600;
				text-align: center;
				color: #333333;
				line-height: 56rpx;
			}

			.count {
				padding-left: 10rpx;
				width: 48rpx;
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				color: #cccccc;
				line-height: 40rpx;
			}
		}

		.exam-title {
			text-align: left;

			text {
				width: 670rpx;
				height: 100rpx;
				font-size: 36rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: left;
				color: #333333;
				line-height: 50rpx;
			}
		}
	}

	.question-answer {
		padding: 30rpx;

		text {
			font-size: 30rpx;
		}
	}

	.show-ideas {
		text-align: left;
		line-height: 48rpx;
		padding-right: 30rpx;

		text {
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: rgba(61, 127, 255, 1);
		}
	}

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

	.app-content {
		margin: 0 40rpx 25rpx 40rpx;

		.exam-btn {
			padding: 0rpx 200rpx 0 200rpx;

			.exam-sumbit {
				height: 88rpx;
				background: #fff;
				border-radius: 10rpx;
				font-size: 36rpx;
				line-height: 88rpx;
				color: #2db0fe;
				text-align: center;

			}
		}

		.datilist {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-start;
			padding-left: 10rpx;

			.dati-suc {
				background: #2db0fe;
				color: #fff;
			}

			.dati-err {
				background: #ff4545;
				color: #fff;
			}

			.dati-none {
				border: 4rpx solid #2db0fe;
				color: #2db0fe;

				text {
					line-height: 76rpx !important;
				}
			}

			.dati-item {
				width: 81.66666rpx;
				height: 81.66666rpx;
				margin: 15rpx;
				border-radius: 100%;
				text-align: center;

				text {
					font-size: 36rpx;
					line-height: 81rpx;
				}
			}
		}

		.app-header {
			height: 88rpx;
			display: flex;
			width: 100vw;
			padding-left: 60rpx;
			padding-right: 120rpx;
			.close-app {
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

			.exam-title {
				position: relative;
				line-height: 88rpx;
				text-align: center;
				font-size: 32rpx;
				flex: 1;
				text {
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
		background: #eeeeee;
		border-radius: 4rpx;
		margin-left: 32rpx;
		margin-top: 30rpx;
		text-align: left;
	}

	.text-option text {
		font-size: 36rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		color: #888888;
		line-height: 50rpx;
		display: flex;
		padding: 30rpx;
		text-align: left;
	}

	.option-error {
		background: #f66565 !important;

		text {
			color: #ffffff !important;
		}
	}

	.option-action {
		background: #2799fa !important;

		text {
			color: #ffffff !important;
		}
	}
</style>
