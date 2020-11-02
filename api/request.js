import {
	addHeader,
	getStorage,
	showToast,
	showModal,
	showLoading,
	hideLoading,
	showErrorPage
} from '@/utils'

import store from '@/store'

import {
	apiUrl
} from '@/config'

var Header = {
	"content-type": "application/json",
	"Accept-Language": "zh-cn,zh;q=0.5"
}

const _showLoading = function() {
	var request_number = getStorage("request_number")
	var new_req_num = request_number == "" ? 1 : (parseInt(request_number) + 1)
	uni.setStorage({
		key: 'request_number',
		data: new_req_num,
		success: function() {
			if (parseInt(new_req_num) == 1) {
				showLoading()
			}
		}
	});
}

const _hideLoading = function() {
	var request_number = getStorage("request_number")
	var new_req_num = request_number == "" ? 0 : (parseInt(request_number) - 1)
	uni.setStorage({
		key: 'request_number',
		data: new_req_num,
		success: function() {
			if (parseInt(new_req_num) == 0) {
				hideLoading()
			}
		}
	});
}

const UnauthorizedToLogout = function() {
	// 无权限退出登录
	store.dispatch('student/Logout')
}

const Get = (url, data = "", _header = {}) => {
	_showLoading()
	var token = getStorage('token')
	if (token != "") {
		Header = addHeader(Header, {
			"Authorization": "Bearer" + " " + getStorage('token'),
		})
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: apiUrl + "/" + url,
			data: data,
			header: addHeader(Header, _header),
			success: (res) => {
				if (res.statusCode == 200) {
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
						// 400字段验证失败
						if (res.data.statusCode == 400) {
							reject(res.data)
							return
						}
					}
					resolve(res)
				} else if (res.statusCode == 401) {
					UnauthorizedToLogout()
				} else {
					showModal({
						content: "系统异常"
					})
					reject(res)
				}
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

const Post = (url, data = "", _header = {}) => {
	_showLoading()
	var token = getStorage('token')
	if (token != "") {
		Header = addHeader(Header, {
			"Authorization": "Bearer" + " " + getStorage('token'),
		})
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: apiUrl + "/" + url,
			data: data,
			method: "POST",
			header: addHeader(Header, _header),
			success: (res) => {
				if (res.statusCode == 200) {
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
						// 400字段验证失败
						if (res.data.statusCode == 400) {
							reject(res.data)
							return
						}
					}
					resolve(res)
				} else if (res.statusCode == 401) {
					UnauthorizedToLogout()
				} else {
					showModal({
						content: "系统异常"
					})
					reject(res)
				}
			},
			fail: (err) => {
				showModal({
					content: "系统异常"
				})
				reject(err)
			},
			complete: () => {
				_hideLoading()
			}
		});
	})
}

const Put = (url, data = "", _header = {}) => {
	_showLoading()
	var token = getStorage('token')
	if (token != "") {
		Header = addHeader(Header, {
			"Authorization": "Bearer" + " " + getStorage('token'),
		})
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: apiUrl + "/" + url,
			data: data,
			method: "PUT",
			header: addHeader(Header, _header),
			success: (res) => {
				if (res.statusCode == 200) {
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
						// 400字段验证失败
						if (res.data.statusCode == 400) {
							reject(res.data)
							return
						}
					}
					resolve(res)
				} else if (res.statusCode == 401) {
					UnauthorizedToLogout()
				} else {
					showModal({
						content: "系统异常"
					})
					reject(res)
				}
			},
			fail: (err) => {
				showModal({
					content: "系统异常"
				})
				reject(err)
			},
			complete: () => {
				_hideLoading()
			}
		});
	})
}

const Delete = (url, data = "", _header = {}) => {
	_showLoading()
	var token = getStorage('token')
	if (token != "") {
		Header = addHeader(Header, {
			"Authorization": "Bearer" + " " + getStorage('token'),
		})
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: apiUrl + "/" + url,
			data: data,
			method: "DELETE",
			header: addHeader(Header, _header),
			success: (res) => {
				if (res.statusCode == 200) {
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
						// 400字段验证失败
						if (res.data.statusCode == 400) {
							reject(res.data)
							return
						}
					}
					resolve(err)
				} else if (res.statusCode == 401) {
					UnauthorizedToLogout()
				} else {
					showModal({
						content: "系统异常"
					})
					reject(err)
				}
			},
			fail: (err) => {
				showModal({
					content: "系统异常"
				})
				reject(err)
			},
			complete: () => {
				_hideLoading()
			}
		});
	})
}

export default {
	Get,
	Post,
	Put,
	Delete
}
