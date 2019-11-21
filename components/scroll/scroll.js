var app = getApp();
Component({
  properties: {
  	isRefresh: { 
      type: Boolean,
      value: false
    },
    isLoadMore: { 
      type: Boolean,
      value: false
    }
  },
  data: {
    scrollTop: 0,
    posTop: 0
  },
  methods: {
    refresh() {
      if (!this.properties.isRefresh) {
        this.triggerEvent('change', {type: 1})
      }
    },
    loadMore() {
      if (!this.properties.isLoadMore) {
        this.triggerEvent('change', {type: 2})
      }
    },
    scroll(e) {
      this.setData({
        posTop: e.detail.scrollTop
      })
    },
    goTop() {
      this.setData({
        scrollTop: 0,
        posTop: 0
      })
    }
  }
})