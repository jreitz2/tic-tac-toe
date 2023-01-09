const createPlayer = (name, marker) => {
    return {name, marker};
}
let turnOrder = document.querySelector('.turn-order');
let winner = document.querySelector('.winner');
const gameBoard = (() => {
    let board = [];
    for(i = 0; i < 9; i++) {
        board.push('');
    }

    let squares = document.querySelector('.squares');
    board.forEach((item, index) => {
        const square = document.createElement('div');
        square.classList.add('square');
        squares.appendChild(square);
    })

    Array.from(squares.children).forEach((square, index) => {
        square.addEventListener('click', () => {
            square.textContent = game.currentPlayer.marker;
            gameBoard.board[index] = game.currentPlayer.marker;
            // square.style.pointerEvents = 'none';
            game.remainingSquares -= 1;
            game.checkWinner();
            if (game.winnerDeclared === false) {
                if (game.remainingSquares > 0 ) {
                    game.alertPlayer();
                    game.changeCurrentPlayer();
                } else if (game.remainingSquares === 0) {
                    game.declareTie();
                }
            }
        })
    })

    const reset = document.querySelector('.reset');
    reset.addEventListener('click', () => {
        resetBoard();
    })

    function resetBoard () {
        gameBoard.board = ['', '', '', '', '', '', '', '', ''];
        game.remainingSquares = 9;
        game.winnerDeclared = false;
        game.currentPlayer = game.playerOne;
        turnOrder.innerHTML = `It's ${game.currentPlayer.marker}'s turn!`;
        winner.textContent = '';
        console.log(game.winnerDeclared);
        Array.from(squares.children).forEach(square => {
                square.textContent = '';
        })
    };

    return {board};

})();

const game = (() => {
    const playerOne = createPlayer('Player 1', 'X');
    const playerTwo = createPlayer('Player 2', 'O');

    let currentPlayer = playerOne;
    let winnerDeclared = false;
    let remainingSquares = 9;

    // let turnOrder = document.querySelector('.turn-order');
    // let winner = document.querySelector('.winner');

    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    function checkWinner () {
        winConditions.forEach((item, index) => {
            if (gameBoard.board[item[0]] === this.currentPlayer.marker 
                && gameBoard.board[item[1]] === this.currentPlayer.marker 
                && gameBoard.board[item[2]] === this.currentPlayer.marker) {
                    changeCurrentPlayer();
                    winner.textContent = `${this.currentPlayer.marker} is the winner!`;
                    winnerDeclared = true;
                }
        })
        console.log(gameBoard.board);
    }

    function alertPlayer () {
        if (this.currentPlayer === playerOne) {
            turnOrder.textContent = `It's O's turn!`;
        } else {
            turnOrder.textContent = `It's X's turn!`;
        };
    }

    function changeCurrentPlayer () {
        this.currentPlayer === playerOne ? this.currentPlayer = playerTwo : this.currentPlayer = playerOne;
    }

    function declareTie () {
        winner.textContent = "It's a tie!";
    }


    return {playerOne, playerTwo, currentPlayer, winnerDeclared, remainingSquares, 
        checkWinner, alertPlayer, changeCurrentPlayer, declareTie};
})();