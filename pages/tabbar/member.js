const app = getApp();
import create from '../../libs/create';
import store from '../../store/index';
var util = require("../../utils/util");
import {getContactPhone} from '../../api/app';

create(store, {
  use:[
    'user'
  ],

  data:{

  },

  onLoad: function (options) {
    getContactPhone().then(res => {
      this.phone = res;
    });
  },

  onShow(event) {
    
  },

  onCall(){
    util.onCall(this.phone)
  },

  changeSend(){
    this.$router({path:"/pages/send/send",query:{}});
  },

  onForward(){
    this.$message("敬请期待")
  }
})