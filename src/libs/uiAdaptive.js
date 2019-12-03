import store from '@/store'
import {Modal} from 'iview'
import {Dialog} from 'vant'


function myBeforeClose(action, done, onOk) {
    if (action === 'confirm') {
        onOk().then(res => {
            console.log(res);
            done()
        }).catch(err => {
            console.log(err);
            done();
        })
    } else {
        done();
    }
}

export const myConfirm = (config) => {
    if (store.state.app.screenType === 'big') {
        if (config.loading) {
            Modal.confirm({
                title: config.title,
                loading: config.loading,
                onOk: () => {
                    config.onOk().then(res => {
                        console.log(res);
                        Modal.remove()
                    }).catch(err => {
                        console.log(err);
                        Modal.remove();
                    })
                }
            })
        } else {
            Modal.confirm(config);
        }
    } else {
        if (config.loading) {
            Dialog.confirm({
                title: config.title,
                beforeClose: (action, done,) => {
                    myBeforeClose(action, done, config.onOk)
                }
            }).catch(err => {
                console.log(err);
            })
        } else {
            Dialog.confirm(config).then(() => {
                config.onOk().catch(err => {
                    console.log(err);
                });
            }).catch(() => {
                config.onCancel();
            })
        }
    }
}
