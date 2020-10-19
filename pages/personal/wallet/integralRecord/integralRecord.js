const app = getApp()

Page({
  data: {
    personType: 0,
    
    requestUrl: '/userintegrallist',
    list: [],
    sumintegral: '',
    query: {},
  },

  changeList(e) {
    this.setData({
      list: e.detail.list,
      sumintegral: e.detail.data ? e.detail.data.sumintegral : 0
    })
  },

  buyIntegral() {
    let that = this
    app.request({
      url: '/userbuyintegral',
      data: {
        money: 1
      },
      success: function(data) {
        let odata = data.payinfo
        wx.requestPayment({
          'nonceStr': odata.nonceStr,
          'package': odata.package,
          'signType': odata.signType,
          'timeStamp': odata.timeStamp.toString(),
          'paySign': odata.sign,
          'success':function(res){
            app.successToast('支付成功', function(){
              that.selectComponent("#list").getData(1);
            })
          },
          'fail':function(res){
            console.log(res)
            app.showModal('支付失败')
          }
        })
      }
    })
  }
})
