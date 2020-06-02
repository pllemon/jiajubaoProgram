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
  }
})
