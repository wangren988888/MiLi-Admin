import axios from 'axios'
import store from '@/store'
import {Message} from 'iview'
import {
    getToken,
    getBrowser,
    getOs
} from '@/libs/util'

const addErrorLog = errorInfo => {
    const {
        statusText,
        status,
        request: {
            responseURL
        }
    } = errorInfo;
    let info = {
        type: 'ajax',
        code: status,
        osInfo: getOs(),
        browserInfo: getBrowser().browser + '/' + getBrowser().version,
        mes: errorInfo.data.message ? errorInfo.data.message : statusText,
        url: responseURL
    }
    if (!responseURL.includes('save_error_logger')) {
        store.dispatch('addErrorLog', info);
    }
}

class HttpRequest {
    path = '';
    curPath = '';

    constructor(baseUrl = baseURL) {
        this.baseUrl = baseUrl;
        this.queue = {}

    }


    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            headers: {
                Authorization: 'Bearer ' + getToken()
            }
        };
        return config
    }

    destroy(url) {
        delete this.queue[url];
        if (!Object.keys(this.queue).length) {
            // Spin.hide()
        }
    }

    interceptors(instance, url) {
        // 请求拦截
        instance.interceptors.request.use(config => {
            // 添加全局的loading...
            // if (!Object.keys(this.queue).length) {
            // Spin.show() // 不建议开启，因为界面不友好
            // }

            if (process.env.VUE_APP_TYPE === 'cordova') {
                config.baseURL = store.getters.baseUrl;
            }
            this.queue[url] = true;
            return config;
        }, error => {
            return Promise.reject(error)
        })
        // 响应拦截
        instance.interceptors.response.use(response => {
            this.destroy(url);
            // console.log(response)
            if (response.data.code == 200) {
                return response;
            } else {
                Message.error({
                    duration: 5,
                    closable: true,
                    content: response.data.msg
                })
                return Promise.reject(response.data.msg)
            }

        }, error => {
            this.destroy(url);
            let errorInfo = error.response;
            if (!errorInfo) {
                const {
                    request: {
                        statusText,
                        status
                    },
                    config
                } = JSON.parse(JSON.stringify(error))
                errorInfo = {
                    statusText,
                    status,
                    request: {
                        responseURL: config.url
                    }
                }
            }
            addErrorLog(errorInfo);
            return Promise.reject(error)
        })
    }

    setPath(...paths) {
        this.curPath = `${this.path}/${paths.join('/')}`
        return this
    }

    replace(...params) {
        let count = 0
        this.curPath = this.curPath.replace(/\{.*?\}/g, _match => params[count++])
        return this
    }

    request(options) {
        const instance = axios.create();
        options = Object.assign(this.getInsideConfig(), options);
        if (this.curPath !== '') {
            options.url = this.curPath;
            this.curPath = '';
            this.path = '';
        }
        this.interceptors(instance, options.url);
        return instance(options);
    }
}

export default HttpRequest
