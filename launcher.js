const ChildProcess = require('child_process');

module.exports = {
    powershell: function(spawnArguments = [], cwd = 'C:/') {
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
    docker: function() {
        let docker = ChildProcess.spawn(
            'C:/Program Files/Docker/Docker/Docker Desktop.exe',
            [],
            {
                detached: true
            }
        );
    }
}