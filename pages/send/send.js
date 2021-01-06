// pages/send/send.js
import {getRunOrderList, getSuccess, sendSuccess} from '../../api/order';
import {onCall} from '../../utils/util';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0
  },

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    list:[]
  },
copy:function(e){
	wx.setClipboardData({
	
	    data: e.currentTarget.dataset['index'],
	
	    success: function (res) {
	
	      wx.getClipboardData({
	
	        success: function (res) {
	
	          console.log(res.data) // data
	
	        }
	
	      })
	
	    }
	
	  })
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
    getRunOrderList({"type": this.data.active}).then(res => {
      this.setData({
        list: res
      }) 
    })
  },

  onSuccess(event){
    var item = event.currentTarget.dataset.item;
    if (this.data.active == 0) {
      getSuccess({"order_id": item.id}).then(res => {
        this.$message("已取件");
        this.onLoad();
      })
    } else {
      sendSuccess({"order_id": item.id}).then(res => {
        this.$message("已送到");
        this.onLoad();
      })
    }
  },

  onCall(event){
    var item = event.currentTarget.dataset.item;
    if (this.data.active == 0) {
      onCall(item.give.phone);
    } else {
      onCall(item.take.phone);
    }
  },
})