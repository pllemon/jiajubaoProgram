let app = getApp();
Component({
  properties: {
    name: { // 键值名
      type: String,
      value: ''
    },
    text: { // 上传文字
      type: String,
      value: ''
    },
    imgArr: { // 上传对象
      type: Array,
      value: []
    },
    length: { // 最大上传数
      type: Number,
      value: 1
    }
  },
  data: {
	  
  },
  methods: {
    delete(e) {
      let idx = e.currentTarget.dataset.idx;
      let arr = this.properties.imgArr;
      arr.splice(idx, 1);
      this.triggerEvent('update', {
        name: this.properties.name,
        arr: arr
      });
    },
    addImg() {
      let that = this;
      let length1 = that.properties.length;
      let length2 = that.properties.imgArr.length;
      let count = length1 - length2;
      wx.chooseImage({
        count: count,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          let arr = that.properties.imgArr.concat(res.tempFilePaths);
          that.triggerEvent('update', {
            name: that.properties.name,
            arr: arr
          })
        }
      })
    },
    preview(e) {
      let that = this;
      let idx = e.currentTarget.dataset.idx;
      let imgArr = that.properties.imgArr;
      wx.previewImage({
        current: imgArr[idx], // 当前显示图片的http链接
        urls: imgArr
      })
    }
  }
})