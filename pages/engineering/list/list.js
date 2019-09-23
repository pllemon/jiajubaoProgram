const app = getApp()

Page({
  data: {
    list: [1,2,3,4],
    page: 1,
    isRefresh: false,
    isLoadMore: false,

    searchValue: ''
  },

  onSearch() {
    console.log(33333)
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