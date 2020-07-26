const app = getApp();
const common = require('../../../utils/common.js');

Page({
  data: {

    networkArr: [],
    categroyArr: [],
    categroyIdx: '',

    form: {
      service_demand: '',
      service_id: '',
      urgent: 0,
      remark: '',
      district: '',
      city: '',
      province: '',
      address: ''
    },
    imgArr: [],
    addressInfo: null,
    checked: false,

    address: ''
  },

  onLoad(params) {
    let that = this;
    that.getCategory();
    common.getLocation(that, function(){
      that.getNetwork()
    });
  },

  // 获取类目
  getCategory() {
    let that = this
    app.request({
      url: '/getconfig',
      method: 'GET',
      data: {},
      success: function(data) {
        console.log(data)
        that.setData({
          categroyArr: data
        })
      }
    })
  },

  // 手动点击定位
  onOpenSetting() {
    let that = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation']) {
          common.getLocation(that, function(){
            that.getNetwork()
          });
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

  formSubmit() {
    let that = this;
    let form = this.data.form;
    let addressInfo = this.data.addressInfo;
    console.log(addressInfo)

    if (this.data.categroyIdx === '') {
      app.showModal('请选择服务需求');
      return false;
    }
    if (!addressInfo) {
      app.showModal('请定位服务地址');
      return false;
    }
    if (!that.data.networkArr.length) {
      app.showModal(addressInfo.address_component.city + '尚未开通网点哦，请选择其它地址');
      return false;
    }

    form.service_demand = this.data.categroyArr[this.data.categroyIdx].type_name;
    form.service_id = this.data.categroyArr[this.data.categroyIdx].id;
    form.address = addressInfo.address + form.address;
    form.urgent = this.data.checked ? 1 : 0;
    form.province = addressInfo.ad_info.provincecode;
    form.city = addressInfo.ad_info.citycode;
    form.district = addressInfo.ad_info.adcode;

    wx.requestSubscribeMessage({
      tmplIds: [
        '_2qnHOlTzMu_nTiJmamzCrkLaodBaZ6qZrOODYqpUNM', // 下单成功通知
        '1lvXKU_y_dwHgRukL9JmLDa2FCyak6FfduIbtJg_OD8', // 待支付通知（审核通过）
        'PCshYOrhnVT6H3pDkcIXFrAJlGzAy8f4Gwat7y54bCI' // 订单状态通知（审核不通过、超时未处理、超时未付款、客户取消）
      ],
      success (res) {
        if (that.data.imgArr.length > 0) {
          wx.showLoading({
            title: '上传中',
          })
          common.uploadImgs('uploadordersimg', that.data.imgArr, function (res) {
            wx.hideLoading();
            let mapArr = res.map(item => {
              return item.data
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
      fail(err) {
        console.log(err)
      }
    })
  },

  submitFn() { 
    app.request({
      url: '/markorder',
      data: this.data.form,
      success: function(data) {
        app.successToast('创建订单成功', function(){
          wx.reLaunch({
            url: '/pages/order/list/list?personType=0&showNav=1'
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
    let addressInfo = that.data.addressInfo;
    that.setData({
      networkArr: []
    })
    app.request({
      url: '/networklist',
      method: 'GET',
      data: {
        city: addressInfo.ad_info.citycode
      },
      success: function(data) {
        if (data.length == 0) {
          app.showModal(addressInfo.address_component.city + '尚未开通网点哦，请选择其它地址');
          return false;
        }
        that.setData({
          networkArr: data
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