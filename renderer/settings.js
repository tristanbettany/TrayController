//console.log(window.api.getStoreValue('foo'))
//console.log(window.api.setStoreValue('foo', 'bar'))

let apply = () => {
    console.log('applying settings')
}

let cancel = () => {
    window.api.cancel()
}

document.querySelector('#apply').addEventListener('click', apply);
document.querySelector('#cancel').addEventListener('click', cancel);