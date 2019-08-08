//about.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    url:"https://textnuxt.lilidong.cn"// <web-view src="{{url}}"></web-view>
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
      /**
   * 用户点击右上角分享
   */
  onShareAppMessage: (res) => {
    return {
      title: '关于西门互联博客',
      path: '/pages/about/about',
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }
})
