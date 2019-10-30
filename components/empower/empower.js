Component({
  properties: {
    show: Boolean
  },
  methods: {
    getUserInfo(e) {
      console.log(e)
      this.triggerEvent('upDate')
    }
  }
})