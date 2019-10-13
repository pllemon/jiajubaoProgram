const app = getApp()

Page({
  data: {
    list: [],
    personType: 0,
    finish: false,
    query: {
      page: 1,
      limit: 10
    }
  },
  onLoad(params) {
    let personType = params.personType || 0;
    this.setData({
      personType: personType
    })
    this.getList()
  },

  getList() {
    let that = this;
    let personType = that.data.personType;
    let url = '/userunlinkorderlist';
    if (personType == 2) {
      url = '/businessorderlist';
    }
    app.request({
      url,
      data: that.data.query,
      success: function(data) {
        that.setData({
          list: data.data,
          finish: true
        })
      }
    })
  }
})
