import Mock from 'mockjs'
import { doCustomTimes, getParams } from '@/libs/util'

const Random = Mock.Random

export const getMessageInit = () => {
    let unreadList = []
    doCustomTimes(3, () => {
        unreadList.push(Mock.mock({
            title: Random.cword(10, 15),
            create_time: '@date',
            msg_id: Random.increment(100)
        }))
    })
    let readedList = []
    doCustomTimes(4, () => {
        readedList.push(Mock.mock({
            title: Random.cword(10, 15),
            create_time: '@date',
            msg_id: Random.increment(100)
        }))
    })
    let trashList = []
    doCustomTimes(2, () => {
        trashList.push(Mock.mock({
            title: Random.cword(10, 15),
            create_time: '@date',
            msg_id: Random.increment(100)
        }))
    })
    return {
        unread: unreadList,
        readed: readedList,
        trash: trashList
    }
}

export const getContentByMsgId = () => {
    return `<divcourier new',="" monospace;font-weight:="" normal;font-size:="" 12px;line-height:="" 18px;white-space:="" pre;"=""><div>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: medium;">这是消息内容，这个内容是使用<span style="color: rgb(255, 255, 255); background-color: rgb(28, 72, 127);">富文本编辑器</span>编辑的，所以你可以看到一些<span style="text-decoration-line: underline; font-style: italic; color: rgb(194, 79, 74);">格式</span></span></div><ol><li>你可以查看Mock返回的数据格式，和api请求的接口，来确定你的后端接口的开发</li><li>使用你的真实接口后，前端页面基本不需要修改即可满足基本需求</li><li>快来试试吧</li></ol><p>${Random.csentence(100, 200)}</p></divcourier>`
}

export const hasRead = () => {
    return true
}

export const removeReaded = () => {
    return true
}

export const restoreTrash = () => {
    return true
}

export const messageCount = () => {
    return {
        code: 200,
        count: 3
    }
}
//获取文章分类列表
export const getEssayClassifyList = () => {
    return {
        'code': 200,
        'message': '获取成功',
        'count': 1,
        'rows': [
            {
                'name': '测试分类',
                'id': 1,
                'createdAt': '2019-11-21T09:34:00.000Z',
                'essayNumber': 1
            },
            {
                'name': '测试分类2',
                'id': 2,
                'createdAt': '2019-11-21T09:34:00.000Z',
                'essayNumber': 2
            }
        ]
    }
}

const essayListData = [
    [
        {
            'id': 1,
            'title': '这项工作，习近平特别重视1',
            'subTitle': '文章描述1',
            'author': '人民日报客户端1',
            'content': '<div>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: medium;">这是消息内容，这个内容是使用<span style="color: rgb(255, 255, 255); background-color: rgb(28, 72, 127);">富文本编辑器</span>编辑的，所以你可以看到一些<span style="text-decoration-line: underline; font-style: italic; color: rgb(194, 79, 74);">格式</span></span></div><ol><li>你可以查看Mock返回的数据格式，和api请求的接口，来确定你的后端接口的开发</li><li>使用你的真实接口后，前端页面基本不需要修改即可满足基本需求</li><li>快来试试吧</li></ol>',
            'isDraft': 0,
            'createdAt': '2019-12-05T01:39:23.000Z',
            'classifyId': 1
        },
        {
            'id': 2,
            'title': '这项工作，习近平特别重视2',
            'subTitle': '文章描述2',
            'author': '人民日报客户端2',
            'content': '<div>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: medium;">这是消息内容，这个内容是使用<span style="color: rgb(255, 255, 255); background-color: rgb(28, 72, 127);">富文本编辑器</span>编辑的，所以你可以看到一些<span style="text-decoration-line: underline; font-style: italic; color: rgb(194, 79, 74);">格式</span></span></div><ol><li>你可以查看Mock返回的数据格式，和api请求的接口，来确定你的后端接口的开发</li><li>使用你的真实接口后，前端页面基本不需要修改即可满足基本需求</li><li>快来试试吧</li></ol>',
            'isDraft': 0,
            'createdAt': '2019-12-05T01:39:23.000Z',
            'classifyId': 1
        }
    ],
    [
        {
            'id': 3,
            'title': '这项工作，习近平特别重视3',
            'subTitle': '文章描述3',
            'author': '人民日报客户端3',
            'content': '<div>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: medium;">这是消息内容，这个内容是使用<span style="color: rgb(255, 255, 255); background-color: rgb(28, 72, 127);">富文本编辑器</span>编辑的，所以你可以看到一些<span style="text-decoration-line: underline; font-style: italic; color: rgb(194, 79, 74);">格式</span></span></div><ol><li>你可以查看Mock返回的数据格式，和api请求的接口，来确定你的后端接口的开发</li><li>使用你的真实接口后，前端页面基本不需要修改即可满足基本需求</li><li>快来试试吧</li></ol>',
            'isDraft': 0,
            'createdAt': '2019-12-05T01:39:23.000Z',
            'classifyId': 2
        },
        {
            'id': 4,
            'title': '这项工作，习近平特别重视4',
            'subTitle': '文章描述4',
            'author': '人民日报客户端4',
            'content': '<div>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: medium;">这是消息内容，这个内容是使用<span style="color: rgb(255, 255, 255); background-color: rgb(28, 72, 127);">富文本编辑器</span>编辑的，所以你可以看到一些<span style="text-decoration-line: underline; font-style: italic; color: rgb(194, 79, 74);">格式</span></span></div><ol><li>你可以查看Mock返回的数据格式，和api请求的接口，来确定你的后端接口的开发</li><li>使用你的真实接口后，前端页面基本不需要修改即可满足基本需求</li><li>快来试试吧</li></ol>',
            'isDraft': 0,
            'createdAt': '2019-12-05T01:39:23.000Z',
            'classifyId': 2
        }
    ]
]

//根据分类id获取文章列表
export const getEssayListForClassifyId = (req) => {
    const params = getParams(req.url)
    console.log(params)
    return {
        'code': 200,
        'message': '获取成功',
        'count': 1,
        'rows': essayListData[Number(params.classifyId)-1]
    }
}
