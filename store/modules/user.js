export const data = {
    userInfo: wx.getStorageSync('userInfo')
}

export function setUserInfo(userInfo) {
    data.userInfo=userInfo;
    wx.setStorageSync('userInfo', userInfo);
}

export function removeUserInfo() {
    data.userInfo='';
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('token');
}