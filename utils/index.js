export const addHeader = (header, _header) => {
  for (let key in _header) {
    header[key] = _header[key]
  }
  return header
}

export const setStorage = (key, data) => {
  uni.setStorageSync(key, data);
}

export const getStorage = (key) => {
  try {
    const value = uni.getStorageSync(key);
    if (value) {
      return value
    } else {
      return ""
    }
  } catch (e) {
    return ""
  }
}

export const removeStorage = (key) => {
  uni.removeStorageSync(key);
}

export const showToast = ({
  type,
  msg,
  mask,
}) => {
  var image = ''
  switch (type) {
    case 'error':
      image = '/static/err.png'
      break;
    case 'success':
      image = '/static/suc.png'
      break;
  }
  setTimeout(function () {
    uni.showToast({
      icon: 'none',
      title: msg,
      image: image,
      mask: (typeof mask !== "undefined") ? mask : false,
      duration: 2000
    });
  }, 500)
}

export const showModal = ({
  title,
  content,
  showCancel,
  success
}) => {
  uni.showModal({
    showCancel: (typeof showCancel !== "undefined") ? showCancel : false,
    title: title ? title : '提示',
    content: content,
    success: (typeof success !== "undefined") ? success : function () { }
  })
}

export const showLoading = (title) => {
  uni.showLoading({
    title: title ? title : '加载中'
  });
}

export const hideLoading = () => {
  uni.hideLoading()
}

export const getToday = t => {
  var today = new Date(t * 1000)
  today.setTime(today.getTime());
  var year = today.getFullYear()
  var month = (today.getMonth() + 1)
  var day = today.getDate()
  if (month < 10) {
    month = "0" + month
  }
  if (day < 10) {
    day = "0" + day
  }
  var date = year + "-" + month + "-" + day
  return date
}

export const isPhone = (num) => {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(num)) {
    return false;
  } else {
    return true;
  }
}

export const isBeforeDate = (startDate, endDate) => {
  var sYear = startDate.substring(0, 4)
  var sMonth = startDate.substring(5, 2)
  var sDay = startDate.substring(8, 2)

  var eYear = endDate.substring(0, 4)
  var eMonth = endDate.substring(5, 2)
  var eDay = endDate.substring(8, 2)

  if (sYear > eYear) {
    return false
  }
  if (sYear < eYear) {
    return true
  }
  if (sMonth > eMonth) {
    return false
  }
  if (sMonth < eMonth) {
    return true
  }
  if (sDay > eDay) {
    return false
  }
  if (sDay < eDay) {
    return true
  }
  return true
}

const e = e => (e = e.toString())[1] ? e : "0" + e;
let t = /^\/|\/$/;

export const formatTime = t => {
  t = new Date(t * 1000)
  const n = t.getFullYear(),
    o = t.getMonth() + 1,
    r = t.getDate(),
    a = t.getHours(),
    g = t.getMinutes(),
    u = t.getSeconds();
  return [n, o, r].map(e).join("-") + " " + [a, g].map(e).join(":");
}

export const Config = (name) => {
  const _config = require('../config/index.js')
  var conf = _config

  if (name && _config.hasOwnProperty(name)) {
    conf = _config[name]
  }
  return conf
}

export const img = (url) => {
  if (!url) return
  if (url.substr(0, 7).toLowerCase() == "http://" || url.substr(0, 8).toLowerCase() == "https://") {
    url = url;
  } else {
    url = Config('staticUrl') + url
  }
  return url
}

export const numberFormat = (value) => {
  var param = {};
  var k = 10000,
    sizes = ['', '万', '亿', '万亿'],
    i;
  if (value < k) {
    param.value = value
    param.unit = ''
  } else {
    i = Math.floor(Math.log(value) / Math.log(k));

    param.value = ((value / Math.pow(k, i))).toFixed(2);
    param.unit = sizes[i];
  }
  return param.value + param.unit;
}

export const getWeek = (number) => {
  var date = new Date(number * 1000);
  return date.getDay();
}

export const getDate = (number) => {
  var date = new Date(number * 1000);
  return date.getDate();
}

export const getDay = (number) => {
  var date = new Date(number * 1000);
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var data = [month, day].map(e)
  return data[0] + "月" + data[1] + "日"
}

export const callPhone = (number) => {
  if (!number) return
  uni.makePhoneCall({
    phoneNumber: number
  });
}

export const href = (url) => {
  if (!url) return
  uni.navigateTo({
    url: url
  })
}

export const Back = (delta = 1) => {
  uni.navigateBack({
    delta: delta
  });
}

export const copy = (text) => {
  uni.setClipboardData({
    data: text,
    success: function () {
      showModal({
        content: '复制成功'
      })
    }
  });
}

export const toMoney = (money) => {
  return parseFloat(money).toFixed(2);
}

export const isMail = (val) => {
  if (val != "") {
    var strRegex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (!strRegex.test(val)) {
      return false;
    }
  }
  return true;
}

export const showErrorPage = () => {
  uni.reLaunch({
    url: '/pages/error/error'
  });
}