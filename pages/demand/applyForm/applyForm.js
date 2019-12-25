const app = getApp();
const common = require('../../../utils/common.js');
const moment = require('../../../utils/moment.min.js');

Page({
  data: {
    imgArr: [],
    addressInfo: null,
    showLocationDialog: false,
    date: '',
    time: '',

    networkArr: [],
    networkIdx: undefined,

    minDate: moment().add('days', 1).format('YYYY-MM-DD'),
    maxDate: moment().add('days', 15).format('YYYY-MM-DD'),

    service_demand: ''
  },

  onLoad(params) {
    let that = this;
    common.getLocation(that, function(){
      that.getNetwork()
    });

    that.setData({
      service_id: params.service_id,
      service_demand: app.globalData.service_demand
    })

  },

  // 手动点击定位
  onOpenSetting() {
    let that = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation']) {
          common.getLocation(that)
        }
      }
    })
  },

  upDateLocation() {
    this.setData({
      showLocationDialog: false
    })
    common.getLocation(this)
  },

  // 更改值
  bindChange (e) {
    this.setData({
      [e.target.dataset.label]: e.detail.value
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

    if (!that.data.addressInfo) {
      app.showModal('请定位服务地址');
      return false;
    }
    if (!that.data.networkIdx) {
      app.showModal('请选择服务网点');
      return false;
    } 
    if (!that.data.date) {
      app.showModal('请选择预约日期');
      return false;
    }
    if (!that.data.time) {
      app.showModal('请选择预约时间');
      return false;
    }

    formData.service_demand = this.data.service_demand;
    formData.service_id = this.data.service_id;
    formData.appo_time = this.data.date + ' ' + this.data.time;
    formData.address = this.data.addressInfo.address + formData.address; 
    formData.network_id = this.data.networkArr[that.data.networkIdx].id;

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
        common.getLocationMes(res, function(data) {
          data.address = res.address + res.name
          app.globalData.addressInfo = data
          that.setData({
            addressInfo: data
          })
          that.getNetwork()
        })
      }
    })
  },

  getNetwork() {
    let that = this;
    that.setData({
      networkArr: [],
      networkIdx: undefined
    })
    app.request({
      url: '/networklist',
      method: 'GET',
      data: {
        district: that.data.addressInfo.ad_info.adcode
      },
      success: function(data) {
        if (data.length == 0) {
          app.showModal('该区域尚未开通网点哦');
          return false;
        }
        let networkArr = data.map(item => {
          return {
            id: item.id,
            name: item.name
          }
        })
        that.setData({
          networkArr: networkArr,
          networkIdx: undefined
        })
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