const { app, Menu, Tray, shell } = require('electron')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const { handleSquirrelEvent } = require ('./squirrel.js')
const ChildProcess = require('child_process');

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

                        let spawnArguments = ['pwd'];
                        let defaultPowerShellArguments = ["-ExecutionPolicy", "Bypass", "-NoExit",];
                        let powershell = ChildProcess.spawn('powershell.exe', [...defaultPowerShellArguments, ...spawnArguments], {
                            shell: true,
                            detached: true,
                            cwd: 'D:/Work'
                        });

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