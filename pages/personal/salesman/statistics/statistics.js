const app = getApp();
const date = new Date()
const {areaJson} = require('../../../../utils/area.js');

Page({
  data: {
    networkValue: '',
    networkOptions: [],
    areaValue: '',
    areaOptions: [],
    timesTitle: '时间',
    year: date.getFullYear(),
    month: '全部',
    years: [],
    months: [],
    timeValue: [date.getFullYear(), '']
  },

  onLoad(params) {
    this.getTimes()
    this.getArea()
    this.getNetwork()
  },

  getTimes() {
    let years = []
    let months = ['全部']
    for (let i = 2021; i<= 2121; i++) {
      years.push(i)
    }
    for (let i = 1; i <= 12; i++) {
      months.push(i)
    }
    this.setData({
      years,
      months
    })
  },

  getArea() {
    let salesmanauth = app.globalData.loginInfo.salesmanauth
    let areaOptions = []
    console.log(salesmanauth)
    areaJson.forEach(item => {
      if (item.value == salesmanauth.province) {
        item.children.forEach(item2 => {
          if (item2.value == salesmanauth.city) {
            areaOptions.push({
              text: item2.label,
              value: item2.value
            })
            this.setData({
              areaValue: item2.value
            })
            item2.children.forEach(item3 => {
              areaOptions.push({
                text: item3.label,
                value: item3.value
              })
            })
          }
        })
      }
    })
    this.setData({
      areaOptions
    })
  },

  getNetwork() {
    let that = this;
    app.request({
      url: '/networklist',
      method: 'POST',
      data: {},
      success: function(data) {
        data.forEach(item => {
          item.text = item.name,
          item.value = item.id
        })
        data.unshift({
          text: '全部网点',
          value: ''
        })
        console.log(data)
        that.setData({
          networkOptions: data
        })
      }
    })
  },

  chooseTimes() {
    this.setData({
      timesTitle: '3333'
    })
    this.selectComponent('#times').toggle();
  },

  changeNetwork(res) {
    console.log(res)
  },

  changeArea(res) {
    console.log(res)
  },

  changeTimes(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]]
    })
  }
})