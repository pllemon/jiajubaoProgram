const app = getApp();

Page({
  data: {
    tabIndex: -1,
    categoryIdx: 0,
    categoryList: [],
    subcategory: []
  },

  onLoad() {
    this.setData({
      categoryList: app.globalData.categoryList,
      subcategory: app.globalData.categoryList[this.data.categoryIdx].child
    })
  },

  chooseThis(e) {
    let idx = e.currentTarget.dataset.idx;
    this.setData({
      categoryIdx: idx,
      subcategory: this.data.categoryList[idx].child
    })
  },

  chooseTab(e) {
    let idx = e.currentTarget.dataset.idx;
    if (this.data.tabIndex == idx) {
      idx = -1;
    }
    this.setData({
      tabIndex: idx
    })
  },

  closeFilter() {
    this.setData({
      tabIndex: -1
    })
  }
})
