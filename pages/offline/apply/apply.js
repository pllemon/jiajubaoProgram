const app = getApp()


Page({
  data: {
    money: '',
    point: 0,
    maxPoint: 0,
    totalPoint: 12,
    shop_id: ''
  },

  onLoad (params) {
    this.setData({
      shop_id: params.id
    })
  },

  changeMoney: function (e) {
    let money = e.detail.value;
    let point1 = parseInt(money / 100) * 5;
    let point2 = parseInt(totalPoint / 5) * 5;
    let maxPoint = Math.max(point1, point2);   
    console.log(maxPoint)

    this.setData({
      money: money,
      maxPoint: maxPoint
    })
  },

  formSubmit(e) {
    let formData = e.detail.value;
    formData.shop_id = this.data.shop_id;
    console.log(formData)
    app.request({
      url: '/applybusiness',
      data: formData,
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