document.addEventListener('DOMContentLoaded', function(event) {
    let pillarPath = window.api.getStoreValue('pillar-path')
    if (pillarPath !== undefined) {
        document.querySelector('#pillar-path').value = pillarPath
    }
})

let saveSettings = () => {
    let pillarPath = document.querySelector('#pillar-path').value
    window.api.setStoreValue('pillar-path', pillarPath)
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

document.querySelector('#ok').addEventListener('click', saveAndClose);
document.querySelector('#apply').addEventListener('click', save);
document.querySelector('#cancel').addEventListener('click', close);