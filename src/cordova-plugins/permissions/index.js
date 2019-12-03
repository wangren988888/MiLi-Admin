let CordovaPermissionsManage = {
    checkPermission: (permission) => {
        if (!permission) throw new Error('No fruit!');
        return new Promise((resolve, reject) => {
            cordova.plugins.permissions.checkPermission(permission, (res) => {
                resolve(res)
            }, error => {
                reject(error)
            })
        })
    },
    requestPermission: (permission) => {
        if (!permission) throw new Error('No fruit!');
        return new Promise((resolve, reject) => {
            if (Array.isArray(permission)) {
                cordova.plugins.permissions.requestPermissions(permission, (res => {
                    resolve(res);
                }), error => {
                    reject(error);
                });
            } else {
                cordova.plugins.permissions.requestPermission(permission, (res => {
                    resolve(res);
                }), error => {
                    reject(error);
                });
            }
        })
    }
}
export default CordovaPermissionsManage;
