
export const data = {
    productList:[],
    recommendList:[],
    keyword:"",
    searchList: []
}

export function setProductList(list) {
    data.productList=list;
}

export function setRecommendList(list) {
    data.recommendList=list;
}

export function setSearchList(list) {
    data.searchList=list;
}

export function setKeyword(info) {
    data.keyword=info;
}