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
  chooseImgs,
  uploadImgs,
  uploadImg,
  previewImgs,
  deleteImg,
  addressCallBack
}
