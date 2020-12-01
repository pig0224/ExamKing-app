<template>
  <view class="forget">
		<u-navbar title="找回密码"></u-navbar>
    <view class="content">
      <!-- 主体 -->
      <view class="main">
        <view class="tips">若你忘记了密码，可在此重置新密码。</view>
        <wInput v-model="StudentNo"
                type="text"
                maxlength="11"
                placeholder="请输入学号"></wInput>

        <wInput v-model="IdCard"
                type="text"
                maxlength="6"
                minlength="6"
                placeholder="请输入身份证后6位"></wInput>

        <wInput v-model="Password"
                type="password"
                maxlength="11"
                minlength="6"
                placeholder="请输入新密码"
                isShowPass></wInput>

      </view>

      <wButton class="wbutton"
               text="重置密码"
							 bgColor="#2b7ce8"
               :rotate="isRotate"
               @click.native="startRePass()"></wButton>

    </view>
  </view>
</template>

<script>
var _this
import wInput from '../../components/watch-login/watch-input.vue' //input
import wButton from '../../components/watch-login/watch-button.vue' //button

import { showModal, Validation } from '../../utils'
export default {
  data() {
    return {
      StudentNo: '', //学号
      IdCard: '', //身份证后六位
      Password: '', //新密码
      isRotate: false, //是否加载旋转
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
    async startRePass() {
      //重置密码
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false
      }
      var StudentNo = this.StudentNo
      var IdCard = this.IdCard
      var Password = this.Password
      if (!StudentNo) {
        showModal({ content: '学号不能为空' })
        return
      }
      if (!IdCard) {
        showModal({ content: '身份证后六位不能为空' })
        return
      }
      if (!Password) {
        showModal({ content: '密码不能为空' })
        return
      }
      this.isRotate = true
			await this.$api.ForgetPass({
				stuNo:StudentNo,
				idCard:IdCard,
				newPass:Password
			}).then(({data})=>{
				return setTimeout(function () {
				  showModal({
				    content: '找回成功',
				    success: function () {
				      _this.$utils.Back()
				    },
				  })
				}, 500)
			}).catch(({errors})=>{
				Validation(errors)
			})
      _this.isRotate = false
    },
  },
}
</script>

<style scoped>
@import url('../../components/watch-login/css/icon.css');

.forget{
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

