export const TILE_STATUSES = {
  HIDDEN: 'hidden',
  MARKED: 'marked',
  MINE: 'mine',
  NUMBER: 'number',
}

export function populateBoard(boardSize, numOfMines) {

  const board = [];
  const minePosition = getMinePosition(boardSize, numOfMines);

  for (let i = 0; i < boardSize; i++) {
    const row = []
    for (let j = 0; j < boardSize; j++) {
      const tileEl = document.createElement("div");

      const tile = {
        i,
        j,
        tileEl,
        hasMine: minePosition.some(poistionsMatch.bind(null, { x: i, y: j })),
        set tileElStatus(value) {
          this.tileEl.dataset.status = value;
        },
        get tileElStatus() {
          return this.tileEl.dataset.status;
        }
      }

      tile.tileElStatus = TILE_STATUSES.HIDDEN;

      row.push(tile)
    }

    board.push(row);
  }

  return board;

}

function getMinePosition(boardSize, numOfMines) {
  const minePosition = [];

  while (minePosition.length < numOfMines) {
    const position = {
      x: getRandomPositionValue(boardSize),
      y: getRandomPositionValue(boardSize),
    }

    if (!minePosition.some(poistionsMatch.bind(null, position))) {
      minePosition.push(position);
    }
  }

  return minePosition;
}


function getRandomPositionValue(boardSize) {
  return Math.floor(Math.random() * boardSize);
}

function poistionsMatch(a, b) {
  return (a.x === b.x && a.y === b.y);
}

export function checkLoose(board) {
  return board.some(row => {
    return row.some(tile => tile.tileElStatus === TILE_STATUSES.MINE)
  })
}

export function checkWin(board) {
  return board.every(row => {
    return row.every(tile => (tile.tileElStatus === TILE_STATUSES.NUMBER) || tile.hasMine && (tile.tileElStatus === TILE_STATUSES.MARKED || tile.tileElStatus === TILE_STATUSES.HIDDEN))
  })
}
