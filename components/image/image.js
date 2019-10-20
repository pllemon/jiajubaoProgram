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
        let imgSrc = 'http://47.106.100.144/' + this.properties.src
        wx.previewImage({
          current: imgSrc,
          urls: [imgSrc]
        })
      }
    }
  }
})