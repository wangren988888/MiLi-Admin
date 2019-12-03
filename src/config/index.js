export default {
    /**
     * @description 配置显示在浏览器标签的title
     */
    title: 'MiLi Admin',
    /**
     * @description token在Cookie中存储的天数，默认1天
     */
    cookieExpires: 1,
    /**
     * @description 是否使用国际化，默认为false
     *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
     *              用来在菜单中显示文字
     */
    useI18n: true,
    /**
     * @description api请求基础路径
     */
    baseUrl: {
        // dev: 'http://webwr.natapp1.cc/semirToolsApis/admin/',
        dev: 'http://localhost:3001/admin/',
        pro: 'http://tools.semirapp.com/semirToolsApis/admin/'
    },
    //配置图片请求地址
    imgBaseUrl: {
        // dev: 'http://webwr.natapp1.cc/semirToolsApis',
        dev: 'http://localhost:3001',
        pro: 'http://tools.semirapp.com/semirToolsApis'
    },
    //配置预览的地址
    previewUrl: {
        dev: 'http://localhost:8081',
        pro: 'http://tools.semirapp.com/semirTools'
    },
    //配置发布时显示的二维码前缀地址
    issueUrl: {
        dev: 'http://webwr.natapp1.cc/semirTools/',
        pro: 'http://tools.semirapp.com/semirTools/'
    },
    /**
     * @description 默认打开的首页的路由name值，默认为home
     */
    homeName: 'home',
    /**
     * @description 需要加载的插件
     */
    plugin: {
        'error-store': {
            showInHeader: false, // 设为false后不会在顶部显示错误日志徽标
            developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
        }
    }
}
