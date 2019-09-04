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
    refreshText: '更新数据',
	  loadText: '加载更多'
  },
  methods: {
    refresh() {
      this.triggerEvent('refresh')
    },
    loadMore() {
      this.triggerEvent('loadMore')
    },
    scroll(e) {
      
    }
  }
})