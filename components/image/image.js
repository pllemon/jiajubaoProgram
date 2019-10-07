var app = getApp();
Component({
  properties: {
    src: {
      type: String,
      value: ''
    },
    mode: {
      type: String,
      value: 'aspectFill'
    },
    preview: {
      type: Boolean,
      value: false
    }
  },
  data: {
	  
  },
  methods: {
    preview() {
      if (this.properties.preview) {
        wx.previewImage({
          current: 'http://47.106.100.144' + this.properties.src,
          urls: ['http://47.106.100.144' + this.properties.src]
        })
      }
    }
  }
})