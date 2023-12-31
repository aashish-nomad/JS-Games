import { populateBoard, TILE_STATUSES } from "./minesweeper.js";


const BOARD_SIZE = 10;
const NUM_OF_MINES = 5;

const board = populateBoard(BOARD_SIZE, NUM_OF_MINES);
const boardEl = document.querySelector('.board');
const minesCountEl = document.querySelector('[data-mines-left]');

minesCountEl.textContent = NUM_OF_MINES
boardEl.style.setProperty('--size', BOARD_SIZE);

board.forEach(row => {
  row.forEach(tile => {
    boardEl.append(tile.tileEl);

    tile.tileEl.addEventListener('click', () => {
      revealTile(tile);

      checkEndGame();
    });

    tile.tileEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      handleTileMark(tile);
    })
  })
})