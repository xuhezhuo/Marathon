// pages/index/activityInfo.js
Page({
  data: {
  
  },

  preview: function (e) {
    var current = 'http://cdn.marathon.tbapps.com/detail.png';
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: [current] // 需要预览的图片http链接列表  
    })
  },
  
  onLoad: function (options) {
  
  }
})