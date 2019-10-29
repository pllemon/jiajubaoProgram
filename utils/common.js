const app = getApp();
const QQMapWX = require('utils/qqmap-wx-jssdk.js');
let qqmapsdk;

// 检测登录
const checkLogin = () => {
  if ( !app.globalData.session ) {
    wx.navigateTo({
      url: '/pages/login/login'
    })
    return false;
  }
}

// 选择图片
const chooseImgs = (total, fileList, callback) => {
  let count = total - fileList.length
  wx.chooseImage({
    count,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success (res) {
      let imgArr = fileList.concat(res.tempFilePaths)
      callback(imgArr)
    }
  })
}

// 上传同类型多张图片
const uploadImgs = ( url, fileList, callback)  => {
  let resArr = [];
  fileList.forEach(item => {
    uploadImg(url, item, function(res){
      resArr.push(res);
      if (resArr.length == fileList.length) {
        callback(resArr);
      }
    })
  })
}

// 上传单张图片
const uploadImg = ( url, file, callback)  => {
  wx.uploadFile({
    url: 'http://47.106.100.144/' + url,
    filePath: file,
    name: 'image',
    success: function (res) {
      console.log(res)
      let data = JSON.parse(res.data);
      if (data.success && callback) {
        callback(data.data)
      }
    }
  })
}

// 预览图片
const previewImgs = (fileList, idx = 0) => {
  wx.previewImage({
    current: fileList[idx],
    urls: fileList
  })
}

// 删除图片
const deleteImg = (fileList, idx, callback) => {
  fileList.splice(idx, i);
  callback(fileList)
}

// 检查区域是否有网点
const checkNetworkNum = () => {
  let city = app.globalData.addressInfo.city;
  app.request({
    url: '/networklist',
    data: {
      city: city
    },
    success: function(data) {
      console.log(data)
      if (data.length == 0) {
        app.showModal(city+'暂未开通网点，敬请期待')
        return false
      } else {
        return true
      }
    }
  })
}

// 获取用户地址
const getLocation = (target) => {
  if (app.globalData.addressInfo) {
    target.setData({
      addressInfo: app.globalData.addressInfo
    })
    return false
  }
  qqmapsdk = new QQMapWX({
    key: '5KUBZ-FS2KK-RDVJY-AHNO4-GS7RS-PRFL5'
  });
  wx.getLocation({
    type: 'wgs84',
    success(res) {
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },
        success: function(res) {
          console.log(res)
          app.globalData.addressInfo = res.result
          target.setData({
            addressInfo: res.result
          })
        }
      })
    },
    fail(err) {
      target.setData({
        showLocationDialog = true
      })
    }
  })
},

// 地址回调
const addressCallBack = (app, target) => {
  if (app.globalData.addressInfo) {
    target.setData({
      addressInfo: app.globalData.addressInfo
    })
  } else {
    app.readyLocation = function(res) {
      target.setData({
        addressInfo: app.globalData.addressInfo
      })
    }
  }
}

module.exports = {
  checkLogin,
  chooseImgs,
  uploadImgs,
  uploadImg,
  previewImgs,
  deleteImg,
  getLocation,
  addressCallBack,
  checkNetworkNum
}
