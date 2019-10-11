const app = getApp()

Page({
  data: {
    bgImg: '',
    ewmImg: '',
    shareImg: ''
  },

  onLoad() {
    let that = this;
    let bgImg = 'http://47.106.100.144/uploads/business/20190929/c47c3169321b95b4f6706aff21eef5d6.jpg';
    let ewmImg = 'http://47.106.100.144/uploads/business/20190929/19d9307f91fe29e03fbcd45f727feb4b.png';
    wx.downloadFile({
      url: bgImg,
      success: function (res) {
        console.log(res)
        console.log(res.tempFilePath)

        that.setData({
          bgImg: res.tempFilePath
        })
        wx.downloadFile({
          url: ewmImg,
          success: function (res2) {
            that.setData({
              ewmImg: res2.tempFilePath
            })
            that.drawImage()
            setTimeout(function () {
              that.canvasToImage()
            }, 200)
          }
        })
      }
    })
  },

  drawImage() {
    const ctx = wx.createCanvasContext('sharePoster');
    ctx.drawImage(this.data.bgImg, 0, 0, 300, 200);
    ctx.drawImage(this.data.ewmImg, 100, 100, 200, 200);
    ctx.draw()
  },
  
  canvasToImage() {
    var that = this
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 750,
      height: 1000,
      destWidth: 750,
      destHeight: 1000,
      canvasId: 'sharePoster',
      fileType: 'jpg',
      success: function (res) {
        console.log('生成图片路径为=' + res)
        that.setData({
          shareImg: res.tempFilePath
        })
        wx.previewImage({
            current: res.tempFilePath,
            urls: [res.tempFilePath]
        })
      },
      fail: function (err) {
          console.log('失败')
          console.log(err)
      }
    })
  },

  saveImg() {
    let that = this
    wx.saveImageToPhotosAlbum({
      filePath:that.data.shareImg,
      success(res) {
        console.log(res)
        console.log('保存成功嘻嘻嘻')
      }
    })
  }
})
