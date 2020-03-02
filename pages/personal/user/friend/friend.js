const app = getApp()

Page({
  data: {
    list: []
  },

  onLoad() {
    
  },

  getList() {
    let that = this;
    app.request({
      url: '/usersharelist',
      data: {
        page: 0,
        limit: 20
      },
      success: function(data) {
        console.log(11)
        console.log(data)
        let sum = data.sumintegral
        if (personType == 2) {
          sum = data.integralsum
        }
        that.setData({
          sumintegral: sum
        })
      }
    })
  }
})
