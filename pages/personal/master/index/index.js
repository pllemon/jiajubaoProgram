var app = getApp();
Component({
  properties: {
    info: {
      type: Object,
      value: {}
    }
  },
  data: {
    status: {
      0: {
        text: '你还不是师傅哦，马上点击申请加入我们吧，更多惊喜等着你',
        btn: '立即申请',
        active: true
      },
      2: {
        text: '申请已提交，后台正在审核中，请耐心等待哦',
        btn: '申请审核中',
        active: false
      },
      3: {
        text: '你的申请已驳回，可查看详情并重新编辑后提交哦',
        btn: '重新提交',
        active: true
      }
    },
    action: [
      {
        icon: 'coinpurse_line',
        text: '我的积分',
        url: '/pages/personal/wallet/wallet'
      },
      {
        icon: 'addresslist',
        text: '我要下单',
        url: '/pages/demand/category/category'
      },
      {
        icon: 'group',
        text: '我的朋友',
        url: '/pages/personal/friend/friend'
      },
      {
        icon: 'link',
        text: '我要推广',
        url: '/pages/personal/share/share'
      },
      {
        icon: 'service',
        text: '意见反馈',
        url: '/pages/personal/feedback/feedback'
      },
      {
        icon: 'namecard',
        text: '师傅加盟',
        url: '/pages/personal/index/index?type=1'
      },
      {
        icon: 'setting',
        text: '设置',
        url: '/pages/personal/setting/setting'
      }
    ]
  },
  methods: {
    applyMaster() {
      wx.navigateTo({
        url: '/pages/personal/master/identity/identity'
      })
    }
  }
})