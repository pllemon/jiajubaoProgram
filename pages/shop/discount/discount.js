const app = getApp();
const common = require('../../../utils/common.js');

Page({
  data: {
    list: [
      {
        id: '1111',
        name: '螺丝钉螺丝钉螺丝钉螺丝钉螺丝钉',
        price: 55,
        number: 0
      },
      {
        id: '2222',
        name: '螺丝钉螺丝钉螺丝钉螺丝钉螺丝钉螺丝钉螺丝钉螺丝钉螺丝钉螺丝钉螺丝钉螺丝钉',
        price: 5.5,
        number: 0
      }
    ],
    sum: 0,
    maxintegral: 0, // 可使用最大积分
    sumintegral: 0, // 总积分
  },
  
  onLoad() {
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

  getSumintegral() {
    let that = this;
    let url = '/userintegrallist';
    app.request({
      url,
      data: {
        page: 0,
        limit: 20
      },
      success: function(data) {
        console.log(data)
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
    if (this.data.sum) {
      wx.showModal({
        title: '提示',
        content: '确定下单？',
        success (res) {
          if (res.confirm) {
            app.successToast('提交成功', function(){
              wx.redirectTo({
                url: '/pages/offline/list/list?personType=0'
              })
            })
          }
        }
      })
    }
  }
})
