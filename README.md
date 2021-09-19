# Tray Controller

This is designed as a tool to assist in using the development stack Pillar located here - https://github.com/tristanbettany/Pillar

If you would like to use that for development then this will provide a nice system tray based user interface to interact with it.

It makes launching containers, and starting/stopping the stack much faster. Including other regular commands like running tests,
running composer install and even starting ngrok.

## Setup

Clone the Repo and make sure you have node and npm installed, then in the root of the repo, run from powershell:

```
npm install
npm run make
```

Inside the `out` folder you will find the installer exe. Install the application like you would any other.
Shortcuts will be added to your desktop and start menu, and an un-installer in add-remove programs.

## Non Windows Systems

Even though this app is built in a cross platform framework (electron), both it and Pillar are both designed to work on windows only.
If you require to use another OS I recommend either another solution or taking the time to fork and modify my work such that it 
works on other systems.
