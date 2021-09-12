module.exports = {
    powershell: function(spawnArguments = [], cwd = 'C:/') {
        const ChildProcess = require('child_process');

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
    }
}