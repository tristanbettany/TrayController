const { app, Menu, Tray } = require('electron')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const { handleSquirrelEvent } = require ('./squirrel.js')
const { powershell } = require ('./powershell.js')


if (require('electron-squirrel-startup')) {
    handleSquirrelEvent()
}

let tray = null

function boot() {

    tray = new Tray(path.join(__dirname, 'icon.png'), uuidv4())

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Pillar',
            submenu: [
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