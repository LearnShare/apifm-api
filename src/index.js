/* eslint-disable */
// 小程序开发api接口工具包，https://github.com/gooking/wxapi
var API_BASE_URL = 'https://user.api.it120.cc'
var subDomain = '-'
var merchantId = '0'

let request = (url, needSubDomain, method, data) => {
  const _url = API_BASE_URL + (needSubDomain ? '/' + subDomain : '') + url
  const header = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header,
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

/**
 * 小程序的promise没有finally方法，自己扩展下
 */
// Promise.prototype.finally = function (callback) {
//   var Promise = this.constructor;
//   return this.then(
//     function (value) {
//       Promise.resolve(callback()).then(
//         function () {
//           return value;
//         }
//       );
//     },
//     function (reason) {
//       Promise.resolve(callback()).then(
//         function () {
//           throw reason;
//         }
//       );
//     }
//   );
// }

module.exports = {
  init2: (a, b) => {
    API_BASE_URL = a
    subDomain = b
  },
  init: (b) => {
    subDomain = b
  },
  setMerchantId: (mchid) => {
    merchantId = mchid
  },
  init3: ({
    apiBaseUrl = API_BASE_URL,
    subDomain: subD,
    request: req,
  }) => {
    // 某些需求需要定制化 request，需要保证传入自定义 reuqest 与默认 request 参数一致
    if (req) {
      request = req
    }
    API_BASE_URL = apiBaseUrl
    subDomain = subD
  },
  request,
  orderList: (data) => {
    return request('/user/apiExtOrder/list', false, 'post', data)
  },
}
