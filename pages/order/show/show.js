const app = getApp();
const common = require('../../../utils/common.js');

let uploadNum = 0;
Page({
  data: {
    imgArr: [],
    success_img: [],
    info: '',
    id: '',
    form: {
      order_id: '',
      title: '',
      dec: '',
      imgurl1: '',
      imgurl2: '',
      imgurl3: '',
      imgurl4: '',
      add_money: 0,
      add_remark: '',
      success_img: ''
    },
    maxCount: 1,
    title: '开工图',
    number: 1
  },

  onLoad(params) {
    let id = this.data.id
    let form = this.data.form
    let maxCount = this.data.maxCount
    let title = this.data.title
    let number = this.data.number
    form.order_id = params.order_id
    if (params.number == 2) {
      form.number = params.number
      number = 2
      id = params.id
      maxCount = 1
      title = "完工图"
    }
    this.setData({
      form,
      id,
      maxCount,
      title,
      number
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
        form.title = that.data.title
        form.dec = data.dec
        form.imgurl1 = data.imgurl1
        that.setData({
          form
        })
      }
    })
  },

  formSubmit() {
    let that = this;
    let form = this.data.form;
    let number = this.data.number;
    let imgArr = this.data.imgArr; 
    let success_img = this.data.success_img; 
    
    if (number == 2) {
      if (!imgArr.length) {
        app.showModal('请上传完工图');
      } else if (!success_img.length) {
        app.showModal('请上传结算单');
      } else if (form.add_money && !form.add_remark) {
        app.showModal('请填写增项说明');
      } else {
        wx.showModal({
          title: '提示',
          content: '确定增项费用为' + (form.add_money || 0)+ '元?',
          success (res) {
            if (res.confirm) {
              uploadNum = 0;
              that.upload('imgArr', 'uploadordershow', 'imgurl3');
              that.upload('success_img', 'uploadordershow', 'success_img');
            }
          }
        })
      }
    } else {
      if (!imgArr.length) {
        app.showModal('请上传开工图');
      } else {
        uploadNum = 0;
        that.upload('imgArr', 'uploadordershow', 'imgurl1');
      }
    }
  },

  upload(name, url, name2) {
    let that = this;
    let form = this.data.form;
    common.uploadImg(url, this.data[name][0], function (res) {
      form[name2] = res.data;
      uploadNum++;
      if (uploadNum == that.data.number) {
        wx.hideLoading();
        that.submitFn();
      }
    })
  },


  submitFn() {
    let form = this.data.form;
    let url = '';
    if (form.number) {
      form.id = this.data.id;
      url = '/savecraftsmanshow';
    } else {
      url = '/craftsmanshow';
    }
    app.request({
      url: url,
      data: form,
      loadText: '提交中',
      success: function(data) {
        app.successToast('提交成功', function(){
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