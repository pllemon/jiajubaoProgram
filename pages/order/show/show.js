const app = getApp();
const common = require('../../../utils/common.js');

Page({
  data: {
    imgArr: [],
    order_id: ''
  },

  onLoad(params) {
   this.setData({
    order_id: params.id
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
    if (imgArr.length > 0) {
      wx.showLoading({
        title: '上传中',
      })   
      common.uploadImgs('uploadordershow', this.data.imgArr, function (res) {
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
    formData.order_id = this.data.order_id;
    app.request({
      url: '/craftsmanshow',
      data: formData,
      success: function(data) {
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 1000
        })
        setTimeout(function () {
          wx.navigateBack()
        }, 1000)
      }
    })
  }
})