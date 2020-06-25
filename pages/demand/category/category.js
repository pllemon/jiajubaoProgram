const app = getApp();

let categoryText = '';
let subcategoryText = '';
Page({
  data: {
    acitveIdx: 0,
    categoryList: [],
    subcategoryList: []
  },

  onLoad() {
    this.getCategory();
  },

  getCategory() {
    let that = this
    app.request({
      url: '/getconfig',
      method: 'GET',
      data: {},
      success: function(data) {
        that.setData({
          categoryList: data
        })
        that.getSubCategory(data[0].id, data[0].type_name)
      }
    })
  },

  getSubCategory(id, text) {
    console.log(id)
    let that = this;
    categoryText = text;
    that.setData({
      acitveIdx: id
    })
    app.request({
      url: '/getconfig',
      method: 'GET',
      data: {
        pid: id
      },
      success: function(data) {
        that.setData({
          subcategoryList: data
        })
      }
    })
  },

  chooseCategory(e) {
    let dataset = e.currentTarget.dataset;
    this.getSubCategory(dataset.id, dataset.text);
  },

  chooseSubcategory(e) {
    let dataset = e.currentTarget.dataset;
    subcategoryText = dataset.text;
    app.globalData.service_demand = categoryText + ' - ' + subcategoryText;
    wx.navigateTo({
      url: '../applyForm/applyForm?service_id=' + dataset.id
    })
  }
})