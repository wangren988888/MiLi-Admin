import axios from '@/libs/api.request'

//调研型投票apis start

//获取
export const getVoteListApi = () => {
    return axios.request({
        url: 'vote/getVoteList',
        method: 'get'
    })
}

//创建
export const createdVoteApi = (data) => {
    return axios.request({
        url: 'vote/createdVote',
        data,
        method: 'post'
    })
}

//更新
export const updateVoteApi = (data) => {
    return axios.request({
        url: 'vote/updateVote',
        data,
        method: 'post'
    })
}

//修改状态
export const updateVoteStatusApi = (data) => {
    return axios.request({
        url: 'vote/updateVoteStatus',
        data,
        method: 'post'
    })
}

//查看结果
export const getVoteResultsApi = (params) => {
    return axios.request({
        url: 'vote/getVoteResults',
        params,
        method: 'get'
    })
}

//调研型投票apis end

//报名型投票apis start
//新增报名型投票
export const applyVoteCreatedApi = (data) => {
    return axios.request({
        url: 'vote/applyVoteCreated',
        data,
        method: 'post'
    })
}

//获取报名型投票
export const getApplyVoteListApi = (params) => {
    return axios.request({
        url: 'vote/getApplyVoteList',
        params,
        method: 'get'
    })
}

//更新报名型投票
export const updateApplyVoteApi = (data) => {
    return axios.request({
        url: 'vote/updateApplyVote',
        data,
        method: 'post'
    })
}

//更新报名型投票状态
export const updateApplyVoteStatusApi = (data) => {
    return axios.request({
        url: 'vote/updateApplyVoteStatus',
        data,
        method: 'post'
    })
}

//报名型投票apis end
