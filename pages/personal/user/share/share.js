const app = getApp()

Page({
  data: {
    bgImg: '/image/example/share.jpg',
    shareImg: '',
    ewmImg: ''
  },

  onLoad() {
    let that = this;

    wx.showLoading({
      title: '加载中',
    })    
    app.request({
      url: '/userqrcode',
      success: function(data) {
        wx.downloadFile({
          url: data,
          success: function (res2) {
            console.log(res2)
            that.setData({
              ewmImg: res2.tempFilePath
            })
            setTimeout(function(){
              that.drawImage()
              setTimeout(function () {
                that.canvasToImage()
              }, 1000)
            },1000)
          },
          complete: function(){
            wx.hideLoading()
          }
        })
      }
    })
  },

  drawImage() {
    const ctx = wx.createCanvasContext('sharePoster');
    ctx.drawImage(this.data.bgImg, 0, 0, 750, 750);
    ctx.drawImage(this.data.ewmImg, 240, 240, 280, 280);
    ctx.draw()
  },
  
  canvasToImage() {
    var that = this
    wx.showLoading({
      title: '加载中',
    })   
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 750,
      height: 750,
      destWidth: 750,
      destHeight: 750,
      canvasId: 'sharePoster',
      fileType: 'jpg',
      success: function (res) {
        console.log('生成图片路径为=' + res)
        that.setData({
          shareImg: res.tempFilePath
        })
      },
      fail: function (err) {
          console.log('失败')
          console.log(err)
      },
      complete: function(){
        wx.hideLoading()
      }
    })
  },

  saveImg() {
    let that = this
    wx.saveImageToPhotosAlbum({
      filePath:that.data.shareImg,
      success(res) {
        app.showModal('保存成功，马上去分享吧～')
      }
    })
  },

  // onShareAppMessage: function (res) {
  //   return {
  //     title: '加入我们，分享提成！',
  //     path: '/pages/login/login?invitation_code=' + app.globalData.loginInfo.invitation_code
  //   }
  // }
})
