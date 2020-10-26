const app = getApp();
const common = require('../../../utils/common.js');

Page({
  data: {
    list: [],
    sum: 0,
    maxintegral: 0, // 可使用最大积分
    sumintegral: 0, // 总积分
    business_id: '', // 商家id

    requestUrl: '',
    query: {},
    info: null,
    finish: false
  },
  
  onLoad(params) {
    let that = this
    that.setData({
      business_id: params.id,
      requestUrl: '/businessallgoodslist?business_id=' + params.id
    })
    that.selectComponent("#list").getData(1);

    if (app.globalData.loginInfo) {
      that.getSumintegral()
    } else {
      app.loginCallback = function() {
        that.getSumintegral()
      }
    }
    that.getInfo()
  },

  onChange(e) {
    let idx = e.currentTarget.dataset.idx
    let number = e.detail
    this.setData({
      ['list['+idx+'].number'] : number
    })
    this.getSum()
  },
  
  changeList(e) {
    e.detail.forEach(item => {
      item.number = 0
    })
    this.setData({
      list: e.detail
    })
  },

  getInfo() {
    let that = this;
    app.request({
      url: '/indexbusinessinfo',
      method: 'get',
      data: {
        business_id: that.data.business_id
      },
      hideLoading: true,
      success: function(data) {
        that.setData({
          info: data,
          finish: true
        })
      }
    })
  },

  getSumintegral() {
    let that = this;
    let url = '/userintegrallist';
    app.request({
      url,
      data: {
        page: 0,
        limit: 20
      },
      hideLoading: true,
      success: function(data) {
        that.setData({
          sumintegral: data.sumintegral
        })
      }
    })
  },

  getSum() {
    let list = this.data.list
    let sum = 0
    list.forEach(item => {
      sum += parseFloat(item.price) * parseFloat(item.number)
    })
    let point1 = parseInt(sum / 20) * 1;
    let point2 = parseInt(this.data.sumintegral / 1) * 1;
    let maxintegral = Math.min(point1, point2);
    this.setData({
      sum,
      maxintegral
    })
  },

  makeOrder() {
    let that = this
    if ( !app.globalData.session ) {
      wx.reLaunch({
        url: '/pages/login/login?type=1'
      })
      return false;
    }
    if (that.data.sum) {
      // wx.showModal({
      //   title: '提示',
      //   content: '确定下单？',
      //   success (res) {
      //     if (res.confirm) {
            wx.requestSubscribeMessage({
              tmplIds: [
                '_2qnHOlTzMu_nTiJmamzCqrnhvrfzjh5ijGntI64mEA', // 下单成功通知
                'PCshYOrhnVT6H3pDkcIXFocq7D9r-kfSAtuVW1pprDo', // 订单状态通知
              ],
              success (res) {
                let goodslist = that.data.list.filter(item => {
                  return item.number > 0
                })
                goodslist = goodslist.map(item => {
                  return {
                    goods_id: item.goods_id,
                    goods_number: item.number
                  }
                })
                let obj = {
                  integral: that.data.maxintegral,
                  money: that.data.sum,
                  business_id: that.data.business_id,
                  goodslist: JSON.stringify(goodslist)
                }
                app.request({
                  url: '/markbusinessorder',
                  data: obj,
                  loadText: '下单中',
                  success: function(data) {
                    app.successToast('提交成功', function(){
                      wx.redirectTo({
                        url: '/pages/offline/list/list?personType=0'
                      })
                    })
                  }
                })
              },
              fail(error) {
                console.log(error)
              }
            })
          // } else {
          //   console.log(res)
          // }
        // }
      // })
    }
  },

  markDemand() {
    wx.navigateTo({
      url: '../markDemand/markDemand?business_id=' + this.data.business_id
    })
  }
})
