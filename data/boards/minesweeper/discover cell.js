const parsedRow = Number(params.row);
const parsedColumn = Number(params.column);

const boardData = board?.['new game'];
const discovered = board?.['discovered cells'] ?? {};
const isMine = boardData?.[parsedRow]?.[parsedColumn]?.death;
const gridSize = boardData?.length

const isValidCell = (board, y, x) => {
  return y >= 0 && y < board.length && x >= 0 && x < board[0].length;
}
const getCellKey = (row, col) => `cell-${row}-${col}`;

const countNearbyMines = (board, row, col) => {
  let count = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dy === 0 && dx === 0) continue;
      const y = row + dy;
      const x = col + dx;
      if (isValidCell(board, y, x) && board[y][x].death) {
        count++;
      }
    }
  }
  return count;
};

const revealEmptyCells = async (board, discoveredCells, row, col) => {
  const stack = [[row, col]];
  const visited = new Set();
  const actions = [];

  while (stack.length) {
    const [r, c] = stack.pop();
    const key = getCellKey(r, c);

    if (visited.has(key) || discoveredCells[r]?.[c]) continue;
    visited.add(key);
    actions.push({ row: r, column: c });

    if (countNearbyMines(board, r, c) === 0) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dy === 0 && dx === 0) continue;
          const newY = r + dy;
          const newX = c + dx;
          if (isValidCell(board, newY, newX)) {
            stack.push([newY, newX]);
          }
        }
      }
    }
  }

  await Promise.all(actions.map(({ row, column }) =>
    execute_action("discovered cells", { row, column, gridSize })
  ));
};

await execute_action("discovered cells", {
  row: parsedRow,
  column: parsedColumn,
  gridSize
});

if (isMine) {
  const mineReveals = [];

  for (let rowI = 0; rowI < boardData.length; rowI++) {
    for (let colI = 0; colI < boardData[rowI].length; colI++) {
      if (boardData[rowI][colI].death) {
        mineReveals.push({ row: rowI, column: colI });
      }
    }
  }

  await Promise.all(mineReveals.map(({ row, column }) =>
    execute_action("discovered cells", { row, column, gridSize })
  ));
} else {
  const nearby = countNearbyMines(boardData, parsedRow, parsedColumn);
  if (nearby === 0) {
    await revealEmptyCells(boardData, discovered, parsedRow, parsedColumn);
  }
}

await execute_action("game state", {
  board: boardData,
  discoveredCells: board?.['discovered cells'],
});
