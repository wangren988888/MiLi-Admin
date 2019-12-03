import axios from '@/libs/api.request'

/*
* 文章分类
* 创建分类
* */
export const createdEssayClassifyApi = (data) => {
    return axios.request({
        url: 'essay/createdEssayClassify',
        data,
        method: 'post'
    })
}
/*
* 文章分类
* 列表获取
* */
export const getEssayClassifyListApi = (params) => {
    return axios.request({
        url: 'essay/getEssayClassifyList',
        params,
        method: 'get'
    })
}

/*
* 文章列表
* 列表获取
* */

export const getEssayListForClassifyIdApi = (params) => {
    return axios.request({
        url: 'essay/getEssayListForClassifyId',
        params,
        method: 'get'
    })
}

/*
* 文章新建
* */

export const createdEssayApi = (data) => {
    return axios.request({
        url: 'essay/createdEssay',
        data,
        method: 'post'
    })
}
/*
* 文章更新
* */
export const updateEssayApi = (data) => {
    return axios.request({
        url: 'essay/updateEssay',
        data,
        method: 'post'
    })
}

/*
* 删除文章
* */
export const delEssayApi = (data) => {
    return axios.request({
        url: 'essay/delEssay',
        data,
        method: 'post'
    })
}
