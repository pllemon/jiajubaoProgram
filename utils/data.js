// 订单状态：1 待审核 2 待支付 ，3待派单 4 报名中 5施工中 6待付尾款 7待评价 8已完成 9支付但未施工，强行结束订单
// 人员状态：0 未申请 1 正常使用 2 申请中 3 驳回 4 禁用
const personMessage = {
  0: {
    text: '我是用户',
    icon: '/image/icon/vip.svg',
    orderStatus: {
      0: {
        status: 0,
        label: '全部',
        show: true
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
        showAction: true
      },
      2: {
        status: 2,
        label: '待支付',
        desc: '订单已审核通过，请支付',
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
        desc: '已支付，订单等待后台派单',
        show: true,
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
        desc: '师傅报名中',
        show: true,
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
        label: '待验收',
        desc: '师傅已完成施工，请检查验收',
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
        label: '审核不通过',
        desc: '订单审核不通过，欢迎再次下单',
        show: false,
        icon: 'iconiconfontzhizuobiaozhun0262',
        showUser: true,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false,
        showAction: true
      },
      11: {
        status: 11,
        label: '已取消',
        desc: '订单已取消，欢迎再次下单',
        show: true,
        icon: 'iconiconfontzhizuobiaozhun0262',
        showUser: true,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false,
        showAction: true
      },
      12: {
        status: 12,
        label: '已过期',
        desc: '订单已过期，欢迎再次下单',
        show: true,
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
        show: true
      },
      1: {
        status: 1,
        label: '已报名',
        desc: '报名成功，请耐心等待结果',
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
      4: {
        status: 4,
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
      3: {
        status: 3, 
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
        label: '未报名',
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
  },
  3: {
    text: '我是店长',
    icon: '/image/icon/business.svg',
    orderStatus: {
      0: {
        status: 0,
        label: '全部',
        show: true
      },
      1: {
        status: 1,
        label: '待审核',
        desc: '订单已分配，请尽快处理',
        show: true,
        icon: 'iconshenhe',
        showUser: true,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false,
        showAction: true
      },
      2: {
        status: 2,
        label: '待支付',
        desc: '订单已审核通过，等待支付',
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
        desc: '已支付，订单等待后台派单',
        show: true,
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
        desc: '师傅报名中',
        show: true,
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
        label: '待验收',
        desc: '师傅已完成施工，请检查验收',
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
        label: '审核不通过',
        desc: '订单审核不通过，欢迎再次下单',
        show: false,
        icon: 'iconiconfontzhizuobiaozhun0262',
        showUser: true,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false,
        showAction: true
      },
      11: {
        status: 11,
        label: '已取消',
        desc: '订单已取消，欢迎再次下单',
        show: true,
        icon: 'iconiconfontzhizuobiaozhun0262',
        showUser: true,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false,
        showAction: true
      },
      12: {
        status: 12,
        label: '已过期',
        desc: '订单已过期，欢迎再次下单',
        show: true,
        icon: 'iconiconfontzhizuobiaozhun0262',
        showUser: true,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false,
        showAction: true
      }
    },
    action: []
  }
}
const personType = {
  0: {
    text: '我是用户',
    icon: '/image/icon/vip.svg',
    action: [
      {
        icon: 'affiliations_li',
        text: '维修订单',
        url: '/pages/order/list/list?personType=0'
      },
      {
        icon: 'cspace',
        text: '优惠订单',
        url: '/pages/offline/list/list?personType=0'
      },
      {
        icon: 'coinpurse_line',
        text: '我的积分',
        url: '/pages/personal/wallet/index/index?personType=0'
      },
      // {
      //   icon: 'addresslist',
      //   text: '我要下单',
      //   url: '/pages/demand/applyForm/applyForm'
      // },
      {
        icon: 'group',
        text: '我的朋友',
        url: '/pages/personal/user/friend/friend'
      },
      {
        icon: 'link',
        text: '邀请朋友',
        url: '/pages/personal/user/share/share'
      },
      {
        icon: 'service',
        text: '意见反馈',
        url: '/pages/personal/feedback/feedback'
      },
      // {
      //   icon: 'namecard',
      //   text: '师傅加盟',
      //   action: 'goMaster'
      // },
      {
        icon: 'notice',
        text: '系统公告',
        url: '/pages/personal/notice/notice'
      },
      {
        icon: 'setting',
        text: '我要设置',
        url: '/pages/personal/setting/setting'
      }
    ]
  },
  1: {
    text: '我是师傅',
    icon: '/image/icon/master.svg',
    action: [
      {
        icon: 'affiliations_li',
        text: '接单记录',
        url: '/pages/order/list/list?personType=1'
      },
      {
        icon: 'coinpurse_line',
        text: '我的工资',
        url: '/pages/personal/wages/index/index'
      },
      // {
      //   icon: 'affiliations_li',
      //   text: '我的资料',
      //   url: '/pages/personal/master/identity/identity?readonly=1'
      // }
    ]
  },
  2: {
    text: '我是商家',
    icon: '/image/icon/business.svg',
    action: [
      {
        icon: 'cspace',
        text: '优惠订单',
        url: '/pages/offline/list/list?personType=2'
      },
      {
        icon: 'cspace',
        text: '优惠商品',
        url: '/pages/personal/businessman/goods/goods'
      },
      // {
      //   icon: 'affiliations_li',
      //   text: '我的资料',
      //   url: '/pages/personal/master/identity/identity?readonly=1'
      // }
    ]
  },
  3: {
    text: '我是店长',
    icon: '/image/icon/business.svg',
    action: [
      {
        icon: 'cspace',
        text: '网点信息',
        url: '/pages/offline/list/list?personType=2'
      },
      {
        icon: 'cspace',
        text: '网点订单',
        url: '/pages/order/list/list?personType=3'
      },
    ]
  }
}

module.exports = {
  personMessage,
  personType
}
