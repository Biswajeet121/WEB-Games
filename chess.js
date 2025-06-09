// Initial board setup (standard starting positions)
const initialBoard = [
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];

const chessBoard = document.querySelector('.chess-board');
let currentTurn = 'white'; // White starts the game
let selectedPiece = null;
let selectedCell = null;

// Generate the chessboard dynamically
function generateChessboard() {
    let boardHTML = '';
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const color = (row + col) % 2 === 0 ? 'white' : 'black';
            const piece = initialBoard[row][col];
            boardHTML += `
                <div class="cell ${color}" data-row="${row}" data-col="${col}">
                    <div class="piece ${piece ? 'has-piece' : ''}">
                        ${piece}
                    </div>
                </div>
            `;
        }
    }
    chessBoard.innerHTML = boardHTML;
}

// Event listener for cell click
chessBoard.addEventListener('click', (event) => {
    const targetCell = event.target.closest('.cell');
    if (!targetCell) return;

    const row = targetCell.dataset.row;
    const col = targetCell.dataset.col;

    // If a piece is already selected, try to move it
    if (selectedPiece) {
        if (isValidMove(selectedCell, targetCell, row, col)) {
            movePiece(targetCell, row, col);
            switchTurn(); // Switch turn after a valid move
        } else {
            alert("Invalid Move!");
        }
    } else {
        selectPiece(targetCell, row, col);
    }
});

// Function to select a piece
function selectPiece(cell, row, col) {
    const piece = cell.querySelector('.piece');
    
    // Check if the piece belongs to the current turn
    if (piece && piece.innerHTML !== '') {
        const pieceColor = piece.innerHTML === piece.innerHTML.toUpperCase() ? 'white' : 'black';
        if (pieceColor === currentTurn) {
            selectedPiece = piece.innerHTML;
            selectedCell = cell;
            cell.classList.add('selected');
        }
    }
}

// Function to move a piece
function movePiece(targetCell, row, col) {
    // Move the piece to the new cell
    targetCell.querySelector('.piece').innerHTML = selectedPiece;
    
    // Remove the piece from the original cell
    selectedCell.querySelector('.piece').innerHTML = '';

    // Reset the selected piece and cell
    selectedPiece = null;
    selectedCell.classList.remove('selected');
    selectedCell = null;
}

// Function to switch turns
function switchTurn() {
    currentTurn = currentTurn === 'white' ? 'black' : 'white';
    alert(`${currentTurn}'s turn!`);
}

// Function to check if the move is valid for a given piece
function isValidMove(fromCell, toCell, row, col) {
    const fromRow = parseInt(fromCell.dataset.row);
    const fromCol = parseInt(fromCell.dataset.col);

    const piece = fromCell.querySelector('.piece').innerHTML;
    const targetPiece = toCell.querySelector('.piece').innerHTML;
    const direction = currentTurn === 'white' ? 1 : -1;  // Direction of movement for white/black pawns

    // Pawn Movement
    if (piece === '♙' || piece === '♟') {
        // White pawn can move one step forward
        if (piece === '♙' && row === fromRow + direction && col === fromCol && !targetPiece) {
            return true; // White pawn forward
        }

        // White pawn can move two steps forward from the initial position
        if (piece === '♙' && fromRow === 6 && row === fromRow + 2 * direction && col === fromCol && !targetPiece) {
            return true; // White pawn double move
        }

        // Black pawn can move one step forward
        if (piece === '♟' && row === fromRow + direction && col === fromCol && !targetPiece) {
            return true; // Black pawn forward
        }

        // Black pawn can move two steps forward from the initial position
        if (piece === '♟' && fromRow === 1 && row === fromRow + 2 * direction && col === fromCol && !targetPiece) {
            return true; // Black pawn double move
        }

        // Pawn capturing (diagonal move)
        if ((piece === '♙' && row === fromRow + direction && Math.abs(col - fromCol) === 1 && targetPiece === '♟') || // White captures
            (piece === '♟' && row === fromRow + direction && Math.abs(col - fromCol) === 1 && targetPiece === '♙')) { // Black captures
            return true;
        }
    }

    // Rook Movement
    if (piece === '♖' || piece === '♜') {
        if (row === fromRow || col === fromCol) {
            return !isObstructed(fromRow, fromCol, row, col); // Check for obstacles
        }
    }

    // Knight Movement
    if (piece === '♘' || piece === '♞') {
        if (Math.abs(row - fromRow) === 2 && Math.abs(col - fromCol) === 1 || Math.abs(row - fromRow) === 1 && Math.abs(col - fromCol) === 2) {
            return true; // Valid knight move
        }
    }

    // Bishop Movement
    if (piece === '♗' || piece === '♝') {
        if (Math.abs(row - fromRow) === Math.abs(col - fromCol)) {
            return !isObstructed(fromRow, fromCol, row, col); // Check for obstacles
        }
    }

    // Queen Movement
    if (piece === '♕' || piece === '♛') {
        if (row === fromRow || col === fromCol || Math.abs(row - fromRow) === Math.abs(col - fromCol)) {
            return !isObstructed(fromRow, fromCol, row, col); // Check for obstacles
        }
    }

    // King Movement
    if (piece === '♔' || piece === '♚') {
        if (Math.abs(row - fromRow) <= 1 && Math.abs(col - fromCol) <= 1) {
            return true; // King moves one square in any direction
        }
    }

    return false; // Default: invalid move
}

// Function to check if a move is obstructed (no pieces in the way)
function isObstructed(fromRow, fromCol, toRow, toCol) {
    const rowStep = Math.sign(toRow - fromRow);
    const colStep = Math.sign(toCol - fromCol);
    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;

    while (currentRow !== toRow || currentCol !== toCol) {
        if (initialBoard[currentRow][currentCol] !== '') {
            return true; // There's an obstacle
        }
        currentRow += rowStep;
        currentCol += colStep;
    }
    return false; // No obstacles
}

// Initialize the chessboard
generateChessboard();
