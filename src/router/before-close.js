import { Modal } from 'iview'

const beforeClose = {
  before_close_normal: (resolve) => {
    Modal.confirm({
      title: '确定要关闭吗？',
      onOk: () => {
        resolve(true)
      },
      onCancel: () => {
        resolve(false)
      }
    })
  }
}

export default beforeClose
