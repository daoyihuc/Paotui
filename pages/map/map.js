// pages/map/map.js
var amapFile = require('../../libs/amap-wx');//如：..­/..­/libs/amap-wx.js
var config = require('../../config/index.js');
var myAmapFun;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "../../static/images/map/map.png",
      id: 0,
      latitude: 39.989643,
      longitude: 116.481028,
      width: 23,
      height: 33
    },{
      iconPath: "../../static/images/map/end.png",
      id: 0,
      latitude: 39.90816,
      longitude: 116.434446,
      width: 24,
      height: 34
    }],
    distance: '',
    cost: '',
    polyline: [],
    centerX: "",
    centerY: "",
    myAmapFun: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var key = config.AMAP_KEY;
    myAmapFun = new amapFile.AMapWX({key: "2bebce8bb1bd74910edf6a1e75987b20"});
    myAmapFun.getPoiAround({
      success: function(data){
        //成功回调
        console.log(data);
      },
      fail: function(info){
        //失败回调
        console.log(info)
      }
    });
    var address = options.address;
    wx.request({
      //acae482f60b6d25e816e11e7719ac28c
      // 2bebce8bb1bd74910edf6a1e75987b20
      url: `https://restapi.amap.com/v3/geocode/geo?address=${address}&key=acae482f60b6d25e816e11e7719ac28c`,
      success: (result)=>{
        console.log(result);
        var location = result.data.geocodes[0].location.split(",");
        console.log(location);
        this.longitude2 = Number(location[0]);
        this.latitude2 = Number(location[1]);
        wx.startLocationUpdateBackground({
          success: (res) => {
            wx.onLocationChange((res) => {
              this.genMap(res.longitude,res.latitude);
            })
          },
          fail: (res) => {
            wx.getLocation({
              type: 'wgs84',
              altitude: false,
              success: (res)=>{
                console.log(res);
                this.genMap(res.longitude,res.latitude);
              },
              fail: ()=>{},
              complete: ()=>{}
            });
          }
        })
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  
  genMap: function(longitude,latitude){
    var longitude2 = this.longitude2;
    var latitude2 = this.latitude2;
    var that = this;
    myAmapFun.getDrivingRoute({
      origin: `${longitude},${latitude}`,
      destination: `${longitude2},${latitude2}`,
      success: function(data){
        var points = [];
        if(data.paths && data.paths[0] && data.paths[0].steps){
          var steps = data.paths[0].steps;
          for(var i = 0; i < steps.length; i++){
            var poLen = steps[i].polyline.split(';');
            for(var j = 0;j < poLen.length; j++){
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            } 
          }
        }
        that.setData({
          ["markers[0].latitude"]: latitude,
          ["markers[0].longitude"]: longitude,
          ["markers[1].latitude"]: latitude2,
          ["markers[1].longitude"]: longitude2,
          centerX: Number((latitude + latitude2) / 2),
          centery: Number((longitude + longitude2) / 2),
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
        if(data.paths[0] && data.paths[0].distance){
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if(data.taxi_cost){
          that.setData({
            cost: '打车约' + parseInt(data.taxi_cost) + '元'
          });
        }
          
      },
      fail: function(info){

      }
    })
  },

  showDetail(){
    // wx.navigateTo({
    //   url: `./detail?latitude=${this.latitude2}&longitude=${this.longitude2}`,
    // });
    wx.openLocation({    //微信方法
      latitude: parseFloat(this.latitude2),     //经纬度
      longitude: parseFloat(this.longitude2),
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})