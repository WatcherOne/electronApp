const nodeNode = document.getElementById('node-version')
const chromeNode = document.getElementById('chrome-version')
const electronNode = document.getElementById('electron-version')
const otherNode = document.getElementById('other-version')

nodeNode.innerText = `${versions.node()}`
chromeNode.innerText = `${versions.chrome()}`
electronNode.innerText = `${versions.electron()}`

// 执行监听

const funct = async () => {
    const response = await window.versions.ping()
    console.log(response)
}

funct()

document.getElementById('toggle-color').addEventListener('click', async () => {
    await systemConfig.scheme()
})

document.getElementById('decompose').addEventListener('click', async () => {
    const total = document.getElementById('total').value || 1
    const howMany = document.getElementById('howMany').value || 1
    const result = await func.decompose(total, howMany)
    console.log(result)
    // document.getElementById('result').innerText = JSON.stringify(result)
})
