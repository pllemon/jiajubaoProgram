const app = getApp();
Component({
  properties: {
    pos: {
      type: Number,
      value: 0
    }
  },
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    bannerList: []
  },
  ready() {
    this.getBanner()
  },
  methods: {
    getBanner() {
      let that = this;
      app.request({
        url: '/bannerlist',
        data: {
          position: that.properties.pos
        },
        hideLoading: true,
        success: function(data) {
          that.setData({
            bannerList: data
          })
        }
      })
    },
    bindAdvert(e) {
      let idx = e.currentTarget.dataset.idx
      let obj = this.data.bannerList[idx]
      let shareImage = '../../image/example/ewm.jpg'
      if (obj.type == 0) {
        wx.downloadFile({
          url: shareImage,
          success: function (res) {
            console.log(res)
          },
          fail: error => {
            console.log(error)
          }
        })
        wx.previewImage({
          current: shareImage,
          urls: [shareImage]
        })
      } else if (obj.type == 1) {
        // wx.navigateTo({
        //   url: obj.url
        // })
      } else if (obj.type == 2){
        // wx.navigateTo({
        //   url: '/pages/webView/webView'
        // })
      }
    }
  }
})