const app = getApp()

Page({
  data: {
    isShow: false,
    personType: 0,
    record: [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3]
  },

  onLoad(params) {
    this.setData({
      personType: params.type
    })
    this.getList()
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

  getList() {
    let that = this;
    let personType = that.data.personType;
    let url = '/userintegrallist';
    if (personType == 2) {
      url = '';
    }
    app.request({
      url,
      data: {},
      success: function(data) {
        that.setData({
          list: data
        })
      }
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
  },
  
  changeIntegral() {

  }
})
