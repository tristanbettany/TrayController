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
                                powershell(['./pillar.ps1 bash php80; exit'], store.get('pillar-path'))
                            }
                        },
                        {
                            label: 'php74',
                            click: () => {
                                powershell(['./pillar.ps1 bash php74; exit'], store.get('pillar-path'))
                            }
                        },
                        {
                            label: 'nginx',
                            click: () => {
                                powershell(['./pillar.ps1 bash nginx; exit'], store.get('pillar-path'))
                            }
                        },
                        {
                            label: 'node',
                            click: () => {
                                powershell(['./pillar.ps1 bash node; exit'], store.get('pillar-path'))
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
                        powershell(['./pillar.ps1 start; exit'], store.get('pillar-path'))
                    }
                },
                {
                    label: 'Stop',
                    click: () => {
                        powershell(['./pillar.ps1 stop; exit'], store.get('pillar-path'))
                    }
                },
                {
                    label: 'Restart',
                    click: () => {
                        powershell(['./pillar.ps1 restart; exit'], store.get('pillar-path'))
                    }
                },
                {
                    type: 'separator',
                },
                {
                    label: 'Build',
                    click: () => {
                        powershell(['./pillar.ps1 build; exit'], store.get('pillar-path'))
                    }
                },
                {
                    label: 'Remove',
                    click: () => {
                        powershell(['./pillar.ps1 remove; exit'], store.get('pillar-path'))
                    }
                },
                {
                    label: 'Rebuild',
                    click: () => {
                        powershell(['./pillar.ps1 rebuild; exit'], store.get('pillar-path'))
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

                ipcMain.on('close', (event) => {
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