const app = getApp()


Page({
  data: {
    money: '',
    point: 0,
    maxPoint: 0,
    totalPoint: 120,
    business_id: ''
  },

  onLoad (params) {
    this.setData({
      business_id: params.id
    })
  },

  changeMoney: function (e) {
    let money = e.detail.value;
    let point1 = parseInt(money / 100) * 5;
    let point2 = parseInt(this.data.totalPoint / 5) * 5;
    let maxPoint = Math.min(point1, point2);

    this.setData({
      point: maxPoint,
      money: money,
      maxPoint: maxPoint
    })
  },

  formSubmit(e) {
    let that = this;
    if(!that.data.money){
      app.showModel('请输入消费金额');
      return false;
    }
    app.request({
      url: '/useruseintegral',
      data: {
        integral: that.data.point,
        money: that.data.money,
        business_id: that.data.business_id,
      },
      success: function(data) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/offline/list/list?personType=0'
          })
        }, 2000)
      }
    })
  }
})