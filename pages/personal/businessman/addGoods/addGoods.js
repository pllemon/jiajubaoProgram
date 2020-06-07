const app = getApp();
const common = require('../../../../utils/common.js');

Page({
  data: {
    statusArr: [
      {
        id: 'TG',
        name: '成功'
      },
      {
        id: 'BH',
        name: '失败'
      }
    ],
    statusIdx: 0,

    form: {
      status: '',
      appo_time: '',
      htremark: '',
      total_price: '',
      bjimg: ''
    },
    imgArr: []
  },

  onLoad(params) {
    let that = this;
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
    let pass = true;
    form.status = this.data.statusArr[this.data.statusIdx].id;
    
    if (this.data.statusIdx == 0) { // 通过
      if (!form.appo_time) {
        app.showModal('请选择开工时间');
        pass = false;
        return false;
      }
      if (!form.total_price) {
        app.showModal('请输入订单总价');
        pass = false;
        return false;
      }
      if (!this.data.imgArr.length) {
        app.showModal('请上传报价单');
        pass = false;
        return false;
      }
    } else {
      form.appo_time = ''
      form.total_price = ''
    }

    if (!pass) {
      return false;
    }

    wx.showLoading({
      title: '上传中',
    })
    common.uploadImgs('uploadordersimg', this.data.imgArr, function (res) {
      wx.hideLoading();
      form.bjimg = res[0].url;
      that.setData({
        form
      })
      that.submitFn();
    })
  },

  submitFn() {  
    console.log(this.data.form)
    return false;
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