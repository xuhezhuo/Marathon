// pages/index/activity.js
const app = getApp();
var getStep;
var listStep;

Page({
  data: {
    path: '../image/bg.png',
    path2: '../image/qr.png',
    path3: '../image/addComment.png',
    heart: '../image/heart.png',
    headImg1: 'http://cdn.marathon.tbapps.com/ji.png',
    headImg2: 'http://cdn.marathon.tbapps.com/gu.png',
    headImg3: 'http://cdn.marathon.tbapps.com/fan.png',
    headImg4: 'http://cdn.marathon.tbapps.com/lian.png',
    headImg5: 'http://cdn.marathon.tbapps.com/travel.png',
    headList: ['http://cdn.marathon.tbapps.com/ji.png', 'http://cdn.marathon.tbapps.com/gu.png', 'http://cdn.marathon.tbapps.com/fan.png', 'http://cdn.marathon.tbapps.com/lian.png', 'http://cdn.marathon.tbapps.com/travel.png'],
    step: 0,
    allStep: 1080192,
    stepA: 0,
    stepB: 0,
    stepC: 0,
    stepD: 0,
    stepE: 0,
    progressA: 0,
    progressB: 0,
    progressC: 0,
    progressD: 0,
    progressE: 0,
    total: 0,
    group: '',
    headimgUrl: '',
    refresh: 1
  },

  onPullDownRefresh: function () {
    var that = this;
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 2000
    })
    listStep();
    getStep();
  },

  shareStep: function(){
    var that = this;
    that.setData({
      refresh: 2
    });
    if( that.data.group == 0 ){
      wx.showToast({
        title: '尚未加入跑团',
        duration: 1200
      })
      return false;
    } else{
      wx.navigateTo({
        url: './shareStep'
      })
    } 
  },

  onShareAppMessage: function () {
    return {
      title: '建发绿跑,让爱扎根',
      path: '/pages/index/index'
    }
  },

  back: function() {
    var that = this;    
    that.setData({
      refresh: 2
    });
    wx.navigateBack({
      url: './index',
    })
  },

  onShow: function () {
    var that = this;
    if (that.data.refresh == 1) {
      return false;
    }
    listStep();
    getStep();
  },

  person: function(){
    var that = this;
    that.setData({
      refresh: 2
    });
    wx.navigateTo({
      url: './person',
    })
  },

  preview: function (e) {
    var current = e.target.dataset.src;
    // console.log(current);
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.headList // 需要预览的图片http链接列表  
    })
  },

  step: function(e){
    var that =this;
    var step = 0;
    wx.getWeRunData({
      success(res) {
        var encryptedData = res.encryptedData;
        var iv = res.iv;
        var session_key = app.globalData.session_key;
        wx.request({
          url: "https://marathon.tbapps.com/wechat/rundata/runpost",
          data: {
            encryptedData: encryptedData,
            iv: iv,
            session_key: session_key
          },
          method: 'POST',
          header: {
            'content-type': 'application/json', // 默认值
            'X-Requested-With': 'XMLHttpRequest',
            'Cookie': 'PHPSESSID=' + that.data.PHPSESSID
          },
          success: function (res) {
            var data = res.data;
            data = data.replace('int(', '');
            data = data.replace(')', '')    
            step = +data;            
            if (step == -41001 || step == -41002 || step == -41003 || step == -41004){
              wx.showToast({
                title: '获取步数失败!',
              });
              return false;
            }
            wx.showModal({
              title: '捐赠步数',
              content: '您当前的步数是' + step + ' ( 可重复捐赠 )',
              success: function (res) {
                if (res.confirm) {
                  wx.request({
                    url: "https://marathon.tbapps.com/wechat/step/addpost",
                    data: {
                      amount: step
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
                          wx.showToast({
                            title: '捐赠成功',
                            icon: 'success'
                          })
                          listStep();
                          getStep();
                          break;
                        case 2003:
                          var message = res.data.message;
                          wx.showToast({
                            title: message,
                            icon: 'success'
                          })
                          break;
                      }
                    }
                  })
                }
              }
            })
          },
          fail: function(){
            console.log(1);
          }
        })
      },
      fail: function(){
        wx.showToast({
          title: '获取步数失败!',
        })
      }
    })
  },

  onLoad: function (options) {
    var that = this;
     
    listStep = function() {
      wx.request({
        url: "https://marathon.tbapps.com/wechat/step/getpost",
        data: {
          pageSize: 0,
          pageNo: 0
        },
        method: 'POST',
        header: {
          'content-type': 'x-www-form-urlencoded', // 默认值
          'X-Requested-With': 'XMLHttpRequest',
          'Cookie': 'PHPSESSID=' + that.data.PHPSESSID
        },
        success: function (res) {
          var data = res.data;
          switch (data.code) {
            case 1:
              that.setData({
                stepA: data.groupA,
                stepB: data.groupB,
                stepC: data.groupC,
                stepD: data.groupD,
                stepE: data.groupE,
                progressA: (data.groupA / that.data.allStep * 100).toFixed(0),
                progressB: (data.groupB / that.data.allStep * 100).toFixed(0),
                progressC: (data.groupC / that.data.allStep * 100).toFixed(0),
                progressD: (data.groupD / that.data.allStep * 100).toFixed(0),
                progressE: (data.groupE / that.data.allStep * 100).toFixed(0),
                total: data.total
              })
              break;
            case 2003:
              wx.showToast({
                title: '您已加入跑团',
                icon: 'success'
              })
              break;
          }
        }
      })
    },

    getStep = function(){
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
                step: user.amount,
                group: user.group,
                headimgUrl: user.headimgUrl
              })
              break;
            case 911:
              wx.showToast({
                title: '用户已过期'
              })
              setTimeout(function () {
                wx.reLaunch({
                  url: './index',
                })
              }, 500);
              break;
            default:
              wx.showToast({
                title: '服务器错误'
              })
          }
        }
      })
    };

    wx.getStorage({
      key: 'PHPSESSID',
      success: function(res) {
        that.setData({
          PHPSESSID: res.data
        });
        listStep();
        getStep();
      },
    })
  }
})