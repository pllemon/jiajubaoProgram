const app = getApp();
const common = require('../../../../utils/common.js');

Page({
  data: {
    list: [],
    requestUrl: '/businessgoodslist',
    query: {},
    finish: false
  },

  changeList(e) {
    this.setData({
      list: e.detail
    })
    setTimeout(() => {
      this.setData({
        finish: true
      })
    }, 2000)
  },

  addGoods() {
    wx.navigateTo({
      url: '/pages/personal/businessman/addGoods/addGoods'
    })
  },

  goodsDetails(e) {
    wx.navigateTo({
      url: '/pages/personal/businessman/addGoods/addGoods?id=' + e.currentTarget.dataset.id
    })
  },

  payAgain(e) {
    let that = this
    let id = e.currentTarget.dataset.id
    let idx = e.currentTarget.dataset.idx
    app.request({
      url: '/businessgoodsinfo',
      method: 'get',
      data: {
        goods_id: id
      },
      success: function(data) {
        let payInfo = data.payinfo
        wx.requestPayment({
          'nonceStr': payInfo.nonceStr,
          'package': payInfo.package,
          'signType': payInfo.signType,
          'timeStamp': payInfo.timeStamp.toString(),
          'paySign': payInfo.sign,
          'success':function(res){
            app.successToast('支付成功', function(){
              that.setData({
                ['list[' + idx + '].status']: 1
              })
            })
          },
          'fail':function(res){
            console.log(res)
            app.showModal('支付失败')
          }
        })
      }
    })
  },

  changeStatus(e) {
    let that = this
    let status = e.currentTarget.dataset.status
    let idx = e.currentTarget.dataset.idx
    let id = e.currentTarget.dataset.id
    app.request({
      loadText: '提交中',
      url: '/businesssavegoodsstatus',
      data: {
        goods_id: id,
        status: status
      },
      success: function(data) {
        if (status == 3) {
          that.selectComponent("#list").getData(1);
        } else {
          that.setData({
            ['list[' + idx + '].status']: status
          })
        }
      }
    })
  }
})
