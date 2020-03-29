// 参考链接 https://www.jb51.net/article/158860.htm

const common = require('../../utils/common.js');
Component({ 
    properties: { 
        title: {  
            type: String,  
            value: '多师傅'
        }, 
        back: {  
            type: Boolean,  
            value: true
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
            let that = this;
            common.getLocation(that, function(res){
                let { province, city, district } = res.address_component
                that.setData({
                    location: res.location,
                    regionName: [province, city, district],
                    districtCode: res.ad_info.adcode
                })
            });
        },

        bindRegionChange: function (e) {
            // console.log(e.detail)
            // console.log('picker发送选择改变，携带值为', e.detail.value)
            this.setData({
                regionName: e.detail.value,
                districtCode: e.detail.code[2]
            })
            this.triggerEvent('updateArea', {districtCode: this.data.districtCode}); 
        }
    }
})