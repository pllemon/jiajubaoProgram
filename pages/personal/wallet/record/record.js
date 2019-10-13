const app = getApp()

Page({
  data: {
    personType: 0,
    list: [],
    sumintegral: 0
  },

  onLoad(params) {
    this.setData({
      personType: params.type || 0
    })
    this.getList()
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
          list: data.list.data,
          sumintegral: data.sumintegral
        })
      }
    })
  }
})
