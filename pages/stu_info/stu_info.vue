<template>
	<view class="stu_info">

		<!-- <u-select v-model="showSex" :safe-area-inset-bottom="true" :mask-close-able="false" title="请选择性别" @cancel="cancelChoose"
		 @confirm="chooseSex" :list="sexList"></u-select> -->


		<u-navbar title="修改资料"></u-navbar>
		<view class="content">

			<!-- 主体 -->
			<view class="main">
				<view class="input-box">
					<view class="input-label">
						<text>姓名：</text>
					</view>
					<view class="input-ctn">
						<wInput v-model="StuName" type="text" maxlength="11" placeholder="姓名"></wInput>
					</view>
				</view>
				<view class="input-box">
					<view class="input-label">
						<text>密码：</text>
					</view>
					<view class="input-ctn">
						<wInput v-model="Password" type="password" maxlength="11" minlength="6" placeholder="留空不修改密码" isShowPass></wInput>
					</view>
				</view>

				<view class="input-box">
					<view class="input-label">
						<text>手机号：</text>
					</view>
					<view class="input-ctn">
						<wInput v-model="Telphone" type="text" maxlength="11" placeholder="手机号"></wInput>
					</view>
				</view>

				<view class="input-box">
					<view class="input-label">
						<text>身份证号码：</text>
					</view>
					<view class="input-ctn">
						<wInput v-model="IdCard" type="text" placeholder="身份证号码"></wInput>
					</view>
				</view>

			</view>

			<view class="sex-box">
				<view class="input-label">
					<text>性别：</text>
				</view>
				<view class="sex-box">
					<u-radio-group v-model="Sex">
						<u-radio v-for="(item, index) in sexList" :key="index" :name="item" active-color="#9237e3">
							{{item}}
						</u-radio>
					</u-radio-group>
				</view>
			</view>


			<wButton class="wbutton" text="修 改" bgColor="#2b7ce8" :rotate="isRotate" @click.native="startREdit()"></wButton>

		</view>
	</view>
</template>

<script>
	var _this
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import {
		showModal,
		Validation,
		showToast
	} from '../../utils'
	import {
		mapActions
	} from 'vuex'
	export default {
		async onLoad() {
			await this.$store.dispatch('student/getStudentInfo')
			this.StuName = this.$store.state.student.StuName
			this.Telphone = this.$store.state.student.Telphone
			this.IdCard = this.$store.state.student.IdCard
			this.Sex = this.$store.state.student.Sex
		},
		data() {
			return {
				StuName: "",
				Telphone: "",
				Password: '', //密码
				IdCard: "男",
				Sex: "",
				isRotate: false, //是否加载旋转
				showSex: false,
				sexList: ['男', '女', '保密'],
			}
		},
		components: {
			wInput,
			wButton,
		},
		mounted() {
			_this = this
		},
		methods: {
			...mapActions('student', ['getStudentInfo']),
			async startREdit() {
				//注册
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false
				}
				var password = this.Password
				var stuName = this.StuName
				var telphone = this.Telphone
				var idCard = this.IdCard
				var sex = this.Sex == "男" ? "0" : this.Sex == "女" ? "1" : "2"
				if (!stuName) {
					showModal({
						content: '请输入姓名',
					})
					return
				}
				if (!telphone) {
					showModal({
						content: '请输入手机号',
					})
					return
				}
				if (!idCard) {
					showModal({
						content: '请输入身份证号码',
					})
					return
				}
				this.isRotate = true
				await this.$api.EditStudentInfo({
					stuName,
					sex,
					telphone,
					password,
					idCard
				}).then(({
					data
				}) => {
					_this.getStudentInfo()
					return showToast({
						type: "success",
						msg: "修改成功"
					})
				}).catch(({
					errors
				}) => {
					return Validation(errors)
				})
				setTimeout(function() {
					_this.isRotate = false
				}, 500)
			}
		},
	}
</script>

<style scoped lang="scss">
	@import url('../../components/watch-login/css/icon.css');

	.stu_info {
		min-height: 100vh;
		background: #fbf6ff;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* margin-top: 128rpx; */
	}

	.sex-box {
		padding-left: 75rpx;
		padding-right: 75rpx;
		display: flex;

		.input-label {
			padding-left: 0rpx;
			padding-right: 0rpx;
			font-size: 30rpx;
			line-height: 200rpx;
		}
	}

	.input-box {
		display: flex;
		justify-content: space-between;

		.input-label {
			height: 170rpx;
			padding-left: 0rpx;
			padding-right: 0rpx;
			font-size: 30rpx;
			line-height: 170rpx;
		}

		.input-ctn {
			flex: 1;
			width: 80%;
		}
	}

	/* 头部 logo */
	.header {
		width: 161rpx;
		height: 161rpx;
		box-shadow: 0rpx 0rpx 60rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 50%;
		background-color: #000000;
		margin-top: 128rpx;
		margin-bottom: 72rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161rpx;
		height: 161rpx;
		border-radius: 50%;
	}

	/* 主体 */
	.main {
		display: flex;
		flex-direction: column;
		padding-left: 70rpx;
		padding-right: 70rpx;
	}

	.tips {
		color: #999999;
		font-size: 28rpx;
		margin-top: 64rpx;
		margin-left: 48rpx;
	}

	/* 登录按钮 */
	.wbutton {
		margin-top: 96rpx;
	}

	/* 其他登录方式 */
	.other_login {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 256rpx;
		text-align: center;
	}

	.login_icon {
		border: none;
		font-size: 64rpx;
		margin: 0 64rpx 0 64rpx;
		color: rgba(0, 0, 0, 0.7);
	}

	.wechat_color {
		color: #83dc42;
	}

	.weibo_color {
		color: #f9221d;
	}

	.github_color {
		color: #24292e;
	}

	/* 底部 */
	.footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		margin-top: 64rpx;
		color: rgba(0, 0, 0, 0.7);
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}

	.footer text {
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}
</style>
