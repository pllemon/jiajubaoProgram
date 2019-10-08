const app = getApp()

Page({
  data: {
    isShow: false,
    record: [1, 2, 3, 4]
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
