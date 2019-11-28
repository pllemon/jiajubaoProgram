let app = getApp();
let upDateTime = 0;
let currTime = 0;

Component({
  properties: {
    page: { 
      type: Number,
      value: 0
    },
    lastPage: { 
      type: Number,
      value: 0
    },
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
    posTop: 0,
    startY: 0,
    moveY: 0,
    endY: 0
  },
  methods: {
    touchstart(e) {
      if (!this.properties.isRefresh) {
        let clientY = e.changedTouches[0].clientY;
        this.setData({
          startY: clientY,
          endY: clientY
        })
      }
    },
    touchmove(e) {    
      if (!this.properties.isRefresh) {
        let startY = this.data.startY;
        let endY = this.data.endY;
        let clientY = e.changedTouches[0].clientY;
        if (clientY - endY > 50 || clientY - endY < -30) {
          // console.log(clientY - endY) // 跟上一次的移动距离
          // console.log(clientY - startY) // 跟总的移动距离
          this.setData({
            moveY: clientY - endY,
            endY: clientY
          })
        }
      }
    },
    touchend(e) {
      if (!this.properties.isRefresh) {
        if (this.data.moveY > 0) {
          this.triggerEvent('change', {type: 1})
          this.goTop()
        }
        this.setData({
          moveY: 0
        })
      }
    },
    loadMore() {
      if (this.properties.page < this.properties.lastPage) {
        if (!this.properties.isLoadMore) {
          this.triggerEvent('change', {type: 2})
          this.goTop()
        }
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