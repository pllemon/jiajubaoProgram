const app = getApp()
const common = require('../../utils/common.js')
Page({
  data: {
    imgArr: [],
    addressInfo: null,
    date: '请选择',
    time: '请选择',

    showDate: false,
    minDate: new Date().getTime(),
    maxDate: new Date(2019, 10, 1).getTime(),
    currentDate: new Date().getTime()
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

  addImg() {
    let that = this;
    common.chooseImgs(3, that.data.imgArr, function(res) {
      console.log(res);
      that.setData({
        imgArr: res
      })
    })
  },

  deleteImg(i) {
    common.deleteImg(this.data.imgArr, i, function(res) {
      this.setData({
        imgArr: res
      })
    })
  },

  formSubmit: function(e) {
    let formData = e.detail.value;
    formData.appo_time = this.data.date + ' ' + this.data.time;
    // formData.address = this.data.addressInfo.address + formData.address;
    console.log(formData)

    common.uploadImgs('http://192.168.1.104/uploadordersimg', this.data.imgArr, 0, function (res) {
      console.log(res)
      return false;

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
              url: '/pages/personal/index/index'
            })
          }, 2000)
        }
      })
    })
  }
})