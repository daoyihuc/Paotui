import create from '../../libs/create';
import store from '../../store/index';
import {getUserInfo, getPhoneNumber} from '../../api/user'


create(store, {

  data:{

  },

  getUserInfo: function (res) {
    console.log(res);
    let _this = this;
    if (res.detail.errMsg == 'getUserInfo:fail auth deny') {
      this.message("授权失败！请稍后再试", "error")
      return;
    }
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.getUserInfo({
            success: function (res2) {
              res2.userInfo.avatar = res2.userInfo.avatarUrl;
              res2.userInfo.nickname = res2.userInfo.nickName;
              delete res2.userInfo.avatarUrl;
              delete res2.userInfo.nickName;
              let params = {
                // encryptedData: res2.encryptedData,
                // iv: res2.iv,
                code: res.code,
                ...res2.userInfo
              }
              getUserInfo(params).then(res3=> {
                console.log(res3);
                store.user.setUserInfo(res3.data.user_info);
                wx.setStorageSync("token", res3.data.token.value);
                wx.redirectTo({
                  url: '/pages/auth/auth',
                });
                // _this.$message({
                //   message:res3.message, 
                //   route:{
                //     type: 'back',
                //     pageData:{'$.user.userInfo':res3.data.userInfo}
                //   }
                // });
              });
            }
          })
        }
      }
    });
  },

  getPhoneNumber: function (res) {
    let params = {
      code: this.code,
      iv: res.detail.iv,
      encryptedData: encodeURIComponent(res.detail.encryptedData),
    };
    getPhoneNumber(params).then(res3=> {
      this.$message({
        message: "绑定成功", 
        route:{
          type: 'back'
        }
      });
      store.user.setUserInfo(res3);
    });
  },
  onShow(){
    var _this = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          _this.code = res.code;
        }
      }
    });
  }
})