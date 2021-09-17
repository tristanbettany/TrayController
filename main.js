const { app, Menu, Tray, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { handleSquirrelEvent } = require ('./squirrel.js')
const { powershell, docker } = require ('./launcher.js')
const Store = require('electron-store');

if (require('electron-squirrel-startup')) {
    handleSquirrelEvent()
}

let tray = null

function boot() {

    const hiddenWin = new BrowserWindow({
        width: 100,
        height: 100,
        show: false,
        frame: false,
        webPreferences: {
            nativeWindowOpen: true,
        }
    })

    const store = new Store();

    ipcMain.on('getStoreValue', (event, key) => {
        event.returnValue = store.get(key);
    });

    ipcMain.on('setStoreValue', (event, args) => {
        store.set(args.key, args.value);
        event.returnValue = store.get(args.key);
    });

    tray = new Tray(path.join(__dirname, 'icon.png'))

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Pillar',
            submenu: [
                {
                    label: 'Containers',
                    submenu: [
                        {
                            label: 'php80',
                            click: () => {
                                powershell(['./pillar.ps1 bash php80; exit'], 'D:/Pillar')
                            }
                        },
                        {
                            label: 'php74',
                            click: () => {
                                powershell(['./pillar.ps1 bash php74; exit'], 'D:/Pillar')
                            }
                        },
                        {
                            label: 'nginx',
                            click: () => {
                                powershell(['./pillar.ps1 bash nginx; exit'], 'D:/Pillar')
                            }
                        },
                        {
                            label: 'node',
                            click: () => {
                                powershell(['./pillar.ps1 bash node; exit'], 'D:/Pillar')
                            }
                        }
                    ]
                },
                {
                    type: 'separator',
                },
                {
                    label: 'Start',
                    click: () => {
                        powershell(['./pillar.ps1 start; exit'], 'D:/Pillar')
                    }
                },
                {
                    label: 'Stop',
                    click: () => {
                        powershell(['./pillar.ps1 stop; exit'], 'D:/Pillar')
                    }
                },
                {
                    label: 'Restart',
                    click: () => {
                        powershell(['./pillar.ps1 restart; exit'], 'D:/Pillar')
                    }
                },
                {
                    type: 'separator',
                },
                {
                    label: 'Build',
                    click: () => {
                        powershell(['./pillar.ps1 build; exit'], 'D:/Pillar')
                    }
                },
                {
                    label: 'Remove',
                    click: () => {
                        powershell(['./pillar.ps1 remove; exit'], 'D:/Pillar')
                    }
                },
                {
                    label: 'Rebuild',
                    click: () => {
                        powershell(['./pillar.ps1 rebuild; exit'], 'D:/Pillar')
                    }
                },
                {
                    type: 'separator',
                },
                {
                    label: 'Docker',
                    click: () => {
                        docker()
                    }
                }
            ]
        },
        {
            type: 'separator',
        },
        {
            label: 'Settings',
            click: () => {
                const settingsWindow = new BrowserWindow({
                    width: 800,
                    height: 400,
                    show: true,
                    frame: false,
                    webPreferences: {
                        nativeWindowOpen: true,
                        preload: path.join(__dirname, 'renderer/preload.js')
                    }
                })
                settingsWindow.setMenu(null)
                settingsWindow.loadFile(path.join(__dirname, 'renderer/settings.html'))

                ipcMain.on('cancel', (event) => {
                    settingsWindow.destroy()
                });
            }
        },
        {
            label: 'Quit',
            click: () => {
                app.exit()
            }
        },
    ])

    tray.setToolTip('Tray Controller')
    tray.setContextMenu(contextMenu)
}

app.on('ready', boot)