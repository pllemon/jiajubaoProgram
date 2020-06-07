const app = getApp();
const common = require('../../../../utils/common.js');

Page({
  data: {
    list: [
      {
        id: '1111',
        name: 'xxxxxxxxx',
        price: 2.5,
        number: 0
      },
      {
        id: '2222',
        name: 'yyyyyyyy',
        price: 5.5,
        number: 0
      }
    ],
    sum: 0
  },

  addGoods() {
    wx.navigateTo({
      url: '/pages/personal/businessman/addGoods/addGoods'
    })
  }
})
