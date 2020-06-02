const app = getApp();
const common = require('../../../utils/common.js');

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

  onChange(e) {
    let idx = e.currentTarget.dataset.idx
    let number = e.detail
    this.setData({
      ['list['+idx+'].number'] : number
    })
    this.getSum()
  },

  getSum() {
    let list = this.data.list
    let sum = 0
    list.forEach(item => {
      sum += parseFloat(item.price) * parseFloat(item.number)
    })
    this.setData({
      sum
    })
  },

  makeOrder() {
    if (this.data.sum) {
      wx.showModal({
        title: '提示',
        content: '确定？',
        success (res) {
          if (res.confirm) {
            app.successToast('提交成功', function(){
              wx.redirectTo({
                url: '/pages/offline/list/list?personType=0'
              })
            })
          }
        }
      })
    }
  }
})
