// 增强性代码，不需要可以删除
import './utils/weappx'

App({
  onLaunch: function (options) {
    // Do something initial when launch.
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onShow: function (options) {
    // Do something when show.
  },
  onHide: function () {
    // Do something when hide.
  },
  onError: function (msg) {
    console.log(msg)
  },
  globalData: 'I am global data'
})
