let app = getApp();
let upDateTime = 0;
let currTime = 0;

Component({
  properties: {
    isPaging: { // 是否分页
      type: Boolean,
      value: true
    },
    loadStatus: { // 加载状态，0 =》 未加载，1 =》 下拉刷新中，2 =》 上拉加载更多 
      type: Number,
      value: 0
    },
    page: { // 当前页
      type: Number,
      value: 0
    },
    lastPage: { // 最后页
      type: Number,
      value: 0
    },
    data: { // 数据
      type: Array,
      value: []
    }
  },
  data: {
    scrollTop: 0, // 滚动距离
    posTop: 0,
    startY: 0,
    moveY: 0,
    endY: 0
  },
  methods: {
    touchstart(e) {
      if (this.properties.loadStatus == 0) {
        let clientY = e.changedTouches[0].clientY;
        this.setData({
          startY: clientY,
          endY: clientY
        })
      }
    },
    touchmove(e) {    
      if (this.properties.loadStatus == 0) {
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
      if (this.properties.loadStatus == 0) {
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
        if (this.properties.loadStatus == 0) {
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