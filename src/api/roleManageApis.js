import axios from '@/libs/api.request'

//获取路由列表
export const getFunctionsApi = (params) => {
    return axios.request({
        url: '/shop/functions',
        params,
        method: 'get'
    })
}

//获取所有角色
export const getRolesApi = (params) => {
    return axios.request({
        url: '/shop/roles',
        params,
        method: 'get'
    })
}

//新增角色
export const addNewRoleApi = (data) => {
    return axios.request({
        url: '/shop/newRole',
        data,
        method: 'post'
    })
}

//更新
export const updateRoleApi = (data) => {
    return axios.request({
        url: '/role',
        data,
        method: 'put'
    })
}


//删除
export const delRoleApi = (data) => {
    return axios.setPath('role/{roleId}').replace(...data.uris).request({
        data: data.postData,
        method: 'delete'
    })
}
