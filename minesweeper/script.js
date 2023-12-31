import { populateBoard, TILE_STATUSES, checkWin, checkLoose } from "./minesweeper.js";


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

function handleTileMark(tile) {

  if (tile.tileElStatus === TILE_STATUSES.NUMBER || tile.tileElStatus === TILE_STATUSES.MINE) return;

  if (tile.tileElStatus === TILE_STATUSES.HIDDEN) {
    tile.tileElStatus = TILE_STATUSES.MARKED;
  } else {
    tile.tileElStatus = TILE_STATUSES.HIDDEN;
  }

  updateMinesCount();
}

function updateMinesCount() {
  const minesCount = board.reduce((acc, row) => {
    return acc + row.filter(tile => tile.tileElStatus === TILE_STATUSES.MARKED).length
  }, 0);

  minesCountEl.textContent = NUM_OF_MINES - minesCount;
}

function revealTile(tile) {
  if (tile.tileElStatus !== TILE_STATUSES.HIDDEN) return;

  if (tile.hasMine) {
    tile.tileElStatus = TILE_STATUSES.MINE;
    return;
  }

  tile.tileElStatus = TILE_STATUSES.NUMBER

  const adjacentTiles = getAdjacentTiles(tile);

  if (adjacentTiles.some(t => t.hasMine)) {
    tile.tileEl.textContent = adjacentTiles.filter(t => t.hasMine).length
  } else {
    adjacentTiles.forEach(t => revealTile(t))
  }
}

function getAdjacentTiles({ i, j }) {
  const adjacentTiles = [];

  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const adjTile = board[i + xOffset]?.[j + yOffset];
      if (adjTile) {
        adjacentTiles.push(adjTile)
      }
    }
  }

  return adjacentTiles;
}


function checkEndGame() {
  const win = checkWin(board);
  const loose = checkLoose(board);
  const winLooseText = document.querySelector('.subtext');

  if (win || loose) {
    boardEl.addEventListener('click', stopProp, { capture: true });
    boardEl.addEventListener('contextmenu', stopProp, { capture: true });

  }

  if (win) {
    winLooseText.textContent = 'Congratulations!!! You won the Game.'
  }

  if (loose) {
    winLooseText.textContent = 'Sorry Try Again!!! You lost the Game.'
  }
}

function stopProp(e) {
  e.stopImmediatePropagation();
}