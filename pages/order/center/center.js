const app = getApp();

Page({
  data: {
    list: [],
    tabIndex: -1,

    categoryPid: '',
    categoryList: [],
    subcategoryPid: '',
    subcategoryList: [],
    categoryTitle: '服务类目',

    sortOptions: [
      { text: '默认排序', value: 0 },
      { text: '距离排序', value: 1 },
      { text: '上门时间排序', value: 2 },
      { text: '佣金排序', value: 3 },
    ],
    sortValue: 0,
  },

  onLoad() {
    let that = this;
    that.getList();
    that.getCategory();
  },

  // 获取列表
  getList() {
    let that = this;
    app.request({
      url: '/graborderlist',
      data: {},
      success: function(data) {
        that.setData({
          list: data
        })
      }
    })
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
          data.unshift({
            id: '',
            type_name: '全部类目'
          })
          that.setData({
            categoryList: data,
            categoryPid: '',
            subcategoryPid: '',
            subcategoryList: []
          })
        }
      }
    })
  },

  // 选择一类
  chooseCategory(e) {
    let pid = e.currentTarget.dataset.pid;
    if (pid == '') {
      this.setData({
        categoryPid: '',
        subcategoryPid: '',
        subcategoryList: [],
        categoryTitle: '全部类目'
      })
      this.selectComponent('#categorySelect').toggle();
      this.getList();
    } else {
      this.setData({
        categoryPid: pid
      })
      this.getCategory(pid)
    }
  },

  // 选择二类
  chooseSubcategory(e){
    let pid = e.currentTarget.dataset.pid;
    let pName = e.currentTarget.dataset.name;
    this.setData({
      subcategoryPid: pid,
      categoryTitle: pName
    })
    this.selectComponent('#categorySelect').toggle();
    this.getList();
  },

  // 改变排序条件
  changeSort(value) {
    this.setData({
      sortValue: value
    })
    this.getList();
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
