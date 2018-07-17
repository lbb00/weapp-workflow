// 参考微信官方文档
// https://developers.weixin.qq.com/miniprogram/dev/api/network-request.html#wxrequestobject

/**
 * GET 请求
 *
 * @param {{url: string, data?: string | object, header?: object}} options
 * @returns {Promise}
 */
const get = (options) => {
  let url = options.url
  let data = options.data || ''
  console.log('get url:' + url)
  return new Promise((resolve, reject) => {
    wx.request({
      method: 'GET',
      header: options.header || {},
      url,
      data,
      success (res) {
        if (res.statusCode < 400) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail (res) {
        reject(res)
      }
    })
  })
}

/**
 * post 请求
 * content-type 默认为 'application/json'
 *
 * @param {{url: string, data?: string | object, header?: object}} options
 * @returns {Promise}
 */
const post = (options) => {
  let url = options.url
  let data = options.data || ''
  console.log('post url:' + url)
  return new Promise((resolve, reject) => {
    wx.request({
      method: 'POST',
      url,
      data,
      header: options.header || {},
      success (res) {
        if (res.statusCode < 400) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail (res) {
        reject(res)
      }
    })
  })
}

export {
  get,
  post
}
