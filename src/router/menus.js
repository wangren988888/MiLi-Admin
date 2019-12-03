import Main from '@/components/main'

export default [
    {
        path: '/essay_manage',
        name: 'essay_manage',
        component: Main,
        meta: {
            notCache: true,
            title: '图文管理',
            icon: 'ios-book'
        },
        children: [
            {
                path: 'essay_sort',
                name: 'essay_sort',
                meta: {
                    notCache: true,
                    title: '图文分类'
                },
                component: () => import('@/view/EssayManage/ClassifyManage/index.vue')
            },
            {
                path: 'essay_list',
                name: 'essay_list',
                meta: {
                    notCache: true,
                    title: '图文列表'
                },
                component: () => import('@/view/EssayManage/EssayList/index.vue')
            },
        ]
    },
    {
        path: '/edit_essay',
        name: 'edit_essay',
        meta: {
            hideInMenu: true
        },
        component: Main,
        children: [
            {
                path: 'new_essay/:title',
                name: 'new_essay',
                meta: {
                    notCache: true,
                    title: route => `{{ new_essay }}-${route.params.title}`,
                    beforeCloseName: 'before_close_normal'
                },
                component: () => import('@/view/EssayManage/NewEssay/index.vue')
            }
        ]
    }
]
