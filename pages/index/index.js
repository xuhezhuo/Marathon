//获取应用实例
const app = getApp();
console.log(app.globalData);

var listClub;
var listComment;
var login;
var getUser;

Page({
  data: {
    refresh: 1,
    path: '../image/bg.png',
    path2: '',
    path3: '../image/addComment.png',
    headImg1: 'http://cdn.marathon.tbapps.com/ji.png',
    headImg2: 'http://cdn.marathon.tbapps.com/gu.png',
    headImg3: 'http://cdn.marathon.tbapps.com/fan.png',
    headImg4: 'http://cdn.marathon.tbapps.com/lian.png',
    headImg5: 'http://cdn.marathon.tbapps.com/travel.png',
    dataList: [],
    groupA: 0,
    groupB: 0,
    groupC: 0,
    groupD: 0,
    groupE: 0,
    progressA: 0,
    progressB: 0,
    progressC: 0,
    progressD: 0,
    progressE: 0,
    nickName: '',
    headimgUrl: '',
    imgList: [],
    button: '加入',
    headList: ['http://cdn.marathon.tbapps.com/ji.png', 'http://cdn.marathon.tbapps.com/gu.png', 'http://cdn.marathon.tbapps.com/fan.png', 'http://cdn.marathon.tbapps.com/lian.png','http://cdn.marathon.tbapps.com/travel.png'],
    userGroup: '',
    pageNo: 1,
    pageSize: 10,
  },
  //事件处理函数

  onPullDownRefresh: function(){
    var that = this;
    that.setData({
      pageNo: 1,
      dataList: [],
      imgList: []
    })
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 2500
    })
    getUser();
    listClub();
    listComment();
  },

  refresh: function(){
    var that = this;
    wx.showToast({
      title: '请下拉查看',
      duration: 1200,
      icon: 'loading'
    })
    that.setData({
      pageNo: 1,
      dataList: [],
      imgList: []
    });
    listComment();
  },

  activity: function (){
    this.setData({
      refresh: 2
    });
    wx.navigateTo({
      url: './activity',
    })
  },

  activityInfo: function(){
    this.setData({
      refresh: 2
    });
    wx.navigateTo({
      url: './activityInfo',
    })
  },

  addComment: function() {
    this.setData({
      refresh: 2
    });
    wx.navigateTo({
      url: './comment',
    })
  },

  member: function (e) {
    var group = e.currentTarget.dataset.group;
    this.setData({
      refresh: 2
    });
    wx.navigateTo({
      url: './member?group=' + group,
    })
  },

  pic: function () {
    var that = this;
    this.setData({
      refresh: 2
    });
    var group = that.data.userGroup;
    // if(group == ''){
    //   wx.showToast({
    //     title: '请稍候',
    //     icon:'loading',
    //     duration: 500
    //   })
    //   setTimeout(function(){
    //     if (group == 0) {
    //       wx.showModal({
    //         title: '提示',
    //         content: '尚未加入跑团，是否继续？',
    //         success: function (res) {
    //           if (res.confirm) {
    //             wx.navigateTo({
    //               url: './pic',
    //             })
    //           }
    //         }
    //       })
    //     } else {
    //       wx.navigateTo({
    //         url: './pic2?group=' + group,
    //       })
    //     }
    //   },600)
    // }
    if( group == 0){
      wx.showModal({
        title: '提示',
        content: '尚未加入跑团，是否继续？',
        success: function(res){
          if(res.confirm){
            wx.navigateTo({
              url: './pic',
            })
          }
        }
      })
    }  else{
      wx.navigateTo({
        url: './pic2?group=' + group,
      })
    }
  },

  preview: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgList // 需要预览的图片http链接列表  
    })
  },

  previewHead: function (e) {
    var current = e.target.dataset.src;
    // console.log(current);
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.headList // 需要预览的图片http链接列表  
    })
  },

  join: function(e){
    var that = this;
    if(that.data.button == '查看'){
      var group = e.currentTarget.dataset.group;
      this.setData({
        refresh: 2
      });
      wx.navigateTo({
        url: './member?group=' + group,
      })
      return false;
    }
    var index = e.currentTarget.dataset.index;
    var club = e.currentTarget.dataset.club; 
    console.log(index);
    console.log(that.data.groupE);
    switch(+index){
      case 1: 
        if (that.data.groupA == 160){
          wx.showToast({
            title: '人数已满',
            duration: 500
          })
          return false;
        }
        break;
      case 2:
        if (that.data.groupB == 160) {
          wx.showToast({
            title: '人数已满',
            duration: 500
          })
          return false;
        }
        break;
      case 3:
        if (that.data.groupC == 160) {
          wx.showToast({
            title: '人数已满',
            duration: 500
          })
          return false;
        }
        break;
      case 4:
        if (that.data.groupD == 160) {
          wx.showToast({
            title: '人数已满',
            duration: 500
          })
          return false;
        }
        break;
      case 5:
        if (that.data.groupE == 160) {
          wx.showToast({
            title: '人数已满',
            duration: 500
          })
          return false;
        }
        break;
    }
    wx.showModal({
      title: '加入跑团',
      content: '确定要加入' + club + '?',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: "https://marathon.tbapps.com/wechat/group/addpost",
            data: {
              setupid: +index
            },
            method: 'POST',
            header: {
              'content-type': 'x-www-form-urlencoded', // 默认值
              'X-Requested-With': 'XMLHttpRequest',
              'Cookie': 'PHPSESSID=' + that.data.PHPSESSID
            },
            success: function (res) {
              switch(res.data.code){
                case 1: 
                  wx.showToast({
                    title: '加入跑团成功',
                    icon: 'success'
                  })
                  listClub();
                  getUser();
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

  onShareAppMessage: function () {
    return {
      title: '建发绿跑,让爱扎根',
      path: '/pages/index/index'
    }
  },

  onReachBottom: function () {
    var that = this;
    ++that.data.pageNo;
    listComment();
  },

  onShow: function(){
    var that = this;
    if(that.data.refresh == 1){
      return false;
    }
    that.setData({
      pageNo: 1,
      dataList: [],
      imgList: []
    });
    listClub();
    listComment();
  },

  onLoad: function () {
    var that = this;

    if(that.data.refresh == 1){
      wx.showToast({
        title: '加载中,请稍候!',
        icon: 'loading',
        duration: 2000
      })
    };

    listClub = function () {
      wx.request({
        url: "https://marathon.tbapps.com/wechat/group/listpost",
        data: {

        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'X-Requested-With': 'XMLHttpRequest',
          'Cookie': 'PHPSESSID=' + that.data.PHPSESSID
        },
        success: function (res) {
          var data = res.data;
          // console.log(data);
          switch (data.code) {
            case 1:
              that.setData({
                groupA: data.group1,
                groupB: data.group2,
                groupC: data.group3,
                groupD: data.group4,
                groupE: data.group5,
                progressA: data.group1/160*100,
                progressB: data.group2/160*100,
                progressC: data.group3/160*100,
                progressD: data.group4/160*100,
                progressE: data.group5/160*100
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
          }
        }
      })
    }

    listComment = function () {
      wx.request({
        url: "https://marathon.tbapps.com/wechat/comment/listpost",
        data: {
          pageSize: that.data.pageSize,
          pageNo: that.data.pageNo,
          order: {commentid: -1}
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'X-Requested-With': 'XMLHttpRequest',
          'Cookie': 'PHPSESSID=' + that.data.PHPSESSID
        },
        success: function (res) {
          var data = res.data;
          switch (data.code) {
            case 1:
              var commentList = data.commentList;
              var dataList = that.data.dataList;
              if(commentList.length == 0){
                // wx.showToast({
                //   title: '暂无更多数据',
                //   duration: 1000
                // })
                return false;
              }
              that.setData({
                dataList: dataList.concat(commentList)
              })
              // that.setData({
              //   dataList: commentList
              // })
              var imgList = new Array();
              var imgList1 = that.data.imgList;
              for (var i = 0; i < commentList.length; i++){
                if(commentList[i].imgList != []){
                  for (var j = 0; j < commentList[i].imgList.length; j++){
                    imgList.push(commentList[i].imgList[j])
                  }
                }
              }
              that.setData({
                imgList: imgList1.concat(imgList)
              })
              // console.log(that.data.imgList);
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
          }
        }
      })
    }

    login = function(){
      wx.request({
        url: "https://marathon.tbapps.com/wechat/userlogin/authloginPost",
        data: {
          openid: app.globalData.openid,
          nickName: that.data.nickName,
          headimgUrl: that.data.headimgUrl
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'X-Requested-With': 'XMLHttpRequest'
        },
        success: function (res) {
          switch (res.data.code) {
            case 0: 
              wx.showToast({
                title: '登录失败，请重试！',
              })
              // console.log('1212', that.data.nickName);
              // console.log('1222', that.data.headimgUrl);
              // console.log('1222', app.globalData.openid);
              // console.log(res);
            case 1:
              var assign = res.data.assign;
              that.setData({
                PHPSESSID: res.data.PHPSESSID
              });
              wx.setStorage({
                key: 'PHPSESSID',
                data: res.data.PHPSESSID,
              });
              wx.setStorage({
                key: 'jsParam',
                data: assign.jsParam,
              });
              listClub();
              listComment();
              getUser();                            
              break;
          }
        }
      })
    }

    getUser = function(){
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
              // console.log(user.group);
              that.setData({
                userGroup: user.group
              })
              if(user.group != 0){
                that.setData({
                  button: '查看'
                })
              }
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
    }

    if (app.globalData.userInfo.nickName && app.globalData.userInfo.avatarUrl && app.globalData.openid){
      that.setData({
        nickName: app.globalData.userInfo.nickName,
        headimgUrl: app.globalData.userInfo.avatarUrl
      })
      console.log(2);
      login();
    } else{
      wx.showToast({
        title: '加载中,请稍候!',
        icon: 'loading',
        duration: 1500
      })
      wx.getUserInfo({
        success: res => {
          var userInfo = res.userInfo;
          that.setData({
            nickName: userInfo.nickName,
            headimgUrl: userInfo.avatarUrl
          });
          setTimeout(function(){
            login();
            console.log(1);
          },700)
        }
      })
    }

  }
})
