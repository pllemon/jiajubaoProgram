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

// 上传图片
let uploadRes = [];
const uploadImgs = ( url, fileList, idx, callback)  => {
  if (idx == 0) {
    uploadRes = [];
  }
  wx.uploadFile({
    url,
    filePath: fileList[idx],
    name: 'image',
    success: function (res) {
      console.log(res)
      uploadRes.push(JSON.parse(res.data).data);
      if (!((idx + 1) == fileList.length)) {
        idx ++;
        uploadImgs(url, fileList, idx, callback);
      }else{
        callback(uploadRes);
        console.log("已经全部上传完毕");
      }
    },
    fail:function(){
      //console.log("失败")
    },
    complete:function(){
      //console.log("结束")
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
  previewImgs,
  deleteImg,
  addressCallBack
}
