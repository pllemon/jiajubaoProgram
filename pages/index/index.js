Page({
  data: {
    imgUrls: [
      '/image/example/bg1.jpg',
      '/image/example/bg1.jpg',
      '/image/example/bg1.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    list: [{
      url: '/pages/demand/category/category',
      icon: '/image/icon/project.svg',
      text: '工程秀'
    },{
      url: '/pages/demand/category/category',
      icon: '/image/icon/repair.svg',
      text: '我要维修'
    },{
      url: '/pages/order/center/center',
      icon: '/image/icon/discount.svg',
      text: '优惠全民'
    },{
      url: '/pages/order/center/center',
      icon: '/image/icon/order_list.svg',
      text: '批单中心'
    }]
  },

})