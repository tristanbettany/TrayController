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

    // Init vars

    const hiddenWin = new BrowserWindow({
        width: 100,
        height: 100,
        show: false,
        frame: false,
        webPreferences: {
            nativeWindowOpen: true,
        }
    })

    let settingsWindow = null
    const store = new Store();
    tray = new Tray(path.join(__dirname, 'icon.png'))

    // Helper Methods

    let isPillarEnabled = () => {
        let pillarPath = store.get('pillar-path')

        return pillarPath !== undefined
            && pillarPath !== null
            && pillarPath !== ''
    }

    let isProjectEnabled = () => {
        let projectFolder = store.get('project-folder')
        let projectContainer = store.get('project-container')

        return projectFolder !== undefined
            && projectFolder !== null
            && projectFolder !== ''
            && projectContainer !== undefined
            && projectContainer !== null
            && projectContainer !== ''
    }

    // Build Tray

    let contextMenu = Menu.buildFromTemplate([
        {
            label: 'Pillar',
            enabled: isPillarEnabled(),
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
                    label: 'Current Project',
                    enabled: isProjectEnabled(),
                    submenu: [
                        {
                            label: 'Bash',
                            click: () => {
                                powershell(['./pillar.ps1 project-bash '+ store.get('project-container') +' '+ store.get('project-folder') +'; exit'], store.get('pillar-path'))
                            }
                        },
                        {
                            label: 'Composer Install',
                            click: () => {
                                powershell(['./pillar.ps1 composer-install '+ store.get('project-container') +' '+ store.get('project-folder') +'; exit'], store.get('pillar-path'))
                            }
                        },
                        {
                            label: 'Composer Update',
                            click: () => {
                                powershell(['./pillar.ps1 composer-update '+ store.get('project-container') +' '+ store.get('project-folder') +'; exit'], store.get('pillar-path'))
                            }
                        },
                        {
                            label: 'Composer Dump Autoload',
                            click: () => {
                                powershell(['./pillar.ps1 composer-dump '+ store.get('project-container') +' '+ store.get('project-folder') +'; exit'], store.get('pillar-path'))
                            }
                        },
                        {
                            label: 'Test',
                            click: () => {
                                powershell(['./pillar.ps1 test '+ store.get('project-container') +' '+ store.get('project-folder') +'; exit'], store.get('pillar-path'))
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
                // Anything to do with the settings window

                let createWindow = () => {
                    settingsWindow = new BrowserWindow({
                        width: 1200,
                        height: 700,
                        show: false,
                        fullscreenable: false,
                        maximizable: false,
                        minimizable: false,
                        webPreferences: {
                            nativeWindowOpen: true,
                            preload: path.join(__dirname, 'renderer/preload.js')
                        }
                    })
                    settingsWindow.setMenu(null)
                    settingsWindow.loadFile(path.join(__dirname, 'renderer/settings.html'))
                    settingsWindow.show()
                    //settingsWindow.openDevTools()

                    settingsWindow.on('will-resize', (e) => {
                        e.preventDefault();
                    });

                    ipcMain.on('close', (event) => {
                        settingsWindow.destroy()
                    });
                }

                if (settingsWindow === null) {
                    createWindow()
                } else {
                    if (settingsWindow.isDestroyed() === true) {
                        createWindow()
                    } else {
                        settingsWindow.focus()
                    }
                }
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

    // Events

    ipcMain.on('getStoreValue', (event, key) => {
        event.returnValue = store.get(key);
    });

    ipcMain.on('setStoreValue', (event, args) => {
        store.set(args.key, args.value);
        event.returnValue = store.get(args.key);
    });

    tray.on('mouse-move', (event, position) => {
        contextMenu.items[0].enabled = isPillarEnabled()
        contextMenu.items[0].submenu.items[1].enabled = isProjectEnabled()

        tray.setContextMenu(contextMenu)
    });
}

app.on('ready', boot)