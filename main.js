document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('[data-cell]');
    const gameStatus = document.getElementById('game-status');
    const restartButton = document.getElementById('restart-button');
    let isXTurn = true;
    let gameActive = true;
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

    const handleCellClick = (e) => {
        const cell = e.target;
        const currentClass = isXTurn ? 'X' : 'O';

        if (cell.textContent !== '' || !gameActive) return;

        cell.textContent = currentClass;
        cell.classList.add(currentClass);

        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
        }
    };

    const swapTurns = () => {
        isXTurn = !isXTurn;
        gameStatus.textContent = `Player ${isXTurn ? 'X' : 'O'}'s turn`;
    };

    const checkWin = (currentClass) => {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].textContent === currentClass;
            });
        });
    };

    const isDraw = () => {
        return [...cells].every(cell => {
            return cell.textContent === 'X' || cell.textContent === 'O';
        });
    };

    const endGame = (draw) => {
        if (draw) {
            gameStatus.textContent = 'Draw!';
        } else {
            gameStatus.textContent = `Player ${isXTurn ? 'X' : 'O'} Wins!`;
        }
        gameActive = false;
    };

    const restartGame = () => {
        isXTurn = true;
        gameActive = true;
        gameStatus.textContent = `Player X's turn`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O');
        });
    };

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartButton.addEventListener('click', restartGame);
});
