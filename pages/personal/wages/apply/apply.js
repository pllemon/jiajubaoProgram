
Page({
  data: {
    type: '',
    query1: {
      pay_status: 0,
      pay_status_code: 'GETONE',
      cmorderstatus: 4
    },
    query2: {
      pay_status: 1,
      pay_status_code: 'GETTOW',
      cmorderstatus: 4
    },
    form: {
      
    }
  },
  onLoad(params) {
    this.setData({
      type: params.type
    })
  }
})