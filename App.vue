<script>
	import Vue from 'vue'

	export default {
		onLaunch: function() {
			console.log('App Lanuch')
		},
		onShow: function() {
			console.log('App Show')
			try {
				// 判断是否登录
				var token = uni.getStorageSync('token');
				if (token != "") {
					// 已经登录
					this.$store.dispatch('student/getStudentInfo')
				} else {
					// 未登录
					this.$store.dispatch('student/Logout')
				}
			} catch (e) {
				console.log(e)
				this.$store.dispatch('student/Logout')
			}
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>
<style>
	page {
		background: #F5F6F7;
	}

	uni-button::after {
		border: none;
	}

	.ellipse-line {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.ellipse-2 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.footer-block {
		width: 100vw;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.header-block {
		width: 100vw;
		padding-top: env(safe-area-inset-top);
	}

	.white-header {
		color: #fff !important;
	}

	.wrong-header-bg {
		background: linear-gradient(90deg, rgba(28, 162, 251, 1), rgba(2, 123, 254, 1));
		color: #fff;
	}
	
</style>
<style lang="scss">
	@import 'plugins/uview-ui/index.scss';
</style>
