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

export default Gameboard;
