import create from '../../libs/create';
import store from '../../store/index';
import { onPay } from '../../utils/util';
import { getMoney, getBanner } from '../../api/app'
import { addOrder } from '../../api/order'
var add_list=1;
var arr=[];
var jian_arr=[];
var testob=[];

create(store, {
  use: ["order"],
  data: {
    bannerList:[],
    totalPrice: 0.0,
    add_list:1,
    order_add_list:'',
    add_arr:['1'],
    add_index:0,
    up_index:0,
    testobs:[]
  },
  
  onLoad: function () {
    getBanner().then(res =>{
      console.log(res);
      this.setData({
        bannerList: res
      })
    });
    getMoney({"number":add_list}).then(res => {
      this.setData({
        totalPrice: res
      })
    });
    var s={};
    s.value='添加'
    s.id=0;
    s.is_show=true;
    s.str='';
    testob.push(s);
    console.log("daoyi",testob.length);
    this.setData({
      testobs:testob
    })
  },
  onHide: function(){
    // wx.clearStorage();
    add_list=1;
    testob=[];
    var s={};
    s.value='添加'
    s.id=0;
    s.is_show=true;
    s.str='';
    testob.push(s);
    this.setData({
      testobs:testob
    });
    this.setData({
      bannerList:[],
      totalPrice: 0.0,
      // add_list:1,
      order_add_list:'',
      add_arr:[],
      add_index:0,
      up_index:0,
      testobs:testob
    });
    console.log(add_list);
  },
  onReady:function(){
    add_list=1;
    this.setData({
      bannerList:[],
      totalPrice: 0.0,
      // add_list:1,
      order_add_list:'',
      add_arr:[],
      add_index:0,
      up_index:0,
    });
    console.log(add_list);
  },
  onShow: function(){
    // add_list=2;
    console.log("daoyi",testob.length);
    getBanner().then(res =>{
      console.log(res);
      this.setData({
        bannerList: res
      })
    });
    getMoney({"number": testob.length}).then(res => {
      this.setData({
        totalPrice: res
      })
    });
  },
  /**
   * 添加取件码
   */
  add_tap(e){
   if(add_list==5){
     wx.showToast({
       title: '只能添加5个取件码',
       icon:'none'
     });
     for(var i=0;i<add_list;i++){
       if(i!=add_list-1){
         testob[i].value='删除'
         testob[i].is_show=false;
       }
     }
     this.setData({
       testobs:testob
     })
   }else{

     // if(testob.length==1){
     //   add_list++;
     // }

     var s={};
     for(var i=0;i<add_list;i++){
       if(testob.length==add_list){
         s.value='添加'
         s.id=add_list-1;
         s.is_show=true;
         s.str='';
         testob.push(s);

       }else{
         testob[i].value='删除'
         testob[i].is_show=false;
       }
     }
     for(var i=0;i<testob.length;i++){
       if(i!=testob.length-1){
         testob[i].value='删除'
         testob[i].is_show=false;
       }
     }
     add_list++;
     this.setData({
       testobs:testob
     })

    getMoney({"number": add_list}).then(res => {
      this.setData({
        totalPrice: res
      })
    });
   }

    console.log(this.data.add_index,)

  },
  /**
   * 填写取件码
   */
  add_one(e){
    //arr.push(e.detail.value);
    var id=e.currentTarget.dataset.index;
    testob[id].str=e.detail.value;
    console.log("daoyi",testob)
    
  },
/**
 * 减
 */
jian(e){
  Array.prototype.remove = function(v) {
    if(isNaN(v) || v > this.length){
      return false
    }
    for(let i = 0, j = 0; i < this.length; i++) {
      if(this[i] != this[v]){
        this[j++] = this[i]
      }
    }
    this.length -= 1
  }
  var id=e.currentTarget.dataset.index;
  // console.log('daoyi: id='+id+" value="+testob[id].value);

  if(testob.length>=1){
    if(testob[id].value=="删除"){
      testob.remove(id);
      add_list--;
    }
  }

  this.setData({
    testobs:testob
  });

  getMoney({"number": testob.length}).then(res => {
    this.setData({
      totalPrice: res
    })
  });
},
  inputNumber(event){
    console.log(event.detail.value);
    if (!event.detail.value || event.detail.value == 0) {
      return;
    }
    getMoney({"number": event.detail.value}).then(res => {
      this.setData({
        totalPrice: res
      })
    });
  },

  onSubmit(event) {
    console.log(event);
    var takeInfo = this.data.$.order.takeInfo;
    var receiveInfo = this.data.$.order.receiveInfo;
    // if (!event.detail.value.info) {
    //   return this.$message("请填写物品信息");
    // }
    // if (!event.detail.value.number) {
    //   return this.$message("请填写物品件数");
    // }
    // if (!event.detail.value.username) {
    //   return this.$message("请填写联系人");
    // }
    // if (!event.detail.value.mobile) {
    //   return this.$message("请填写联系电话");
    // }
    // if (event.detail.value.mobile.length != 11) {
    //   return this.$message("请填写正确的联系电话");
    // }
    if (!takeInfo) {
      return this.$message("请填写取件地址");
    }
    if (!receiveInfo) {
      return this.$message("请填写收货地址");
    }
    if (event.detail.value.agree.length == 0) {
      return this.$message("请勾选下单须知");
    }
    // if (!event.detail.value.remark) {
    //   return this.$message("请输入取件码或取件编号");
    // }

    if (!event.detail.value.text0) {
      return this.$message("请输入取件码或取件编号");
    }
    var subStr='';
    for(var i=0;i<testob.length;i++){
      subStr+=testob[i].str+' | ';
    }
    console.log('daoyi_codes',testob.length);
    getMoney({"number": testob.length}).then(res => {
      this.setData({
        totalPrice: res
      })
    });
    console.log('daoyi_money',this.data.totalPrice);

    var params = {
      "nickname": event.detail.value.username,
      "remarks": event.detail.value.remark+' | '+subStr,
      "take_province": takeInfo.province,
      "take_detailed": takeInfo.detail,
      "give_province": receiveInfo.province,
      "take_city": receiveInfo.city,
      "take_area": receiveInfo.area,
      "take_town": receiveInfo.town, 
      "take_detailed": receiveInfo.detail,
      "moeny": this.data.totalPrice,
      "number": testob.length,
      "addres_id": takeInfo.id,
      "address_id": receiveInfo.id,
      "title": event.detail.value.info,
      "type":1
    }
    addOrder(params).then(res => {
      this.$message("下单成功");
      this.setData({
        order_add_list:''
      })
      res.timeStamp = res.timeStamp + "";
      onPay(res);
    })
  },

  router(){
    console.log(111)
  },

  // onPullDownRefresh() {
    // add_list=1;
    // this.setData({
    //   add_list:1,
    //   order_add_list:''
    // });
    // testob=[];
    // // this.onLoad(getCurrentPages(getCurrentPages().length-1).options);
    // wx.stopPullDownRefresh()
  // },
})



