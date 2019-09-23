const app = getApp()
const common = require('../../../../utils/common.js');

Page({
  data: {
    addressInfo: null,
    imgArr: [],
    agree: false
  },

  onLoad () {
    let that = this;
    common.addressCallBack(app, that);
  },

  // 添加图片
  addImg(e) {
    let name = e.detail.name;
    let arr = e.detail.arr;
    let imgArr = this.data[name];
    imgArr = imgArr.concat(arr);
    console.log(imgArr)
    this.setData({
      [name]: imgArr
    })
  },

  // 删除图片
  deleteImg(e) {
    let idx = e.detail.idx;
    let name = e.detail.name;
    let imgArr = this.data[name];
    imgArr.splice(idx, 1);
    this.setData({
      [name]: imgArr
    })
  },

  chooseAddress() {
    let that = this
    wx.chooseLocation({
      success(res) {
        console.log(res)
        let addressInfo = {
          address: res.address + res.name
        }        
        that.setData({
          addressInfo: addressInfo
        })
      }
    })
  },

  formSubmit: function(e) {
    let formData = e.detail.value;
    formData.address = this.data.addressInfo.address + formData.address;
    console.log(formData)
    app.request({
      url: '/applycraftsman',
      data: formData,
      success: function(data) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '/pages/personal/index/index?type=1'
          })
        }, 2000)
      }
    })
  }
})