const app = getApp();
const common = require('../../../utils/common.js');

Page({
  data: {
    orderMes: {},
    craftsmanlist: [],
    keyword: ''
  },

  onLoad(params) {
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
    if (keyword) {
      app.request({
        url: '/orderinfo',
        data: {
          keyword: that.data.keyword
        },
        success: function(data) {
          that.setData({
            craftsmanlist: data
          })
        }
      })
    } else {
      that.setData({
        craftsmanlist: []
      })
    }
  },
  chooseMaster() {
    let that = this
    wx.showModal({
      content: '确定选择该师傅？',
      success (res) {
        if (res.confirm) {
          app.request({
            url: '/businessancelorder',
            data: {
              bo_id: that.data.order_id,
              order_sn: that.data.orderMes.order_sn
            },
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