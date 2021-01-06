var amapFile = require('../../libs/amap-wx.js');
var config = require('../../config/index.js');

Page({
  data: {
    steps: {}
  },
  onLoad: function(options) {
    var that = this;
    var key = config.AMAP_KEY;
    var myAmapFun = new amapFile.AMapWX({key: key});
    wx.getLocation({
      type: 'wgs84',
      altitude: false,
      success: (res)=>{
        myAmapFun.getDrivingRoute({
          origin: `${res.longitude},${res.latitude}`,
          destination: `${options.longitude},${options.latitude}`,
          success: function(data){
            if(data.paths && data.paths[0] && data.paths[0].steps){
              that.setData({
                steps: data.paths[0].steps
              });
            }
              
          },
          fail: function(info){
    
          }
        })
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
})