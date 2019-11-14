const app = getApp();
const QQMapWX = require('qqmap-wx-jssdk.js');
let qqmapsdk;

// 检测登录
const checkLogin = (callback) => {
  if ( !app.globalData.session ) {
    wx.navigateTo({
      url: '/pages/login/login?type=1'
    })
  } else {
    if (callback) {
      callback()
    }
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
const getLocation = (target, callback) => {
  if (app.globalData.addressInfo) {
    target.setData({
      addressInfo: app.globalData.addressInfo
    })
    if (callback) {
      callback(app.globalData.addressInfo)
    }
    return false
  }
  qqmapsdk = new QQMapWX({
    key: '5KUBZ-FS2KK-RDVJY-AHNO4-GS7RS-PRFL5'
  });
  
  wx.getLocation({
    type: 'wgs84',
    success(res) {
      wx.showLoading({
        title: '定位中',
        mask: true
      })
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
          if (callback) {
            callback(res.result)
          }
          wx.hideLoading()
        }
      })
    },
    fail(err) {
      console.log('地址授权失败')
      // wx.getSetting({
      //   success: (res) => {
      //     if (res.authSetting['scope.userLocation']) {
      //       target.setData({
      //         showLocationDialog: true
      //       })
      //     } else {
      //       target.setData({
      //         showLocationDialog: true
      //       })
      //     }
      //   }
      // })
    }
  })
}

// 路线规划
const getRoutePlan = () => {
  let plugin = requirePlugin('routePlan');
  let key = '5KUBZ-FS2KK-RDVJY-AHNO4-GS7RS-PRFL5';  //使用在腾讯位置服务申请的key
  let referer = '叁两糖';   //调用插件的app的名称
  let endPoint = JSON.stringify({  //终点
      'name': '吉野家(北京西站北口店)',
      'latitude': 39.89631551,
      'longitude': 116.323459711
  });
  wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
  });
}

module.exports = {
  checkLogin,
  chooseImgs,
  uploadImgs,
  uploadImg,
  previewImgs,
  deleteImg,
  getLocation,
  checkNetworkNum,
  getRoutePlan
}
