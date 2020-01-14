const app = getApp();
const common = require('../../../utils/common.js');

Page({
  data: {
    imgArr: [],
    info: '',

    form: {
      order_id: '',
      title: '',
      dec: '',
      imgurl1: '',
      imgurl2: '',
      imgurl3: '',
      imgurl4: ''
    }
  },

  onLoad(params) {
    let form = this.data.form
    form.order_id = params.id
    if (params.number == 2) {
      form.number = params.number
    }
    this.setData({
      form
    })
    if (form.number) {
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
        console.log(data)
        let form = this.data.form
        form.title = data.title
        form.dec = data.dec
        form.imgurl1 = data.imgurl1
        form.imgurl2 = data.imgurl2
        that.setData({
          form
        })
      }
    })
  },

  formSubmit() {
    let that = this;
    let form = this.data.form;
    let imgArr = this.data.imgArr; 
    if (!form.title) {
      app.showModal('请填写标题');
      return false;
    }
    if (!imgArr.length) {
      app.showModal('请上传图片');
      return false;
    }
    if (imgArr.length > 0) {
      wx.showLoading({
        title: '上传中',
      })   
      common.uploadImgs('uploadordershow', this.data.imgArr, function (res) {
        that.setData({
          imgArr: res
        })
        wx.hideLoading();
        that.submitFn(form);
      })
    } else {
      that.submitFn(form);
    } 
  },

  submitFn() {
    let form = this.data.form;
    let imgArr = this.data.imgArr;
    let url = '';
    if (form.number) {
      form.imgurl3 = imgArr[0] ? imgArr[0].data : '';
      form.imgurl4 = imgArr[1] ? imgArr[1].data : '';
      url = '/savecraftsmanshow';
    } else {
      form.imgurl1 = imgArr[0] ? imgArr[0].data : '';
      form.imgurl2 = imgArr[1] ? imgArr[1].data : '';
      url = '/craftsmanshow';
    }
    console.log(form)
    return false
    app.request({
      url: url,
      data: form,
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