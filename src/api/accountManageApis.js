import axios from '@/libs/api.request'

//获取所有用户
export const getUsersApi = (params) => {
    return axios.request({
        url: '/shop/users',
        params,
        method: 'get'
    })
}

//新增账户
export const addNewUserApi = (data) => {
    return axios.request({
        url: '/shop/newUser',
        data,
        method: 'post'
    })
}

//更新
export const updateUserApi = (data) => {
    return axios.request({
        url: '/user',
        data,
        method: 'put'
    })
}


//删除
export const delUserApi = (data) => {
    return axios.setPath('user/{userId}').replace(...data.uris).request({
        data: data.postData,
        method: 'delete'
    })
}
