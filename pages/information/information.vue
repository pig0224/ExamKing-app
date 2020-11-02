<template>
  <view class="box">
    <cu-custom bgColor="bg-white"
               :isBack="true">
      <block slot="backText"></block>
      <block slot="content">数学考试</block>
    </cu-custom>
    <view class="portrait">
      <view class="titlel">
        <image src="../../static/wang.jpg">
        </image>
        <br>
        <b>王林锋</b>
      </view>
    </view>
    <view class="so">
      <view class="detailed">
        <p>考试班级：软件1832</p>
        <p>考试科目：数学</p>
        <p>考试时间：120分钟</p>
        <p>合格标准：90分及格（满分150分）</p>
        <view class="tit">
          <text>
            考试要求：靠生需在试卷规定处填写自己的姓名、准考证号码和校验码，
            考生交卷出场时间不得早于每科目考试结束前30分钟。</text>
        </view>
      </view>
    </view>
    <view class="button">
      <button>
        开始考试
      </button>
    </view>
    <view class="images">
      <image src="../../static/background.png"
             mode="aspectFit"></image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.box {
  height: 100vh;
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
	text{
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
