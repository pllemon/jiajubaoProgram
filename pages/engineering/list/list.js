const app = getApp()

Page({
  data: {
    list: [],
    query: {}
  },

  onLoad() {
    
  },

  changeList(e) {
    this.setData({
      list: e.detail
    })
  },

  updateArea(e) {
    let regionInfo = app.globalData.regionInfo
    this.setData({
      query: {
        province: regionInfo.code[0] || '',
        city: regionInfo.code[1] || '',
        district: regionInfo.code[2] || '',
      }
    })
    this.selectComponent("#list").getData(1);
  },

  updateNetwork(e) {
    this.setData({
      query: {
        province: '',
        city: '',
        district: '',
        network_id: e.detail.id || ''
      }
    })
    this.selectComponent("#list").getData(1);
  },

  // 分享
  onShareAppMessage: function (res) {
    return {
      title: '加入我们，分享提成！',
      path: '/pages/engineering/list/list'
    }
  }
})
