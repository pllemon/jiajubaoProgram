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

// 订单状态：1 待审核 2 待支付定金 ，3待派单 4 报名中 5施工中 6待付尾款 7待评价 8已完成 9支付定金但未施工，强行结束订单
// 人员状态：0 未申请 1 正常使用 2 申请中 3 驳回 4 禁用
const personMessage = {
  0: {
    text: '我是用户',
    icon: '/image/icon/vip.svg',
    orderStatus: {
      0: {
        status: 0,
        label: '全部',
        show: false
      },
      1: {
        status: 1,
        label: '待审核',
        desc: '订单已提交，请耐心等待',
        show: true,
        icon: 'iconshenhe',
        showUser: true,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false,
        showAction: false
      },
      2: {
        status: 2,
        label: '待下订',
        desc: '订单已审核通过，请支付定金',
        show: true,
        icon: 'iconqianbao',
        showUser: true,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false,
        showAction: true
      },
      3: {
        status: 3,
        label: '待派单',
        desc: '已支付定金，订单等待后台派单',
        show: false,
        icon: 'icondengdai',
        showUser: true,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false,
        showAction: false
      },
      4: {
        status: 4,
        label: '报名中',
        desc: '可选择你喜欢的师傅',
        show: false,
        icon: 'icongongcheng-',
        showUser: true,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: true,
        showAction: false
      },
      5: {
        status: 5,
        label: '施工中',
        desc: '师傅施工中',
        show: true,
        icon: 'icongongcheng-1',
        showUser: true,
        showUserPhone: false,
        showMaster: true,
        showMasterPhone: true,
        showSignUp: true,
        showAction: false
      },
      6: {
        status: 6,
        label: '待付尾款',
        desc: '请支付尾款',
        show: true,
        icon: 'iconqianbao',
        showUser: true,
        showUserPhone: false,
        showMaster: true,
        showMasterPhone: true,
        showSignUp: true,
        showAction: true
      },
      8: {
        status: 8,
        label: '已完成',
        desc: '订单已完成，欢迎再次下单',
        show: true,
        icon: 'iconiconfontzhizuobiaozhun0261',
        showUser: true,
        showUserPhone: false,
        showMaster: true,
        showMasterPhone: true,
        showSignUp: true,
        showAction: true
      },
      10: {
        status: 10,
        label: '已取消',
        desc: '订单已取消，欢迎再次下单',
        show: false,
        icon: 'iconiconfontzhizuobiaozhun0262',
        showUser: true,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false,
        showAction: true
      }
    }
  },
  1: {
    text: '我是师傅',
    icon: '/image/icon/master.svg',
    orderStatus: {
      0: {
        status: 0,
        label: '全部',
        show: false
      },
      1: {
        status: 1,
        label: '报名中',
        desc: '您已报名，请耐心等待结果',
        show: true,
        icon: 'icongongcheng-',
        showUser: false,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: true,
        showAction: false
      },
      2: {
        status: 2,
        label: '已承接',
        desc: '您已承接该订单，请按时完成工作',
        show: true,
        icon: 'icongongcheng-1',
        showUser: true,
        showUserPhone: true,
        showMaster: true,
        showMasterPhone: false,
        showSignUp: true,
        showAction: true
      },
      3: {
        status: 3,
        label: '未承接',
        desc: '您未承接该订单，可报名其他订单',
        show: true,
        icon: 'iconiconfontzhizuobiaozhun0262',
        showUser: false,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: true,
        showAction: false
      },
      4: {
        status: 4,
        label: '已完成',
        desc: '您已完成该订单',
        show: true,
        icon: 'iconiconfontzhizuobiaozhun0261',
        showUser: true,
        showUserPhone: true,
        showMaster: true,
        showMasterPhone: false,
        showSignUp: true,
        showAction: true
      },
      5: {
        status: 5,
        label: '报名中',
        desc: '订单正接受报名，需要请尽快报名哦',
        show: false,
        icon: 'icongongcheng-',
        showUser: false,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: true,
        showAction: true
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
