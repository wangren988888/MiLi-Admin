import { getParams } from '@/libs/util'

const USER_MAP = {
    super_admin: {
        userName: 'super_admin',
        user_id: '1',
        permission: [],
        token: 'super_admin',
        avatarImgPath: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
    },
    admin: {
        userName: 'admin',
        user_id: '2',
        permission: [],
        token: 'admin',
        avatarImgPath: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
    }
}

export const login = req => {
    req = JSON.parse(req.body)
    return {
        token: USER_MAP[req.userName].token,
        code: 200
    }
}

export const getUserInfo = req => {
    const params = getParams(req.url)
    return {
        code: 200,
        userInfo: USER_MAP[params.token]
    }
}

export const logout = req => {
    return {
        code: 200
    }
}
