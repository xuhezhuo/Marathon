// pages/index/comment.js
const app = getApp();
const qiniuUploader = require("../../utils/qiniuUploader");
// console.log(app.globalData);

Page({
  data: {
    path: '../image/img.png',  
    path1: '../image/addImg.png',
    content: '',
    img1: '',
    img2: '',
    imageURL: '',
    sending: false
  },

  change: function(e){
    this.setData({
      content: e.detail.value
    })
  },

  uploadImage: function () {
    var that = this;
    var img2 = that.data.img2;
    if (img2 != ''){
      wx.showToast({
        title: '最多只能上传两张图片',
        duration: 500
      })
      return false;
    }
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var filePath = res.tempFilePaths[0];
        var timestamp = Date.parse(new Date()); 
        // 交给七牛上传
        qiniuUploader.upload(filePath, (res) => {
          var imageURL = res.imageURL;
          if (that.data.img1 == '') {
            that.setData({
              img1: imageURL,
            });
          } else {
            that.setData({
              img2: imageURL,
            });
          }
        }, (error) => {
          console.log('error: ' + error);
        }, {
            region: 'ECN',
            domain: 'http://cdn.marathon.tbapps.com', // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
            key: timestamp + '.jpg', // [非必须]自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
            //以下方法三选一即可，优先级为：uptoken >uptokenURL >uptokenFunc
            uptoken: that.data.jsParam.upToken,//由其他程序生成七牛 uptoken
            // uptokenURL: 'UpTokenURL.com/uptoken', // 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "[yourTokenString]"}
            // uptokenFunc: function(){return '[yourTokenString]'; }
          });
      }

    })    
  },

  sent: function(){
    var that = this;
    if (that.data.content == ''){
      wx.showToast({
        title: '请先输入评论',
        duration: 500
      })
      return false;
    }
    that.setData({
      sending: true
    })
    var imgList = [];
    var img1 = that.data.img1;
    var img2 = that.data.img2;
    if(img1 != ''){
      imgList = [img1];
    }
    if (img2 != '') {
      imgList = [img1 , img2];
    }

    wx.request({
      url: "https://marathon.tbapps.com/wechat/comment/addpost",
      data: {
        content: that.data.content,
        imgList: imgList
      },
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
        'X-Requested-With': 'XMLHttpRequest',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      },
      success: function (res) {
        var data = res.data;
        switch (data.code) {
          case 1:
            setTimeout(function(){
              that.setData({
                sending: false
              })
            },700);
            wx.showToast({
              title: '提交评论成功',
              icon: 'success',
              duration: 1000
            })
            setTimeout(function(){
              wx.navigateBack({
                url: './index'
              })
            },1000)
            break;
          case 0:
            wx.showToast({
              title: '提交失败',
              duration: 1000
            })
            setTimeout(function(){
              that.setData({
                sending: false
              })
            })
        }
      }
    })
  },

  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'PHPSESSID',
      success: function(res){
        that.setData({
          sessionId: res.data
        })
      }
    });
    wx.getStorage({
      key: 'jsParam',
      success: function (res) {
        that.setData({
          jsParam: res.data
        })
        console.log(res.data.upToken);      
      }
    });
  }
})