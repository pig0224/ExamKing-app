<script>
import Vue from 'vue'

import {
	getStorage,
	setStorage
} from '@/utils'

export default {
  onLaunch: function () {
    uni.getSystemInfo({
      success: function (e) {
        // #ifndef MP
        Vue.prototype.StatusBar = e.statusBarHeight
        if (e.platform == 'android') {
          Vue.prototype.CustomBar = e.statusBarHeight + 50
        } else {
          Vue.prototype.CustomBar = e.statusBarHeight + 45
        }
        // #endif

        // #ifdef MP-WEIXIN
        Vue.prototype.StatusBar = e.statusBarHeight
        let custom = wx.getMenuButtonBoundingClientRect()
        Vue.prototype.Custom = custom
        Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight
        // #endif

        // #ifdef MP-ALIPAY
        Vue.prototype.StatusBar = e.statusBarHeight
        Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight
        // #endif
      },
    })
		
  },
  onShow: function () {
    console.log('App Show')
		// setStorage('token','')
		// 判断是否登录
		var token = getStorage('token');
		if(token!=""){
			// 获取学生信息
			this.$store.dispatch('student/getStudentInfo')
		}else{
			// 未登录
			this.$store.dispatch('student/Logout')
		}
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style>
@import 'plugins/colorui/main.css';
@import 'plugins/colorui/icon.css';

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
.header-block{
	width: 100vw;
	padding-bottom: env(safe-area-inset-top);
}
.white-header{
		color: #fff !important;
	}
	
</style>
<style lang="scss">
@import 'plugins/uview-ui/index.scss';
</style>