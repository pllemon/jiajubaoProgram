// 订单状态：1 待审核 2 待支付 ，3待派单 4 报名中 5施工中 6待用户确认 7待店长确认 8已完成 9支付但未施工，强行结束订单
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
        color: 'cPurple'
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
        color: 'cOrange'
      },
      3: {
        status: 3,
        label: '待派单',
        desc: '订单已支付，等待后台派单',
        show: false,
        icon: 'icondengdai',
        showUser: true,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false,
        color: 'cPurple'
      },
      4: {
        status: 4,
        label: '报名中',
        desc: '师傅报名中',
        show: false,
        icon: 'icongongcheng-',
        showUser: true,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: true,
        color: 'cPurple'
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
        color: 'cPurple'
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
        color: 'cOrange'
      },
      7: {
        status: 7,
        label: '已完成',
        desc: '订单已完成，欢迎再次下单',
        show: false,
        icon: 'iconiconfontzhizuobiaozhun0261',
        showUser: true,
        showUserPhone: false,
        showMaster: true,
        showMasterPhone: true,
        showSignUp: true,
        color: 'cGreen'
      },
      8: {
        status: 8,
        label: '已完成',
        desc: '订单已完成，欢迎再次下单',
        show: false,
        icon: 'iconiconfontzhizuobiaozhun0261',
        showUser: true,
        showUserPhone: false,
        showMaster: true,
        showMasterPhone: true,
        showSignUp: true,
        color: 'cGreen'
      },
      10: {
        status: 10,
        label: '审核不通过',
        desc: '订单审核不通过，已关闭',
        show: false,
        icon: 'iconiconfontzhizuobiaozhun0262',
        showUser: true,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false,
        color: 'cGray'
      },
      11: {
        status: 11,
        label: '已取消',
        desc: '订单已取消',
        show: false,
        icon: 'iconiconfontzhizuobiaozhun0262',
        showUser: true,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false,
        color: 'cGray'
      },
      12: {
        status: 12,
        label: '超时未付款',
        desc: '订单超时未付款，已关闭',
        show: false,
        icon: 'iconiconfontzhizuobiaozhun0262',
        showUser: true,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false,
        color: 'cGray'
      },
      14: {
        status: 14,
        label: '超时未审核',
        desc: '订单超时未审核，已关闭',
        show: false,
        icon: 'iconiconfontzhizuobiaozhun0262',
        showUser: true,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false,
        color: 'cGray'
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
        show: false,
        icon: 'icongongcheng-',
        showUser: false,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: true
      },
      2: {
        status: 2,
        label: '已承接',
        desc: '已承接该订单，请按时完成工作',
        show: true,
        icon: 'icongongcheng-1',
        showUser: true,
        showUserPhone: true,
        showMaster: true,
        showMasterPhone: false,
        showSignUp: true
      },
      3: {
        status: 3,
        label: '未承接',
        desc: '未承接该订单，可报名其他订单',
        show: true,
        icon: 'iconiconfontzhizuobiaozhun0262',
        showUser: false,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: true
      },
      4: {
        status: 4, 
        label: '待客户验收',
        desc: '施工完成，待客户验收',
        show: true,
        icon: 'iconiconfontzhizuobiaozhun0261',
        showUser: true,
        showUserPhone: true,
        showMaster: true,
        showMasterPhone: false,
        showSignUp: false
      },
      5: {
        status: 5, 
        label: '待店长验收',
        desc: '施工完成，待店长验收',
        show: true,
        icon: 'iconiconfontzhizuobiaozhun0261',
        showUser: true,
        showUserPhone: true,
        showMaster: true,
        showMasterPhone: false,
        showSignUp: false
      },
      6: {
        status: 6, 
        label: '已验收',
        desc: '施工完成，工程已验收',
        show: true,
        icon: 'iconiconfontzhizuobiaozhun0261',
        showUser: true,
        showUserPhone: true,
        showMaster: true,
        showMasterPhone: false,
        showSignUp: false
      },
      7: {
        status: 7,
        label: '未报名',
        desc: '订单正接受报名，请及时报名哦',
        show: false,
        icon: 'icongongcheng-',
        showUser: false,
        showUserPhone: false,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: true
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
        desc: '请及时联系用户并处理订单',
        show: true,
        icon: 'iconshenhe',
        showUser: true,
        showUserPhone: true,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false
      },
      2: {
        status: 2,
        label: '待支付',
        desc: '审核通过，等待支付',
        show: true,
        icon: 'iconqianbao',
        showUser: true,
        showUserPhone: true,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false
      },
      3: {
        status: 3,
        label: '待派单',
        desc: '订单已支付，等待后台派单',
        show: true,
        icon: 'icondengdai',
        showUser: true,
        showUserPhone: true,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false
      },
      4: {
        status: 4,
        label: '报名中',
        desc: '师傅报名中',
        show: true,
        icon: 'icongongcheng-',
        showUser: true,
        showUserPhone: true,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false
      },
      5: {
        status: 5,
        label: '施工中',
        desc: '师傅施工中',
        show: true,
        icon: 'icongongcheng-1',
        showUser: true,
        showUserPhone: true,
        showMaster: true,
        showMasterPhone: true,
        showSignUp: false,
      },
      6: {
        status: 6,
        label: '待客户验收',
        desc: '师傅已完成施工，待客户验收',
        show: true,
        icon: 'iconqianbao',
        showUser: true,
        showUserPhone: true,
        showMaster: true,
        showMasterPhone: true,
        showSignUp: false
      },
      7: {
        status: 7,
        label: '待店长验收',
        desc: '客户已验收，请检查验收',
        show: true,
        icon: 'iconqianbao',
        showUser: true,
        showUserPhone: true,
        showMaster: true,
        showMasterPhone: true,
        showSignUp: false
      },
      8: {
        status: 8,
        label: '已验收',
        desc: '工程已验收',
        show: true,
        icon: 'iconiconfontzhizuobiaozhun0261',
        showUser: true,
        showUserPhone: true,
        showMaster: true,
        showMasterPhone: true,
        showSignUp: false
      },
      10: {
        status: 10,
        label: '审核不通过',
        desc: '订单审核不通过',
        show: true,
        icon: 'iconiconfontzhizuobiaozhun0262',
        showUser: true,
        showUserPhone: true,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false
      },
      11: {
        status: 11,
        label: '已取消',
        desc: '订单已取消',
        show: true,
        icon: 'iconiconfontzhizuobiaozhun0262',
        showUser: true,
        showUserPhone: true,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false
      },
      12: {
        status: 12,
        label: '超时未付款',
        desc: '订单超时未付款，已关闭',
        show: true,
        icon: 'iconiconfontzhizuobiaozhun0262',
        showUser: true,
        showUserPhone: true,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false
      },
      14: {
        status: 14,
        label: '超时未审核',
        desc: '订单超时未审核，已关闭',
        show: true,
        icon: 'iconiconfontzhizuobiaozhun0262',
        showUser: true,
        showUserPhone: true,
        showMaster: false,
        showMasterPhone: false,
        showSignUp: false
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
        icon: 'icon-form',
        text: '维修订单',
        url: '/pages/order/list/list?personType=0'
      },
      {
        icon: 'icon-similarproduct',
        text: '优惠订单',
        url: '/pages/offline/list/list?personType=0'
      },
      {
        icon: 'icon-trade',
        text: '我的收益',
        url: '/pages/personal/wages/settlement/settlement'
      },
      {
        icon: 'icon-jifen',
        text: '我的积分',
        url: '/pages/personal/wallet/integralRecord/integralRecord'
      },
      {
        icon: 'icon-trust1',
        text: '我的朋友',
        url: '/pages/personal/user/friend/friend'
      },
      {
        icon: 'icon-link1',
        text: '邀请朋友',
        url: '/pages/personal/user/share/share'
      },
      {
        icon: 'icon-comments',
        text: '意见反馈',
        url: '/pages/personal/feedback/feedback'
      },
      {
        icon: 'icon-remind1',
        text: '系统公告',
        url: '/pages/personal/notice/notice'
      },
      {
        icon: 'icon-set1',
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
        icon: 'icon-bussinesscard',
        text: '我的资料',
        url: '/pages/personal/master/identity/identity?readonly=1'
      },
      {
        icon: 'icon-form',
        text: '接单记录',
        url: '/pages/order/list/list?personType=1'
      },
      {
        icon: 'icon-trade',
        text: '订单佣金',
        url: '/pages/personal/wages/applyRecord/applyRecord'
      }
    ]
  },
  2: {
    text: '我是商家',
    icon: '/image/icon/business.svg',
    action: [
      {
        icon: 'icon-bussinesscard',
        text: '我的资料',
        url: '/pages/personal/businessman/identity/identity?readonly=1'
      },
      {
        icon: 'icon-form',
        text: '优惠订单',
        url: '/pages/offline/list/list?personType=2'
      },
      {
        icon: 'icon-similarproduct',
        text: '优惠商品',
        url: '/pages/personal/businessman/goods/goods'
      }
    ]
  },
  3: {
    text: '我是店长',
    icon: '/image/icon/business.svg',
    action: [
      {
        icon: 'icon-logistic',
        text: '所属网点',
        url: '/pages/personal/shopowner/networkInfo/networkInfo'
      },
      {
        icon: 'icon-form',
        text: '网点订单',
        url: '/pages/order/list/list?personType=3'
      },
    ]
  }
}


const offlineStatus = {
  1: {
    0: '待商家接单',
    2: '待接单'
  },
  2: {
    0: '商家已取消',
    2: '已取消'
  },
  3: {
    0: '删除',
    2: '删除'
  },
  4: {
    0: '待商家报价',
    2: '待报价'
  },
  5: {
    0: '待确认',
    2: '待用户确认'
  },
  6: {
    0: '已取消',
    2: '用户已取消'
  },
  7: {
    0: '商家已接单',
    2: '已接单'
  }
}

module.exports = {
  personMessage,
  personType,
  offlineStatus
}
