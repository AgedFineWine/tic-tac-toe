import Gameboard from "../logic/gameboard.js";
import Player from "../logic/player.js";

/* 
for syntax reference refer to the following:

https://jestjs.io/docs/api#describename-fn

 */
describe.each([
    {
        name: '1 Draw',
        X: ['cell-1', 'cell-2', 'cell-5', 'cell-6', 'cell-7'],
        O: ['cell-3', 'cell-4', 'cell-8', 'cell-9'],
        expected: true
    },
    {
        name: '2 Draw',
        X: ['cell-2', 'cell-4', 'cell-5', 'cell-7', 'cell-9'],
        O: ['cell-1', 'cell-3', 'cell-6', 'cell-8'],
        expected: true
    },
    {
        name: '3 PlayerX Wins',
        X: ['cell-1', 'cell-2', 'cell-3', 'cell-4'],
        O: ['cell-5', 'cell-6', 'cell-8'],
        expected: false
    },
    {
        name: '4 PlayerO Wins',
        X: ['cell-2', 'cell-7', 'cell-8'],
        O: ['cell-4', 'cell-5', 'cell-6'],
        expected: false
    }
])('Testing Gameboard object\'s checkDraw() method on possible end game scenarios.', ({ name, X, O, expected }) => {
    test(`Scenario ${name}`, () => {
        const gameboard = new Gameboard();
        const playerX = new Player('X');
        const playerO = new Player('O');

        
        for (let i = 0; i < X.length; i++) {
            gameboard.changeCell(playerX, X[i]);
        }
        for (let i = 0; i < O.length; i++) {
            gameboard.changeCell(playerO, O[i]);
        }

        expect(gameboard.checkDraw()).toBe(expected);
    });
})


