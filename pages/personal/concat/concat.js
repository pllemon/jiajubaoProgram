const app = getApp()
var WxParse = require('../../../components/wxParse/wxParse.js');

Page({
  onLoad() {
    let that = this;
    app.request({
      url: '/getdoc',
      data: {
        type: 'lxwm'
      },
      success: function(data) {
        WxParse.wxParse('dec', 'html', data.dec, that, 0)
      }
    })
  }
})
