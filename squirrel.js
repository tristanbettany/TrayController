const { app } = require('electron')

module.exports = {
    handleSquirrelEvent: function() {
        if (process.argv.length === 1) {
            return false;
        }

        const ChildProcess = require('child_process');
        const path = require('path');

        const iconPath = path.resolve(path.join(__dirname, 'icon.ico'));
        const updateDotExe = path.resolve(path.join(__dirname, '..', '..', '..', 'Update.exe'));
        const exeName = path.basename(process.execPath);

        switch (process.argv[1]) {
            case '--squirrel-install':
            case '--squirrel-updated':
                ChildProcess.spawn(updateDotExe, [
                    '--createShortcut', exeName,
                    '--icon', iconPath,
                ], {detached: true});
                setTimeout(app.exit, 1000);

                return true;

            case '--squirrel-uninstall':
                ChildProcess.spawn(updateDotExe, [
                    '--removeShortcut', exeName,
                ], {detached: true});
                setTimeout(app.exit, 1000);

                return true;

            case '--squirrel-obsolete':
                app.exit();

                return true;
        }
    }
}