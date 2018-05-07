import util from '../../utils/util.js'
import { foo } from '../../npm/index'
Page({
  data: {
    logs: [],
    foo: foo
  },
  onLoad: function () {
    console.log(foo)
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
