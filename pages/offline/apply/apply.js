const app = getApp()


Page({
  data: {
    isFocus: true,
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
    this.getSumintegral();
  },

  getSumintegral() {
    let that = this;
    let url = '/userintegrallist';
    app.request({
      url,
      data: {
        page: 0,
        limit: 20
      },
      success: function(data) {
        that.setData({
          totalPoint: data.sumintegral
        })
      }
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
    let obj = {
      integral: that.data.point,
      money: that.data.money,
      business_id: that.data.business_id
    }
    app.request({
      url: '/useruseintegral',
      data: obj,
      success: function(data) {
        app.successToast('提交成功', function(){
          wx.redirectTo({
            url: '/pages/offline/list/list?personType=0'
          })
        })
      }
    })
  }
})