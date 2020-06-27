const app = getApp()

Page({
  data: {
    personType: 0,
    
    requestUrl: '',
    list: [],
    query: {
      number: 1
    },
  },

  onLoad(params) {
    let personType = params.personType || 0
    this.setData({
      personType,
      requestUrl: personType == 1 ? '/craftsmancashoutlist' : '/userintegrallist'
    })
    this.selectComponent("#list").getData(1);
  },

  changeList(e) {
    this.setData({
      list: e.detail
    })
  }
})
