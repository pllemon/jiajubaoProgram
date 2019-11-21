const app = getApp()

Page({
  data: {
    list: [],
    page: 1,
    isLoadMore: false,
    isRefresh: false,

    searchValue: ''
  },

  onLoad() {
    this.getList(1);
  },

  changeList(e) {
    this.getList(e.detail.type)
  },
  getList(type) { // 1->刷新，2->加载
    let that = this;
    let page = this.data.page;

    if (type == 1) {
      page = 1;
      that.setData({
        isRefresh: true
      })  
    } else if (type == 2) {
      page = page++;
      that.setData({
        isLoadMore: true
      })  
    }
   
    app.request({
      url: '/ordershowlist',
      data: {
        page: page,
        limit: 10
      },
      hideLoading: true,
      success: function(data) {
        let list = that.data.list;
        if (type == 1) {
          list = data.data;
        } else {
          list = list.concat(data.data);
        }
        that.setData({
          page,
          list
        })
      },
      complete: function() {
        if (type == 1) {
          that.setData({
            isRefresh: false
          })
        } else if (type == 2) {
          that.setData({
            isLoadMore: false
          })
        }
      }
    })
  },

  goDetails(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/engineering/details/details?id=' + id
    })
  }
})
