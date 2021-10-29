const ChildProcess = require('child_process');
const { shell } = require('electron');

module.exports = {
    powershell: (spawnArguments = [], cwd = 'C:/') => {
        let defaultPowerShellArguments = [
            '-ExecutionPolicy',
            'Bypass',
            '-NoExit'
        ];

        let powershell = ChildProcess.spawn(
            'powershell.exe',
            [
                ...defaultPowerShellArguments,
                ...spawnArguments
            ],
            {
                shell: true,
                detached: true,
                cwd: cwd
            }
        );
    },
    terminal: (spawnArguments = [], cwd = 'C:/') => {
        let wt = ChildProcess.spawn(
            'wt.exe new-tab PowerShell',
            [
                ...spawnArguments
            ],
            {
                shell: true,
                detached: true,
                cwd: cwd
            }
        );
    },
    docker: () => {
        let docker = ChildProcess.spawn(
            'C:/Program Files/Docker/Docker/Docker Desktop.exe',
            [],
            {
                detached: true
            }
        );
    },
    explorer: (path) => {
        shell.openPath(path)
    },
    chrome: (url) => {
        let chrome = ChildProcess.spawn(
            'C:/Program Files/Google/Chrome/Application/chrome.exe',
            [
                url
            ],
            {
                detached: true
            }
        );
    }
}