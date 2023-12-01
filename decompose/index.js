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

/**
 *  START
 */

let allBoard = {}
let sudokuBoard = []
let solution = []

let selectedRow = -1
let selectedCol = -1

async function getQuestions () {
    const res = await fetch('./questions.json')
    if (!res.ok) {
        Promise.reject('获取数据失败')
        return
    }
    allBoard = await res.json() || {}
}

function randomChoice () {
    const random = 0
    const currentBoard = allBoard[random] || {}
    sudokuBoard = currentBoard.question || []
    solution = currentBoard.solution || []
}

async function generateSudokuBoard () {

    await getQuestions()
    // 随机选择一道数独题
    randomChoice()

    const table = document.getElementById('sudokuBoard')

    for (let i = 0; i < 9; i++) {
        const row = document.createElement('tr')

        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('td')

            if ((i + 1) % 3 === 0) {
                cell.classList.add('third-row')
            }
            if ((j + 1) % 3 === 0) {
                cell.classList.add('third-col')
            }

            const value = sudokuBoard[i] ? sudokuBoard[i][j] : 0

            // 当值不为0时，则表示数独的初始值，已经不能填写
            if (value !== 0) {
                cell.textContent = value
                cell.classList.add('given')
            } else {
                const input = document.createElement('div')
                input.classList.add(`cell-${i}-${j}`)
                input.addEventListener('click', e => {
                    updateBox(e.target, i, j)
                })
                cell.appendChild(input)
            }
            row.appendChild(cell)
        }
        table.appendChild(row)
    }
}

const BOARD_KEY = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

document.addEventListener('keydown', e => {
    if (selectedRow < 0 || selectedCol < 0) return
    if (BOARD_KEY.includes(e.key)) {
        const selectedCell = document.querySelector(`.cell-${selectedRow}-${selectedCol}`)
        const node = document.createElement('span')
        node.innerText = e.key
        selectedCell.appendChild(node)
    }
    if (e.key === 'Backspace') {
        // delete
    }
})

function updateBox (target, i, j) {
    selectedRow = i
    selectedCol = j
    const cells = document.querySelectorAll('[class^=cell-]')
    cells.forEach(cell => {
        cell.classList.remove('focus')
    })
    target.classList.add('focus')
}

// 输入框事件，当输入值时将数独板更新
// function onInputChange (row, col, value) {
//     console.log('dsds', value)
//     sudokuBoard[row][col] = parseInt(value) || 0
// }

// 检查数独是否正确
function checkSolution () {
    let isCorrect = true

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudokuBoard[i][j] !== solution[i][j]) {
                isCorrect = false
                break
            }
        }
    }

    if (isCorrect) {
        alert('Congratulations! You solved the Sudoku!')
    } else {
        alert('Sorry, the solution is incorrect. Keep trying!')
    }
}

// 公布答案
function solveSudoku () {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            sudokuBoard[i][j] = solution[i][j]
        }
    }
    updateBoard()
}

function updateBoard () {
    const inputs = document.querySelectorAll('input')

    inputs.forEach((input, index) => {
        const row = Math.floor(index / 9)
        const col = index % 9
        const value = sudokuBoard[row][col]

        if (value !== 0) {
            input.value = value
        } else {
            input.value = ''
        }
    })
}

generateSudokuBoard()
