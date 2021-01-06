export const data = {
    receiveInfo: "",
    takeInfo: "",
    orderCartList: "",
    note:"",
    totalPrice:"",
    totalQuantity:""
}

export function setReceiveInfo(info) {
    data.receiveInfo=info;
}

export function setTakeInfo(info) {
    data.takeInfo=info;
}

export function setOrderCartList(list) {
    data.orderCartList=list;
    calcAll();
}

export function setNote(info) {
    data.note=info;
}

function calcAll(){
    var _totalPrice = 0,
        _totalQuantity = 0;
    data.orderCartList.forEach(item=>{
        _totalPrice += parseFloat(item.productPrice) * parseInt(item.productQuantity);
        _totalQuantity += parseInt(item.productQuantity)
    })
    data.totalPrice = _totalPrice;
    data.totalQuantity = _totalQuantity;
}
