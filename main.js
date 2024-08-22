import Game from "./logic/game.js";

function toggleNightMode(event) {
    const btn = event.target;

    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        btn.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode');
        btn.classList.add('dark-mode');
    }
}

(() => {
    const newGame = new Game();
    // Initialize the game on creation
    newGame.init();

    const nightModeBtn = document.querySelector('#toggle-mode');
    nightModeBtn.addEventListener('click', event => toggleNightMode(event))
})();
