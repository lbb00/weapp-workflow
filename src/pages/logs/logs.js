import { dayjs } from '../../npm/index'
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return dayjs(new Date(log)).format('YYYY年MM月DD日 HH:mm:ss')
      })
    })
  }
})
