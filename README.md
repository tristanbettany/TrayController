# Tray Controller

## Building

Make sure you have node and npm installed, clone the repo and then, in the root of the repo, run from powershell:

```
npm install
npm run make
```

Inside the `out` folder you will find the installer exe. Install the application like you would any other.
Shortcuts will be added to your desktop and start menu, and an un-installer in add-remove programs.

## Cross platform notes

### Windows

This app executes powershell scripts and for this to work you need to open powershell with admin rights and run

```
Set-ExecutionPolicy RemoteSigned
```

### Other

This app is built in electron and is designed to be able to work on all systems, some changes will need to be made 
for it to work on other systems, I leave this in the hands of the community as I am a windows user.
