const app = getApp()
var WxParse = require('../../../components/wxParse/wxParse.js');

Page({
  data: {
    doc: {
      about: '关于我们',
      lxwm: '联系我们',
      hhxy: '用户协议',
      sfxy: '师傅协议',
      sjxy: '商家协议'
    }
  },
  onLoad(params) {
    let that = this;
    let type =params.type;
    wx.setNavigationBarTitle({
      title: this.data.doc[type]
    })
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
})