const app = getApp()

Page({
  data: {
    isShow: false,
    personType: 0,
    sumintegral: 0
  },

  onLoad(params) {
    this.setData({
      personType: params.personType || 0
    })
    this.getList();
  },

  getList() {
    let that = this;
    let personType = that.data.personType;
    let url = '/userintegrallist';
    if (personType == 2) {
      url = '/busiintegrallist';
    }
    app.request({
      url,
      data: {
        page: 0,
        limit: 20
      },
      success: function(data) {
        that.setData({
          sumintegral: data.sumintegral
        })
      }
    })
  },

  showExplain() {
    this.setData({
      isShow: true
    })
  },

  closeExplain() {
    this.setData({
      isShow: false
    })
  },

  useIntegral() {
    wx.navigateTo({
      url: '/pages/offline/apply/apply?id=33'
    })
    return false
    wx.scanCode({
      success (res) {
        console.log(res)
      }
    })
  }
})
