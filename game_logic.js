let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let xWins = 0;
let oWins = 0;

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
};

function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon() !== false) {
            playerText.innerHTML = `${currentPlayer} has won!`;
            let winning_blocks = playerHasWon();

            winning_blocks.forEach((box) => {
                boxes[box].classList.add('winning-animation');
            });

            if (currentPlayer === X_TEXT) {
                xWins++;
            } else {
                oWins++;
            }

            updateScore();

            // Disable clicks after the game ends
            boxes.forEach((box) => box.removeEventListener('click', boxClicked));

            return;
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;

        // Update player indication
        playerText.innerHTML = `${currentPlayer}'s turn`;
    }
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}

restartBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
        box.classList.remove('winning-animation');
    });

    playerText.innerHTML = 'Tic Tac Toe';

    currentPlayer = X_TEXT;

    // Enable clicks on boxes
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}

// Add this function to reset the score
function resetScore() {
    xWins = 0;
    oWins = 0;
    updateScore();
}

function updateScore() {
    document.getElementById('xWins').innerText = `X Wins: ${xWins}`;
    document.getElementById('oWins').innerText = `O Wins: ${oWins}`;
}

// Your existing code
startGame();
