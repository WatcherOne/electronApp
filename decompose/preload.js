// 预加载脚本，在渲染器加载网页之前注入
// 可以通过 contextBridge 接口定义一些全局对象
// 进程间通信，可以使用 Electron 的 ipcMain 模块 和 ipcRenderer 模块 来进行进程间通信

const { contextBridge, ipcRenderer } = require('electron')

// 该脚本通过 versions 这一全局变量，将一些 process 内容暴露给渲染器
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    // 除了函数外，也可以暴露变量
    // 使用方式：不仅渲染器能全局访问 versions，也可以通过 window.versions 访问 -- versions.node()

    // 向渲染器添加一个 叫做ping()的全局函数
    // 使用 ipcRenderer.invoke 函数来触发 ping 监听器
    ping: () => ipcRenderer.invoke('ping')
})

contextBridge.exposeInMainWorld('systemConfig', {
    scheme: () => ipcRenderer.invoke('system-color')
})

contextBridge.exposeInMainWorld('func', {
    decompose: (...args) => ipcRenderer.invoke('decompose', ...args)
})
