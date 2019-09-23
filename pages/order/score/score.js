const app = getApp()

Page({
  data: {
    star: 0
  },

  changeStar(e) {
    this.setData({
      star: e.detail
    })
  },

  formSubmit(e) {
    console.log(e)
  }
})
