const app = getApp()

Page({
  data: {
    searchValue: '',
    personType: 0,
    orderStatus: {},

    list: [],
    page: 1,
    lastPage: 1,
    loadStatus: 0,
    status: '',
    keyword: ''
  },
  onLoad(params) {
    this.setData({
      showNav: params.showNav || 0,
      personType: params.personType,
      orderStatus: app.globalData.personMessage[params.personType].orderStatus
    })
    this.getList()
  },

  // 获取订单列表
  changeList(e) {
    this.getList(e.detail.type)
  },
  getList() {
    let that = this;
    let personType = that.data.personType;
    let url = personType == 0 ? '/userorderlist' : '/craftsmanorderlist';
    let status = personType == 0 ? 'status' : 'cmorderstatus';

    that.setData({
      loadStatus: 1,
      list: []
    })

    app.request({
      url,
      data: {
        [status]: this.data.status,
        keyword: this.data.keyword
      },
      hideLoading: true,
      success: function(data) {
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
  },

  changeType(e) {
    this.setData({
      status: e.detail.name
    })
    this.getList()
  }
})
