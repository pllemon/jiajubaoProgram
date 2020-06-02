let app = getApp();
let upDateTime = 0;
let currTime = 0;

Component({
  properties: {
    isPaging: { // 是否分页
      type: Boolean,
      value: true
    },
    limit: { // 每页条数
      type: Number,
      value: 20
    },
    requestUrl: { // 请求url
      type: String,
      value: ''
    },
    query: { // 请求参数
      type: Object,
      value: {}
    },
    auto: { // 自动请求
      type: Boolean,
      value: true
    }
  },
  data: {
    scrollTop: 0, // 滚动距离
    posTop: 0,
    startY: 0,
    moveY: 0,
    endY: 0,

    show: false, // 显示
    page: 1, // 当前页
    last_page: 1, // 最后页
    data: [], // 数据
    loadStatus: 0 // 加载状态，0 =》 未加载，1 =》 下拉刷新中，2 =》 上拉加载更多 
  },

  ready() {
    if (this.properties.auto) {
      this.getData(1)
    }
  },

  methods: {
    touchstart(e) {
      if (this.data.loadStatus == 0) {
        let clientY = e.changedTouches[0].clientY;
        this.setData({
          startY: clientY,
          endY: clientY
        })
      }
    },

    touchmove(e) {    
      if (this.data.loadStatus == 0) {
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
      if (this.data.loadStatus == 0) {
        if (this.data.moveY > 0) {
          this.getData(1)
          this.goTop()
        }
        this.setData({
          moveY: 0
        })
      }
    },

    loadMore() {
      if (this.data.page < this.data.last_page) {
        if (this.data.loadStatus == 0) {
          this.getData(2)
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
    },

    getData(type) {
      let that = this
      console.log(type)
      this.setData({
        loadStatus: type,
        show: true
      })
      let page = this.data.page
      if (type == 1) {
        page = 1
        this.setData({
          data: []
        })
        that.triggerEvent('change', this.data.data)
      } else {
        page = page + 1
      }
      let query = this.properties.query
      if (this.properties.isPaging) {
        query = Object.assign({}, this.properties.query, {
          page: page,
          limit: this.properties.limit
        })
      }
      app.request({
        url: this.properties.requestUrl,
        data: query,
        hideLoading: true,
        success: function(data) {
          if (that.properties.isPaging) {
            if (type == 1) {
              that.setData({
                data: data.data,
                last_page: data.last_page,
                page: page
              })
            } else {
              let data = that.data.data
              that.setData({
                data: data.concat(data.data),
                last_page: data.last_page,
                page: page
              })
            }
            that.triggerEvent('change', that.data.data)
          } else {
            that.setData({
              data: data,
              page: 1,
              last_page: 1
            })
            that.triggerEvent('change', that.data.data)
          }
        },
        complete: function() {
          that.setData({
            loadStatus: 0
          })
        }
      })
    }
  }
})