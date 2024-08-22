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
            new Set(['cell-1', 'cell-2', 'cell-3']), new Set(['cell-4', 'cell-5', 'cell-6']), new Set(['cell-7', 'cell-8', 'cell-9']),
            new Set(['cell-1', 'cell-4', 'cell-7']), new Set(['cell-2', 'cell-5','cell-8']), new Set(['cell-3', 'cell-6', 'cell-9']),
            new Set(['cell-1', 'cell-5', 'cell-9']), new Set(['cell-3', 'cell-5', 'cell-7'])
        ];

        // used to change the this.gameboard in the changeCell() method
        this.idMap = new Map([
            ['cell-1', { row: 0, col: 0 }],
            ['cell-2', { row: 0, col: 1 }],
            ['cell-3', { row: 0, col: 2 }],
            ['cell-4', { row: 1, col: 0 }],
            ['cell-5', { row: 1, col: 1 }],
            ['cell-6', { row: 1, col: 2 }],
            ['cell-7', { row: 2, col: 0 }],
            ['cell-8', { row: 2, col: 1 }],
            ['cell-9', { row: 2, col: 2 }],
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

    findWinSet(playerObj) {
        if (!playerObj || !playerObj.idSet || !this.win) throw new Error('Invalid input, Gameboard.findWin()');
        for (const winSet of this.win) {
            if ([...winSet].every(cellId => playerObj.idSet.has(cellId))) {
                return winSet;
            }
        }
    }

    // iterate through all possible win possibilties
    checkWin(playerObj) {
        // need at least one case is true hence we use the .some() method
        return this.win.some(winSet => {
            // player must occupy all of the cells per win possibility
            return [...winSet].every(cellId => {
                return playerObj.idSet.has(cellId)
            });
        });
    }

    checkDraw() {
        const board = this.getBoard();

        return board.every(nestedArray => {
            return nestedArray.every(element => {
                return element !== null;
            });
        });
    }
}

export default Gameboard;
