import axios from '@/libs/api.request'

//获取所有支付方式
export const getTaxesApi = (params) => {
    return axios.request({
        url: '/shop/taxes',
        params,
        method: 'get'
    })
}

//更新
export const updateTaxApi = (data) => {
    return axios.request({
        url: '/tax',
        data,
        method: 'put'
    })
}


//新增
export const addNewTaxApi = (data) => {
    return axios.request({
        url: '/shop/newTax',
        data,
        method: 'post'
    })
}

//删除
export const delTaxApi = (data) => {
    return axios.setPath('tax/{taxId}').replace(...data.uris).request({
        data: data.postData,
        method: 'delete'
    })
}

