import axios from '@/libs/api.request'

//获取所有终端类型
export const getTerminalTypesApi = (params) => {
    return axios.request({
        url: '/shop/terminalTypes',
        params,
        method: 'get'
    })
}

//新建终端
export const newTerminalOfTypeApi = (data) => {
    return axios.setPath('terminalType/{typeId}/newTerminal').replace(...data.uris).request({
        data: data.postData,
        method: 'post'
    })
}

//获取终端
export const getTerminalsOfTypeApi = (data) => {
    return axios.setPath('terminalType/{typeId}/terminals').replace(...data.uris).request({
        params: data.postData,
        method: 'get'
    })
}

//更新终端信息
export const updateTerminalApi = (data) => {
    return axios.request({
        url: '/terminal',
        data,
        method: 'put'
    })
}

//删除终端
export const delTerminalApi = (data) => {
    return axios.setPath('terminal/{terminalId}').replace(...data.uris).request({
        data: data.postData,
        method: 'delete'
    })
}
