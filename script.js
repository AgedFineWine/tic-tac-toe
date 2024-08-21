class Player {
    constructor(name) {
        this.name = name;
        this.id = new Set();
    }

    // the list of all the cells the player has occupied
    get idSet() {
        return this.id;
    }

    addId(id) {
        this.id.add(id);
    }
}

class Gameboard {
    constructor() {
        // null gets replaced with a Player object later on
        this.gameboard = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        // all possible cell combinations a player must occupy before winning
        this.win = [
            new Set([1, 2, 3]), new Set([4, 5, 6]), new Set([7, 8, 9]),
            new Set([1, 4, 7]), new Set([2, 5, 8]), new Set([3, 6, 9]),
            new Set([1, 5, 9]), new Set([3, 5, 7])
        ];

        // used to change the this.gameboard in the changeCell() method
        this.idMap = new Map([
            [1, { row: 0, col: 0 }],
            [2, { row: 0, col: 1 }],
            [3, { row: 0, col: 2 }],
            [4, { row: 1, col: 0 }],
            [5, { row: 1, col: 1 }],
            [6, { row: 1, col: 2 }],
            [7, { row: 2, col: 0 }],
            [8, { row: 2, col: 1 }],
            [9, { row: 2, col: 2 }],
        ]);

    }

    getBoard() {
        return this.gameboard;
    }

    changeCell(player, id) {
        const { row, col } = this.idMap.get(id);

        if (this.gameboard[row][col] == null) {
            this.gameboard[row][col] = player;
        }
    }

    // iterate through all possible win possibilties
    checkWin(playerObj) {
        // need at least one case is true hence we use the .some() method
        return this.win.some(winSet => {
            // player must occupy all of the cells per win possibility
            return [...winSet].every(id => {
                return playerObj.idSet.has(id)
            });
        });
    }

    checkDraw(playerObj) {
        const board = this.getBoard();
        // the first condition isn't really necessary because of how
        // implemented the code body in addEventListener
        return !this.checkWin(playerObj) && board.every(nestedArray => {
            nestedArray.every(element => element !== null);
        });
    }
}

class Game {
    init() {
        this.gameboard = new Gameboard();
        this.playerX = new Player('X');
        this.playerO = new Player('O');
        this.currentPlayer = this.playerX;
        this.setResetBtn();
        this.buttonSetUp();
    }

    buttonSetUp() {
        for (let id = 1; id <= 9; id++) {
            const btn = document.getElementById(`${id}`);
            btn.addEventListener('click', event => this.handleBtnClick(id, btn));
        }
    }

    handleBtnClick(id, btn) {
        // if the text is empty it is truthy
        if (!btn.textContent) {
            // update cells and player idSet for occupied cells
            btn.textContent = this.currentPlayer.name;
            this.gameboard.changeCell(this.currentPlayer, id);
            this.currentPlayer.addId(id);

            btn.style.backgroundColor = this.currentPlayer.name === 'X' ? 'red' : 'blue';
            btn.style.color = 'white';
            const msg = document.querySelector('#msg');
            const player = document.querySelector('#player');

            if (this.gameboard.checkWin(this.currentPlayer)) {
                alert(`${this.currentPlayer.name} has won the game!`);
                msg.textContent = `has won the game!`;

            } else if (this.gameboard.checkDraw(this.currentPlayer)) {
                alert("It's a tie!");
                player.textContent = '';
                msg.textContent = "It's a tie!";
            } else {
                // if the current player name is X, swaps to playerO if not it goes to playerX
                this.currentPlayer = this.currentPlayer.name === this.playerX.name ? this.playerO : this.playerX;
                const playerSpan = document.querySelector('#player');
                // change the span content
                playerSpan.textContent = this.currentPlayer.name === 'X' ? "Player X's" : "Player O's";
                playerSpan.style.color = this.currentPlayer.name === 'X' ? 'red' : 'blue';
                // change the color of the span
            }
        }
    }

    setResetBtn() {
        const resetBtn = document.querySelector('#reset');
        resetBtn.addEventListener('click', () => this.resetGame());
    }

    resetGame() {
        // make new buttons to replace the old ones
        document.querySelectorAll('.cell').forEach(btn => {
            btn.textContent = '';
            btn.style.backgroundColor = '#f0f0f0';
            // Remove existing event listeners
            const newBtn = btn.cloneNode(false);
            btn.replaceWith(newBtn);
        });
        // create new objects and reattch the event listeners
        this.init();
        const player = document.querySelector('#player');
        const msg = document.querySelector('#msg');
        player.textContent = "Player X's";
        player.style.color = 'red';
        msg.textContent = 'Move';
    }
}

(() => {
    const newGame = new Game();
    // Initialize the game on creation
    newGame.init();
})();
