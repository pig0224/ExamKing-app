import {
  addHeader,
  getStorage,
  showToast,
  showModal,
  showLoading,
  hideLoading,
  showErrorPage
} from '@/utils'

import { apiUrl } from '@/config'

var Header = {
  "content-type": "application/x-www-form-urlencoded",
  "Accept-Language": "zh-cn,zh;q=0.5"
}

const _showLoading = function () {
  var request_number = getStorage("request_number")
  var new_req_num = request_number == "" ? 1 : (parseInt(request_number) + 1)
  uni.setStorage({
    key: 'request_number',
    data: new_req_num,
    success: function () {
      if (parseInt(new_req_num) == 1) {
        showLoading()
      }
    }
  });
}

const _hideLoading = function () {
  var request_number = getStorage("request_number")
  var new_req_num = request_number == "" ? 0 : (parseInt(request_number) - 1)
  uni.setStorage({
    key: 'request_number',
    data: new_req_num,
    success: function () {
      if (parseInt(new_req_num) == 0) {
        hideLoading()
      }
    }
  });
}

const get = (url, data = "", _header = {}) => {
  _showLoading()
  Header = addHeader(Header, {
    "Authorization": "Bearer" + " " + getStorage('token'),
  })
  return new Promise((resolve, reject) => {
    uni.request({
      url: apiUrl + url,
      data: data,
      header: addHeader(Header, _header),
      success: (res) => {
        if (res.data.successed == false) {
          // 500异常处理
          if (res.data.statusCode == 500) {
            var err = res.data.errors
            showToast({
              type: "error",
              msg: err,
              mask: true
            })
            return
          }
        }
        resolve(err)
      },
      fail: (err) => {
        showModal({
          content: "系统异常"
        })
        // showErrorPage()
        reject(err)
      },
      complete: () => {
        _hideLoading()
      }
    });
  })
}

const post = (url, data = "", _header = {}) => {
  _showLoading()
  Header = addHeader(Header, {
    "token": getStorage('token'),
  })
  return new Promise((resolve, reject) => {
    uni.request({
      url: apiUrl + url,
      data: data,
      method: "POST",
      header: addHeader(Header, _header),
      success: (res) => {
        if (res.data.successed == false) {
          // 500异常处理
          if (res.data.statusCode == 500) {
            var err = res.data.errors
            showToast({
              type: "error",
              msg: err,
              mask: true
            });
            return
          }
        }
        resolve(err)
      },
      fail: (err) => {
        showModal({
          content: "系统异常"
        })
        // showErrorPage()
        reject(err)
      },
      complete: () => {
        _hideLoading()
      }
    });
  })
}

export default {
  get,
  post
}
