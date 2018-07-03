// pages/index/member.js
var listMember;
Page({
  data: {
    dataList: [],
    path: '../image/head.png',
    total: 0,
    club: '',
    pageNo: 1,
    pageSize: 20,
  },

  onLoad: function (options) {
    var that = this;

    var group = +options.group;
    switch(group){
      case 1:
        that.setData({
          club: '建发绿跑团-建发股份分队',
        })
        break;
      case 2:
        that.setData({
          club: '建发绿跑团-建发房产分队',
        })
        break;
      case 3:
        that.setData({
          club: '建发绿跑团-联发集团分队',
        })
        break;
      case 4:
        that.setData({
          club: '建发绿跑团-旅游集团分队',
        })
        break;
      case 5:
        that.setData({
          club: '建发绿跑团-本部+会展分队',
        })
        break;
    }

    listMember = function () {
      wx.request({
        url: "https://marathon.tbapps.com/wechat/group/getpost",
        data: {
          pageSize: 0,
          pageNo: 0,
          setupid: group
        },
        method: 'POST',
        header: {
          'content-type': 'x-www-form-urlencoded', // 默认值
          'X-Requested-With': 'XMLHttpRequest',
          'Cookie': 'PHPSESSID=' + that.data.PHPSESSID
        },
        success: function (res) {
          // console.log(res);
          // return false;
          var data = res.data;
          switch (data.code) {
            case 1:
              var userList = data.userList;
              // var dataList  = that.data.dataList;
              // that.setData({
              //   dataList: dataList.concat(userList),
              //   total: data.total
              // })
              that.setData({
                dataList: userList,
                total: data.total
              })
              // console.log(that.data.dataList);
              break;
            case 2003:
              wx.showToast({
                title: '获取列表失败',
                icon: 'success'
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
    },

    wx.getStorage({
      key: 'PHPSESSID',
      success: function (res) {
        that.setData({
          PHPSESSID: res.data
        });
        listMember();
      },
    })
  }
})