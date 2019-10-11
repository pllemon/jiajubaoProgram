const app = getApp()

Page({
  data: {
    bgImg: '',
    ewmImg: '',
    shareImg: ''
  },

  onLoad() {
    let that = this;
    let bgImg = '../../../image/intro.png';
    let ewmImg = '../../../image/intro.png';
    wx.downloadFile({
      url: bgImg,
      success: function (res) {
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
    ctx.drawImage(this.data.bgImg, 0, 0, 600, 500);
    ctx.drawImage(this.data.ewmImg, 0, 500, 750, 200);
  },
  
  canvasToImage() {
    var that = this
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 750,
      height: 1000,
      destWidth: 750,
      destHeight: 100,
      canvasId: 'sharePoster',
      fileType: 'jpg',
      success: function (res) {
        console.log(res)
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
