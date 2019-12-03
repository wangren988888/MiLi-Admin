let CordovaFileManage = {
    initFile: (type, size) => {
        return new Promise((resolve, reject) => {
            window.requestFileSystem(type ? type : LocalFileSystem.PERSISTENT, size ? size : 5 * 1024 * 1024, function (fs) {
                resolve(fs);
                // fs.root.getFile(fileName ? fileName : 'weShopXAdmin.ini', {
                //     create: true,
                //     exclusive: false
                // }, res => {
                //     console.log(res);
                //     resolve(res);
                // }, error => {
                //     reject(error)
                // });

            }, function (error) {
                reject(error)
            });
        })
    },
    readFile: (fileEntry) => {
        return new Promise((resolve, reject) => {
            fileEntry.file(file => {
                let reader = new FileReader();
                reader.onloadend = function () {
                    console.log("Successful file read: " + this.result);
                    resolve(this.result);
                };
                reader.readAsText(file);
            }, error => {
                console.log(error);
                reject(error);
            })
        })
    },
    writeFile: (fileEntry, data, isAppend) => {
        return new Promise((resolve, reject) => {
            fileEntry.createWriter(function (fileWriter) {
                fileWriter.onwriteend = function () {
                    resolve('ok');
                };

                fileWriter.onerror = function (e) {
                    reject(e);
                };

                // If we are appending data to file, go to the end of the file.
                if (isAppend) {
                    try {
                        fileWriter.seek(fileWriter.length);
                    } catch (e) {
                        console.log("file doesn't exist!");
                    }
                }
                // if (!data) {
                //     data = new Blob(['[init]'], {type: 'text/plain'});
                // }
                fileWriter.write(data);
            }, function (err) {
                reject(err);
            });
        })
    },
    createFile: (dirEntry, fileName, isAppend) => {
        return new Promise((resolve, reject) => {
            dirEntry.getFile(fileName, {create: true, exclusive: false}, function (fileEntry) {
                // CordovaFileManage.writeFile(fileEntry, '', isAppend).then(res => {
                //     resolve(res);
                // })
                resolve(res);
            }, err => {
                reject(err);
            });
        })


    }
}
export default CordovaFileManage;
