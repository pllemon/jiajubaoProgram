const app = getApp()

Page({
  data: {
    personType: 0,
    
    requestUrl: '/craftsmancashoutlist',
    list: [],
    query: {
      
    },
  },

  changeList(e) {
    this.setData({
      list: e.detail
    })
  },

  apply(e) {
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/personal/wages/apply/apply?type=' + type
    })
  }
})
