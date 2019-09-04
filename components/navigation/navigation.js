var app = getApp();
Component({
  properties: {
	  currentIdx: Number, // 当前激活序号
	  place: {
		type: Boolean,
		value: true
	  }
  },
  data: {
	  navList: [
		{
			img: '/image/icon/icon_square.svg',
			activeImg: '/image/icon/icon_square_active.svg',
			text: '首页',
			url: '/pages/index/index'
		},
		{
			img: '/image/icon/shop.svg',
			activeImg: '/image/icon/shop.svg',
			text: '商家',
			url: '/pages/shop/list/list'
		},
		{
			img: '/image/icon/icon_dispose.svg',
			activeImg: '/image/icon/icon_dispose_active.svg',
			text: '抢单中心',
			url: '/pages/order/center/center'
		},
		{
			img: '/image/icon/icon_certificate_fil.svg',
			activeImg: '/image/icon/icon_certificate_fil_active.svg',
			text: '工匠秀',
			url: '/pages/demand/category/category'
		},
		{
			img: '/image/icon/icon_patriarch.svg',
			activeImg: '/image/icon/icon_patriarch_active.svg',
			text: '我的',
			url: '/pages/personal/user/index/index'
		}
	  ]
  }
})