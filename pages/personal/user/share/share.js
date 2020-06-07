const app = getApp()

Page({
  data: {
    bgImg: '/image/example/share.jpg',
    ewmImg: '',
    shareImg: ''
  },

  onLoad() {
    let that = this;
    let ewmImg = 'http://47.106.100.144/uploads/richtext/20191021/9b5689a30d38044eb31b7196a8d07ae1.jpg';

    wx.showLoading({
      title: '加载中',
    })    
    wx.downloadFile({
      url: ewmImg,
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
  },

  drawImage() {
    const ctx = wx.createCanvasContext('sharePoster');
    ctx.drawImage(this.data.bgImg, 0, 0, 750, 1334);
    ctx.drawImage(this.data.ewmImg, 260, 960, 250, 250);
    ctx.font = 'normal bold 18px sans-serif';
    ctx.setFontSize(52)
    ctx.setFillStyle('#ff7652')
    ctx.fillText(app.globalData.loginInfo.invitation_code, 380, 396)
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
      height: 1334,
      destWidth: 750,
      destHeight: 1334,
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

  onShareAppMessage: function (res) {
    return {
      title: '多师傅，专业维修平台',
      path: '/pages/login/login?invitation_code=' + app.globalData.loginInfo.invitation_code
    }
  }
})
