const app = getApp();
const common = require('../../../../utils/common.js');

Page({
  data: {
    form: {
      goods_name: '',
      price: '',
      goods_image: ''
    },
    imgArr: [],
    businessinfo: null
  },

  onLoad(params) {
    let that = this;
    const businessinfo = app.globalData.loginInfo.businessinfo
    that.setData({
      businessinfo
    })
  },

  formSubmit(e) {
    let that = this;
    let form = this.data.form;
    form.business_id = that.data.businessinfo.id
    
    if (!form.goods_name) {
      app.showModal('请输入商品名称');
      return false;
    }
    if (!form.price) {
      app.showModal('请输入商品价格');
      return false;
    }

    console.log(form)

    wx.showLoading({
      title: '上传中',
    })
    wx.uploadFile({
      url: 'http://47.106.100.144/businessuploadgoods',
      filePath: this.data.imgArr[0].url,
      name: 'goods_image',
      formData: form,
      header: {
        'content-type': 'multipart/form-data',
        'cookie': app.globalData.session
      },
      success: function(data) {
        let odata = JSON.parse(data.data)
        if (odata.success) {
          let payInfo = odata.data.payinfo
          wx.requestPayment({
            'nonceStr': payInfo.nonceStr,
            'package': payInfo.package,
            'signType': payInfo.signType,
            'timeStamp': payInfo.timeStamp.toString(),
            'paySign': payInfo.sign,
            'success':function(res){
              app.successToast('支付成功', function(){
                let pages = getCurrentPages();
                let beforePage = pages[pages.length - 2];
                beforePage.selectComponent("#list").getData(1);
                wx.navigateBack();    
              })
            },
            'fail':function(res){
              console.log(res)
              app.showModal('支付失败')
            }
          })
        } else {
          app.showModal(odata.message);
        }
      },
      fail: function(err) {
        console.log(err)
      },
      complete: function() {
        wx.hideLoading();
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
  }
})