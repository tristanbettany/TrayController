const { app, Menu, Tray, shell } = require('electron')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const { handleSquirrelEvent } = require ('./squirrel.js')

if (require('electron-squirrel-startup')) {
    handleSquirrelEvent()
}

let tray = null

function boot() {

    tray = new Tray(path.join(__dirname, 'icon.png'), uuidv4())

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Open CLI',
            click: () => {
                shell.openPath(path.join(__dirname, 'scripts/cli.ps1'))
            }
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