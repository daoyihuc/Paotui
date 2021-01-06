// pages/order/order.js
import {getList,getcancel } from '../../api/order'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    list:[],
	cancen_show:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  onChange(event){
    this.setData({
      active: event.detail.index
    })
    this.getData();
  },

  getData(){
    getList({"type": this.data.active}).then(res => {
      this.setData({
        list: res
      }) 
    })
  },

cancel: function(e){
    // 传递的参数
	getcancel({"Oid": e.currentTarget.dataset['index'].id}).then(res => {
	  // this.setData({
	  //   list: res
	  // }) 
	  if(res.code==200)
	  this.setData({
	    cancen_show: 1
	  }) 
	   wx.showToast({
	       title: '退款成功',
	       icon: 'success',
	       duration: 2000//持续的时间
	  
	     })
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