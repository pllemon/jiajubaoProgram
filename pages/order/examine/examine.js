const app = getApp();
const common = require('../../../utils/common.js');

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
      user_id: '',
      order_id: '',
      order_sn: '',
      qxremark: '',
      is_bj: '',
      network_id: '',
      status: '',
      appo_time: '',
      htremark: '',
      total_price: ''
    },
    imgArr: []
  },

  onLoad(params) {
    let that = this;
    this.getInfo(params.id);
  },

  // 获取订单信息
  getInfo(id) {
    let that = this;
    app.request({
      url: '/orderinfo',
      data: {
        order_id: id
      },
      success: function(data) {
        let form = that.data.form
        form.order_id = data.info.order_id
        form.order_sn = data.info.order_sn
        form.network_id = data.info.network_id
        form.user_id = data.info.user_id
        form.is_bj = 1
        that.setData({
          form
        })
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

    wx.requestSubscribeMessage({
      tmplIds: [
        'PCshYOrhnVT6H3pDkcIXFrAJlGzAy8f4Gwat7y54bCI', // 订单状态通知
        'licae_GE4-PdJSQGH4xnYcfym-xU9FoSBwsRROKfYfI', // 上门服务通知
        'yNr9z5sKxSjBw0H_soe2irpPPu1dSRxjwn0bQ2sUjCE' // 师傅维修完成通知
      ],
      success (res) {
        wx.showLoading({
          title: '上传中',
        })
        wx.uploadFile({
          url: 'http://47.106.100.144/networkorderexamine',
          filePath: that.data.imgArr[0].url,
          name: 'bjimg',
          formData: form,
          header: {
            'content-type': 'multipart/form-data',
            'cookie': app.globalData.session
          },
          success: function(data) {
            let odata = JSON.parse(data.data)
            if (odata.success) {
              app.successToast('提交成功', function(){
                let pages = getCurrentPages();
                let beforePage = pages[pages.length - 2];
                beforePage.getInfo();
                wx.navigateBack();        
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
  changeTime(e) {
    let key = e.target.dataset.key
    this.setData({
      [key]: e.detail.dateString
    })
  }
})