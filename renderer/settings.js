document.addEventListener('DOMContentLoaded', function(event) {
    let pillarPath = window.api.getStoreValue('pillar-path')
    if (pillarPath !== undefined) {
        document.querySelector('#pillar-path').value = pillarPath
    }

    let projectFolder = window.api.getStoreValue('project-folder')
    if (projectFolder !== undefined) {
        document.querySelector('#project-folder').value = projectFolder
    }

    let projectContainer = window.api.getStoreValue('project-container')
    if (projectContainer !== undefined) {
        document.querySelector('#project-container').value = projectContainer
    }

    let projectUrl = window.api.getStoreValue('project-url')
    if (projectUrl !== undefined) {
        document.querySelector('#project-url').value = projectUrl
    }

    let projectsPath = window.api.getStoreValue('projects-path')
    if (projectsPath !== undefined) {
        document.querySelector('#projects-path').value = projectsPath
    }
})

let saveSettings = () => {
    let pillarPath = document.querySelector('#pillar-path').value
    window.api.setStoreValue('pillar-path', pillarPath)

    let projectFolder = document.querySelector('#project-folder').value
    window.api.setStoreValue('project-folder', projectFolder)

    let projectContainer = document.querySelector('#project-container').value
    window.api.setStoreValue('project-container', projectContainer)

    let projectUrl = document.querySelector('#project-url').value
    window.api.setStoreValue('project-url', projectUrl)

    let projectsPath = document.querySelector('#projects-path').value
    window.api.setStoreValue('projects-path', projectsPath)
}

let saveAndClose = () => {
    saveSettings()
    window.api.close()
}

let save = () => {
    saveSettings()
}

let close = () => {
    window.api.close()
}

document.querySelector('#save-and-close').addEventListener('click', saveAndClose);
document.querySelector('#save').addEventListener('click', save);
document.querySelector('#close').addEventListener('click', close);