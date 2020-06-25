const app = getApp()

Page({
  data: {
    personType: 0,

    list: [],
    page: 1,
    lastPage: 1,
    loadStatus: 0
  },

  onLoad(params) {
    this.setData({
      personType: params.personType || 0
    })
    this.getList()
  },

  changeList(e) {
    this.getList(e.detail.type)
  },
  getList(type) {
    let that = this;
  
    that.setData({
      loadStatus: type || 1
    })

    let personType = that.data.personType;
    let url = '/userintegrallist';
    if (personType == 1) {
      url = '/craftsmancashoutlist';
    }
    app.request({
      url,
      data: {
        number: 1
      },
      success: function(data) {
        console.log(data)
        that.setData({
          page: 1,
          lastPage: 1,
          list: data
        })
      },
      complete: function() {
        that.setData({
          loadStatus: 0
        })
      }
    })
  }
})
