const app = getApp()

Page({
  data: {
    list: [],
    query: {},
    requestUrl: '',

    personType: 0
  },
  onLoad(params) {
    let personType = params.personType || 0;
    let url = personType == 0 ? '/userunlinkorderlist' : '/businessorderlist';

    this.setData({
      personType: personType,
      requestUrl: url
    })
    this.selectComponent("#list").getData(1);
  },

  changeList(e) {
    this.setData({
      list: e.detail
    })
  }
})
