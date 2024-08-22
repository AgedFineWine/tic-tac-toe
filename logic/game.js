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
            const btn = document.getElementById(`${id}`);
            btn.addEventListener('click', event => this.handleBtnClick(id, btn));
        }
    }

    disableBtn() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(btn => btn.disabled = true);
    }

    enableBtn() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(btn => btn.disabled = false);
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

            this.checkGameStatus();
        }
    }

    checkGameStatus() {
        const msg = document.querySelector('#msg');
        const player = document.querySelector('#player');

        if (this.gameboard.checkWin(this.currentPlayer)) {
            // alert(`${this.currentPlayer.name} has won the game!`);
            msg.textContent = `has won the game!`;

            this.disableBtn();

            const jsConfetti = new JSConfetti();
            jsConfetti.addConfetti();
            
        } else if (this.gameboard.checkDraw(this.currentPlayer)) {
            // alert("It's a tie!");
            player.textContent = '';
            msg.textContent = "It's a tie!";
            this.disableBtn();

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

    setResetBtn() {
        const resetBtn = document.querySelector('#reset');
        resetBtn.addEventListener('click', () => this.resetGame());
    }

    resetGame() {
        // make new buttons to replace the old ones
        document.querySelectorAll('.cell').forEach(btn => {
            this.enableBtn();
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

export default Game;
