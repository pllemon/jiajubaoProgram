const app = getApp()

Page({
  data: {
    list: [],
    page: 1,
    lastPage: 1,
    loadStatus: 0,

    personType: 0
  },
  onLoad(params) {
    let personType = params.personType || 0;
    this.setData({
      personType: personType
    })
    this.getList(1)
  },

  changeList(e) {
    this.getList(e.detail.type)
  },

  getList(type) {
    let that = this;
    let page = type == 1 ? 1 : ++ this.data.page;
    let url = that.data.personType == 0 ? '/userunlinkorderlist' : '/businessorderlist';

    that.setData({
      loadStatus: type || 1,
      page
    })

    app.request({
      url,
      data: {
        page: page
      },
      hideLoading: true,
      success: function(data) {
        let list = type == 1 ? data.data : that.data.list.concat(data.data);
        that.setData({
          lastPage: data.last_page,
          list
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
