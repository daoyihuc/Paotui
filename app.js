//app.js
require('./utils/wx')
App({
  onLaunch: function () {
    this.appUpdateManager();
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    });
  },
  appUpdateManager: function() {
    if ("function" == typeof wx.getUpdateManager) {
      var e = wx.getUpdateManager();
      e.onCheckForUpdate(function (e) { }), e.onUpdateReady(function () {
        wx.showModal({
          title: "更新提示",
          content: "新版本已经准备好，是否重启应用？",
          success: function (t) {
            t.confirm && e.applyUpdate();
          }
        });
      }), e.onUpdateFailed(function () {
        wx.showModal({
          title: "更新提示",
          content: "新版本下载失败",
          showCancel: !1
        });
      });
    }
  },
  // route = Object.assign(getCurrentPages()[getCurrentPages().length-1],{routes: getCurrentPages()}),
  globalData: {
    userInfo: null
  }
})