// pages/member/address/edit.js
import {getAddressDetail, saveAddress, delAddress, addresData} from '../../../api/address';
var status_d;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressAll: "",
    areaList: [],
    multiIndex: [],
    is_show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.is_who);
    status_d=options.is_who;
    if(options.is_who==101){
      this.setData({
        is_show:false
      });
    }else{
      this.setData({
        is_show:true
      });
    }

    options&&options.id&&(
      getAddressDetail(options.id).then(res => {
        this.setData({
          address: res.data,
          addressAll: res.data.province + res.data.city + res.data.area
        })
      }),
      this.setData({isEdit:!0})
      );
    addresData().then(res => {
      console.log(res);
      this.areaList = [res.province,res.city,res.area,res.town];
      var _areaList = [res.province,res.city,res.area,res.town];
      var id = 0;
      for (let index = 0; index < 4; index++) {
        if (index == 0) {
          id = this.areaList[index][0].id;
        }

        if (index === 3) {
          break;
        }
        _areaList[index + 1] = this.areaList[index+1].filter(item => item.pid === id);
        id = _areaList[index + 1].length != 0 ? _areaList[index + 1][0].id : 0;
      }
      this.setData({
        areaList: _areaList
      });
    });
  },

  onSubmit: function (event)  {
    var event = event.detail.value;
    if(status_d==102){
      if (!event.name) {
        return this.$message("请输入联系人");
      }
       
      if (!event.mobile) {
        return this.$message("请输入联系电话");
      }
      
    if (event.mobile.length != 11) {
      return this.$message("请输入正确的联系电话");
    }
    }
  
    if (!event.address) {
      return this.$message("请选择省市区");
    }
    if (!event.detailAddress) {
      return this.$message("请输入详细地址");
    }
    var address = {};
    address.name = event.name;
    address.phone = event.mobile;
    address.detailed = event.detailAddress;
    address.is_default = event.default;

    if(status_d==102){
      address.type=1;
    }else{
      address.type=0;
    }

    var val = this.data.multiIndex;
    if (val[3] == -1) {
      return this.$message("请选择正确地址");
    }
    address.province = this.data.areaList[0][val[0]].id;
    address.city = this.data.areaList[1][val[1]].id;
    address.area = this.data.areaList[2][val[2]].id;
    address.town = val[3] != -1 ? this.data.areaList[3][val[3]].id : "";

    saveAddress(address).then(res => {
      console.log(res);
      this.$message({
        message: "成功",
        route: {
          type: "back",
          refresh: true
        }
      });
    })
  },

  bindMultiPickerColumnChange(event){
    var column = event.detail.column;
    var value = event.detail.value;
    console.log(event);
    if (column === 3) {
      return;
    }
    var areaList = this.data.areaList;
    var id = 0;
    for (let index = column; index < 4; index++) {
      if (index == column) {
        id = this.data.areaList[index][value].id;
      }

      if (index === 3) {
        break;
      }
      areaList[index + 1] = this.areaList[index+1].filter(item => item.pid === id);
      id = areaList[index + 1].length !=0 ? areaList[index + 1][0].id : 0;
    }
    this.setData({
      areaList: areaList
    });
  },

  bindMultiPickerChange(event){
    var val = event.detail.value;
    console.log(val);
    if (!this.data.areaList[3][val[3]]) {
      val[3] = -1;
    }
    if (this.data.areaList[3][val[3]] && this.data.areaList[2][val[2]].id !==  this.data.areaList[3][val[3]].pid) {
      val[3] = -1;
    }
    // for (let index = 0; index < event.detail.value.length; index++) {
    //   const element = event.detail.value[index];
    //   if (index != 0) {
    //     if (element === 0 && this.areaList[index][element].pid !==  this.areaList[index - 1][element].id) {
    //       console.log(this.areaList[index][element].pid);
    //       console.log(this.areaList[index - 1][element].id);
    //       val[index] = -1;
    //     }
    //   }
    // }
    console.log(val);
    var town = val[3] == -1 ? "" : this.areaList[3][val[3]].name;
    this.setData({
      addressAll: this.data.areaList[0][val[0]].name + this.data.areaList[1][val[1]].name + this.data.areaList[2][val[2]].name + town,
      multiIndex: val
    })
  },

  onDelete(){
    delAddress(this.data.address).then(res => {
      this.$message({
        message: "已删除",
        route: {
          type: "back",
          refresh: true
        }
      });
    }); 
  },

  onTag: function (event)  {
    this.setData({
      tag:event.currentTarget.dataset.tag
    })
  },
})