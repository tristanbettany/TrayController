const { app, Menu, Tray } = require('electron')
const path = require('path')
const { handleSquirrelEvent } = require ('./squirrel.js')
const { powershell } = require ('./powershell.js')

if (require('electron-squirrel-startup')) {
    handleSquirrelEvent()
}

let tray = null

function boot() {

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
                }
            ]
        },
        {
            type: 'separator',
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