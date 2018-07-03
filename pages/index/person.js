// pages/index/person.js
const app = getApp();
var listStep;

Page({
  data: {
    dataList: [],

    A: true,
    nameA: '',
    groupA: '',
    stepA: '',

    B: true,
    nameB: '',
    groupB: '',
    stepB: '',

    C: true,
    nameA: '',
    groupA: '',
    stepC: '',
  
  },
  
  onLoad: function (options) {
    var that = this;

    listStep = function () {
      wx.request({
        url: "https://marathon.tbapps.com/wechat/step/listpost",
        data: {
          pageSize: 0,
          pageNo: 0,
          order: {amount: -1}
        },
        method: 'POST',
        header: {
          'content-type': 'x-www-form-urlencoded', // 默认值
          'X-Requested-With': 'XMLHttpRequest',
          'Cookie': 'PHPSESSID=' + that.data.PHPSESSID
        },
        success: function (res) {
          console.log(res);
          var data = res.data;
          switch (data.code) {
            case 1:
              if(data.step1){
                that.setData({
                  A: false,
                  nameA: data.step1.name,
                  groupA: '',
                  stepA: data.step1.amount,
                })
                switch (data.step1.group){
                  case 1: 
                    that.setData({
                      groupA: '建发绿跑团-建发股份分队',
                    })
                    break;
                  case 2:
                    that.setData({
                      groupA: '建发绿跑团-建发房产分队',
                    })
                    break;
                  case 3:
                    that.setData({
                      groupA: '建发绿跑团-联发集团分队',
                    })
                    break;
                  case 4:
                    that.setData({
                      groupA: '建发绿跑团-旅游集团分队',
                    })
                    break;
                  case 5:
                    that.setData({
                      groupA: '建发绿跑团-本部+会展分队',
                    })
                    break; 
                }
              } else {
                wx.showToast({
                  title: '暂无数据',
                  duration:1200
                })
                return false;
              }
              if (data.step2) {
                that.setData({
                  B: false,
                  nameB: data.step2.name,
                  stepB: data.step2.amount,
                });
                switch (data.step2.group) {
                  case 1:
                    that.setData({
                      groupB: '建发绿跑团-建发股份分队',
                    })
                    break;
                  case 2:
                    that.setData({
                      groupB: '建发绿跑团-建发房产分队',
                    })
                    break;
                  case 3:
                    that.setData({
                      groupB: '建发绿跑团-联发集团分队',
                    })
                    break;
                  case 4:
                    that.setData({
                      groupB: '建发绿跑团-旅游集团分队',
                    })
                    break;
                  case 5:
                    that.setData({
                      groupB: '建发绿跑团-本部+会展分队',
                    })
                    break;
                }
              } else {
                return false;
              }
              if (data.step3) {
                that.setData({
                  C: false,
                  nameC: data.step3.name,
                  stepC: data.step3.amount,
                });
                switch (data.step3.group) {
                  case 1:
                    that.setData({
                      groupC: '建发绿跑团-建发股份分队',
                    })
                    break;
                  case 2:
                    that.setData({
                      groupC: '建发绿跑团-建发房产分队',
                    })
                    break;
                  case 3:
                    that.setData({
                      groupC: '建发绿跑团-联发集团分队',
                    })
                    break;
                  case 4:
                    that.setData({
                      groupC: '建发绿跑团-旅游集团分队',
                    })
                    break;
                  case 5:
                    that.setData({
                      groupC: '建发绿跑团-本部+会展分队',
                    })
                    break;
                }
              } else {
                return false;
              }
              if(data.stepList){
                var stepList = data.stepList;
                var newList = new Array();                         
                for (var i = 0; i < stepList.length; i++){
                  var item = {};
                  item.name = stepList[i].name;
                  item.step = stepList[i].amount;
                  if (stepList[i].group == 1){
                    item.group = '建发绿跑团-建发股份分队';
                  } else if (stepList[i].group == 2){
                    item.group = '建发绿跑团-建发房产分队';
                  } else if (stepList[i].group == 3) {
                    item.group = '建发绿跑团-联发集团分队';
                  } else if (stepList[i].group == 4) {
                    item.group = '建发绿跑团-旅游集团分队';
                  } else {
                    item.group = '建发绿跑团-本部+会展分队';
                  }
                  // console.log(item);
                  newList.push(item);
                }
                // console.log(newList);
                that.setData({
                  dataList: newList
                })
                console.log(that.data.dataList);
              }
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
        listStep();
      },
    })
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  }
})