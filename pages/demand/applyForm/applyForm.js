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
    let that = this;
    that.setData({
      service_id: params.service_id,
      service_demand: app.globalData.service_demand
    })
    common.addressCallBack(app, that);

    that.getNetwork();
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

  // 更新图片
  updateImg(e) {
    let { name, arr } = e.detail;
    this.setData({
      [name]: arr
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
      common.uploadImgs('uploadordersimg', this.data.imgArr, function (res) {
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

  getNetwork() {
    app.request({
      url: '/networklist',
      data: {},
      success: function(data) {
        console.log(data)
      }
    })
  },

  submitFn(formData) {  
    console.log(formData)
    app.request({
      url: '/markorder',
      data: formData,
      success: function(data) {
        app.successToast('创建订单成功', function(){
          wx.reLaunch({
            url: '/pages/personal/index/index'
          })
        })
      }
    })
  }
})