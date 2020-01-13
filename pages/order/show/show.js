const app = getApp();
const common = require('../../../utils/common.js');

Page({
  data: {
    imgArr: [],
    order_id: '',
    number: '',
    info: ''
  },

  onLoad(params) {
    this.setData({
      order_id: params.id,
      number: params.number
    })
    if (params.number == 2) {
      this.getDetails()
    }
  },

  // 获取资料
  getDetails(id) {
    let that = this;
    app.request({
      url: '/ordershowinfo',
      data: {
        show_id: id
      },
      success: function(data) {
        that.setData({
          info: data
        })
      }
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
        app.successToast('上传成功', function(){
          wx.navigateBack()
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
})