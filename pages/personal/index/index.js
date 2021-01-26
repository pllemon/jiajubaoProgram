const systemData = require('../../../utils/data.js')
const app = getApp()
const common = require('../../../utils/common.js')

Page({
  data: {
    type: '人员类型',
    currType: null,
    currMessage: {},

    userInfo: {},

    bgImg: '/image/example/share.jpg',
    shareImg: '',
    ewmImg: '',

    showEwm: false,
    ewmURL: '',
    finish: false,

    status: {
      0: {
        text: '你还不是师傅哦，马上点击申请加入我们吧，更多惊喜等着你',
        text2: '你还不是商家哦，马上点击申请加入我们吧，更多惊喜等着你',
        btn: '立即申请',
        active: true
      },
      2: {
        text: '申请已提交，后台正在审核中，请耐心等待哦',
        text2: '申请已提交，后台正在审核中，请耐心等待哦',
        btn: '申请审核中',
        active: false
      },
      3: {
        text: '你的申请已驳回',
        text2: '你的申请已驳回',
        btn: '重新申请',
        active: true
      },
      4: {
        text: '你的账号已被禁用，如有疑问请联系客服',
        text2: '你的账号已被禁用，如有疑问请联系客服',
        btn: '账号已禁用',
        active: false
      },
      5: {
        text: '',
        text2: '信息审核已通过，请支付加盟费',
        btn: '支付加盟费',
        active: true
      }
    },

    personType: {}, // 用户类型
  },

  onLoad(params) {
    let type = params.type || '0';
    this.setData({
      currType: type
    })
    this.getInfo();
    this.showShareCode();
  },

  // 获取账号信息
  init() {
    let that = this;
    let loginInfo = app.globalData.loginInfo;
    let personType = common.deepCopy(systemData.personType)
    if (!loginInfo.networkauth) {
      delete personType[3]
    }
    that.setData({
      personType: personType,
      userInfo: loginInfo
    })
  },

  getInfo() {
    let that = this
    app.request({
      url: '/userinfo',
      success: function(data) {
        app.globalData.loginInfo = data
        that.init()
      }
    })
  },
 
  // 编辑个人资料
  editMes() {
    wx.navigateTo({
      url: '/pages/personal/user/editMes/editMes'
    })
  },

  // 申请成为师傅
  applyMaster() {
    wx.navigateTo({
      url: '/pages/personal/master/identity/identity'
    })
  },

  // 申请成为商家
  applyBusiness() {
    let that = this;
    let businessinfo =  this.data.userInfo.businessinfo;
    if (businessinfo && businessinfo.status == 5) {
      app.request({
        url: '/businesswxpayinfo',
        data: {
          business_id: businessinfo.id
        },
        success: function(data) {
          wx.requestPayment({
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': data.signType,
            'timeStamp': data.timeStamp.toString(),
            'paySign': data.sign,
            'success':function(res){
              app.successToast('支付成功', function(){
                that.getInfo();
              })
            },
            'fail':function(res){
              console.log(res)
              app.showModal('支付失败')
            }
          })
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/personal/businessman/identity/identity'
      })
    }
  },


  // toggleEwm() {
  //   let that = this;
  //   if (!that.data.ewmURL) {
  //     app.request({
  //       url: '/businessorcode',
  //       success: function(data) {
  //         console.log(data)
  //         that.setData({
  //           showEwm: !that.data.showEwm
  //         })
  //       }
  //     })
  //   } else {
  //     that.setData({
  //       showEwm: !that.data.showEwm
  //     })
  //   }
  // },

  // 切换身份
  changeType(e) {
    let type = e.detail.name;
    this.setData({
      currType: type
    })
  },

  // 操作
  bindAction(e) {
    let action = e.currentTarget.dataset.action;
    this[action]();
  },

  // 生成专属二维码
  getShareCode() {
    wx.previewImage({
      current: this.data.shareImg,
      urls: [this.data.shareImg]
    })
  },
  showShareCode() {
    let that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
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
            wx.showLoading({
              title: '加载中',
              mask: true
            })   
            setTimeout(function(){
              that.drawImage()
              setTimeout(function () {
                that.canvasToImage()
              }, 1000)
            },1000)
          },
          complete: function(){
            // wx.hideLoading()
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
    let that = this
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
        console.log(res.tempFilePath)
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


  // 分享
  onShareAppMessage: function (res) {
    return {
      title: '加入我们，分享提成！',
      path: '/pages/login/login?invitation_code=' + app.globalData.loginInfo.invitation_code,
      imageUrl: '/image/example/share.jpg'
    }
  }
})
