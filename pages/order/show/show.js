const app = getApp();
const common = require('../../../utils/common.js');

Page({
  data: {
    imgArr: [],
    info: '',
    id: '',
    form: {
      order_id: '',
      title: '',
      dec: '',
      imgurl1: '',
      imgurl2: '',
      imgurl3: '',
      imgurl4: ''
    },
    maxCount: 1,
    title: '添加施工前图片'
  },

  onLoad(params) {
    let id = this.data.id
    let form = this.data.form
    let maxCount = this.data.form
    let title = this.data.title
    form.order_id = params.order_id
    if (params.number == 2) {
      form.number = params.number
      id = params.id
      maxCount = 2
      title = "添加施工后图片"
    }
    this.setData({
      form,
      id,
      maxCount,
      title
    })
    if (form.number) {
      this.getDetails()
    }
  },

  // 获取资料
  getDetails() {
    let that = this;
    app.request({
      url: '/ordershowinfo',
      data: {
        show_id: that.data.id
      },
      success: function(data) {
        console.log(data)
        let form = that.data.form
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
      form.id = this.data.id;
      form.imgurl3 = imgArr[0] ? imgArr[0].data : '';
      form.imgurl4 = imgArr[1] ? imgArr[1].data : '';
      url = '/savecraftsmanshow';
    } else {
      form.imgurl1 = imgArr[0] ? imgArr[0].data : '';
      form.imgurl2 = imgArr[1] ? imgArr[1].data : '';
      url = '/craftsmanshow';
    }
    app.request({
      url: url,
      data: form,
      success: function(data) {
        app.successToast('上传成功', function(){
          let pages = getCurrentPages();
          let beforePage = pages[pages.length - 2];
          beforePage.getInfo();
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