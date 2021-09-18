const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    getStoreValue: (key) => {
        return ipcRenderer.sendSync('getStoreValue', key)
    },
    setStoreValue: (key, value) => {
        args = {
            key: key,
            value: value
        }
        return ipcRenderer.sendSync('setStoreValue', args)
    },
    close: () => {
        return ipcRenderer.sendSync('close')
    }
})