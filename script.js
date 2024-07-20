const ROWS = 20;
const COLS = 20;
const mazeContainer = document.getElementById('maze-container');
let maze = [];
let startNode = { row: 0, col: 0 };
let endNode = { row: ROWS - 1, col: COLS - 1 };

function createMaze() {
    maze = [];
    mazeContainer.innerHTML = '';
    for (let row = 0; row < ROWS; row++) {
        const mazeRow = [];
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('maze-cell');
            cell.id = `cell-${row}-${col}`;
            if (row === startNode.row && col === startNode.col) {
                cell.classList.add('start');
            } else if (row === endNode.row && col === endNode.col) {
                cell.classList.add('end');
            } else {
                if (Math.random() < 0.3) {
                    cell.classList.add('wall');
                }
            }
            mazeContainer.appendChild(cell);
            mazeRow.push(cell);
        }
        maze.push(mazeRow);
    }
}

function clearMaze() {
    mazeContainer.innerHTML = '';
    maze = [];
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function solveMazeDFS() {
    const stack = [startNode];
    const visited = new Set();
    const path = [];
    while (stack.length > 0) {
        const { row, col } = stack.pop();
        const cell = maze[row][col];
        if (visited.has(cell)) continue;
        visited.add(cell);
        path.push(cell);
        cell.classList.add('path');
        await sleep(50);
        if (row === endNode.row && col === endNode.col) {
            for (const cell of path) {
                cell.classList.add('solution');
            }
            return;
        }
        for (const { row: dRow, col: dCol } of [
            { row: -1, col: 0 }, // up
            { row: 1, col: 0 },  // down
            { row: 0, col: -1 }, // left
            { row: 0, col: 1 }   // right
        ]) {
            const newRow = row + dRow;
            const newCol = col + dCol;
            if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && !maze[newRow][newCol].classList.contains('wall')) {
                stack.push({ row: newRow, col: newCol });
            }
        }
    }
    alert('No solution found');
}

async function solveMazeBFS() {
    const queue = [startNode];
    const visited = new Set();
    const path = [];
    while (queue.length > 0) {
        const { row, col } = queue.shift();
        const cell = maze[row][col];
        if (visited.has(cell)) continue;
        visited.add(cell);
        path.push(cell);
        cell.classList.add('path');
        await sleep(50);
        if (row === endNode.row && col === endNode.col) {
            for (const cell of path) {
                cell.classList.add('solution');
            }
            return;
        }
        for (const { row: dRow, col: dCol } of [
            { row: -1, col: 0 }, // up
            { row: 1, col: 0 },  // down
            { row: 0, col: -1 }, // left
            { row: 0, col: 1 }   // right
        ]) {
            const newRow = row + dRow;
            const newCol = col + dCol;
            if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && !maze[newRow][newCol].classList.contains('wall')) {
                queue.push({ row: newRow, col: newCol });
            }
        }
    }
    alert('No solution found');
}

document.getElementById('generateMaze').addEventListener('click', createMaze);
document.getElementById('solveMazeDFS').addEventListener('click', solveMazeDFS);
document.getElementById('solveMazeBFS').addEventListener('click', solveMazeBFS);
document.getElementById('clearMaze').addEventListener('click', clearMaze);

createMaze();
