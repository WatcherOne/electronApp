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

const sudokuBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const solution = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

function generateSudokuBoard() {
    const table = document.getElementById("sudokuBoard");

    for (let i = 0; i < 9; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 9; j++) {
            const cell = document.createElement("td");
            const value = sudokuBoard[i][j];

            if (value !== 0) {
                cell.textContent = value;
                cell.classList.add("given");
            } else {
                const input = document.createElement("input");
                input.type = "text";
                input.maxLength = 1;
                input.addEventListener("input", function () {
                    onInputChange(i, j, input.value);
                });
                cell.appendChild(input);
            }

            row.appendChild(cell);
        }

        table.appendChild(row);
    }
}

function onInputChange(row, col, value) {
    sudokuBoard[row][col] = parseInt(value) || 0;
}

function solveSudoku() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            sudokuBoard[i][j] = solution[i][j];
        }
    }

    updateBoard();
}

function checkSolution() {
    let isCorrect = true;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudokuBoard[i][j] !== solution[i][j]) {
                isCorrect = false;
                break;
            }
        }
    }

    if (isCorrect) {
        alert("Congratulations! You solved the Sudoku!");
    } else {
        alert("Sorry, the solution is incorrect. Keep trying!");
    }
}

function updateBoard() {
    const inputs = document.querySelectorAll("input");

    inputs.forEach((input, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        const value = sudokuBoard[row][col];

        if (value !== 0) {
            input.value = value;
        } else {
            input.value = "";
        }
    });
}

generateSudokuBoard();


