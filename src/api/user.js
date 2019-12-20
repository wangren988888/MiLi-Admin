import axios from '@/libs/api.request'
import config from '@/config'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

export const loginApi = ({userName, password}) => {
    const data = {
        userName,
        password
    }
    return axios.request({
        url: 'login',
        data,
        method: 'post'
    })
}


export const getUserListApi = (params) => {
    return axios.request({
        url: 'getUserList',
        params,
        method: 'get'
    })
}

export const getUserInfoApi = () => {
    return axios.request({
        url: 'getUserInfo?token=super_admin',
        method: 'get'
    })
}


/*
 * 新增或更新用户
 * */
export const creatOrUpdateUserApi = (data) => {
    return axios.request({
        url: 'creatOrUpdateUser',
        data,
        method: 'post'
    })
}

/*
 * 删除用户
 * */
export const deleteUserApi = (data) => {
    return axios.request({
        url: 'deleteUser',
        data,
        method: 'post'
    })
}

//上传图片
export const uploadImageApi = baseUrl + 'uploadImage';


export const logout = (token) => {
    return axios.request({
        url: 'logout',
        method: 'post'
    })
}

export const saveAdminErrorApi = (data) => {
    return axios.request({
        url: 'saveAdminError',
        data,
        method: 'post'
    })
}

export const getAdminErrorApi = (params) => {
    return axios.request({
        url: 'getAdminError',
        params,
        method: 'get'
    })
}


//获取应用列表
export const getAppListApi = (params) => {
    return axios.request({
        url: 'getAppList',
        params,
        method: 'get'
    })
}

//新建应用
export const creatOrUpdateAppApi = (data) => {
    return axios.request({
        url: 'creatOrUpdateApp',
        data,
        method: 'post'
    })
}


export const getUnreadCount = () => {
    return axios.request({
        url: 'message/count',
        method: 'get'
    })
}

export const getMessage = () => {
    return axios.request({
        url: 'message/init',
        method: 'get'
    })
}

export const getContentByMsgId = msg_id => {
    return axios.request({
        url: 'message/content',
        method: 'get',
        params: {
            msg_id
        }
    })
}

export const hasRead = msg_id => {
    return axios.request({
        url: 'message/has_read',
        method: 'post',
        data: {
            msg_id
        }
    })
}

export const removeReaded = msg_id => {
    return axios.request({
        url: 'message/remove_readed',
        method: 'post',
        data: {
            msg_id
        }
    })
}

export const restoreTrash = msg_id => {
    return axios.request({
        url: 'message/restore',
        method: 'post',
        data: {
            msg_id
        }
    })
}
