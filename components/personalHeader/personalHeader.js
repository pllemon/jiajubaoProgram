var app = getApp();
Component({
  properties: {
  	currentIdx: Number, // 当前激活序号
  },
  data: {
	  navList: [
      {
        url: '/pages/personal/user/index/index',
        text: '我是用户',
        icon: '/image/icon/vip.svg'
      },
      {
        url: '/pages/personal/master/index/index',
        text: '我是师傅',
        icon: '/image/icon/master.svg'
      },
      {
        url: '/pages/personal/businessman/index/index',
        text: '我是商家',
        icon: '/image/icon/business.svg'
      },
    ]
  }
})