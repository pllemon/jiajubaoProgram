// 参考链接 https://www.jb51.net/article/158860.htm
const app = getApp();
const common = require('../../utils/common.js');

Component({ 
    properties: { 
        title: {  
            type: String,  
            value: '多师傅'
        }, 
        back: {  
            type: Boolean,  
            value: false
        }, 
        home: {  
            type: Boolean,  
            value: false
        },
        area: {  
            type: Boolean,  
            value: false
        },
        network: {  
            type: Boolean,  
            value: false
        },
        isShop: {
            type: Boolean,
            value: false
        }
    }, 
    attached: function(){ 
        var that = this; 
        that.setNavSize();
        that.getLocation();
    }, 
    data: {
        location: null,
        regionName: [],
        districtCode: '',
        customItem: '全部',
        regionInfo: null,
        addressInfo: null,
        networkList: [],
        networkIdx: 0
    }, 
    methods: { 
        // 通过获取系统信息计算导航栏高度 
        setNavSize: function() {  
            var that = this 
            , sysinfo = wx.getSystemInfoSync()  
            , statusHeight = sysinfo.statusBarHeight  
            , isiOS = sysinfo.system.indexOf('iOS') > -1  
            , navHeight;  
            if (!isiOS) {  
                navHeight = 48;  
            } else {  
                navHeight = 44;  
            }  
            that.setData({  
                status: statusHeight,  
                navHeight: navHeight  
            }) 
        }, 
        // 返回事件 
        back: function(){  
            wx.navigateBack({  
                delta: 1  
            })  
            this.triggerEvent('back', {back: 1}) 
        }, 

        home: function() {  
            this.triggerEvent('home', {}); 
        },

        getLocation: function() {
            const that = this;
            if (app.globalData.regionInfo && app.globalData.regionInfo.name.length > 0) {
                that.setData({
                    regionInfo: app.globalData.regionInfo,
                    addressInfo: app.globalData.addressInfo
                })
                that.getNetwork();
                that.triggerEvent('updateArea', {regionInfo: app.globalData.regionInfo}); 
            } else {
                common.getLocation(that, function(res){
                    if (res) {
                        const { province, city, district } = res.address_component;
                        const { provincecode, citycode, adcode } = res.ad_info;
                        const regionInfo = {
                            name: [province, city, district],
                            code: [provincecode, citycode, adcode]
                        };
                        app.globalData.regionInfo = regionInfo;
                        that.setData({
                            regionInfo
                        });
                        that.getNetwork();
                        that.triggerEvent('updateArea', {regionInfo}); 
                    } else {
                        const regionInfo = {
                            name: [],
                            code: []
                        };
                        app.globalData.regionInfo = regionInfo;
                        that.setData({
                            regionInfo
                        });
                        that.getNetwork();
                        that.triggerEvent('updateArea', {regionInfo}); 
                    }
                })
            }
        },

        bindRegionChange: function (e) {
            const regionInfo = {
                name: e.detail.value,
                code: e.detail.code
            };
            app.globalData.regionInfo = regionInfo;
            this.setData({
                regionInfo
            });
            this.getNetwork();
            this.triggerEvent('updateArea', {regionInfo}); 
        },

        getNetwork: function () {
            let that = this;
            console.log(that.data.regionInfo)
            app.request({
                url: '/networklist',
                hideLoading: true,
                data: {
                    province: that.data.regionInfo.code[0] || '',
                    city: that.data.regionInfo.code[1] || '',
                    district: that.data.regionInfo.code[2] || ''
                },
                success: function(data) {
                    if (that.properties.isShop) {
                        data.unshift({
                            name: '全部商家',
                            id: '-2',
                        })
                        data.unshift({
                            name: '全部便利店',
                            id: '-1',
                        })
                        data.unshift({
                            name: '请选择',
                            id: '',
                        })
                    } else {
                        data.unshift({
                            name: '全部网点',
                            id: '',
                        })
                    }
                    that.setData({
                        networkIdx: 0,
                        networkList: data
                    })
                }
            })
        },
        bindNetworkChange: function(e) {
            let value = e.detail.value
            this.setData({
                networkIdx: value
            })
            this.triggerEvent('updateNetwork', this.data.networkList[value]); 
        },

        onOpenSetting() {
            let that = this;
            wx.getSetting({
                success: (res) => {
                    if (res.authSetting['scope.userLocation']) {
                        that.getLocation()
                    }
                }
            })
        },
    }
})