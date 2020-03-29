let app = getApp();
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
    },
    width: {
      type: String,
      value: '100%'
    },
    height: {
      type: String,
      value: '100%'
    },
    label: {
      type: String,
      value: ''
    },
    label2: {
      type: String,
      value: ''
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