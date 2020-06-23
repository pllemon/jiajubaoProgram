const app = getApp();
const QQMapWX = require('qqmap-wx-jssdk.js');
let qqmapsdk;

// 检测登录
const checkLogin = (callback) => {
  if ( !app.globalData.session ) {
    wx.reLaunch({
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
          let ad_info = res.result.ad_info
          res.result.ad_info.provincecode = ad_info.adcode.substring(0,2) + '0000'
          res.result.ad_info.citycode = ad_info.adcode.substring(0,4) + '00'
          console.log('---------')
          console.log(res)
          console.log('-------------')
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
      app.globalData.addressInfo = null
      target.setData({
        addressInfo: null
      })
      if (callback) {
        callback(null)
      }
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

// 获取地址详细信息
const getLocationMes = (obj, callback) => {
  wx.showLoading({
    title: '定位中',
    mask: true
  })
  qqmapsdk.reverseGeocoder({
    location: {
      latitude: obj.latitude,
      longitude: obj.longitude
    },
    success: function(res) {
      let ad_info = res.result.ad_info
      res.result.ad_info.provincecode = ad_info.adcode.substring(0,2) + '0000'
      res.result.ad_info.citycode = ad_info.adcode.substring(0,4) + '00'
      console.log('---------')
      console.log(res)
      console.log('-------------')
      if (callback) {
        callback(res.result)
      }
      wx.hideLoading()
    }
  })
}


// 路线规划
const getRoutePlan = (targetPoint) => {
  console.log(targetPoint)
  let plugin = requirePlugin('routePlan');
  let key = '5KUBZ-FS2KK-RDVJY-AHNO4-GS7RS-PRFL5';  //使用在腾讯位置服务申请的key
  let referer = '叁两糖';   //调用插件的app的名称
  let endPoint = JSON.stringify(targetPoint); // 终点
  wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
  });
}

// ------------------vant 0107---------------------------
// 读取图片
const readImage = (target, el) => {
  const type = el.currentTarget.dataset.type;
  const path = el.detail.file.path;
  let fileList = target.data[type];
  fileList.push({
    url: path,
    success: false
  })
  target.setData({
    [type]: fileList
  })
}

// 删除图片
const deleteImage = (target, el) => {
  const type = el.currentTarget.dataset.type;
  const index = el.detail.index;
  let fileList = target.data[type];
  fileList.splice(index, 1)
  target.setData({
    [type]: fileList
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
  if (file.success) {
    callback(file)
    return false
  }
  wx.uploadFile({
    url: 'http://47.106.100.144/' + url,
    filePath: file.url,
    name: 'image',
    success: function (res) {
      console.log(res)
      let data = JSON.parse(res.data);
      if (data.success) {
        file.data = data.data;
        file.success = true;
        callback(file)
      } else {
        callback(file)
      }
    }
  })
}

// 补全图片url
const padUrl = (url) => {
  return 'http://47.106.100.144/' + url
}


// 修改输入框
const changeInput = (target, el) => {
  let form = target.data.form;
  form[el.currentTarget.dataset.name] = el.detail;
  target.setData({
    form
  })
}

module.exports = {
  checkLogin,
  chooseImgs,
  uploadImgs,
  uploadImg,
  padUrl,
  getLocation,
  getRoutePlan,
  getLocationMes,

  readImage,
  deleteImage,
  changeInput
}
