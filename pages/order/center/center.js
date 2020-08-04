const app = getApp();

Page({
  data: {
    list: [],
    query: {},
    tabIndex: -1,

    sortOptions: [
      { text: '默认排序', value: 0 },
      { text: '上门时间排序', value: 2 },
      { text: '佣金排序', value: 3 },
    ],
    typeOptions: [
      { text: '全部服务类目', value: 0 }
    ],
    sortValue: 0,
    typeValue: 0,
  },

  onLoad() {
    let that = this;
    that.getCategory();
  },

  changeList(e) {
    this.setData({
      list: e.detail
    })
  },

  // 获取类目筛选
  getCategory() {
    let that = this
    let typeOptions = that.data.typeOptions
    app.request({
      url: '/getconfig',
      method: 'GET',
      data: {},
      success: function(data) {
        console.log(data)
        data.forEach(item => {
          item.value = item.id;
          item.text = item.type_name;
          typeOptions.push(item);
        })
        that.setData({
          typeOptions
        })
      }
    })
  },

  // 改变排序条件
  changeSort(value) {
    // this.setData({
    //   sortValue: value
    // })
    this.selectComponent("#list").getData(1);
  },

  chooseType(value) {
    // this.setData({
    //   typeValue: value
    // })
    this.selectComponent("#list").getData(1);
  }
})
