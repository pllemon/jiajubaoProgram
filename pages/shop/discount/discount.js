const app = getApp();
const common = require('../../../utils/common.js');

Page({
  data: {
    list: [],
    sum: 0,
    maxintegral: 0, // 可使用最大积分
    sumintegral: 0, // 总积分
    business_id: '', // 商家id
  },
  
  onLoad(params) {
    this.setData({
      business_id: params.id
    })
    this.getList(params.id)
    this.getSumintegral()
  },

  onChange(e) {
    let idx = e.currentTarget.dataset.idx
    let number = e.detail
    this.setData({
      ['list['+idx+'].number'] : number
    })
    this.getSum()
  },

  getList(id) {
    let that = this
    app.request({
      url: '/businessallgoodslist?business_id=' + id,
      success: function(data) {
        data.forEach(item => {
          item.number = 0
        })
        that.setData({
          list: data
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
      hideLoading: false,
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
    let point1 = parseInt(sum / 100) * 5;
    let point2 = parseInt(this.data.sumintegral / 5) * 5;
    let maxintegral = Math.min(point1, point2);
    this.setData({
      sum,
      maxintegral
    })
  },

  makeOrder() {
    let that = this
    if (that.data.sum) {
      wx.showModal({
        title: '提示',
        content: '确定下单？',
        success (res) {
          if (res.confirm) {
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
            console.log(obj)
            app.request({
              url: '/markbusinessorder',
              data: obj,
              success: function(data) {
                app.successToast('提交成功', function(){
                  wx.redirectTo({
                    url: '/pages/offline/list/list?personType=0'
                  })
                })
              }
            })
          }
        }
      })
    }
  }
})
