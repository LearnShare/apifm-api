/* eslint-disable */
var API_BASE_URL = 'https://user.api.it120.cc';
var subDomain = '-';
var merchantId = '0';
var headers = {};

let request = (url, needSubDomain, method, data) => {
  const _url = API_BASE_URL + (needSubDomain ? '/' + subDomain : '') + url;
  const header = headers;
  header['Content-Type'] = 'application/x-www-form-urlencoded';

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
      },
    });
  });
}

module.exports = {
  init: (token) => {
    headers = {
      'X-Token': token,
    };
  },
  request,

  login: (data) => {
    return request('/login/userName/v2', false, 'post', data);
  },
  logout: (token) => {
    return request(`/login/exit?${token}`, false, 'get');
  },
  getAccountInfo: (data) => {
    return request('/user/info', false, 'get');
  },
  orderList: (data) => {
    return request('/user/apiExtOrder/list', false, 'post', data);
  },
  orderDetail: (id) => {
    return request(`/user/apiExtOrder/detail?id=${id}`, false, 'get');
  },
  startDelivery: (data) => {
    return request('/user/apiExtOrder/fahuo', false, 'post', data);
  },
}
