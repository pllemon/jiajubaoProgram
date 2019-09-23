const app = getApp();
const common = require('../../../utils/common.js');

Page({
  data: {
    imgArr: [],
    addressInfo: null,
    date: '请选择',
    time: '请选择',

    showDate: false,
    minDate: new Date().getTime(),
    maxDate: new Date(2019, 10, 1).getTime(),
    currentDate: new Date().getTime(),

    service_demand: ''
  },

  onLoad(params) {
    this.setData({
      service_id: params.service_id,
      service_demand: app.globalData.service_demand,
      addressInfo: app.globalData.addressInfo
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

  formSubmit(e) {
    let that = this;
    let formData = e.detail.value;
    let imgArr = this.data.imgArr;
    formData.service_demand = this.data.service_demand;
    formData.service_id = this.data.service_id;
    formData.appo_time = this.data.date + ' ' + this.data.time;
    formData.address = this.data.addressInfo.address + formData.address; 
    if (imgArr.length > 0) {
      wx.showLoading({
        title: '上传中',
      })   
      common.uploadImgs('http://47.106.100.144/uploadordersimg', this.data.imgArr, 0, function (res) {
        console.log(res)
        wx.hideLoading();
        formData.imglist = res.join(',');
        that.submitFn(formData);
      })
    } else {
      formData.imglist = '';
      that.submitFn(formData);
    } 
  },

  submitFn(formData) {  
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
            url: '/pages/personal/index/index'
          })
        }, 2000)
      }
    })
  }
})