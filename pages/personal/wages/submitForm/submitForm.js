const app = getApp()
const common = require('../../../../utils/common.js');

Page({
    data: {
        form: {
            pay_name: '',
            pay_type: '',
            pay_username: ''
        },
        pay_status_code: '',
        personType: 0,
        radio: '2',
        sumprofit: 0,
        point: 0,
        maxPoint: 0
    },

    onLoad(param) {
        let personType = param.personType
        let sumprofit = param.sumprofit || 0
        let maxPoint = 0
        if (personType == 0) {
            maxPoint = parseInt(sumprofit/10) * 10
        }
        this.setData({
            personType,
            sumprofit,
            maxPoint,
            point: maxPoint,
            pay_status_code: param.pay_status_code
        })
    },

    changeType(e) {
        this.setData({
            radio: e.detail
        })
    },

    changeMoney(e) {
        let number = e.detail
        this.setData({
            point: number
        })
    },
    
    onChange(e) {
        common.changeInput(this, e)
    },
    
    apply() {
        let form = this.data.form
        let personType = this.data.personType
        if (!form.pay_name) {
            app.showModal('请输入提现账号');
            return false;
        }
        if (!form.pay_username) {
            app.showModal('请输入真实姓名');
            return false;
        }
        if (personType == 1) {
            this.masterApply()
        } else {
            this.userApply()
        }
    },

    masterApply() {
        let orders = app.globalData.otherData
        let promiseArr = []
        wx.showLoading({
            title: '提交中',
            mask: true
        })
        orders.forEach(item => {
            promiseArr.push(this.masterApplySingle(item))
        })
        Promise.all(promiseArr).then(() => {
            app.successToast('提交成功', function(){
                let pages = getCurrentPages();
                let prevPage = pages[pages.length - 3];
                prevPage.selectComponent("#list").getData(1);
                wx.navigateBack({
                    delta: 2
                })
            })
        });
    },

    masterApplySingle(order_id) {
        return new Promise((resolve, reject) => {
            let that = this;
            let data = that.data.form;
            data.order_id = order_id;
            data.pay_type = this.data.radio;
            data.pay_status_code = this.data.pay_status_code;
            app.request({
                url: '/craftsmancashout',
                data,
                hideLoading: true,
                complete: function() {
                    resolve(true)
                }
            })
        })
    },

    userApply() {
        let that = this;
        wx.requestSubscribeMessage({
            tmplIds: [
              'bjdKRflGQS_3FMLZaXCksHQrU_hr5humjNZe_tpqGU4',
            ],
            success (res) {
                let data = that.data.form;
                data.pay_type = this.data.radio;
                data.money = this.data.point;
                app.request({
                  url: '/userwithdrawal',
                  data,
                  loadText: '提交中',
                  success: function() {
                    app.successToast('提交成功', function(){
                        wx.redirectTo({
                            url: '/pages/personal/wages/settlementRecord/settlementRecord'
                        })
                    })
                  }
                })
            }
        })
    }
})
