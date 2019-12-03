export default {
    name: 'Le nom',
    tel: 'Tél.',
    save: 'La conservation',
    confirm: 'La confirmation',
    cancel: 'La suppression des',
    delete: 'supprimé',
    complete: 'L’achèvement du',
    loading: 'En charge...',
    telEmpty: 'Veuillez remplir le numéro de téléphone',
    nameEmpty: 'Veuillez indiquer votre nom',
    confirmDelete: 'Est sûr qu’il doit être supprimé',
    telInvalid: 'Veuillez remplir le numéro de téléphone correct',
    vanContactCard: {
        addText: 'Ajouter un contact'
    },
    vanContactList: {
        addText: 'Nouveaux contacts'
    },
    vanPagination: {
        prev: 'Page précédente',
        next: 'Page suivante'
    },
    vanPullRefresh: {
        pulling: 'La mise à jour est possible en défilant...',
        loosing: 'Le lavage peut être effectué par relâchement...'
    },
    vanSubmitBar: {
        label: 'total：'
    },
    vanCoupon: {
        valid: 'Durée de validité',
        unlimited: 'Pas de seuil d’utilisation',
        discount: (discount) => `${discount}折`,
        condition: (condition) => `满${condition}元可用`
    },
    vanCouponCell: {
        title: '优惠券',
        tips: '使用优惠',
        count: (count) => `${count}张可用`
    },
    vanCouponList: {
        empty: '暂无优惠券',
        exchange: '兑换',
        close: '不使用优惠',
        enable: '可使用优惠券',
        disabled: '不可使用优惠券',
        placeholder: '请输入优惠码'
    },
    vanAddressEdit: {
        area: '地区',
        postal: '邮政编码',
        areaEmpty: '请选择地区',
        addressEmpty: '请填写详细地址',
        postalEmpty: '邮政编码格式不正确',
        defaultAddress: '设为默认收货地址',
        telPlaceholder: '收货人手机号',
        namePlaceholder: '收货人姓名',
        areaPlaceholder: '选择省 / 市 / 区'
    },
    vanAddressEditDetail: {
        label: '详细地址',
        placeholder: '街道门牌、楼层房间号等信息'
    },
    vanAddressList: {
        add: '新增地址'
    }
}
