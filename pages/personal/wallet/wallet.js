const app = getApp()

Page({
  data: {
    isShow: false,
    record: [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3]
  },

  showExplain() {
    this.setData({
      isShow: true
    })
  },

  closeExplain() {
    this.setData({
      isShow: false
    })
  },

  useExplain() {

  }
})
