const categoryList = [
  {
    text: '装修工匠',
    icon: '/image/roller.svg',
    child: ['工长','监理','设计师','水电工','木工','防水','泥水工','油漆工']
  },
  {
    text: '安装工匠',
    icon: '/image/install.svg',
    child: ['灯具灯饰','卫浴洁具','五金挂件','墙纸墙布','集成吊顶','广告招牌','木门窗','铝门窗']
  },
  {
    text: '维修工匠',
    icon: '/image/repair.svg',
    child: ['灯具电路','水路管道','防水补漏','卫浴洁具','天花吊顶','晾衣架','家电','厨电']
  },
  {
    text: '家政便民',
    icon: '/image/clean.svg',
    child: ['家庭保洁','开锁解锁','空调清洗','虫害防治','甲醛清除','油烟机清洗']
  }
]

// 1 待审核 2 待支付定金 ，3待派单 4 报名中 5施工中 6待付尾款 7待评价 8已完成 9支付定金但未施工，强行结束订单
const personMessage = {
  0: {
    text: '我是用户',
    icon: '/image/icon/vip.svg',
    orderStatus: {
      0: {
        label: '全部',
        show: false
      },
      1: {
        label: '待审核',
        desc: '订单已提交',
        show: true
      },
      2: {
        label: '待下订',
        desc: '订单已审核通过，请支付定金',
        show: true
      },
      3: {
        label: '报名中',
        desc: '师傅报名中，可选择你喜欢的师傅哦～',
        show: true
      },
      4: {
        label: '施工中',
        desc: '师傅施工中',
        show: true
      },
      5: {
        label: '已完成',
        desc: '订单已完成，欢迎再次下单',
        show: true
      },
      6: {
        label: '已取消',
        desc: '订单已取消，欢迎再次下单',
        show: false
      }
    },
    action: [
      {
        img: 'coinpurse_line',
        text: '我的钱包',
        url: '/pages/system/releaseDemand/step1/step1'
      },
      {
        img: 'addresslist',
        text: '我要下单',
        url: '/pages/demand/category/category'
      },
      {
        img: 'group',
        text: '我的朋友',
        url: '/pages/system/releaseDemand/step1/step1'
      },
      {
        img: 'link',
        text: '我要推广',
        url: '/pages/system/releaseDemand/step1/step1'
      },
      {
        img: 'service',
        text: '我要投诉',
        url: '/pages/system/releaseDemand/step1/step1'
      },
      {
        img: 'namecard',
        text: '师傅加盟',
        url: '/pages/personal/index/index?type=1'
      },
      {
        img: 'setting',
        text: '设置',
        url: '/pages/system/releaseDemand/step1/step1'
      }
    ]
  },
  1: {
    text: '我是师傅',
    icon: '/image/icon/master.svg',
    orderStatus: {
      0: {
        label: '全部'
      },
      1: {
        label: '已报名',
        show: true
      },
      2: {
        label: '已接单',
        show: true
      },
      3: {
        label: '已完成',
        show: true
      }
    },
    action: []
  },
  2: {
    text: '我是商家',
    icon: '/image/icon/business.svg',
    orderStatus: {},
    action: []
  }
}

module.exports = {
  categoryList,
  personMessage
}
