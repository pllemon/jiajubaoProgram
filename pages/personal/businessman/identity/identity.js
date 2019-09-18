const app = getApp()
const common = require('../../../../utils/common.js');

Page({
  data: {
    imgArr: [],
    addressInfo: null,
    date: '请选择',
    time: '请选择',
    addressInfo: null
  },

  onLoad () {
    let that = this;
    common.addressCallBack(app, that);
  },

  chooseAddress() {
    let that = this
    wx.chooseLocation({
      success(res) {
        console.log(res)
        let addressInfo = {
          address: res.address + res.name
        }        
        that.setData({
          addressInfo: addressInfo
        })
      }
    })
  },

  addImg: function () {
    let that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        that.setData({
          imgArr: that.data.imgArr.concat(res.tempFilePaths)
        })
      }
    })
  },

  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },

  formSubmit: function(e) {
    let formData = e.detail.value;
    formData.appo_time = this.data.date + ' ' + this.data.time;
    formData.address = this.data.addressInfo.address + formData.address;
    console.log(formData)
    app.request({
      url: '/markorder',
      data: formData,
      success: function(data) {
        wx.showToast({
          title: '创建订单成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '/pages/personal/user/index/index'
          })
        }, 2000)
      }
    })

    
  }

})