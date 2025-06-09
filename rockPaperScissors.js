// Get references to DOM elements
const playerChoiceDisplay = document.getElementById('player-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const winnerDisplay = document.getElementById('winner');

// Get references to the buttons
const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');

// Array of choices for the computer
const choices = ['Rock', 'Paper', 'Scissors'];

// Function to get the computer's choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'It\'s a draw!';
    }

    if (
        (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
        (playerChoice === 'Paper' && computerChoice === 'Rock') ||
        (playerChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
        return 'You win!';
    }

    return 'You lose!';
}

// Event listeners for player choices
rockButton.addEventListener('click', () => playGame('Rock'));
paperButton.addEventListener('click', () => playGame('Paper'));
scissorsButton.addEventListener('click', () => playGame('Scissors'));

// Main game function
function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    
    // Display the player's and computer's choices
    playerChoiceDisplay.textContent = `Your Choice: ${playerChoice}`;
    computerChoiceDisplay.textContent = `Computer's Choice: ${computerChoice}`;
    
    // Determine and display the winner
    const result = determineWinner(playerChoice, computerChoice);
    winnerDisplay.textContent = `Winner: ${result}`;
}
const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', () => {
    playerChoiceDisplay.textContent = 'Your Choice: ';
    computerChoiceDisplay.textContent = 'Computer\'s Choice: ';
    winnerDisplay.textContent = 'Winner: ';
});

let playerScore = 0;
let computerScore = 0;

function updateScore(result) {
    if (result === 'You win!') {
        playerScore++;
    } else if (result === 'You lose!') {
        computerScore++;
    }
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('computer-score').textContent = computerScore;
}

function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    playerChoiceDisplay.textContent = `Your Choice: ${playerChoice}`;
    computerChoiceDisplay.textContent = `Computer's Choice: ${computerChoice}`;
    const result = determineWinner(playerChoice, computerChoice);
    winnerDisplay.textContent = `Winner: ${result}`;
    updateScore(result);
}
const clickSound = new Audio('sounds/click.mp3');
const winSound = new Audio('sounds/win.mp3');

rockButton.addEventListener('click', () => {
    clickSound.play();
    playGame('Rock');
});
