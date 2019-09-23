const app = getApp();

Page({
  data: {
    list: [],
    tabIndex: -1,
    categoryPid: '',
    categoryList: [],
    subcategoryList: []
  },

  onLoad() {
    let that = this;
    // this.setData({
    //   categoryList: app.globalData.categoryList,
    //   subcategory: app.globalData.categoryList[this.data.categoryIdx].child
    // })
    app.request({
      url: '/graborderlist',
      data: {},
      success: function(data) {
        that.setData({
          list: data
        })
      }
    })

    that.getCategory();
  },


  // 获取类目筛选
  getCategory(pid) {
    let that = this
    app.request({
      url: '/getconfig',
      method: 'GET',
      data: {
        pid: pid || ''
      },
      success: function(data) {
        if (pid) {
          that.setData({
            subcategoryList: data
          })
        } else {
          that.setData({
            categoryList: data,
            categoryPid: data[0].id
          })
          that.getCategory(data[0].id)
        }
      }
    })
  },

  chooseCategory(e) {
    let that = this;
    let pid = e.currentTarget.dataset.pid;
    this.setData({
      categoryPid: pid
    })
    that.getCategory(pid)
  },

  chooseTab(e) {
    let idx = e.currentTarget.dataset.idx;
    if (this.data.tabIndex == idx) {
      idx = -1;
    }
    this.setData({
      tabIndex: idx
    })
  },

  closeFilter() {
    this.setData({
      tabIndex: -1
    })
  }
})
