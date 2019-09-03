const app = getApp();

Page({
  data: {
    acitveIdx: 0,
    categoryList: [],
    subcategory: []
  },

  onLoad() {
    this.getCategory();
    this.setData({
      categoryList: app.globalData.categoryList,
      subcategory: app.globalData.categoryList[this.data.acitveIdx].child
    })
  },

  getCategory() {
    console.log(222)
    app.request({
      url: '/getconfig',
      data: {},
      success: function(data) {
        console.log(data)
      }
    })
  },

  chooseThis(e) {
    let idx = e.currentTarget.dataset.idx;
    this.setData({
      acitveIdx: idx,
      subcategory: this.data.categoryList[idx].child
    })
  }
})