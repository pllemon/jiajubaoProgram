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
    },
    needPad: {
      type: Boolean,
      value: true 
    }
  },
  data: {
	  
  },
  methods: {
    preview() {
      if (this.properties.preview) {
        let imgSrc = this.properties.needPad ? 'https://www.dsfjjwx.com/' + this.properties.src : this.properties.src
        wx.previewImage({
          current: imgSrc,
          urls: [imgSrc]
        })
      }
    }
  }
})