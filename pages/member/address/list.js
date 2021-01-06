import create from '../../../libs/create';
import store from '../../../store/index';
import {getAddressList,delAddress} from '../../../api/address'

create(store, {

  use: ['order.receiveInfo'],

  data: {
    list:[],
    scenario:'110',
    is_show:false
  },
  

  onLoad: function (options) {
    // 0=取货 1==收货
    if(options.status==0){
      this.setData({
        scenario:"101",
        is_show:false
      });
    }else{
      this.setData({
        scenario:"102",
        is_show:true
      });
    }
    options && (this.status = options.status);
    console.log("当前type:"+options.status);
    getAddressList(options.status).then(res=>{
      for(var i=0;i<res.length;i++){
        console.log(res[i].name);
        if(res[i].name == "undefined" ){
          console.log(res[i].phone);
          if(options.status==1){
            res.splice(1,1);
          }
           
        }
      }
      this.setData({
        list:res
      })
      for(var i=0;i<res.length;i++){
        console.log(res[i].name);
      }
    })
  },

  onDelete(event){
    console.log(event);
    var id = event.currentTarget.dataset.id;
    wx.showModal({
      title: '温馨提示',
      content: '是否要删除改地址',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if(result.confirm){
          delAddress({addres_id: id}).then(res => {
            console.log(res);
            this.$message("删除成功");
            this.onLoad();
          });
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  onSelect(event) {
    if (!this.status) {
      return;
    }
    if (this.status == 0){
      store.order.setTakeInfo(this.data.list[event.currentTarget.dataset.index])
      this.$router({
        type: "back",
        pageData:{"$.order.takeInfo":this.data.list[event.currentTarget.dataset.index]}
      })
    } else {
      store.order.setReceiveInfo(this.data.list[event.currentTarget.dataset.index])
      this.$router({
        type: "back",
        pageData:{"$.order.receiveInfo":this.data.list[event.currentTarget.dataset.index]}
      })
    }
  },
})