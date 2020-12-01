<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image src="../../static/logo.png"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput v-model="studentNo" type="text" maxlength="11" placeholder="学号"></wInput>
				<wInput v-model="password" type="password" maxlength="11" placeholder="密码"></wInput>
			</view>
			<wButton class="wbutton" text="登 录" bgColor="#2b7ce8" :rotate="isRotate" @click="startLogin"></wButton>

			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="/pages/forget/forget" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="/pages/register/register" open-type="navigate">注册账号</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	var _this
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import {
		mapActions
	} from 'vuex'
	import {
		showModal,
		Validation
	} from '../../utils'

	export default {
		components: {
			wInput,
			wButton,
		},
		mounted() {
			_this = this
		},
		data() {
			return {
				StudentNo: '', //学号
				studentNo: '',
				password: '', //密码
				isRotate: false, //是否加载旋转
			}
		},
		methods: {
			...mapActions('student', ['Login']),
			async startLogin() {
				if (this.isRotate) {
					return false
				}
				var studentNo = this.studentNo
				var password = this.password
				// if (!studentNo) {
				// 	showModal({
				// 		content: '请输入学号'
				// 	})
				// 	return
				// }
				if (!password) {
					showModal({
						content: '请输入密码'
					})
					return
				}
				this.isRotate = true
				await this.Login({
					studentNo,
					password,
				}).then(({
					data
				}) => {
					// reLaunch登录页面
					return uni.reLaunch({
						url: '/pages/index/index'
					});
				}).catch(({errors})=>{
					return Validation(errors)
				})
				setTimeout(function(){
					_this.isRotate = false
				}, 500)
			},
		},
	}
</script>

<style lang="scss" scope>
	@import url('../../components/watch-login/css/icon.css');
	.login{
		min-height: 100vh;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* margin-top: 128rpx; */
	}

	/* 头部 logo */
	.header {
		width: 161rpx;
		height: 161rpx;
		box-shadow: 0rpx 0rpx 60rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 15%;
		background-color: #000000;
		margin-top: 128rpx;
		margin-bottom: 72rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161rpx;
		height: 161rpx;
		border-radius: 15%;
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
		color: #848484;
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
