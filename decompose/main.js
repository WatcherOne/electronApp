const { app, BrowserWindow, ipcMain, nativeTheme, Menu, Notification } = require('electron')
const path = require('path')
// const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')

// app 模块：控制着应用程序的事件生命周期
// BrowserWindow 模块：创建和管理应用程序窗口
// ** 虽然需要在开发环境安装 Node.js 才能编写 Electron 项目
//    但是 Electron 不使用系统的 Node.js 来运行代码，而是使用它内置的 Node.js 运行
//    则意味着终端用户不需要 Node.js 环境也可以运行你的应用

console.log(`欢迎来到 Electron 👏`)

const decompose = require('./decompose')

/**
 *  将 index.html 加载进一个新的 BrowserWindow 实例
 */
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // 将脚本附在渲染器上
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // 打开窗口调试
    win.webContents.openDevTools()
    win.loadFile('index.html')
}

// 在主进程设置 handle监听器，在html文件加载之前完成
// 通过 preload 将监听器触发执行 传入一个函数，再将函数 传给渲染器，则渲染器通过 ping 来执行监听
// 将发送器与接收器设置完成后，将信息通过定义的 ping 通道从渲染器发送至主进程中
ipcMain.handle('ping', () => 'pong')

ipcMain.handle('system-color', () => {
    // 判断系统是否使用深色配色方案
    // 如果使用则切换成两色配色方案
    if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = 'light'
    } else {
        nativeTheme.themeSource = 'dark'
    }
})

// 调用计算，其实也可以在JS中调用的
ipcMain.handle('decompose', (e, sum, howMany) => {
    return decompose(sum, howMany)
})

const NOTIFICATION_TITLE = 'Game is start'
const NOTIFICATION_BODY = 'This is a internal game'

const showNotification = () => {
    new Notification({
        title: NOTIFICATION_TITLE,
        body: NOTIFICATION_BODY
    }).show()
}

const dockMenu = Menu.buildFromTemplate([
    {
        label: 'New Window',
        click() {
            console.log('New window')
        }
    },
    {
        label: 'New Game',
        click() {
            createWindow()
            console.log('New Game')
        }
    }
])

// 只有 app 模块的 ready事件 被激发后才能创建浏览器窗口
// 通过 app.whenReady API 来监听此事件
app.whenReady().then(() => {
    // 设置dock菜单，只有macOS上可用
    if (process.platform === 'darwin') {
        app.dock.setMenu(dockMenu)
    }
}).then(() => {

    // installExtension(REACT_DEVELOPER_TOOLS)
    //     .then(name => console.log(`Added Extension: ${name}`))
    //     .catch(err => console.log(`An error occurred: ${err}`))

    createWindow()

    app.on('activate', () => {
        // 即使没有打开任何窗口，macOS应用通常也会继续运行，故没有窗口可用时调用app会打开一个新窗口
        // 否则没有窗口打开时，点击应用不会打开窗口
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
}).then(showNotification)

// 监听窗口被关闭时退出程序
app.on('window-all-closed', () => {
    // 不是 macOS 时，需要使用 app.quit() 来退出程序
    if (process.platform !== 'darwin') app.quit()
})

