const app = getApp()
var WxParse = require('../../../components/wxParse/wxParse.js');

Page({
  data: {
    doc: {
      about: '企业文化',
      lxwm: '使用说明',
      hhxy: '用户协议',
      sfxy: '师傅协议',
      sjxy: '商家协议',
      pttz: '平台消息',
      regulations: '用户须知'
    }
  },
  onLoad(params) {
    let that = this;
    let type =params.type;
    let id = params.id;
    wx.setNavigationBarTitle({
      title: this.data.doc[type]
    })
    if (type == 'pttz') {
      app.request({
        url: '/webmessageinfo',
        data: {
          id
        },
        success: function(data) {
          WxParse.wxParse('dec', 'html', data.dec, that, 0)
          wx.setNavigationBarTitle({
            title: data.title
          })
        }
      })
    } else {
      app.request({
        url: '/getdoc',
        data: {
          type: type
        },
        success: function(data) {
          WxParse.wxParse('dec', 'html', data.dec, that, 0)
        }
      })
    }
  }
})
