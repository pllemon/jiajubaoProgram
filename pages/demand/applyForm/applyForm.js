const app = getApp();
const common = require('../../../utils/common.js');

Page({
  data: {

    networkArr: [],
    networkIdx: undefined,

    form: {
      service_demand: '',
      service_id: '',
      urgent: false,
      remark: ''
    },
    imgArr: [],
    addressInfo: null,
    service_demand: '',
    checked: false
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

  // 更改值
  bindChange (e) {
    this.setData({
      [e.target.dataset.label]: e.detail.value
    })
  },

  formSubmit(e) {
    let that = this;
    let form = this.data.form;

    if (!that.data.addressInfo) {
      app.showModal('请定位服务地址');
      return false;
    }
    if (!that.data.networkIdx) {
      app.showModal('请选择服务网点');
      return false;
    }

    form.service_demand = this.data.service_demand;
    form.service_id = this.data.service_id;
    form.address = this.data.addressInfo.address + e.detail.value.address;
    form.network_id = this.data.networkArr[that.data.networkIdx].id;
    form.urgent = this.data.checked;
    let ad_info = this.data.addressInfo.ad_info;
    form.region = ad_info.province + ad_info.city + ad_info.district;
    form.province = ad_info.provincecode;
    form.city = ad_info.citycode;
    form.district = ad_info.adcode;

    if (this.data.imgArr.length > 0) {
      wx.showLoading({
        title: '上传中',
      })
      common.uploadImgs('uploadordersimg', this.data.imgArr, function (res) {
        console.log(res)
        wx.hideLoading();
        let mapArr = res.map(item => {
          return item.url
        })
        form.imglist = mapArr.join(',');
        that.setData({
          form,
          imgArr: res
        })
        that.submitFn();
      })
    } else {
      form.imglist = '';
      that.setData({
        form
      })
      that.submitFn();
    } 
  },

  submitFn() {  
    console.log(this.data.form)
    return false

    app.request({
      url: '/markorder',
      data: this.data.form,
      success: function(data) {
        app.successToast('创建订单成功', function(){
          wx.reLaunch({
            url: '/pages/personal/index/index'
          })
        })
      }
    })
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



  afterRead(e) {
    common.readImage(this, e)
  },  
  deleteImage(e) {
    common.deleteImage(this, e)
  },
  onChange(e) {
    common.changeInput(this, e)
  },
  changeSwitch(event) {
    this.setData({
      checked: event.detail
    })
  },
})