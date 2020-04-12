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
        addressInfo: null
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
            this.triggerEvent('updateArea', {regionInfo}); 
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