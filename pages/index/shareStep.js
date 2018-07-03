var getUser;

Page({
  data: {
    path: 'http://cdn.marathon.tbapps.com/shareStep.png',
    head: '',
    name: '',
    step: '',
    club: ''
  },

  onLoad: function (options) {
    var that = this;

    wx.showModal({
      title: '提示',
      content: '截图即刻分享',
      showCancel: false
    })
    
    getUser = function () {
      wx.request({
        url: "https://marathon.tbapps.com/wechat/user/getpost",
        data: {

        },
        method: 'POST',
        header: {
          'content-type': 'x-www-form-urlencoded', // 默认值
          'X-Requested-With': 'XMLHttpRequest',
          'Cookie': 'PHPSESSID=' + that.data.PHPSESSID
        },
        success: function (res) {
          switch (res.data.code) {
            case 1:
              var user = res.data.user;
              that.setData({
                head: user.headimgUrl,
                name: user.nickName,
                step: user.amount
              })
              var group = user.group;
              switch (+group) {
                case 1:
                  that.setData({
                    club: 'http://cdn.marathon.tbapps.com/gu.png'
                  });
                  break;
                case 2:
                  that.setData({
                    club: 'http://cdn.marathon.tbapps.com/fan.png'
                  })
                  break;
                case 3:
                  that.setData({
                    club: 'http://cdn.marathon.tbapps.com/lian.png'
                  })
                  break;
                case 4:
                  that.setData({
                    club: 'http://cdn.marathon.tbapps.com/travel.png'
                  })
                  break;
                case 5:
                  that.setData({
                    club: 'http://cdn.marathon.tbapps.com/ji.png'
                  })
                  break;
              }
              break;
            case 911:
              wx.showToast({
                title: '用户已过期',
                duration: 500
              })
              setTimeout(function () {
                wx.reLaunch({
                  url: './index',
                })
              }, 1000);
              break;
            default:
              wx.showToast({
                title: '服务器错误'
              })
          }
        }
      })
    }
    // wx.showToast({
    //   title: '正在生成图片',
    //   icon: 'loading',
    //   duration: 3000
    // })   

    wx.getStorage({
      key: 'PHPSESSID',
      success: function (res) {
        that.setData({
          PHPSESSID: res.data
        });
        getUser();
      }
    })

  }
})