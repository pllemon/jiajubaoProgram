const app = getApp()

Page({
  data: {
    list: [1,2,3,4],
    page: 1,
    isRefresh: false,
    isLoadMore: false
  },

  onRefresh(e) {
    console.log(e)

    this.setData({
      list: [],
      page: 1,
      isRefresh: true
    })

    this.setData({
      list: [1,2,3,4,5,6,7],
      page: 1,
      isRefresh: false
    })
  },

  onLoadMore(e) {
    console.log(e)

    let page = this.data.page ++;
    this.setData({
      page,
      isLoadMore: true
    })

    let data = [3,2,1,2,3];
    let list = this.data.list.concat(data);
    this.setData({
      list,
      isLoadMore: false
    })
  }
})
