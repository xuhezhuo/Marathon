//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // wx.getUserInfo({
    //   success: res => {
    //     this.globalData.userInfo = res.userInfo;
    //     //由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //     // 所以此处加入 callback 以防止这种情况
    //     if (this.userInfoReadyCallback) {
    //       this.userInfoReadyCallback(res)
    //     }
    //   }
    // });

    // 登录
    wx.login({
      success: function (res) {
        if (res.code) {           
          //发起网络请求
          wx.request({
            url: "https://marathon.tbapps.com/wechat/userlogin/getinfopost",
            data: {
              code: res.code
            },
            method: 'POST',
            header: {
              'content-type': 'application/json', // 默认值
              'X-Requested-With': 'XMLHttpRequest'
            },
            success: function (res){
              var openid = res.data.weixin.openid;
              var session_key = res.data.weixin.session_key;
              that.globalData.openid = openid;
              that.globalData.session_key = session_key;
            },
            fail: function () {
              console.log('获取openid失败');
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res);
              // 可以将 res 发送给后台解码出 unionId
              // console.log(res);
              this.globalData.userInfo = res.userInfo;
              //由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail: function(){
              wx.showToast({
                title: '获取权限失败',
              })
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: '',
    appid: 'wx85b7ddb05bd8fd35',
    secretKey: 'f29942dd9d76c1069aa5ea943db2bdb8',
    openid: '',
    session_key: ''
  }
})