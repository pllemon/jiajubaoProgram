const app = getApp();

Page({
  data: {
    list: [],
    query: {
      service_id: '',
      release_time: 'desc'
    },
    tabIndex: -1,

    sortOptions: [
      { text: '按发布时间排序', value: 0 },
      { text: '按上门时间排序', value: 1 },
      { text: '佣金从多到少', value: 2 },
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
    let idx = value.detail
    let sortName = [
      {name: 'release_time', value: 'desc'},
      {name: 'appo_time', value: 'desc'},
      {name: 'craftsman_price', value: 'desc'},
    ]
    let query = {
      service_id: this.data.query.service_id,
    }
    query[sortName[idx].name] = sortName[idx].value
    this.setData({
      query
    })
    this.selectComponent("#list").getData(1);
  },

  chooseType(value) {
    this.setData({
      'query.service_id': value.detail || ''
    })
    this.selectComponent("#list").getData(1);
  }
})
