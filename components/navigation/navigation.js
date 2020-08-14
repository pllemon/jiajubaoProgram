const app = getApp();
const common = require('../../utils/common.js');
Component({
  properties: {
    currentIdx: Number,
    place: {
      type: Boolean,
      value: true
    }
  },
  data: {
  },
  methods: {
    goHome() {
      wx.reLaunch({
        url: '/pages/index/index'
      })
    },

    goPersonal() {
      common.checkLogin(function() {
        wx.reLaunch({
          url: '/pages/personal/index/index'
        })
      })
    }
  }
})