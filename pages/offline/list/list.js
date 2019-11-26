const app = getApp()

Page({
  data: {
    list: [],
    page: 1,
    lastPage: 1,
    isLoadMore: false,
    isRefresh: false,

    personType: 0
  },
  onLoad(params) {
    let personType = params.personType || 0;
    this.setData({
      personType: personType
    })
    this.getList(1)
  },

  getList(type) {
    let that = this;
    let page = that.data.page;
    let url = that.data.personType == 0 ? '/userunlinkorderlist' : '/businessorderlist';

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
      url,
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
          lastPage: data.last_page,
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
  }
})
