const app = getApp();
const common = require('../../../../utils/common.js');

Page({
  data: {
    list: [],
    requestUrl: '/businessgoodslist',
    query: {},
  },

  changeList(e) {
    this.setData({
      list: e.detail
    })
  },

  addGoods() {
    wx.navigateTo({
      url: '/pages/personal/businessman/addGoods/addGoods'
    })
  }
})
