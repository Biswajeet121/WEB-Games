const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.getElementById('winnerMessage');
const winnerText = document.getElementById('winner');
const restartButton = document.getElementById('restartButton');

let isCircleTurn = false;

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Start the game
function startGame() {
    isCircleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove('x', 'circle');
        cell.textContent = '';  // Clear the cell content
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    winnerMessage.style.display = 'none';
}

// Handle cell click
function handleClick(e) {
    const cell = e.target;
    const currentClass = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

// Place mark
function placeMark(cell, currentClass) {
    cell.textContent = currentClass === 'circle' ? 'O' : 'X';  // Add this line
    cell.classList.add(currentClass);
}

// Swap turns
function swapTurns() {
    isCircleTurn = !isCircleTurn;
}

// Check for win
function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

// Check for draw
function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}

// End game
function endGame(draw) {
    if (draw) {
        winnerText.textContent = 'It\'s a Draw!';
    } else {
        winnerText.textContent = `${isCircleTurn ? 'O' : 'X'}`;
    }
    winnerMessage.style.display = 'block';
}

// Restart game
restartButton.addEventListener('click', startGame);

startGame();
