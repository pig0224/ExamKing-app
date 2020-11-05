<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">全部错题</block>
		</cu-custom>
		<view class="subject">
			<view class="on-line">
				<view class="exma-title">
					<text>大学生形式与政策课程 在线考试</text>
					<view class="white"></view>
				</view>
				<view class="footer">
					<view class="rate">
						<text>共100道题 错题率100%</text>
					</view>
					<view class="details">
						<text>查看详情</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="subject">
			<view class="on-line two">
				<view class="exma-title">
					<text>大学生形式与政策课程 在线考试</text>
					<view class="white"></view>
				</view>
				<view class="footer">
					<view class="rate">
						<text>共100道题 错题率100%</text>
					</view>
					<view class="details">
						<text>查看详情</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="subject">
			<view class="on-line three">
				<view class="exma-title">
					<text>大学生形式与政策课程 在线考试</text>
					<view class="white"></view>
				</view>
				<view class="footer">
					<view class="rate">
						<text>共100道题 错题率100%</text>
					</view>
					<view class="details">
						<text>查看详情</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.subject{
	display: flex;
	justify-content: center;
	margin-top: 30rpx;
}
.subject:last-child{
	margin-bottom: 30rpx;
}
.two{
	background: linear-gradient(90deg,#f9be64 1%, #f58635) !important;
	box-shadow: 0rpx 0rpx 10rpx 0rpx #f68d3b !important;
	.footer > .details{
		text{
			color: #F68D3B !important;;
		}
	}
}
.three{
	background: linear-gradient(90deg,#73cfff 1%, #40aafe) !important;
	box-shadow: 0rpx 0rpx 10rpx 0rpx #40aafe !important; 
	.footer > .details{
		text{
			color: #40aafe !important;
		}
	}
}
.on-line{
	padding: 30rpx;
	width: 690rpx;
	height: 240rpx;
	background: linear-gradient(90deg,#949ff9 1%, #5a67e7);
	border-radius: 20rpx;
	box-shadow: 0rpx 0rpx 18rpx 0rpx rgba(129,141,243,0.85); 
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.footer{
		display: flex;
		justify-content: space-between;
		.rate{
			position: relative;
			top: 20rpx;
		}
	}
	text{
		width: 610rpx;
		height: 56rpx;
		font-size: 34rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 200;
		text-align: left;
		color: #ffffff;
		line-height: 50rpx;
	}
	.white{
		width: 50rpx;
		height: 8rpx;
		background: #ffffff;
		border-radius: 50rpx;
		position: relative;
		top: 10rpx;
	}
	.rate{
		text{
			width: 278rpx;
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Light;
			font-weight: 300;
			text-align: left;
			color: #ffffff;
			line-height: 40rpx;
		}
	}
	.details{
		display: flex;
		justify-content: center;
		align-items:center;
		width: 150rpx;
		height: 56rpx;
		background: #ffffff;
		border-radius: 28rpx;
		text{
			width: 96rpx;
			height: 34rpx;
			font-size: 24rpx;
			font-family: PingFangSC, PingFangSC-Light;
			font-weight: 300;
			text-align: left;
			color: #606de9;
			line-height: 34rpx;
		}
	}
}
</style>
