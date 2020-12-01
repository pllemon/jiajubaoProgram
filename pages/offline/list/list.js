const app = getApp()

Page({
  data: {
    list: [],
    query: {},
    requestUrl: '',

    personType: 0,
    offlineStatus: {}
  },
  onLoad(params) {
    let personType = params.personType || 0;
    let url = personType == 0 ? '/userunlinkorderlist' : '/businessorderlist';
    
    this.setData({
      offlineStatus: app.globalData.offlineStatus,
      personType: personType,
      requestUrl: url
    })
    this.selectComponent("#list").getData(1);
  },

  changeList(e) {
    this.setData({
      list: e.detail
    })
  },

  deleteOrder(e) {
    const that = this
    let index = e.target.dataset.index
    let list = that.data.list
    app.request({
      url: '/userhandleneedorder',
      data: {
        status: 3,
        order_sn: list[index].order_sn
      },
      loadText: '提交中',
      success: function(data) {
        app.successToast(mes, function(){
          list.splice(idx, 1)
          that.setData({
            list
          })
        })
      }
    })
  }
})
