const app = getApp();
const common = require('../../../utils/common.js');

Page({
  data: {
    list: [],
    page: 1,
    isRefresh: false,
    isLoadMore: false,

    searchValue: "",
    addressInfo: "",
    showLocationDialog: false,
  },

  onLoad() {
    let that = this;
    common.getLocation(that, function(){
      that.getList();
    });
  },

  changeDis(val) {
    return val/1000
  },


  upDateLocation() {
    let that = this;
    that.setData({
      showLocationDialog: false
    })
    common.getLocation(that, function(){
      that.getList();
    });
  },

  getList() {
    let that = this;
    app.request({
      url: '/businesslist',
      data: {
        lng: '112.688716',
        lat: '22.386958'
      },
      success: function(data) {
        data.forEach(item => {
          if (item.distance > 1000) {
            item.distance = parseFloat(item.distance/1000).toFixed(1) + 'km'
          } else {
            item.distance = item.distance + 'm'
          }
        })
        that.setData({
          list: data
        })
      }
    })
  },

  onRefresh() {
    if (!this.data.isRefresh) {
      this.setData({
        isRefresh: true
      })
      setTimeout( () => {
        this.setData({
          list: [1,2,3,4,5,6,7],
          page: 1,
          isRefresh: false
        })
      }, 5000)
    }
  },

  onLoadMore() {
    if (!this.data.isLoadMore) {
      let page = this.data.page ++;
      this.setData({
        page,
        isLoadMore: true
      })
      setTimeout( () => {
        let data = [3,2,1,2,3];
        let list = this.data.list.concat(data);
        this.setData({
          list,
          isLoadMore: false
        })
      }, 5000)
    }
  }
})
