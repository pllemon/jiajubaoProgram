var app = getApp();
Component({
  properties: {
  	myProperty: { 
      type: String,
      value: ''
    }
  },
  data: {
    isRefresh: false,
    isLoadMore: false,
    refreshText: '111',
	  loadText: '222'
  },
  methods: {
    refresh() {
      console.log(1111)
      this.triggerEvent('refresh')
    },
    loadMore() {
      console.log(222)
      this.triggerEvent('loadMore')
    },
    scroll() {
      console.log(333)
    }
  }
})