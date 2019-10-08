const app = getApp()
var WxParse = require('../../../components/wxParse/wxParse.js');

Page({
  data: {
    info: {},
    contents: '<p>eeeee</p><p style="font-size:40px;color:red">eeeee</p><p>eeeee</p><ul><li>11111</li><li>2222</li><li>33333</li></ul>'
  },

  onLoad() {
    let that = this;
    app.request({
      url: '/getdoc',
      data: {
        type: 'lxwm'
      },
      success: function(data) {
        that.setData({
          info: data
        })
        WxParse.wxParse('dec', 'html', data.dec, that, 0)
      }
    })
  }
})
