<template>
	<view class="register">

		<u-select v-model="showSex" :safe-area-inset-bottom="true" :mask-close-able="false" title="请选择性别" @cancel="cancelChoose"
		 @confirm="chooseSex" :list="sexList"></u-select>
		<u-select v-model="showDeptClass" :safe-area-inset-bottom="true" :mask-close-able="false" :list="deptClassList" title="请选择班级"
		 @cancel="cancelChoose" @confirm="chooseDeptClass" mode="mutil-column-auto"></u-select>

		<cu-custom bgColor="bg-whites" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">注册</block>
		</cu-custom>

		<view class="content">

			<!-- 主体 -->
			<view class="main">
				<wInput v-model="StuNo" type="text" maxlength="11" placeholder="学号"></wInput>
				<wInput v-model="Password" type="password" maxlength="11" minlength="6" placeholder="密码" isShowPass></wInput>
				<wInput v-model="StuName" type="text" maxlength="11" placeholder="姓名"></wInput>

				<wInput v-model="Telphone" type="text" maxlength="11" placeholder="手机号"></wInput>
				<wInput v-model="IdCard" type="text" placeholder="身份证号码"></wInput>
			</view>

			<wButton class="wbutton" bgColor="#9237e3" text="注 册" :rotate="isRotate" @click.native="startReg()"></wButton>

		</view>
	</view>
</template>

<script>
	var _this
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import {
		showModal
	} from '../../utils'

	export default {
		data() {
			return {
				StuNo: '', //学号
				Password: '', //密码
				StuName: '', //姓名
				Telphone: '', //手机号
				IdCard: '', //身份证
				Sex: '', //性别
				DeptId: '', //系别ID
				ClassesId: '', // 班级ID
				isRotate: false, //是否加载旋转
				showSex: false,
				showDeptClass: false,
				sexList: [{
						value: '男',
						label: '男',
					},
					{
						value: '女',
						label: '女',
					},
					{
						value: '保密',
						label: '保密',
					},
				],
				deptClassList: [{
						value: 1,
						label: '信息工程系',
						children: [{
								value: 1,
								label: '软件1832',
							},
							{
								value: 2,
								label: '软件1831',
							},
						],
					},
					{
						value: 2,
						label: '建筑系',
						children: [{
								value: 1,
								label: '建筑1832',
							},
							{
								value: 2,
								label: '建筑1831',
							},
						],
					},
				],
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
			startReg() {
				//注册
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false
				}
				var StuNo = this.StuNo
				var Password = this.Password
				var StuName = this.StuName
				var Telphone = this.Telphone
				var IdCard = this.IdCard
				if (!StuNo) {
					showModal({
						content: '请输入学号',
					})
					return
				}
				if (!Password) {
					showModal({
						content: '请输入密码',
					})
					return
				}
				if (!StuName) {
					showModal({
						content: '请输入姓名',
					})
					return
				}
				if (!Telphone) {
					showModal({
						content: '请输入手机号',
					})
					return
				}
				if (!IdCard) {
					showModal({
						content: '请输入身份证号码',
					})
					return
				}
				this.isRotate = true
				// 选择性别
				this.showSex = true
			},
			chooseSex(e) {
				console.log('chooseSex -> e', e)
				this.sex = e[0]['value']
				//选择系别班级
				this.showDeptClass = true
			},
			chooseDeptClass(e) {
				console.log('chooseDeptClass -> e', e)
				this.DeptId = e[0]['value']
				console.log('chooseDeptClass -> this.DeptId', this.DeptId)
				this.ClassesId = e[1]['value']
				console.log('chooseDeptClass -> this.ClassesId', this.ClassesId)
				setTimeout(function() {
					showModal({
						content: '注册成功',
						success: function() {
							_this.$utils.Back()
							_this.isRotate = false
						},
					})
				}, 3000)
			},
			cancelChoose() {
				this.isRotate = false
			},
		},
	}
</script>

<style scoped>
	@import url('../../components/watch-login/css/icon.css');

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
