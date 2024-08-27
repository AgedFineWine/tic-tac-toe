import Player from "./player.js";
import Gameboard from "./gameboard.js";

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
            const btn = document.getElementById(`cell-${id}`);
            btn.addEventListener('click', event => this.handleBtnClick(`cell-${id}`, btn));
        }
    }

    disableBtn() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(btn => {
            btn.disabled = true;
            // change background color for cells that are not occupied
            if (btn.textContent === '') btn.style.backgroundColor = '#f0f0f0';
        });
    }

    enableBtn() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(btn => {
            btn.disabled = false;
            btn.style.backgroundColor = '#d6d6d6';
        });
    }

    showWinner(winSet) {
        const ids = [ 'cell-1', 'cell-2', 'cell-3', 'cell-4', 'cell-5', 'cell-6', 'cell-7', 'cell-8', 'cell-9' ]
        for (const cellId of ids) {
            const btn = document.querySelector(`#${cellId}`);
            if (winSet.has(cellId)) {
                btn.style.boxShadow = '0 0 3px 3px gold';
            } else {
                btn.style.transform = 'scale(.7)';
                btn.style.filter = 'blur(4px)';
            }
        }
    }

    /* tells the program what to do if a cell button is clicked */
    handleBtnClick(id, btn) {
        // if the text is empty it is truthy
        if (!btn.textContent) {
            // update cells and player idSet for occupied cells
            btn.textContent = this.currentPlayer.name;
            this.gameboard.changeCell(this.currentPlayer, id);
            this.currentPlayer.addId(id);

            btn.style.backgroundColor = this.currentPlayer.name === 'X' ? '#04d9ff' : '#ff6700';
            btn.style.color = 'white';

            this.checkGameStatus();
        }
    }

    checkGameStatus() {
        const msg = document.querySelector('#msg');
        const player = document.querySelector('#player');

        if (this.gameboard.checkWin(this.currentPlayer)) {
            player.textContent = `Player ${this.currentPlayer.name}`;
            msg.textContent = `has won the game!`;

            this.disableBtn();

            const jsConfetti = new JSConfetti();
            jsConfetti.addConfetti();

            /* winSet is the set of cell IDs that is connected 3 in a row */
            const winSet = this.gameboard.findWinSet(this.currentPlayer);
            this.showWinner(winSet);


        } else if (this.gameboard.checkDraw()) {
            player.textContent = '';
            msg.textContent = "It's a tie!";
            this.disableBtn();

        } else {
            // if the current player name is X, swaps to playerO if not it goes to playerX
            this.currentPlayer = this.currentPlayer.name === this.playerX.name ? this.playerO : this.playerX;
            const playerSpan = document.querySelector('#player');
            // change the span content
            playerSpan.textContent = this.currentPlayer.name === 'X' ? "Player X's" : "Player O's";
            playerSpan.style.color = this.currentPlayer.name === 'X' ? '#04d9ff' : '#ff6700';
            // change the color of the span
        }
    }

    setResetBtn() {
        const resetBtn = document.querySelector('#reset');
        resetBtn.addEventListener('click', () => this.resetGame());
    }

    resetGame() {
        // make new buttons to replace the old ones
        document.querySelectorAll('.cell').forEach(btn => {
            this.enableBtn();
            btn.textContent = '';
            btn.style.boxShadow = 'none';
            btn.style.backgroundColor = '#d6d6d6';
            btn.style.filter = 'none';
            btn.style.transform = 'none';
            // Remove existing event listeners
            const newBtn = btn.cloneNode(false);
            btn.replaceWith(newBtn);
        });
        // create new objects and reattch the event listeners
        this.init();
        const player = document.querySelector('#player');
        const msg = document.querySelector('#msg');
        player.textContent = "Player X's";
        player.style.color = '#04d9ff';
        msg.textContent = 'Move';
    }
}

export default Game;
