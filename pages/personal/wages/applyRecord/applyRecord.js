const app = getApp()

Page({
  data: {
    personType: 0,
    
    requestUrl: '/craftsmancashoutlist',
    list: [],
    query: {},

    currType: -1,
    applyStatus: [
      {text: '全部', value: -1},
      {text: '待处理', value: 0},
      {text: '已发放', value: 1},
      {text: '已驳回', value: 3},
    ]
  },

  changeType(e) {
    if (e.detail.name == -1) {
      this.setData({
        query: {}
      })
    } else {
      this.setData({
        query: {
          status: e.detail.name
        }
      })
    }
    this.selectComponent("#list").getData(1);
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
  },

  viewImage(e) {
    let url = e.currentTarget.dataset.url
    let imgSrc = 'https://www.dsfjjwx.com/' + url
    wx.previewImage({
      current: imgSrc,
      urls: [imgSrc]
    })
  }
})
