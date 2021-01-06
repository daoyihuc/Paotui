
export const data = {
    cartList: [],
    totalPrice: '',
    totalQuantity: ''
}

export function selectProduct(index) {
    var _cartList = data.cartList;
    _cartList[index].checked = !_cartList[index].checked ? !0 : !1
    setCartList(_cartList)
    calcTotal();
}

export function selectAllProduct(checked) {
    var _cartList = data.cartList;
    _cartList.forEach((item, index, arr) => {
        arr[index].checked = checked
    })
    setCartList(_cartList);
    calcTotal();
}

export function changeQuantity(index, quantity) {
    var _cartList = data.cartList;
    _cartList[index].productQuantity = quantity
    setCartList(_cartList);
    calcTotal();
}

export function setCartList(list) {
    data.cartList = list;
    wx.setStorageSync('cartList', list);
}

function calcTotal() {
    var _totalPrice = 0,
        _totalQuantity = 0;
    data.cartList.forEach(item => {
        if (item.checked) {
            _totalPrice += parseFloat(item.productPrice) * parseInt(item.productQuantity);
            _totalQuantity += parseInt(item.productQuantity)
        }
    })
    data.totalPrice = _totalPrice;
    data.totalQuantity = _totalQuantity;
    wx.setStorageSync('totalPrice',_totalPrice);
    wx.setStorageSync('totalQuantity',_totalQuantity);
}