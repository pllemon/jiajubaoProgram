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
    goPersonal() {
      common.checkLogin(function() {
        wx.reLaunch({
          url: '/pages/personal/index/index'
        })
      })
    }
  }
})