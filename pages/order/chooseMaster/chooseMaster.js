const app = getApp();
const common = require('../../../utils/common.js');

Page({
  data: {
    orderMes: {},
    craftsmanlist: [],
    keyword: '',
    order_id: ''
  },

  onLoad(params) {
    this.setData({
      order_id: params.id
    })
    this.getInfo(params.id);
  },

  // 获取订单信息
  getInfo(id) {
    let that = this;
    app.request({
      url: '/orderinfo',
      data: {
        order_id: id
      },
      success: function(data) {
        that.setData({
          orderMes: data,
          craftsmanlist: data.info.status == 4 ? data.craftsmanlist : []
        })
      }
    })
  },

  // 更改值
  changeSearch (e) {
    this.setData({
      keyword: e.detail
    })
  },
  onSearch() {
    let that = this;
    if (that.data.keyword) {
      app.request({
        url: '/customercraftsmanlist',
        data: {
          keyword: that.data.keyword,
          page: 1,
          limit: 100
        },
        success: function(data) {
          that.setData({
            craftsmanlist: data.data
          })
        }
      })
    } else {
      that.setData({
        craftsmanlist: []
      })
    }
  },
  chooseMaster(e) {
    let that = this
    wx.showModal({
      content: '确定选择该师傅？',
      success (res) {
        if (res.confirm) {
          let obj = {
            craftsman_id: e.currentTarget.dataset.id,
            order_id: that.data.order_id,
            zdchoose: 1
          }
          if (that.data.orderMes.info.status == 4) {
            obj = {
              craftsman_id: e.currentTarget.dataset.id,
              order_id: that.data.order_id
            }
          }
          app.request({
            url: '/customerchoosecraftsman',
            data: obj,
            success: function(data) {
              app.successToast('提交成功', function(){
                let pages = getCurrentPages();
                let beforePage = pages[pages.length - 2];
                beforePage.getInfo();
                wx.navigateBack();        
              })
            }
          })
        }
      }
    })
  }
})