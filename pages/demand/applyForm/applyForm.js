const app = getApp()
Page({
  data: {
    imgArr: [],
    addressInfo: null,
    date: '请选择',
    time: '请选择',

    showDate: false,
    minDate: new Date().getTime(),
    maxDate: new Date(2019, 10, 1).getTime(),
    currentDate: new Date().getTime()
  },

  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },

  addImg() {
    let that = this;
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        let imgArr = that.data.imgArr.concat(res.tempFilePaths)
        that.setData({
          imgArr
        })
      }
    })
  },

  uploadFile(i = 0) {
    let that = this;
    let fileList = that.data.imgArr;
    wx.uploadFile({
      url: 'http://192.168.1.104/uploadordersimg',
      filePath: fileList[i],
      name: 'image',
      success: function (res) {
        console.log(res)
        var data = res.data;
        if (!((i + 1) == fileList.length)) {
          that.uploadFile(i + 1);
        }else{
          console.log("已经全部上传完毕");
          wx.hideLoading();
        }
      },
      fail:function(){
        app.tips("失败，请重试")
      },
      complete:function(){
      
      }
    })
  },

  formSubmit: function(e) {
    let formData = e.detail.value;
    formData.appo_time = this.data.date + ' ' + this.data.time;
    // formData.address = this.data.addressInfo.address + formData.address;
    console.log(formData)

    this.uploadFile();
    return false;

    app.request({
      url: '/markorder',
      data: formData,
      success: function(data) {
        wx.showToast({
          title: '创建订单成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '/pages/personal/index/index'
          })
        }, 2000)
      }
    })
  }
})