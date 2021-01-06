import { data as app} from 'modules/app'
import { data as user, setUserInfo, removeUserInfo } from 'modules/user'
import { data as order, setReceiveInfo, setTakeInfo, setOrderCartList, setNote } from 'modules/order'
import { data as cart, selectProduct, selectAllProduct, setCartList, changeQuantity } from 'modules/cart'
import { data as product, setProductList, setRecommendList, setSearchList, setKeyword } from 'modules/product'

const store = {
  data:{
    app,
    user,
    order,
    cart,
    product
  },
  user: { setUserInfo, removeUserInfo },
  order: { setReceiveInfo, setTakeInfo,setOrderCartList, setNote },
  cart: { selectProduct, selectAllProduct, setCartList, changeQuantity },
  product: { setProductList, setRecommendList, setSearchList, setKeyword },
}

export default store